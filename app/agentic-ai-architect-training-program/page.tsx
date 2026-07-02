'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import './agentic-ai.scss';
import Image from "next/image";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    cityState: string;
    employer: string;
    jobTitle: string;
    linkedin: string;
    yearsExperience: string;
    education: string;
    experience: string[];
    otherExperience: string;
    attendanceMode: string;
    heardAbout: string;
    signature: string;
    declResumeAttached: boolean;
    declInterviewRequired: boolean;
    declLabFee: boolean;
}

interface FormErrors { [key: string]: string; }

const EXPERIENCE_OPTIONS = [
    { id: 'software-data-eng', label: 'Software / Data Eng.' },
    { id: 'data-science-ml', label: 'Data Science / ML' },
    { id: 'cloud-devops', label: 'Cloud / DevOps' },
    { id: 'ai-llm-agentic', label: 'AI / LLM / Agentic AI' },
    { id: 'product-program-mgmt', label: 'Product / Program Mgmt' },
    { id: 'other', label: 'Other' },
];

const EDUCATION_OPTIONS = [
    { value: 'bachelors', label: "Bachelor's" },
    { value: 'masters', label: "Master's" },
    { value: 'phd', label: 'Ph.D.' },
    { value: 'other', label: 'Other' },
];

const YEARS_OPTIONS = ['0–2 years', '3–5 years', '6–10 years', '10+ years'];

const RESUME_MAX_SIZE_BYTES = 5 * 1024 * 1024;
const RESUME_ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];
const CF7_FIELD_ERROR_MAP: Record<string, string> = {
    linkedin: 'linkedin',
    resume: 'resume',
};
const CF7_FIELD_STEP_MAP: Record<string, number> = {
    linkedin: 0,
    resume: 3,
};

function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getFileExtension(fileName: string) {
    const dotIndex = fileName.lastIndexOf('.');
    return dotIndex >= 0 ? fileName.slice(dotIndex).toLowerCase() : '';
}

function validateLinkedInProfileUrl(profileUrl: string) {
    const trimmed = profileUrl.trim();
    if (!trimmed) return false;

    try {
        const url = new URL(trimmed);
        const hostname = url.hostname.toLowerCase();
        const pathSegments = url.pathname.split('/').filter(Boolean);

        return (
            (url.protocol === 'https:' || url.protocol === 'http:') &&
            (hostname === 'linkedin.com' || hostname.endsWith('.linkedin.com')) &&
            pathSegments[0]?.toLowerCase() === 'in' &&
            Boolean(pathSegments[1])
        );
    } catch {
        return false;
    }
}

function getResumeValidationError(file: File) {
    const extension = getFileExtension(file.name);

    if (!RESUME_ALLOWED_EXTENSIONS.includes(extension)) {
        return 'Invalid format. Allowed formats: PDF, DOC, DOCX.';
    }

    if (file.size <= 0) {
        return 'Resume file is empty.';
    }

    if (file.size > RESUME_MAX_SIZE_BYTES) {
        return 'File size exceeds the 5MB limit.';
    }

    return '';
}

function dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

function generateTypedSignatureImage(name: string): string | null {
    if (typeof window === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw baseline
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(50, 150);
    ctx.lineTo(450, 150);
    ctx.stroke();

    // Draw text with Caveat font
    ctx.fillStyle = '#0f172a';
    ctx.font = '700 48px Caveat, cursive';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name, 250, 100);

    return canvas.toDataURL('image/png');
}

interface SignatureModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (type: 'draw' | 'type' | 'upload', data: string, typedName?: string) => void;
    initialType?: 'draw' | 'type' | 'upload' | null;
    initialData?: string | null;
    initialTypedName?: string;
}

function SignatureModal({ isOpen, onClose, onSave, initialType, initialData, initialTypedName }: SignatureModalProps) {
    const [activeTab, setActiveTab] = useState<'draw' | 'type' | 'upload'>(initialType || 'draw');
    const [strokeColor, setStrokeColor] = useState('#000000');
    const [typedName, setTypedName] = useState(initialType === 'type' ? initialTypedName || '' : '');
    const [uploadData, setUploadData] = useState<string | null>(initialType === 'upload' ? initialData || null : null);
    const [uploadName, setUploadName] = useState('');
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        if (isOpen && activeTab === 'draw' && initialType === 'draw' && initialData && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const img = new window.Image();
                img.onload = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                };
                img.src = initialData;
            }
        }
    }, [isOpen, activeTab, initialType, initialData]);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        let x = 0, y = 0;
        if ('touches' in e) {
            if (e.touches.length === 0) return;
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 2.5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.beginPath();
            ctx.moveTo(x, y);
            setIsDrawing(true);
        }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        let x = 0, y = 0;
        if ('touches' in e) {
            if (e.touches.length === 0) return;
            e.preventDefault();
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    };

    const handleAccept = () => {
        if (activeTab === 'draw') {
            const canvas = canvasRef.current;
            if (canvas) {
                const dataUrl = canvas.toDataURL('image/png');
                onSave('draw', dataUrl);
            }
        } else if (activeTab === 'type') {
            if (!typedName.trim()) return;
            onSave('type', '', typedName);
        } else if (activeTab === 'upload') {
            if (!uploadData) return;
            onSave('upload', uploadData);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="sig-modal-backdrop" onClick={onClose}>
            <div className="sig-modal-container" onClick={e => e.stopPropagation()}>
                <div className="sig-modal-header">
                    <h3>Signature</h3>
                    <button type="button" className="sig-modal-close" onClick={onClose} aria-label="Close modal">&times;</button>
                </div>

                <div className="sig-modal-tabs">
                    <button type="button" className={`sig-modal-tab ${activeTab === 'draw' ? 'active' : ''}`} onClick={() => setActiveTab('draw')}>Draw</button>
                    <button type="button" className={`sig-modal-tab ${activeTab === 'type' ? 'active' : ''}`} onClick={() => setActiveTab('type')}>Type</button>
                    <button type="button" className={`sig-modal-tab ${activeTab === 'upload' ? 'active' : ''}`} onClick={() => setActiveTab('upload')}>Upload</button>
                </div>

                <div className="sig-modal-body">
                    {activeTab === 'draw' && (
                        <div className="sig-tab-draw">
                            <div className="sig-canvas-header">
                                <button type="button" className="sig-clear-btn" onClick={() => {
                                    const canvas = canvasRef.current;
                                    if (canvas) canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
                                }}>Clear</button>

                                <div className="sig-colors">
                                    {[
                                        { color: '#000000', name: 'black' },
                                        { color: '#0d47a1', name: 'blue' },
                                        { color: '#d32f2f', name: 'red' },
                                    ].map(item => (
                                        <button
                                            key={item.color}
                                            type="button"
                                            className={`sig-color-dot ${strokeColor === item.color ? 'active' : ''}`}
                                            style={{ backgroundColor: item.color }}
                                            onClick={() => setStrokeColor(item.color)}
                                            aria-label={`Select ${item.name} color`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="canvas-wrap">
                                <canvas
                                    ref={canvasRef}
                                    width={500}
                                    height={200}
                                    onMouseDown={startDrawing}
                                    onMouseMove={draw}
                                    onMouseUp={() => setIsDrawing(false)}
                                    onMouseLeave={() => setIsDrawing(false)}
                                    onTouchStart={startDrawing}
                                    onTouchMove={draw}
                                    onTouchEnd={() => setIsDrawing(false)}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'type' && (
                        <div className="sig-tab-type">
                            <input
                                type="text"
                                className="sig-type-input"
                                placeholder="Type your name"
                                value={typedName}
                                onChange={e => setTypedName(e.target.value)}
                                maxLength={40}
                            />
                            <div className="sig-type-preview">
                                <span className="sig-type-preview-text">{typedName || 'Your Signature'}</span>
                            </div>
                        </div>
                    )}

                    {activeTab === 'upload' && (
                        <div className="sig-tab-upload">
                            <div className="sig-upload-box">
                                <input
                                    type="file"
                                    id="sig-file-upload"
                                    accept="image/*"
                                    onChange={e => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = () => {
                                                if (typeof reader.result === 'string') {
                                                    setUploadData(reader.result);
                                                    setUploadName(file.name);
                                                }
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    className="sig-upload-hidden"
                                />
                                {!uploadData ? (
                                    <label htmlFor="sig-file-upload" className="sig-upload-label">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="17 8 12 3 7 8" />
                                            <line x1="12" y1="3" x2="12" y2="15" />
                                        </svg>
                                        <span>Choose an image file of your signature</span>
                                    </label>
                                ) : (
                                    <div className="sig-upload-preview">
                                        <img src={uploadData} alt="Uploaded Signature" />
                                        <div className="sig-upload-info">
                                            <span className="sig-upload-filename">{uploadName}</span>
                                            <button type="button" className="sig-upload-remove" onClick={() => { setUploadData(null); setUploadName(''); }}>Remove</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="sig-modal-disclaimer">
                    By signing this document with an electronic signature, I agree that such signature will be as valid as handwritten signatures to the extent allowed by local law
                </div>

                <div className="sig-modal-footer">
                    <button type="button" className="sig-modal-btn-cancel" onClick={onClose}>CANCEL</button>
                    <button
                        type="button"
                        className="sig-modal-btn-accept"
                        disabled={
                            (activeTab === 'type' && !typedName.trim()) ||
                            (activeTab === 'upload' && !uploadData)
                        }
                        onClick={handleAccept}
                    >
                        ACCEPT AND SIGN
                    </button>
                </div>
            </div>
        </div>
    );
}

const STEPS = ['About You', 'Background', 'Preferences', 'Declaration'];

export default function RegistrationForm() {
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const [step, setStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const [form, setForm] = useState<FormData>({
        firstName: '', lastName: '', email: '', phone: '',
        cityState: '', employer: '', jobTitle: '', linkedin: '',
        yearsExperience: '', education: '', experience: [], otherExperience: '',
        attendanceMode: '', heardAbout: '', signature: '',
        declResumeAttached: false, declInterviewRequired: false, declLabFee: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});

    // Custom states for resume and signature
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const resumeInputRef = useRef<HTMLInputElement | null>(null);
    const [isSigModalOpen, setIsSigModalOpen] = useState(false);
    const [signatureType, setSignatureType] = useState<'draw' | 'type' | 'upload' | null>(null);
    const [signatureData, setSignatureData] = useState<string | null>(null);
    const [signatureTypedName, setSignatureTypedName] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Dynamically load Google Fonts for the signature typed preview
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const fontId = 'google-fonts-caveat';
            if (!document.getElementById(fontId)) {
                const link = document.createElement('link');
                link.id = fontId;
                link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap';
                link.rel = 'stylesheet';
                document.head.appendChild(link);
            }
        }
    }, []);

    const handleText = useCallback(
        (field: keyof FormData) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                setForm(prev => ({ ...prev, [field]: e.target.value }));
                setErrors(prev => ({ ...prev, [field]: '' }));
            },
        []
    );

    const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, ''); // strip non-digits
        setForm(prev => ({ ...prev, phone: val }));
        setErrors(prev => ({ ...prev, phone: '' }));
    }, []);

    const handleCheck = useCallback((field: keyof FormData) => () => {
        setForm(prev => ({ ...prev, [field]: !prev[field] }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    }, []);

    const handleExperience = useCallback((id: string) => {
        setForm(prev => {
            const isSelected = prev.experience.includes(id);

            const updated = isSelected
                ? prev.experience.filter(x => x !== id)
                : [...prev.experience, id];

            return {
                ...prev,
                experience: updated,
                ...(id === 'other' && isSelected
                    ? { otherExperience: '' }
                    : {}),
            };
        });

        setErrors(prev => ({
            ...prev,
            experience: '',
            otherExperience: '',
        }));
    }, []);

    const clearResumeFile = useCallback(() => {
        setResumeFile(null);
        if (resumeInputRef.current) {
            resumeInputRef.current.value = '';
        }
    }, []);

    const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const resumeError = getResumeValidationError(file);
        if (resumeError) {
            setErrors(prev => ({ ...prev, resume: resumeError }));
            setResumeFile(null);
            e.target.value = '';
            return;
        }

        setResumeFile(file);
        setErrors(prev => ({ ...prev, resume: '' }));
    };

    const handleSaveSignature = (type: 'draw' | 'type' | 'upload', data: string, typedName?: string) => {
        setSignatureType(type);
        if (type === 'draw' || type === 'upload') {
            setSignatureData(data);
            setSignatureTypedName('');
        } else {
            setSignatureData(null);
            setSignatureTypedName(typedName || '');
        }
        setErrors(prev => ({ ...prev, signature: '' }));
    };

    const validateStep = (s: number): FormErrors => {
        const e: FormErrors = {};
        if (s === 0) {
            if (!form.firstName.trim()) e.firstName = 'Required';
            if (!form.lastName.trim()) e.lastName = 'Required';
            if (!form.email.trim()) e.email = 'Required';
            else if (!validateEmail(form.email)) e.email = 'Invalid email';

            if (!form.phone.trim()) e.phone = 'Required';
            else if (form.phone.length < 10) e.phone = 'Must be at least 10 digits';

            if (!form.cityState.trim()) e.cityState = 'Required';
            if (!form.employer.trim()) e.employer = 'Required';
            if (!form.jobTitle.trim()) e.jobTitle = 'Required';
            if (!form.yearsExperience) e.yearsExperience = 'Required';
            if (form.linkedin.trim() && !validateLinkedInProfileUrl(form.linkedin)) {
                e.linkedin = 'Enter a valid LinkedIn profile URL.';
            }
        }
        if (s === 1) {
            if (!form.education) {
                e.education = 'Select one';
            }

            if (form.experience.length === 0) {
                e.experience = 'Select at least one';
            }

            if (
                form.experience.includes('other') &&
                !form.otherExperience.trim()
            ) {
                e.otherExperience = 'Please specify your experience';
            }
        }
        if (s === 2) {
            if (!form.attendanceMode) e.attendanceMode = 'Select one';
            if (!form.heardAbout.trim()) e.heardAbout = 'Required';
        }
        if (s === 3) {
            if (!form.declResumeAttached) e.declResumeAttached = 'Required';
            if (!form.declInterviewRequired) e.declInterviewRequired = 'Required';
            if (!form.declLabFee) e.declLabFee = 'Required';
            if (!resumeFile) e.resume = 'Resume file is required';
            else {
                const resumeError = getResumeValidationError(resumeFile);
                if (resumeError) e.resume = resumeError;
            }

            if (!signatureType) {
                e.signature = 'Signature is required';
            } else if (signatureType === 'type' && !signatureTypedName.trim()) {
                e.signature = 'Signature is required';
            } else if (signatureType === 'draw' && !signatureData) {
                e.signature = 'Signature is required';
            } else if (signatureType === 'upload' && !signatureData) {
                e.signature = 'Signature is required';
            }
        }
        return e;
    };

    const next = () => {
        const e = validateStep(step);
        if (Object.keys(e).length > 0) { setErrors(e); return; }
        setErrors({});
        setStep(s => s + 1);
    };

    const back = () => { setErrors({}); setStep(s => s - 1); };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const stepErrors = STEPS.map((_, index) => validateStep(index));
        const errs: FormErrors = Object.assign({}, ...stepErrors);
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            const firstInvalidStep = stepErrors.findIndex(stepError => Object.keys(stepError).length > 0);
            if (firstInvalidStep >= 0) setStep(firstInvalidStep);
            return;
        }

        setErrors({});
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const fd = new FormData();
            fd.append('first-name', form.firstName);
            fd.append('last-name', form.lastName);
            fd.append('your-email', form.email);
            fd.append('your-phone', form.phone);
            fd.append('city-state', form.cityState);
            fd.append('employer', form.employer);
            fd.append('job-title', form.jobTitle);
            fd.append('linkedin', form.linkedin);
            fd.append('years-experience', form.yearsExperience);
            fd.append('education', form.education);

            const formattedExp = form.experience
                .map(id => {
                    const opt = EXPERIENCE_OPTIONS.find(x => x.id === id);
                    return opt ? opt.label : id;
                })
                .join(', ') + (form.otherExperience ? ` (Other: ${form.otherExperience})` : '');
            fd.append('experience', formattedExp);
            fd.append('other-experience', form.otherExperience);
            fd.append('attendance-mode', form.attendanceMode);
            fd.append('heard-about', form.heardAbout);

            const signatureText = signatureType === 'type' ? signatureTypedName : `[${signatureType} signature]`;
            fd.append('signature', signatureText);
            fd.append('decl-resume', form.declResumeAttached ? 'Yes' : 'No');
            fd.append('decl-interview', form.declInterviewRequired ? 'Yes' : 'No');
            fd.append('decl-lab-fee', form.declLabFee ? 'Yes' : 'No');

            const emailBody = `
First Name: ${form.firstName}
Last Name: ${form.lastName}
Email: ${form.email}
Phone: ${form.phone}
City / State: ${form.cityState}
Years of Experience: ${form.yearsExperience}
Employer: ${form.employer}
Job Title: ${form.jobTitle}
LinkedIn: ${form.linkedin || 'N/A'}

Education: ${form.education}
Experience: ${formattedExp}
Attendance Mode: ${form.attendanceMode}
Heard About: ${form.heardAbout || 'N/A'}

Signature Type: ${signatureType}
Signature Value: ${signatureText}
Date Signed: ${today}
            `.trim();
            fd.append('your-message', emailBody);
            fd.append('your-subject', 'Agentic AI Architect Program Registration');
            fd.append('your-page', 'Agentic AI Architect Program Page');

            if (resumeFile) {
                fd.append('resume', resumeFile);
            }

            if (signatureType && signatureData) {
                const sigFile = dataURLtoFile(signatureData, 'signature.png');
                fd.append('signature-file', sigFile);
            } else if (signatureType === 'type' && signatureTypedName) {
                const typedSigData = generateTypedSignatureImage(signatureTypedName);
                if (typedSigData) {
                    const sigFile = dataURLtoFile(typedSigData, 'signature.png');
                    fd.append('signature-file', sigFile);
                }
            }

            const res = await fetch('/api/cf7/233209', {
                method: 'POST',
                body: fd,
            });

            const data = await res.json() as {
                status?: string;
                message?: string;
                invalid_fields?: Array<{ field?: string; message?: string }>;
            };

            if (data.status === 'mail_sent') {
                setSubmitted(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                if (data.status === 'validation_failed' && Array.isArray(data.invalid_fields)) {
                    const fieldErrors: FormErrors = {};
                    let firstInvalidStep: number | null = null;

                    for (const invalidField of data.invalid_fields) {
                        if (!invalidField.field) continue;

                        const formField = CF7_FIELD_ERROR_MAP[invalidField.field];
                        if (!formField) continue;

                        fieldErrors[formField] = invalidField.message || 'Please check this field.';

                        const invalidStep = CF7_FIELD_STEP_MAP[invalidField.field];
                        if (invalidStep !== undefined && (firstInvalidStep === null || invalidStep < firstInvalidStep)) {
                            firstInvalidStep = invalidStep;
                        }
                    }

                    if (Object.keys(fieldErrors).length > 0) {
                        setErrors(prev => ({ ...prev, ...fieldErrors }));
                        if (firstInvalidStep !== null) setStep(firstInvalidStep);
                    }
                }
                setSubmitError(data.message || 'Submission failed. Please check your fields and try again.');
            }
        } catch (error) {
            console.error(error);
            setSubmitError('An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="rf-page">
                <div className="rf-shell rf-success">
                    <div className="rf-success-icon">✓</div>
                    <h2>You&rsquo;re registered!</h2>
                    <p>
                        Thank you, <strong>{form.firstName} {form.lastName}</strong>. We&rsquo;ve received
                        your registration. The Program Director will review your resume and reach
                        out to schedule your interview.
                    </p>
                    <div className="rf-success-detail">
                        <span className="rf-success-item">
                            <Image
                                src="/assets/icons/send-mail.svg"
                                alt="Email"
                                width={18}
                                height={18}
                            />
                            <span>{form.email}</span>
                        </span>
                        <span className="rf-success-item">
                            <Image
                                src="/assets/icons/calendar.svg"
                                alt="Deadline"
                                width={18}
                                height={18}
                            />
                            <span>Registration deadline: July 17, 2026, 9:00 PM PST</span>
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    const progress = ((step) / STEPS.length) * 100;

    return (
        <div className="rf-page">
            {/* Top bar */}
            <div className="rf-topbar">
                {/* <div className="rf-topbar-brand">
                    <span className="rf-topbar-logo">Ⓐ</span>
                    <span>Athenatec <span className="rf-topbar-sep">·</span> LLM at Scale.AI</span>
                </div> */}
                <div className="rf-topbar-deadline">
                    <span className="rf-deadline-dot" />
                    Deadline for registration: July 16, 2026, at 9:00 PM PST
                </div>
            </div>

            <div className="rf-shell">
                {/* Hero */}
                <div className="rf-hero">
                    <div className="rf-hero-left">
                        <div className="rf-eyebrow">2026 Cohort · Now Enrolling</div>
                        <h1>Agentic AI Architect Training Program</h1>
                        <p className="rf-hero-hd">Orientation: July 18, 11 AM - 1 PM on Saturday</p>
                        <p className="rf-hero-address">Address: <a href="https://maps.google.com/?q=943+Corporate+Way+Fremont+CA" target="_blank" rel="noopener noreferrer">943 Corporate Way, Fremont, CA 94539</a></p>
                        <p className="rf-hero-orientation">The training start week will be announced during the orientation session on July 18.</p>
                        <p className="rf-hero-sub">15 weeks · Fremont, CA (in-person weekends) · Remote permitted</p>

                        {/* <p className="rf-hero-speakers">
                            Speakers: <strong>Jothi Periasamy</strong> and <strong>Kumar Nallusamy</strong>
                        </p> */}
                    </div>
                    <div className="rf-chips">
                        <div className="rf-chip">
                            <img
                                src="/assets/icons/calender.svg"
                                alt="Calendar"
                                className="rf-chip-icon"
                            />
                            <span className="rf-chip-label">July 18</span>
                            <span className="rf-chip-label"> Saturday</span>
                            <span className="rf-chip-sub">11 AM-1 PM</span>
                            <span className="rf-chip-sub">orientation</span>


                            
                        </div>

                        <div className="rf-chip">
                            <img
                                src="/assets/icons/users.svg"
                                alt="Participants"
                                className="rf-chip-icon"
                            />
                            <span className="rf-chip-label">Max 50</span>
                            <span className="rf-chip-sub">Seats</span>
                        </div>

                        <div className="rf-chip">
                            <img
                                src="/assets/icons/support.svg"
                                alt="Support"
                                className="rf-chip-icon"
                            />
                            <span className="rf-chip-label">24hr SLA</span>
                            <span className="rf-chip-sub">Onsite Support</span>
                        </div>
                        <div className="rf-chip rf-chip-fee">
                            <span className="rf-chip-fee-old">$4,500</span>
                            <span className="rf-chip-fee-new">$2,999</span>
                            <span className="rf-chip-fee-note">intro offer · lab incl.</span>
                        </div>
                        <div className="rf-chip">
                            <img
                                src="/assets/icons/users.svg"
                                alt="Participants"
                                className="rf-chip-icon"
                            />
                            <span className="rf-chip-label">Speakers</span>
                            <span className="rf-chip-sub"> Jothi Periasamy</span>
                            {/* <span className="rf-chip-sub"> Kumar Nallusamy</span> */}
                        </div>
                    </div>
                </div>

                <div className="rf-deadline-note">
                    <strong>Deadline for registration:</strong> July 17, 2026, at 9:00 PM PST.
                    <span>Please note: Registration may close earlier if the maximum number of participants is reached before the deadline for the orientation session.</span>
                </div>

                {/* Stepper */}
                <div className="rf-stepper">
                    {STEPS.map((label, i) => (
                        <div key={i} className={`rf-step ${i < step ? 'done' : ''} ${i === step ? 'active' : ''}`}>
                            <div className="rf-step-circle">
                                {i < step ? '✓' : i + 1}
                            </div>
                            <span className="rf-step-label">{label}</span>
                            {i < STEPS.length - 1 && <div className="rf-step-line" />}
                        </div>
                    ))}
                </div>
                <div className="rf-progress-bar"><div className="rf-progress-fill" style={{ width: `${progress}%` }} /></div>

                {/* Form */}
                <form className="rf-form" onSubmit={handleSubmit} noValidate>

                    {/* ── Step 0: About You ── */}
                    {step === 0 && (
                        <div className="rf-panel">
                            <h3 className="rf-panel-title">Tell us about yourself</h3>
                            <div className="rf-row-2">
                                <Field label="First Name" required error={errors.firstName}>
                                    <input className={cls('rf-input', errors.firstName)} type="text" placeholder="First name" value={form.firstName} onChange={handleText('firstName')} autoComplete="given-name" />
                                </Field>
                                <Field label="Last Name" required error={errors.lastName}>
                                    <input className={cls('rf-input', errors.lastName)} type="text" placeholder="Last name" value={form.lastName} onChange={handleText('lastName')} autoComplete="family-name" />
                                </Field>
                            </div>
                            <div className="rf-row-2">
                                <Field label="Email Address" required error={errors.email}>
                                    <input className={cls('rf-input', errors.email)} type="email" placeholder="Your email" value={form.email} onChange={handleText('email')} autoComplete="email" />
                                </Field>
                                <Field label="Phone Number" required error={errors.phone}>
                                    <input className={cls('rf-input', errors.phone)} type="tel" placeholder="Phone number" value={form.phone} onChange={handlePhoneChange} autoComplete="tel" />
                                </Field>
                            </div>
                            <div className="rf-row-2">
                                <Field label="City / State" required error={errors.cityState}>
                                    <input className={cls('rf-input', errors.cityState)} type="text" placeholder="e.g. Fremont, CA" value={form.cityState} onChange={handleText('cityState')} />
                                </Field>
                                <Field label="Years of Experience" required error={errors.yearsExperience}>
                                    <select className={cls('rf-select', errors.yearsExperience)} value={form.yearsExperience} onChange={handleText('yearsExperience')}>
                                        <option value="">Select…</option>
                                        {YEARS_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </Field>
                            </div>
                            <div className="rf-row-2">
                                <Field label="Current Employer / Organization" required error={errors.employer}>
                                    <input className={cls('rf-input', errors.employer)} type="text" placeholder="Company name" value={form.employer} onChange={handleText('employer')} />
                                </Field>
                                <Field label="Job Title / Role" required error={errors.jobTitle}>
                                    <input className={cls('rf-input', errors.jobTitle)} type="text" placeholder="e.g. Senior Engineer" value={form.jobTitle} onChange={handleText('jobTitle')} />
                                </Field>
                            </div>
                            <Field label="LinkedIn Profile" optional error={errors.linkedin}>
                                <input className={cls('rf-input', errors.linkedin)} type="url" inputMode="url" autoComplete="url" pattern="https?://([a-z0-9-]+\.)*linkedin\.com/in/.+" placeholder="https://www.linkedin.com/in/your-name" value={form.linkedin} onChange={handleText('linkedin')} />
                            </Field>
                        </div>
                    )}

                    {/* ── Step 1: Background ── */}
                    {step === 1 && (
                        <div className="rf-panel">
                            <h3 className="rf-panel-title">Your background</h3>
                            <Field label="Highest level of education" required error={errors.education}>
                                <div className="rf-pill-group">
                                    {EDUCATION_OPTIONS.map(opt => (
                                        <label key={opt.value} className={`rf-pill${form.education === opt.value ? ' selected' : ''}`}>
                                            <input type="radio" name="education" value={opt.value} checked={form.education === opt.value} onChange={handleText('education')} />
                                            {opt.label}
                                        </label>
                                    ))}
                                </div>
                            </Field>
                            {/* <Field label="Relevant experience — select all that apply" required error={errors.experience}>
                    <div className="rf-pill-group rf-pill-wrap">
                    {EXPERIENCE_OPTIONS.map(opt => (
                        <label key={opt.id} className={`rf-pill${form.experience.includes(opt.id) ? ' selected' : ''}`}>
                        <input type="checkbox" checked={form.experience.includes(opt.id)} onChange={() => handleExperience(opt.id)} />
                        {opt.label}
                        </label>
                    ))}
                    </div>
                </Field> */}
                            <Field
                                label="Relevant experience — select all that apply"
                                required
                                error={errors.experience}
                            >
                                <div className="rf-pill-group rf-pill-wrap">
                                    {EXPERIENCE_OPTIONS.map(opt => (
                                        <label
                                            key={opt.id}
                                            className={`rf-pill ${form.experience.includes(opt.id) ? 'selected' : ''
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={form.experience.includes(opt.id)}
                                                onChange={() => handleExperience(opt.id)}
                                            />
                                            {opt.label}
                                        </label>
                                    ))}
                                </div>

                                {form.experience.includes('other') && (
                                    <div className="rf-other-field">
                                        <input
                                            className={cls('rf-input', errors.otherExperience)}
                                            type="text"
                                            placeholder="Please specify your experience"
                                            value={form.otherExperience}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    otherExperience: e.target.value,
                                                }))
                                            }
                                        />

                                        {errors.otherExperience && (
                                            <span className="rf-err">
                                                {errors.otherExperience}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                    )}

                    {/* ── Step 2: Preferences ── */}
                    {step === 2 && (
                        <div className="rf-panel">
                            <h3 className="rf-panel-title">Program preferences</h3>
                            <Field label="Preferred attendance mode" required error={errors.attendanceMode}>
                                <div className="rf-attend-group">
                                    <label className={`rf-attend-card${form.attendanceMode === 'in-person' ? ' selected' : ''}`}>
                                        <input type="radio" name="attendanceMode" value="in-person" checked={form.attendanceMode === 'in-person'} onChange={handleText('attendanceMode')} />
                                        <span className="rf-attend-icon">
                                            <Image
                                                src="/assets/icons/arrow.svg"
                                                alt="In Person"
                                                width={32}
                                                height={32}
                                            />

                                        </span>
                                        <span className="rf-attend-title">In-Person</span>
                                        <span className="rf-attend-sub">Fremont, CA</span>
                                    </label>
                                    <label className={`rf-attend-card${form.attendanceMode === 'remote' ? ' selected' : ''}`}>
                                        <input type="radio" name="attendanceMode" value="remote" checked={form.attendanceMode === 'remote'} onChange={handleText('attendanceMode')} />
                                        <span className="rf-attend-icon">
                                            <Image
                                                src="/assets/icons/remote-work.svg"
                                                alt="Remote"
                                                width={32}
                                                height={32}
                                            />
                                        </span>
                                        <span className="rf-attend-title">Remote</span>
                                        <span className="rf-attend-sub">Case by case</span>
                                    </label>
                                </div>
                            </Field>
                            <Field label="How did you hear about this program?" required error={errors.heardAbout}>
                                <input className={cls('rf-input', errors.heardAbout)} type="text" placeholder="LinkedIn, colleague, event…" value={form.heardAbout} onChange={handleText('heardAbout')} />
                            </Field>
                        </div>
                    )}

                    {/* ── Step 3: Declaration ── */}
                    {step === 3 && (
                        <div className="rf-panel">
                            <h3 className="rf-panel-title">Review &amp; Submit</h3>

                            {/* Fee card */}
                            <div className="rf-fee-card">
                                <div className="rf-fee-left">
                                    <span className="rf-fee-tag">Introductory Offer</span>
                                    <div className="rf-fee-prices">
                                        <span className="rf-fee-old">$4,500</span>
                                        <span className="rf-fee-new">$2,999</span>
                                    </div>
                                    <span className="rf-fee-note">Includes $500 lab cost · Onsite team support included</span>
                                </div>
                            </div>

                            {/* Resume Upload Field */}
                            <Field label="Upload Resume" required error={errors.resume}>
                                <div className={`rf-upload-field ${resumeFile ? 'has-file' : ''} ${errors.resume ? 'has-error' : ''}`}>
                                    <input
                                        type="file"
                                        id="resume-upload"
                                        ref={resumeInputRef}
                                        className="rf-file-hidden"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleResumeChange}
                                    />
                                    {!resumeFile ? (
                                        <label htmlFor="resume-upload" className="rf-upload-btn">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '6px' }}>
                                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                                <polyline points="17 8 12 3 7 8" />
                                                <line x1="12" y1="3" x2="12" y2="15" />
                                            </svg>
                                            Choose Resume File
                                        </label>
                                    ) : (
                                        <div className="rf-file-preview">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a3264" strokeWidth="2">
                                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                            </svg>
                                            <span className="rf-file-name">{resumeFile.name}</span>
                                            <span className="rf-file-size">({(resumeFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                                            <button type="button" className="rf-file-remove" onClick={clearResumeFile} aria-label="Remove resume">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <line x1="18" y1="6" x2="6" y2="18" />
                                                    <line x1="6" y1="6" x2="18" y2="18" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                    <span className="rf-upload-note">PDF, DOC, DOCX up to 5MB</span>
                                </div>
                            </Field>

                            {/* Declarations */}
                            <div className="rf-decl-list" style={{ marginTop: '24px' }}>
                                {[
                                    { field: 'declResumeAttached' as keyof FormData, text: 'I have attached my resume for evaluation with this registration.' },
                                    { field: 'declInterviewRequired' as keyof FormData, text: 'I understand admission requires a 30-minute interview with the Program Director.' },
                                    {
                                        field: 'declLabFee' as keyof FormData,
                                        text: 'I acknowledge the introductory fee of $2,999 (incl. $500 lab cost)',
                                        comment: 'note: After the July 18th Orientation (11 AM to 1 PM), program fee can be paid.'
                                    },
                                ].map(({ field, text, comment }) => (
                                    <div key={field}>
                                        <label className={`rf-decl${form[field] ? ' checked' : ''}`} onClick={handleCheck(field)}>
                                            <input type="checkbox" checked={!!form[field]} onChange={handleCheck(field)} onClick={e => e.stopPropagation()} />
                                            <div>
                                                <span>{text}</span>
                                                {comment && <div className="rf-decl-comment">{comment}</div>}
                                            </div>
                                        </label>
                                        {errors[field] && <span className="rf-err">Please check this box to continue</span>}
                                    </div>
                                ))}
                            </div>

                            {/* Signature Box */}
                            <div className="rf-sig-row" style={{ marginTop: '24px' }}>
                                <div className="rf-sig-field">
                                    <label className="rf-sig-label">Signature *</label>
                                    <div className={`rf-sig-trigger-box ${errors.signature ? 'rf-has-err' : ''}`} onClick={() => setIsSigModalOpen(true)}>
                                        {signatureType === 'draw' && signatureData && (
                                            <img src={signatureData} alt="Drawn Signature" className="rf-sig-preview-img" />
                                        )}
                                        {signatureType === 'type' && signatureTypedName && (
                                            <span className="rf-sig-preview-text-cursive">{signatureTypedName}</span>
                                        )}
                                        {signatureType === 'upload' && signatureData && (
                                            <img src={signatureData} alt="Uploaded Signature" className="rf-sig-preview-img" />
                                        )}
                                        {!signatureType && (
                                            <span className="rf-sig-placeholder">Click to Sign (Draw, Type or Upload)</span>
                                        )}
                                    </div>
                                    {errors.signature && <span className="rf-err">{errors.signature}</span>}
                                </div>
                                <div className="rf-sig-date">
                                    <span className="rf-sig-date-label">Date</span>
                                    <span className="rf-sig-date-val">{today}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {submitError && (
                        <div className="rf-submit-error" style={{ color: '#dc2626', fontSize: '13px', marginTop: '16px', fontWeight: 600 }}>
                            {submitError}
                        </div>
                    )}

                    {/* Nav buttons */}
                    <div className="rf-nav">
                        {step > 0 && (
                            <button type="button" className="rf-btn-back" onClick={back} disabled={isSubmitting}>← Back</button>
                        )}
                        <div className="rf-nav-right">
                            {step < STEPS.length - 1 ? (
                                <button type="button" className="rf-btn-next" onClick={next}>
                                    Continue →
                                </button>
                            ) : (
                                <button type="submit" className="rf-btn-submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                                </button>
                            )}
                        </div>
                    </div>
                </form>

                {/* Signature Modal */}
                {isSigModalOpen && (
                    <SignatureModal
                        isOpen={isSigModalOpen}
                        onClose={() => setIsSigModalOpen(false)}
                        onSave={handleSaveSignature}
                        initialType={signatureType}
                        initialData={signatureData}
                        initialTypedName={signatureTypedName}
                    />
                )}
            </div>
        </div>
    );
}

// ── Small helpers ──
function cls(base: string, err?: string) {
    return err ? `${base} rf-has-err` : base;
}

function Field({ label, required, optional, error, children }: {
    label: string; required?: boolean; optional?: boolean; error?: string; children: React.ReactNode;
}) {
    return (
        <div className="rf-field">
            <label className="rf-label">
                {label}
                {required && <span className="rf-star">*</span>}
                {optional && <span className="rf-opt">optional</span>}
            </label>
            {children}
            {error && <span className="rf-err">{error}</span>}
        </div>
    );
}
