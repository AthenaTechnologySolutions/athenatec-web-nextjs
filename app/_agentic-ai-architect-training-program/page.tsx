// 'use client';

// import React, { useState, useCallback, useRef, useEffect } from 'react';
// import './agentic-ai.scss';
// import Image from "next/image";

// interface FormData {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     cityState: string;
//     employer: string;
//     jobTitle: string;
//     linkedin: string;
//     yearsExperience: string;
//     education: string;
//     experience: string[];
//     otherExperience: string;
//     attendanceMode: string;
//     heardAbout: string;
// }

// interface FormErrors { [key: string]: string; }

// const EXPERIENCE_OPTIONS = [
//     { id: 'software-data-eng', label: 'Software / Data Eng.' },
//     { id: 'data-science-ml', label: 'Data Science / ML' },
//     { id: 'cloud-devops', label: 'Cloud / DevOps' },
//     { id: 'ai-llm-agentic', label: 'AI / LLM / Agentic AI' },
//     { id: 'product-program-mgmt', label: 'Product / Program Mgmt' },
//     { id: 'other', label: 'Other' },
// ];

// const EDUCATION_OPTIONS = [
//     { value: 'bachelors', label: "Bachelor's" },
//     { value: 'masters', label: "Master's" },
//     { value: 'phd', label: 'Ph.D.' },
//     { value: 'other', label: 'Other' },
// ];

// const YEARS_OPTIONS = ['0–2 years', '3–5 years', '6–10 years', '10+ years'];

// const RESUME_MAX_SIZE_BYTES = 5 * 1024 * 1024;
// const RESUME_ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];
// const CF7_FIELD_ERROR_MAP: Record<string, string> = {
//     linkedin: 'linkedin',
//     resume: 'resume',
// };
// const CF7_FIELD_STEP_MAP: Record<string, number> = {
//     linkedin: 0,
//     resume: 2,
// };

// function validateEmail(email: string) {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// }

// function getFileExtension(fileName: string) {
//     const dotIndex = fileName.lastIndexOf('.');
//     return dotIndex >= 0 ? fileName.slice(dotIndex).toLowerCase() : '';
// }

// function validateLinkedInProfileUrl(profileUrl: string) {
//     const trimmed = profileUrl.trim();
//     if (!trimmed) return false;

//     try {
//         const url = new URL(trimmed);
//         const hostname = url.hostname.toLowerCase();
//         const pathSegments = url.pathname.split('/').filter(Boolean);

//         return (
//             (url.protocol === 'https:' || url.protocol === 'http:') &&
//             (hostname === 'linkedin.com' || hostname.endsWith('.linkedin.com')) &&
//             pathSegments[0]?.toLowerCase() === 'in' &&
//             Boolean(pathSegments[1])
//         );
//     } catch {
//         return false;
//     }
// }

// function getResumeValidationError(file: File) {
//     const extension = getFileExtension(file.name);

//     if (!RESUME_ALLOWED_EXTENSIONS.includes(extension)) {
//         return 'Invalid format. Allowed formats: PDF, DOC, DOCX.';
//     }

//     if (file.size <= 0) {
//         return 'Resume file is empty.';
//     }

//     if (file.size > RESUME_MAX_SIZE_BYTES) {
//         return 'File size exceeds the 5MB limit.';
//     }

//     return '';
// }

// const STEPS = ['About You', 'Background', 'Preferences'];

// export default function RegistrationForm() {
//     const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
//     const [step, setStep] = useState(0);
//     const [submitted, setSubmitted] = useState(false);

//     const [form, setForm] = useState<FormData>({
//         firstName: '', lastName: '', email: '', phone: '',
//         cityState: '', employer: '', jobTitle: '', linkedin: '',
//         yearsExperience: '', education: '', experience: [], otherExperience: '',
//         attendanceMode: '', heardAbout: '',
//     });

//     const [errors, setErrors] = useState<FormErrors>({});
//     const [resumeFile, setResumeFile] = useState<File | null>(null);
//     const resumeInputRef = useRef<HTMLInputElement | null>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [submitError, setSubmitError] = useState<string | null>(null);

//     // Always clear errors when entering a new step
//     useEffect(() => {
//         setErrors({});
//     }, [step]);

//     const handleText = useCallback(
//         (field: keyof FormData) =>
//             (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//                 setForm(prev => ({ ...prev, [field]: e.target.value }));
//                 setErrors(prev => ({ ...prev, [field]: '' }));
//             },
//         []
//     );

//     const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//         const val = e.target.value.replace(/\D/g, '');
//         setForm(prev => ({ ...prev, phone: val }));
//         setErrors(prev => ({ ...prev, phone: '' }));
//     }, []);

//     const handleExperience = useCallback((id: string) => {
//         setForm(prev => {
//             const isSelected = prev.experience.includes(id);

//             const updated = isSelected
//                 ? prev.experience.filter(x => x !== id)
//                 : [...prev.experience, id];

//             return {
//                 ...prev,
//                 experience: updated,
//                 ...(id === 'other' && isSelected
//                     ? { otherExperience: '' }
//                     : {}),
//             };
//         });

//         setErrors(prev => ({
//             ...prev,
//             experience: '',
//             otherExperience: '',
//         }));
//     }, []);

//     const clearResumeFile = useCallback(() => {
//         setResumeFile(null);
//         if (resumeInputRef.current) {
//             resumeInputRef.current.value = '';
//         }
//     }, []);

//     const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         const resumeError = getResumeValidationError(file);
//         if (resumeError) {
//             setErrors(prev => ({ ...prev, resume: resumeError }));
//             setResumeFile(null);
//             e.target.value = '';
//             return;
//         }

//         setResumeFile(file);
//         setErrors(prev => ({ ...prev, resume: '' }));
//     };

//     const validateStep = (s: number): FormErrors => {
//         const e: FormErrors = {};
//         if (s === 0) {
//             if (!form.firstName.trim()) e.firstName = 'Required';
//             if (!form.lastName.trim()) e.lastName = 'Required';
//             if (!form.email.trim()) e.email = 'Required';
//             else if (!validateEmail(form.email)) e.email = 'Invalid email';

//             if (!form.phone.trim()) e.phone = 'Required';
//             else if (form.phone.length < 10) e.phone = 'Must be at least 10 digits';

//             if (!form.cityState.trim()) e.cityState = 'Required';
//             if (!form.employer.trim()) e.employer = 'Required';
//             if (!form.jobTitle.trim()) e.jobTitle = 'Required';
//             if (!form.yearsExperience) e.yearsExperience = 'Required';
//             if (form.linkedin.trim() && !validateLinkedInProfileUrl(form.linkedin)) {
//                 e.linkedin = 'Enter a valid LinkedIn profile URL.';
//             }
//         }
//         if (s === 1) {
//             if (!form.education) {
//                 e.education = 'Select one';
//             }

//             if (form.experience.length === 0) {
//                 e.experience = 'Select at least one';
//             }

//             if (
//                 form.experience.includes('other') &&
//                 !form.otherExperience.trim()
//             ) {
//                 e.otherExperience = 'Please specify your experience';
//             }
//         }
//         if (s === 2) {
//             if (!form.attendanceMode || form.attendanceMode === 'Select one') e.attendanceMode = 'Select one';
//             if (!form.heardAbout.trim()) e.heardAbout = 'Required';
//             if (resumeFile) {
//                 const resumeError = getResumeValidationError(resumeFile);
//                 if (resumeError) e.resume = resumeError;
//             }
//         }
//         return e;
//     };

//     const next = () => {
//         const e = validateStep(step);
//         if (Object.keys(e).length > 0) { setErrors(e); return; }
//         setErrors({});
//         setStep(s => s + 1);
//     };

//     const back = () => {
//         setErrors({});
//         setStep(s => s - 1);
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (step < STEPS.length - 1) {
//             next();
//             return;
//         }

//         const stepErrors = STEPS.map((_, index) => validateStep(index));
//         const errs: FormErrors = Object.assign({}, ...stepErrors);
//         if (Object.keys(errs).length > 0) {
//             setErrors(errs);
//             const firstInvalidStep = stepErrors.findIndex(stepError => Object.keys(stepError).length > 0);
//             if (firstInvalidStep >= 0) setStep(firstInvalidStep);
//             return;
//         }

//         setErrors({});
//         setIsSubmitting(true);
//         setSubmitError(null);

//         try {
//             const fd = new FormData();
//             fd.append('first-name', form.firstName);
//             fd.append('last-name', form.lastName);
//             fd.append('your-email', form.email);
//             fd.append('your-phone', form.phone);
//             fd.append('city-state', form.cityState);
//             fd.append('employer', form.employer);
//             fd.append('job-title', form.jobTitle);
//             fd.append('linkedin', form.linkedin);
//             fd.append('years-experience', form.yearsExperience);
//             fd.append('education', form.education);

//             const formattedExp = form.experience
//                 .map(id => {
//                     const opt = EXPERIENCE_OPTIONS.find(x => x.id === id);
//                     return opt ? opt.label : id;
//                 })
//                 .join(', ') + (form.otherExperience ? ` (Other: ${form.otherExperience})` : '');
//             fd.append('experience', formattedExp);
//             fd.append('other-experience', form.otherExperience);
//             fd.append('attendance-mode', form.attendanceMode);
//             fd.append('heard-about', form.heardAbout);

//             const emailBody = `
// First Name: ${form.firstName}
// Last Name: ${form.lastName}
// Email: ${form.email}
// Phone: ${form.phone}
// City / State: ${form.cityState}
// Years of Experience: ${form.yearsExperience}
// Employer: ${form.employer}
// Job Title: ${form.jobTitle}
// LinkedIn: ${form.linkedin || 'N/A'}

// Education: ${form.education}
// Experience: ${formattedExp}
// Attendance Mode: ${form.attendanceMode}
// Heard About: ${form.heardAbout || 'N/A'}
// Resume Attached: ${resumeFile ? 'Yes' : 'No'}
// Date: ${today}
//             `.trim();
//             fd.append('your-message', emailBody);
//             fd.append('your-subject', 'Agentic AI Architect Program Registration');
//             fd.append('your-page', 'Agentic AI Architect Program Page');

//             if (resumeFile) {
//                 fd.append('resume', resumeFile);
//             }

//             const res = await fetch('/api/cf7/233209', {
//                 method: 'POST',
//                 body: fd,
//             });

//             const data = await res.json() as {
//                 status?: string;
//                 message?: string;
//                 invalid_fields?: Array<{ field?: string; message?: string }>;
//             };

//             if (data.status === 'mail_sent') {
//                 setSubmitted(true);
//                 window.scrollTo({ top: 0, behavior: 'smooth' });
//             } else {
//                 if (data.status === 'validation_failed' && Array.isArray(data.invalid_fields)) {
//                     const fieldErrors: FormErrors = {};
//                     let firstInvalidStep: number | null = null;

//                     for (const invalidField of data.invalid_fields) {
//                         if (!invalidField.field) continue;

//                         const formField = CF7_FIELD_ERROR_MAP[invalidField.field];
//                         if (!formField) continue;

//                         fieldErrors[formField] = invalidField.message || 'Please check this field.';

//                         const invalidStep = CF7_FIELD_STEP_MAP[invalidField.field];
//                         if (invalidStep !== undefined && (firstInvalidStep === null || invalidStep < firstInvalidStep)) {
//                             firstInvalidStep = invalidStep;
//                         }
//                     }

//                     if (Object.keys(fieldErrors).length > 0) {
//                         setErrors(prev => ({ ...prev, ...fieldErrors }));
//                         if (firstInvalidStep !== null) setStep(firstInvalidStep);
//                     }
//                 }
//                 setSubmitError(data.message || 'Submission failed. Please check your fields and try again.');
//             }
//         } catch (error) {
//             console.error(error);
//             setSubmitError('An unexpected error occurred. Please try again.');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     if (submitted) {
//         return (
//             <div className="rf-page">
//                 <div className="rf-shell rf-success" style={{ marginTop: '24px' }}>
//                     <div className="rf-success-icon">✓</div>
//                     <h2>You&rsquo;re registered!</h2>
//                     <p>
//                         Thank you, <strong>{form.firstName} {form.lastName}</strong>. We&rsquo;ve received
//                         your orientation registration.
//                     </p>
//                     <div className="rf-success-detail">
//                         <span className="rf-success-item">
//                             <Image
//                                 src="/assets/icons/send-mail.svg"
//                                 alt="Email"
//                                 width={18}
//                                 height={18}
//                             />
//                             <span>{form.email}</span>
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     const progress = ((step + 1) / STEPS.length) * 100;

//     return (
//         <div className="rf-page">
//             <div className="rf-shell" style={{ paddingTop: '32px' }}>
//                 {/* Hero Header */}
//                 <div className="rf-hero" style={{ marginBottom: '20px', paddingBottom: '16px' }}>
//                     <div className="rf-hero-left">
//                         <div className="rf-eyebrow" style={{ marginBottom: '6px' }}>You&apos;re Invited</div>
//                         <h1 style={{ fontSize: '24px', lineHeight: '1.3', marginBottom: '12px' }}>
//                             You&apos;re Invited: Agentic AI Architect Training Program Orientation
//                         </h1>
//                         <p style={{ fontSize: '14.5px', color: '#334155', lineHeight: '1.5', marginBottom: '16px' }}>
//                             <strong>Dear Professionals, Students, and AI Enthusiasts,</strong><br />
//                             We are pleased to invite you to the Agentic AI Architect Training Program Orientation.
//                         </p>

//                         <div className="rf-event-details-card" style={{
//                             background: '#f8fafc',
//                             border: '1px solid #e2e8f0',
//                             borderRadius: '10px',
//                             padding: '14px 18px',
//                             marginBottom: '16px',
//                             display: 'grid',
//                             gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
//                             gap: '12px'
//                         }}>
//                             <div>
//                                 <strong style={{ color: '#0f172a', display: 'block', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Date</strong>
//                                 <span style={{ color: '#334155', fontSize: '14px' }}>Saturday, August 22, 2026</span>
//                             </div>
//                             <div>
//                                 <strong style={{ color: '#0f172a', display: 'block', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Time</strong>
//                                 <span style={{ color: '#334155', fontSize: '14px' }}>11:00 AM to 1:00 PM (Pacific Time)</span>
//                             </div>
//                             <div>
//                                 <strong style={{ color: '#0f172a', display: 'block', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Venue</strong>
//                                 <span style={{ color: '#334155', fontSize: '14px' }}>
//                                     Athena Technology, <a href="https://maps.google.com/?q=943+Corporate+Way+Fremont+CA" target="_blank" rel="noopener noreferrer" style={{ color: '#0284c7', textDecoration: 'underline' }}>943 Corporate Way, Fremont, CA 94539</a>
//                                 </span>
//                             </div>
//                             <div>
//                                 <strong style={{ color: '#0f172a', display: 'block', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Lunch</strong>
//                                 <span style={{ color: '#334155', fontSize: '14px' }}>Complimentary lunch provided to all registered attendees</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
               
//                 <div className="rf-view-info-container" style={{ marginBottom: '28px' }}>
//                     <div className="rf-program-section" style={{ marginBottom: '24px' }}>
//                         <h2 className="rf-section-title" style={{ fontSize: '20px', marginBottom: '16px', color: '#0f172a', fontWeight: 700 }}>
//                             Three-Level Certification &amp; Project Pathway
//                         </h2>

//                         <div className="rf-pathway-cards-grid">
//                             <div className="rf-pathway-card level-1">
//                                 <span className="rf-level-badge">LEVEL 1</span>
//                                 <h3 className="rf-level-title">Foundation Certificate Course</h3>
//                             </div>

//                             <div className="rf-pathway-card level-2">
//                                 <span className="rf-level-badge">LEVEL 2</span>
//                                 <h3 className="rf-level-title">Intermediate Certificate Course</h3>
//                             </div>

//                             <div className="rf-pathway-card level-3">
//                                 <span className="rf-level-badge">LEVEL 3</span>
//                                 <h3 className="rf-level-title">Advanced Certificate Course</h3>
//                             </div>
//                         </div>

//                         <div className="rf-capstone-banner">
//                             <div className="rf-capstone-header">
//                                 <div className="rf-capstone-title">
//                                     Industrial Capstone Project
//                                 </div>
//                                 <span className="rf-capstone-duration">3 Weeks</span>
//                             </div>
//                             <div className="rf-capstone-sub">Applies to all tracks</div>
//                             <div className="rf-capstone-tags">
//                                 <span className="rf-tag">Public Service</span>
//                                 <span className="rf-tag">Manufacturing</span>
//                                 <span className="rf-tag">Healthcare</span>
//                                 <span className="rf-tag">Commercial Real Estate</span>
//                                 <span className="rf-tag">Energy</span>
//                             </div>
//                         </div>
//                     </div>


//                     <div className="rf-program-section">
//                         <h2 className="rf-section-title" style={{ fontSize: '18px', marginBottom: '8px', color: '#0f172a', fontWeight: 700 }}>What the Orientation Covers</h2>
//                         <div className="rf-flexible-join-card" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px 18px' }}>
//                             <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6', margin: 0 }}>
//                                 We will cover course objectives and learning outcomes, prerequisites and qualification criteria, hands-on projects and AI labs, duration and schedule, and career opportunities and certification benefits, along with a recommended learning path based on your background and experience.
//                             </p>
//                         </div>
//                     </div>


//                     <div className="rf-program-section">
//                         <h2 className="rf-section-title" style={{ fontSize: '18px', marginBottom: '8px', color: '#0f172a', fontWeight: 700 }}>
//                             A Flexible Way to Learn
//                         </h2>
//                         <div className="rf-flexible-join-card" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px 18px' }}>
//                             <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6', margin: 0 }}>
//                                 You may enroll in the complete certification pathway or register for the specific course that matches your qualifications and career goals. Based on feedback from prospective participants, we redesigned the program so you can join at the level that fits your experience, following a tiered model proven in AI and technology programs delivered through various educational institutions.
//                             </p>
//                         </div>
//                     </div>


//                     <div className="rf-program-section">
//                         <h2 className="rf-section-title" style={{ fontSize: '18px', marginBottom: '8px', color: '#0f172a', fontWeight: 700 }}>
//                             Bring Your Questions
//                         </h2>
//                         <div style={{
//                             background: '#ffffff',
//                             border: '1px solid #e2e8f0',
//                             borderRadius: '10px',
//                             padding: '14px 18px',
//                         }}>
//                             <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6', margin: '0 0 10px 0' }}>
//                                 Our instructors will be available throughout the session to answer your questions:
//                             </p>
//                             <ul style={{
//                                 margin: 0,
//                                 paddingLeft: '20px',
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 gap: '6px',
//                                 color: '#1e293b',
//                                 fontSize: '14px',
//                                 lineHeight: '1.5'
//                             }}>
//                                 <li>1. Which course is right for me?</li>
//                                 <li>2. Do I qualify for the Intermediate or Advanced level?</li>
//                                 <li>3. What technical background is required?</li>
//                                 <li>4. What projects will I build?</li>
//                                 <li>5. How will this certification help my career?</li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="rf-view-register-container" style={{ borderTop: '1px solid #e2e8f0', paddingTop: '28px' }}>
//                     <div className="rf-form-header" style={{ marginBottom: '20px' }}>
//                         <h2>Register for the Cohort</h2>
//                         <p>Complete the form below to secure your spot for the orientation.</p>
//                     </div>

//                     <div className="rf-stepper">
//                         {STEPS.map((label, i) => (
//                             <div key={i} className={`rf-step ${i < step ? 'done' : ''} ${i === step ? 'active' : ''}`}>
//                                 <div className="rf-step-circle">
//                                     {i < step ? '✓' : i + 1}
//                                 </div>
//                                 <span className="rf-step-label">{label}</span>
//                                 {i < STEPS.length - 1 && <div className="rf-step-line" />}
//                             </div>
//                         ))}
//                     </div>
//                     <div className="rf-progress-bar"><div className="rf-progress-fill" style={{ width: `${progress}%` }} /></div>

//                     <form className="rf-form" onSubmit={handleSubmit} noValidate>


//                         {step === 0 && (
//                             <div className="rf-panel">
//                                 <h3 className="rf-panel-title">Tell us about yourself</h3>
//                                 <div className="rf-row-2">
//                                     <Field label="First Name" required error={errors.firstName}>
//                                         <input className={cls('rf-input', errors.firstName)} type="text" placeholder="First name" value={form.firstName} onChange={handleText('firstName')} autoComplete="given-name" />
//                                     </Field>
//                                     <Field label="Last Name" required error={errors.lastName}>
//                                         <input className={cls('rf-input', errors.lastName)} type="text" placeholder="Last name" value={form.lastName} onChange={handleText('lastName')} autoComplete="family-name" />
//                                     </Field>
//                                 </div>
//                                 <div className="rf-row-2">
//                                     <Field label="Email Address" required error={errors.email}>
//                                         <input className={cls('rf-input', errors.email)} type="email" placeholder="Your email" value={form.email} onChange={handleText('email')} autoComplete="email" />
//                                     </Field>
//                                     <Field label="Phone Number" required error={errors.phone}>
//                                         <input className={cls('rf-input', errors.phone)} type="tel" placeholder="Phone number" value={form.phone} onChange={handlePhoneChange} autoComplete="tel" />
//                                     </Field>
//                                 </div>
//                                 <div className="rf-row-2">
//                                     <Field label="City / State" required error={errors.cityState}>
//                                         <input className={cls('rf-input', errors.cityState)} type="text" placeholder="e.g. Fremont, CA" value={form.cityState} onChange={handleText('cityState')} />
//                                     </Field>
//                                     <Field label="Years of Experience" required error={errors.yearsExperience}>
//                                         <CustomSelect
//                                             options={YEARS_OPTIONS}
//                                             value={form.yearsExperience}
//                                             placeholder="Select…"
//                                             onChange={(val) => {
//                                                 setForm(prev => ({ ...prev, yearsExperience: val }));
//                                                 setErrors(prev => ({ ...prev, yearsExperience: '' }));
//                                             }}
//                                             hasError={Boolean(errors.yearsExperience)}
//                                         />
//                                     </Field>
//                                 </div>
//                                 <div className="rf-row-2">
//                                     <Field label="Current Employer / Organization" required error={errors.employer}>
//                                         <input className={cls('rf-input', errors.employer)} type="text" placeholder="Company name" value={form.employer} onChange={handleText('employer')} />
//                                     </Field>
//                                     <Field label="Job Title / Role" required error={errors.jobTitle}>
//                                         <input className={cls('rf-input', errors.jobTitle)} type="text" placeholder="e.g. Senior Engineer" value={form.jobTitle} onChange={handleText('jobTitle')} />
//                                     </Field>
//                                 </div>
//                                 <Field label="LinkedIn Profile" optional error={errors.linkedin}>
//                                     <input className={cls('rf-input', errors.linkedin)} type="url" inputMode="url" autoComplete="url" pattern="https?://([a-z0-9-]+\.)*linkedin\.com/in/.+" placeholder="https://www.linkedin.com/in/your-name" value={form.linkedin} onChange={handleText('linkedin')} />
//                                 </Field>
//                             </div>
//                         )}


//                         {step === 1 && (
//                             <div className="rf-panel">
//                                 <h3 className="rf-panel-title">Your background</h3>
//                                 <Field label="Highest level of education" required error={errors.education}>
//                                     <div className="rf-pill-group">
//                                         {EDUCATION_OPTIONS.map(opt => (
//                                             <label key={opt.value} className={`rf-pill${form.education === opt.value ? ' selected' : ''}`}>
//                                                 <input type="radio" name="education" value={opt.value} checked={form.education === opt.value} onChange={handleText('education')} />
//                                                 {opt.label}
//                                             </label>
//                                         ))}
//                                     </div>
//                                 </Field>
//                                 <Field
//                                     label="Relevant experience — select all that apply"
//                                     required
//                                     error={errors.experience}
//                                 >
//                                     <div className="rf-pill-group rf-pill-wrap">
//                                         {EXPERIENCE_OPTIONS.map(opt => (
//                                             <label
//                                                 key={opt.id}
//                                                 className={`rf-pill ${form.experience.includes(opt.id) ? 'selected' : ''
//                                                     }`}
//                                             >
//                                                 <input
//                                                     type="checkbox"
//                                                     checked={form.experience.includes(opt.id)}
//                                                     onChange={() => handleExperience(opt.id)}
//                                                 />
//                                                 {opt.label}
//                                             </label>
//                                         ))}
//                                     </div>

//                                     {form.experience.includes('other') && (
//                                         <div className="rf-other-field">
//                                             <input
//                                                 className={cls('rf-input', errors.otherExperience)}
//                                                 type="text"
//                                                 placeholder="Please specify your experience"
//                                                 value={form.otherExperience}
//                                                 onChange={(e) =>
//                                                     setForm((prev) => ({
//                                                         ...prev,
//                                                         otherExperience: e.target.value,
//                                                     }))
//                                                 }
//                                             />

//                                             {errors.otherExperience && (
//                                                 <span className="rf-err">
//                                                     {errors.otherExperience}
//                                                 </span>
//                                             )}
//                                         </div>
//                                     )}
//                                 </Field>
//                             </div>
//                         )}

//                         {/* ── Step 2: Preferences (includes optional Resume upload) ── */}
//                         {step === 2 && (
//                             <div className="rf-panel">
//                                 <h3 className="rf-panel-title">Program preferences</h3>
//                                 <Field label="Preferred attendance mode" required error={errors.attendanceMode}>
//                                     <div className="rf-attend-group">
//                                         <label className={`rf-attend-card${form.attendanceMode === 'in-person' ? ' selected' : ''}`}>
//                                             <input type="radio" name="attendanceMode" value="in-person" checked={form.attendanceMode === 'in-person'} onChange={handleText('attendanceMode')} />
//                                             <span className="rf-attend-icon">
//                                                 <Image
//                                                     src="/assets/icons/arrow.svg"
//                                                     alt="In Person"
//                                                     width={32}
//                                                     height={32}
//                                                 />
//                                             </span>
//                                             <span className="rf-attend-title">In-Person</span>
//                                             <span className="rf-attend-sub">Fremont, CA</span>
//                                         </label>
//                                         <label className={`rf-attend-card${form.attendanceMode === 'remote' ? ' selected' : ''}`}>
//                                             <input type="radio" name="attendanceMode" value="remote" checked={form.attendanceMode === 'remote'} onChange={handleText('attendanceMode')} />
//                                             <span className="rf-attend-icon">
//                                                 <Image
//                                                     src="/assets/icons/remote-work.svg"
//                                                     alt="Remote"
//                                                     width={32}
//                                                     height={32}
//                                                 />
//                                             </span>
//                                             <span className="rf-attend-title">Remote</span>
//                                             <span className="rf-attend-sub">Case by case</span>
//                                         </label>
//                                     </div>
//                                 </Field>
//                                 <Field label="How did you hear about this program?" required error={errors.heardAbout}>
//                                     <input className={cls('rf-input', errors.heardAbout)} type="text" placeholder="LinkedIn, colleague, event…" value={form.heardAbout} onChange={handleText('heardAbout')} />
//                                 </Field>

//                                 {/* Resume Upload Field (Optional) inside Preferences */}
//                                 <Field label="Upload Resume" optional error={errors.resume}>
//                                     <div className={`rf-upload-field ${resumeFile ? 'has-file' : ''} ${errors.resume ? 'has-error' : ''}`}>
//                                         <input
//                                             type="file"
//                                             id="resume-upload"
//                                             ref={resumeInputRef}
//                                             className="rf-file-hidden"
//                                             accept=".pdf,.doc,.docx"
//                                             onChange={handleResumeChange}
//                                         />
//                                         {!resumeFile ? (
//                                             <label htmlFor="resume-upload" className="rf-upload-btn">
//                                                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '6px' }}>
//                                                     <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
//                                                     <polyline points="17 8 12 3 7 8" />
//                                                     <line x1="12" y1="3" x2="12" y2="15" />
//                                                 </svg>
//                                                 Choose Resume File
//                                             </label>
//                                         ) : (
//                                             <div className="rf-file-preview">
//                                                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a3264" strokeWidth="2">
//                                                     <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
//                                                     <polyline points="14 2 14 8 20 8" />
//                                                 </svg>
//                                                 <span className="rf-file-name">{resumeFile.name}</span>
//                                                 <span className="rf-file-size">({(resumeFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
//                                                 <button type="button" className="rf-file-remove" onClick={clearResumeFile} aria-label="Remove resume">
//                                                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                                                         <line x1="18" y1="6" x2="6" y2="18" />
//                                                         <line x1="6" y1="6" x2="18" y2="18" />
//                                                     </svg>
//                                                 </button>
//                                             </div>
//                                         )}
//                                         <span className="rf-upload-note">PDF, DOC, DOCX up to 5MB (Optional)</span>
//                                     </div>
//                                 </Field>
//                             </div>
//                         )}

//                         {submitError && (
//                             <div className="rf-submit-error" style={{ color: '#dc2626', fontSize: '13px', marginTop: '16px', fontWeight: 600 }}>
//                                 {submitError}
//                             </div>
//                         )}

//                         {/* Nav buttons */}
//                         <div className="rf-nav">
//                             {step > 0 && (
//                                 <button type="button" className="rf-btn-back" onClick={back} disabled={isSubmitting}>← Back</button>
//                             )}
//                             <div className="rf-nav-right">
//                                 {step < STEPS.length - 1 ? (
//                                     <button type="button" className="rf-btn-next" onClick={next}>
//                                         Continue →
//                                     </button>
//                                 ) : (
//                                     <button type="submit" className="rf-btn-submit" disabled={isSubmitting}>
//                                         {isSubmitting ? 'Submitting...' : 'Submit Registration'}
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // ── Custom React Select Dropdown Component ──
// function CustomSelect({ options, value, placeholder = 'Select…', onChange, hasError }: {
//     options: string[];
//     value: string;
//     placeholder?: string;
//     onChange: (val: string) => void;
//     hasError?: boolean;
// }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const containerRef = useRef<HTMLDivElement | null>(null);

//     useEffect(() => {
//         const handleClickOutside = (e: MouseEvent) => {
//             if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
//                 setIsOpen(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);

//     return (
//         <div className="rf-custom-select-container" ref={containerRef}>
//             <button
//                 type="button"
//                 className={`rf-custom-select-trigger ${hasError ? 'rf-has-err' : ''} ${isOpen ? 'open' : ''}`}
//                 onClick={() => setIsOpen(prev => !prev)}
//             >
//                 <span className={value ? 'selected-text' : 'placeholder-text'}>
//                     {value || placeholder}
//                 </span>
//                 <svg
//                     className={`rf-select-chevron ${isOpen ? 'rotated' : ''}`}
//                     width="14"
//                     height="14"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2.5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                 >
//                     <polyline points="6 9 12 15 18 9" />
//                 </svg>
//             </button>

//             {isOpen && (
//                 <div className="rf-custom-select-dropdown">
//                     <div
//                         className={`rf-custom-select-option ${value === '' ? 'active' : ''}`}
//                         onClick={() => {
//                             onChange('');
//                             setIsOpen(false);
//                         }}
//                     >
//                         <span>{placeholder}</span>
//                     </div>
//                     {options.map(opt => (
//                         <div
//                             key={opt}
//                             className={`rf-custom-select-option ${value === opt ? 'active' : ''}`}
//                             onClick={() => {
//                                 onChange(opt);
//                                 setIsOpen(false);
//                             }}
//                         >
//                             <span>{opt}</span>
//                             {value === opt && (
//                                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0369a1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//                                     <polyline points="20 6 9 17 4 12" />
//                                 </svg>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

// // ── Small helpers ──
// function cls(base: string, err?: string) {
//     return err ? `${base} rf-has-err` : base;
// }

// function Field({ label, required, optional, error, children }: {
//     label: string; required?: boolean; optional?: boolean; error?: string; children: React.ReactNode;
// }) {
//     return (
//         <div className="rf-field">
//             <label className="rf-label">
//                 {label}
//                 {required && <span className="rf-star">*</span>}
//                 {optional && <span className="rf-opt">optional</span>}
//             </label>
//             {children}
//             {error && <span className="rf-err">{error}</span>}
//         </div>
//     );
// }
