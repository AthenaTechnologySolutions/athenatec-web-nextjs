"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import "./demo.scss";

interface FormData {
  name: string; email: string; companyName: string;
  industry: string; country: string; demoSubject: string;
  comments: string; agreeToPolicy: boolean;
}
type FormErrors = Partial<Record<keyof FormData, string>>;

const INDUSTRY_OPTIONS = ["Semiconductor","Electronics","Medical Devices","Discrete Manufacturing","Solar"];
const DEMO_SUBJECT_OPTIONS = ["ECO Redliner","Master Data Migrator","Automation Scripting Tool"];
const CF7_FORM_ID = "230890";
const CF7_URL = `/api/cf7/${CF7_FORM_ID}`;
const EMPTY_FORM: FormData = {
  name:"", email:"", companyName:"", industry:"",
  country:"", demoSubject:"", comments:"", agreeToPolicy: false,
};

const ChevDown = () => (
  <svg className="sel-arrow" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
  </svg>
);

const ErrIco = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink:0 }}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
  </svg>
);

function Field({ label, error, isSelect = false, hasValue = false, children }: {
  label: string; error?: string; isSelect?: boolean; hasValue?: boolean; children: React.ReactNode;
}) {
  return (
    <div className={`field ${isSelect ? "field--sel" : ""} ${hasValue ? "field--has-value" : ""} ${error ? "field--err" : ""}`}>
      <label>{label} <span className="req">*</span></label>
      {children}
      {error && <span className="ferr"><ErrIco />{error}</span>}
    </div>
  );
}

function CustomSelect({ id, name, value, onChange, placeholder, options }: {
  id: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string; options: string[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = (opt: string) => {
    const nativeInput = ref.current?.querySelector("select") as HTMLSelectElement;
    if (nativeInput) {
      Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, "value")!
        .set!.call(nativeInput, opt);
      nativeInput.dispatchEvent(new Event("change", { bubbles: true }));
    }
    setOpen(false);
  };

  const label = value || placeholder;
  const isPlaceholder = !value;

  return (
    <div className={`csel ${open ? "csel--open" : ""}`} ref={ref}>
      <select id={id} name={name} value={value} onChange={onChange}
        tabIndex={-1} aria-hidden="true" className="csel__native">
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>

      <button type="button" className={`csel__trigger ${isPlaceholder ? "csel__trigger--ph" : ""}`}
        onClick={() => setOpen(p => !p)} aria-haspopup="listbox" aria-expanded={open}>
        <span className="csel__val">{label}</span>
        <span className="csel__arrow-box"><ChevDown /></span>
      </button>

      {open && (
        <ul className="csel__menu" role="listbox">
          {options.map((opt, i) => (
            <li key={opt} role="option" aria-selected={value === opt}
              className={`csel__opt ${value === opt ? "csel__opt--active" : ""}`}
              style={{ "--i": i } as React.CSSProperties}
              onMouseDown={() => select(opt)}>
              <span className="csel__opt-dot" />
              <span className="csel__opt-label">{opt}</span>
              {value === opt && (
                <svg className="csel__opt-check" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function WarpCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number, W = 0, H = 0;
    const PARTICLE_COUNT = 220;
    const HUE_POOL = [185,195,200,280,295,310];

    interface Star { angle:number; dist:number; speed:number; maxDist:number; size:number; hue:number; alpha:number; }
    interface Ring { r:number; alpha:number; color:string; }

    const stars: Star[] = [];
    const rings: Ring[] = [];
    let ringTimer = 0;

    const mkStar = (dist=0): Star => ({
      angle: Math.random()*Math.PI*2, dist,
      speed: 2.5+Math.random()*5.5, maxDist:0,
      size: 0.4+Math.random()*1.2,
      hue: HUE_POOL[Math.floor(Math.random()*HUE_POOL.length)], alpha:0,
    });

    const resize = () => {
      W = canvas.offsetWidth || canvas.parentElement?.offsetWidth || 400;
      H = canvas.offsetHeight || canvas.parentElement?.offsetHeight || 600;
      canvas.width = W*devicePixelRatio; canvas.height = H*devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      const maxDist = Math.sqrt(W*W+H*H)/2+40;
      if (!stars.length) {
        for (let i=0;i<PARTICLE_COUNT;i++) { const s=mkStar(Math.random()*maxDist*0.8); s.maxDist=maxDist; stars.push(s); }
      } else { stars.forEach(s => { s.maxDist=maxDist; }); }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);
    resize();

    const draw = (ts: number) => {
      ctx.clearRect(0,0,W,H);
      const cx=W/2, cy=H/2;

      const bg = ctx.createRadialGradient(cx,cy,0,cx,cy,Math.max(W,H)*0.75);
      bg.addColorStop(0,"#0d2340"); bg.addColorStop(0.5,"#071528"); bg.addColorStop(1,"#030e1a");
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

      ctx.save(); ctx.strokeStyle="rgba(0,200,224,0.035)"; ctx.lineWidth=1;
      const step=28;
      for (let x=0;x<W;x+=step) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y=0;y<H;y+=step) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
      ctx.restore();

      stars.forEach(s => {
        s.dist += s.speed*(1+s.dist/s.maxDist*1.8);
        s.alpha = Math.min(1,s.dist/(s.maxDist*0.18));
        if (s.dist>=s.maxDist) { const f=mkStar(2); f.maxDist=s.maxDist; Object.assign(s,f); return; }
        const tailLen=s.dist*0.18+4;
        const x1=cx+Math.cos(s.angle)*s.dist, y1=cy+Math.sin(s.angle)*s.dist;
        const x0=cx+Math.cos(s.angle)*Math.max(0,s.dist-tailLen), y0=cy+Math.sin(s.angle)*Math.max(0,s.dist-tailLen);
        const g=ctx.createLinearGradient(x0,y0,x1,y1);
        g.addColorStop(0,`hsla(${s.hue},95%,70%,0)`); g.addColorStop(1,`hsla(${s.hue},95%,75%,${s.alpha*0.9})`);
        ctx.save(); ctx.strokeStyle=g; ctx.lineWidth=s.size; ctx.lineCap="round";
        ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x1,y1); ctx.stroke(); ctx.restore();
      });

      ringTimer+=16;
      if (ringTimer>1400) {
        const colors=["rgba(23,172,228,","rgba(224,64,251,","rgba(0,229,255,"];
        rings.push({ r:0, alpha:0.7, color:colors[Math.floor(Math.random()*colors.length)] });
        ringTimer=0;
      }
      rings.forEach((ring,i) => {
        ring.r+=2.8; ring.alpha-=0.008;
        if (ring.alpha<=0) { rings.splice(i,1); return; }
        ctx.save(); ctx.strokeStyle=ring.color+ring.alpha+")"; ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.arc(cx,cy,ring.r,0,Math.PI*2); ctx.stroke(); ctx.restore();
      });

      const pulse=0.7+Math.sin(ts*0.0018)*0.3;
      const halo=ctx.createRadialGradient(cx,cy,0,cx,cy,60*pulse);
      halo.addColorStop(0,`rgba(0,229,255,${0.18*pulse})`); halo.addColorStop(0.5,`rgba(23,172,228,${0.06*pulse})`); halo.addColorStop(1,"rgba(0,229,255,0)");
      ctx.fillStyle=halo; ctx.beginPath(); ctx.arc(cx,cy,60*pulse,0,Math.PI*2); ctx.fill();
      const core=ctx.createRadialGradient(cx,cy,0,cx,cy,14*pulse);
      core.addColorStop(0,`rgba(220,245,255,${0.95*pulse})`); core.addColorStop(0.3,`rgba(0,229,255,${0.8*pulse})`);
      core.addColorStop(0.7,`rgba(23,172,228,${0.3*pulse})`); core.addColorStop(1,"rgba(23,172,228,0)");
      ctx.fillStyle=core; ctx.beginPath(); ctx.arc(cx,cy,14*pulse,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#fff"; ctx.beginPath(); ctx.arc(cx,cy,2.5*pulse,0,Math.PI*2); ctx.fill();

      raf=requestAnimationFrame(draw);
    };

    raf=requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="warp-canvas"/>;
}

function Speedometer() {
  const [needle, setNeedle] = useState(0);
  const [displayVal, setDisplayVal] = useState(0);
  const targetRef = useRef(78);

  useEffect(() => {
    let rafId: number;
    const target = targetRef.current;
    let start: number|null = null;

    const animate = (ts: number) => {
      if (!start) start=ts;
      const p = Math.min((ts-start)/2200, 1);
      const eased = 1-Math.pow(1-p,3);
      setNeedle(eased*target); setDisplayVal(Math.round(eased*target*3.2));
      if (p<1) { rafId=requestAnimationFrame(animate); return; }
      let tick=0;
      const idle = () => {
        tick+=0.04; const w=target+Math.sin(tick)*1.5;
        setNeedle(w); setDisplayVal(Math.round(w*3.2));
        rafId=requestAnimationFrame(idle);
      };
      rafId=requestAnimationFrame(idle);
    };

    const timer=setTimeout(() => { rafId=requestAnimationFrame(animate); }, 400);
    return () => { clearTimeout(timer); cancelAnimationFrame(rafId); };
  }, []);

  const CX=100, CY=110, R=80, START_DEG=225, SWEEP=270;
  const polar = (deg:number, r=R) => ({ x:CX+r*Math.cos((deg-90)*Math.PI/180), y:CY+r*Math.sin((deg-90)*Math.PI/180) });
  const arc = (a:number,b:number,r:number) => { const s=polar(a,r),e=polar(b,r),l=(b-a+360)%360>180?1:0; return `M ${s.x} ${s.y} A ${r} ${r} 0 ${l} 1 ${e.x} ${e.y}`; };
  const p2d = (p:number) => START_DEG+(SWEEP*p)/100;
  const nd=p2d(needle), tip=polar(nd,R*0.82), b1=polar(nd+90,6), b2=polar(nd-90,6);

  return (
    <div className="speedo-wrap" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="speedo-svg">
        <defs>
          <filter id="glow-cyan"><feGaussianBlur stdDeviation="2.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="glow-needle"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#0ff2fe"/><stop offset="60%" stopColor="#17ace4"/><stop offset="100%" stopColor="#0a3d5c"/></radialGradient>
          <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#0a1e32"/><stop offset="100%" stopColor="#030e1a"/></radialGradient>
          <linearGradient id="needleGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#ffffff"/><stop offset="100%" stopColor="#e040fb"/></linearGradient>
        </defs>
        <circle cx={CX} cy={CY} r={R+18} fill="none" stroke="rgba(0,200,224,0.08)" strokeWidth="14"/>
        <circle cx={CX} cy={CY} r={R+4} fill="url(#bgGrad)"/>
        <path d={arc(START_DEG,START_DEG+SWEEP,R)} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" strokeLinecap="round"/>
        <path d={arc(p2d(0),p2d(60),R)} fill="none" stroke="#17ace4" strokeWidth="10" strokeLinecap="round" filter="url(#glow-cyan)" opacity={needle>0?1:0} style={{transition:"opacity 0.3s"}}/>
        <path d={arc(p2d(60),p2d(80),R)} fill="none" stroke="#f5c518" strokeWidth="10" strokeLinecap="round" opacity={needle>=65?0.9:0} style={{transition:"opacity 0.3s"}}/>
        <path d={arc(p2d(80),p2d(100),R)} fill="none" stroke="#e040fb" strokeWidth="10" strokeLinecap="round" opacity={needle>=82?0.95:0} style={{transition:"opacity 0.3s"}}/>
        {Array.from({length:29},(_,i) => {
          const pct=(i/28)*100, deg=p2d(pct), o=polar(deg,R+2), n2=polar(deg,R-(i%4===0?14:8));
          const color=pct<60?"#17ace4":pct<80?"#f5c518":"#e040fb";
          return <line key={i} x1={o.x} y1={o.y} x2={n2.x} y2={n2.y} stroke={color} strokeWidth={i%4===0?2:1} opacity={i%4===0?0.9:0.4}/>;
        })}
        {[0,40,80,120,160,200,240,280].map((val,idx) => {
          const pt=polar(p2d((idx/7)*100),R-22);
          return <text key={val} x={pt.x} y={pt.y} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="rgba(180,210,255,0.7)" fontFamily="monospace">{val}</text>;
        })}
        <polygon points={`${tip.x},${tip.y} ${b1.x},${b1.y} ${b2.x},${b2.y}`} fill="url(#needleGrad)" filter="url(#glow-needle)" opacity="0.95"/>
        <circle cx={CX} cy={CY} r={10} fill="#0a1e32" stroke="rgba(0,200,224,0.6)" strokeWidth="1.5"/>
        <circle cx={CX} cy={CY} r={5} fill="url(#coreGrad)"/>
        <rect x={CX-26} y={CY+20} width={52} height={22} rx={4} fill="rgba(0,0,0,0.6)" stroke="rgba(0,200,224,0.3)" strokeWidth="1"/>
        <text x={CX} y={CY+35} textAnchor="middle" dominantBaseline="middle" fontSize="13" fill="#00e5ff" fontFamily="monospace" fontWeight="bold" letterSpacing="1">{displayVal}</text>
        <text x={CX} y={CY+52} textAnchor="middle" fontSize="6" fill="rgba(170,200,255,0.6)" fontFamily="monospace" letterSpacing="1">KM / S</text>
        <text x={CX} y={CY-R-10} textAnchor="middle" fontSize="7" fill="rgba(224,64,251,0.65)" fontFamily="monospace" letterSpacing="3">REDLINE</text>
      </svg>
    </div>
  );
}

export default function GetADemoPage() {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors]     = useState<FormErrors>({});
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle"|"success"|"error">("idle");
  const [apiError, setApiError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.name.trim())        e.name        = "Full name is required.";
    if (!formData.email.trim())       e.email       = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Enter a valid email.";
    if (!formData.companyName.trim()) e.companyName = "Company name is required.";
    if (!formData.industry)           e.industry    = "Please select an industry.";
    if (!formData.country.trim())     e.country     = "Country is required.";
    if (!formData.demoSubject)        e.demoSubject = "Please select a demo subject.";
    if (!formData.agreeToPolicy)      e.agreeToPolicy = "You must agree to the privacy policy.";
    setErrors(e); return !Object.keys(e).length;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type==="checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData(p => ({ ...p, [name]: val }));
    if (errors[name as keyof FormErrors]) setErrors(p => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true); setApiError("");
    try {
      const fd = new FormData();
      fd.append("_wpcf7", CF7_FORM_ID);
      fd.append("_wpcf7_version", "5.9");
      fd.append("_wpcf7_locale", "en_US");
      fd.append("_wpcf7_unit_tag", `wpcf7-f${CF7_FORM_ID}-o1`);
      fd.append("_wpcf7_container_post", "0");

      fd.append("your-name", formData.name.trim());
      fd.append("your-email", formData.email.trim().toLowerCase());
      fd.append("company-name", formData.companyName.trim());
      fd.append("industries", formData.industry);
      fd.append("country", formData.country.trim());
      fd.append("topic", formData.demoSubject);
      fd.append("page-url", window.location.href);

      if (formData.comments.trim()) {
        fd.append("textarea-11", formData.comments.trim());
      }

      if (formData.agreeToPolicy) {
        fd.append("checkbox-649", "I agree*");
      }

      const res = await fetch(CF7_URL, { method:"POST", body: fd });
      const json = await res.json();
      if (json.status !== "mail_sent") throw new Error(json.message ?? "Something went wrong. Please try again.");
      setSubmitStatus("success"); setSubmitted(true);
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitStatus("error");
    } finally { setSubmitting(false); }
  };

  const handleReset = () => { setSubmitted(false); setSubmitStatus("idle"); setApiError(""); setFormData(EMPTY_FORM); };
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior:"smooth", block:"start" });

  return (
    <div className="demo-page">
      <section className="hero">
        <div className="hero__bg"/><div className="hero__teal-wash"/>
        <div className="hero__streaks" aria-hidden="true">
          {[...Array(8)].map((_,i) => <div key={i} className={`hero__streak hero__streak--${i+1}`}/>)}
        </div>
        <div className="hero__copy">
          <h1 className="hero__title">Athena Accelerator<br/>Get a Demo</h1>
          <p className="hero__desc">Leave us a little info, and we&apos;ll be in touch - our team moves fast.</p>
          <div className="hero__actions">
            <button className="hero-cta hero-cta--solid" onClick={scrollToForm}>Fill Out the Form</button>
            <a href="mailto:info@athenatec.com" className="hero-cta hero-cta--outline">Contact Us</a>
          </div>
        </div>
        <Speedometer/>
      </section>

      <section className="fs" ref={formRef}>
        <div className="fs__inner">
          <div className="fs__heading"><h2>Fill out the form below to get a demo</h2></div>
          <div className="fs__combined-card">
            <div className="fip"><WarpCanvas/></div>
            <div className="fs__form-side">
              {submitted ? (
                <div className="form-success">
                  <div className="form-success__ico">
                    <svg viewBox="0 0 52 52" fill="none">
                      <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2"/>
                      <path d="M14 26l8 8 16-16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>Request Submitted!</h3>
                  <p>Thank you, <strong>{formData.name}</strong>. Our team will reach out to <strong>{formData.email}</strong> within 1 business day.</p>
                  <button className="submit-btn" onClick={handleReset}>Submit Another Request</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="demo-form">
                  <div className="frow frow--2">
                    <Field label="Name" error={errors.name}>
                      <input id="name" name="name" type="text" placeholder="Enter Your Name" value={formData.name} onChange={handleChange} autoComplete="name"/>
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input id="email" name="email" type="email" placeholder="Your email" value={formData.email} onChange={handleChange} autoComplete="email"/>
                    </Field>
                  </div>
                  <div className="frow frow--2">
                    <Field label="Company Name" error={errors.companyName}>
                      <input id="companyName" name="companyName" type="text" placeholder="Your Company" value={formData.companyName} onChange={handleChange}/>
                    </Field>
                    <Field label="Industry" error={errors.industry} isSelect hasValue={!!formData.industry}>
                      <CustomSelect id="industry" name="industry" value={formData.industry} onChange={handleChange}
                        placeholder="Select industry…" options={INDUSTRY_OPTIONS}/>
                    </Field>
                  </div>
                  <div className="frow frow--2">
                    <Field label="Country" error={errors.country}>
                      <input id="country" name="country" type="text" placeholder="Your Country" value={formData.country} onChange={handleChange} autoComplete="country-name"/>
                    </Field>
                    <Field label="Demo Subject" error={errors.demoSubject} isSelect hasValue={!!formData.demoSubject}>
                      <CustomSelect id="demoSubject" name="demoSubject" value={formData.demoSubject} onChange={handleChange}
                        placeholder="Select subject…" options={DEMO_SUBJECT_OPTIONS}/>
                    </Field>
                  </div>
                  <div className="field">
                    <label>Comments</label>
                    <textarea id="comments" name="comments" rows={4} placeholder="Any comments regarding demo…" value={formData.comments} onChange={handleChange}/>
                  </div>
                  <p className="form-legal">
                    By submitting this form, you agree to receive communications with related content from Athena Accelerators and can unsubscribe at any time. For more information on our{" "}
                    <Link href="/privacy-policy">Privacy Policy</Link>.
                  </p>
                  <div className={`field field--check ${errors.agreeToPolicy?"field--err":""}`}>
                    <label className="chk-label" htmlFor="agreeToPolicy">
                      <input id="agreeToPolicy" name="agreeToPolicy" type="checkbox" checked={formData.agreeToPolicy} onChange={handleChange}/>
                      <span className="chk-box"/>
                      <span className="chk-txt">I agree <span className="req">*</span></span>
                    </label>
                    {errors.agreeToPolicy && <span className="ferr"><ErrIco/>{errors.agreeToPolicy}</span>}
                  </div>
                  {submitStatus==="error" && (
                    <div className="api-error" role="alert"><ErrIco/><span>{apiError}</span></div>
                  )}
                  <button type="submit" className={`submit-btn ${submitting?"submit-btn--busy":""}`} disabled={submitting}>
                    {submitting ? <><span className="spinner"/>Submitting…</> : <>Download Now
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
