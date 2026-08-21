"use client";

import React, { useState } from "react";
import Link from "next/link";
import HeroSection from "../components/HeroSection";
import ScrollReveal from "../components/ScrollReveal";

import {
  Cpu,
  Zap,
  Activity,
  Layers,
  Search,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Terminal,
  Sparkles,
  Bot,
  Brain,
  Workflow,
  Check,
  Send,
  AlertCircle,
  HelpCircle,
  Clock,
  TrendingUp,
  Database,
  Building2,
  Server,
  FileCode,
  ShieldCheck,
  Network,
  ChevronRight,
  ArrowDown,
  Lock,
  Compass,
  Settings,
  Wrench,
  Factory,
  CircuitBoard,
  Microscope,
  Lightbulb,
  Target,
  Award,
  Users,
  Rocket,
  Eye,
  MessageSquare,
  GitBranch,
  Code2,
  Gauge,
  Cog,
  Box,
  ClipboardCheck,
  ArrowDownCircle,
} from "lucide-react";
import "./faborchestrator.scss";

/* ═══════════════════════════════════════════════════════════════════════════
   DEMO FORM (preserved from existing code)
   ═══════════════════════════════════════════════════════════════════════════ */

const CF7_FORM_ID = "233708";
const CF7_URL = `/api/cf7/${CF7_FORM_ID}`;

interface DemoFormProps {
  onSuccess?: () => void;
  darkBg?: boolean;
}

function FabOrchestratorDemoForm({ onSuccess, darkBg = false }: DemoFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("United States");
  const [industry, setIndustry] = useState("Semiconductor");
  const [role, setRole] = useState("MES Solution Architect");
  const [topic, setTopic] = useState("FabOrchestrator.AI Platform Overview");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !company.trim()) {
      setErrorMsg("Please fill out all required fields.");
      setStatus("error");
      return;
    }

    if (!consent) {
      setErrorMsg("You must accept the terms to proceed.");
      setStatus("error");
      return;
    }

    setSubmitting(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const fd = new FormData();
      fd.append("_wpcf7", CF7_FORM_ID);
      fd.append("_wpcf7_version", "5.9");
      fd.append("_wpcf7_locale", "en_US");
      fd.append("_wpcf7_unit_tag", `wpcf7-f${CF7_FORM_ID}-o1`);
      fd.append("_wpcf7_container_post", "0");

      fd.append("your-name", name.trim());
      fd.append("your-email", email.trim().toLowerCase());
      fd.append("company-name", company.trim());
      fd.append("country", country.trim() || "United States");
      fd.append("industry", industry);
      fd.append("industries", industry);
      fd.append("job", role);
      fd.append("job-title", role);
      fd.append("topic", topic);
      fd.append("your-subject", `FabOrchestrator.AI Demo Request: ${topic}`);
      fd.append("message", message.trim() || `Demo request for ${topic}`);
      fd.append("your-message", message.trim() || `Demo request for ${topic}`);
      fd.append("textarea-11", message.trim() || `Demo request for ${topic}`);
      fd.append("page-url", typeof window !== "undefined" ? window.location.href : "");
      fd.append("checkbox-649", "I agree*");
      fd.append("consent", "I agree*");

      const res = await fetch(CF7_URL, {
        method: "POST",
        body: fd,
      });

      const json = await res.json();
      if (json.status !== "mail_sent") {
        if (json.invalid_fields && Array.isArray(json.invalid_fields) && json.invalid_fields.length > 0) {
          const detail = json.invalid_fields.map((f: any) => `${f.field || "field"}: ${f.message}`).join(" | ");
          throw new Error(detail);
        }
        throw new Error(json.message || "Unable to process request. Please try again.");
      }

      setStatus("success");
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error("CF7 233708 submit error:", err);
      setErrorMsg(err.message || "Failed to send demo request. Please try again.");
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setErrorMsg("");
    setName("");
    setEmail("");
    setCompany("");
    setMessage("");
  };

  if (status === "success") {
    return (
      <div className={`p-8 rounded-3xl text-center space-y-4 ${darkBg ? "bg-slate-900 border border-emerald-500/40 text-white" : "bg-emerald-50 border border-emerald-200 text-slate-900"}`}>
        <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto animate-bounce" />
        <h3 className={`text-2xl font-extrabold ${darkBg ? "text-white" : "text-emerald-950"}`}>Demo Request Received!</h3>
        <p className={`text-sm sm:text-base max-w-md mx-auto leading-relaxed font-medium ${darkBg ? "text-slate-200" : "text-emerald-900"}`}>
          Thank you <strong className={darkBg ? "text-cyan-300" : "text-[#1c4584] font-bold"}>{name}</strong>. Our Manufacturing AI Specialist will contact you at <strong className={darkBg ? "text-white" : "text-emerald-950 font-bold"}>{email}</strong> within 24 hours to schedule your custom FabOrchestrator.AI demo.
        </p>
        <button
          onClick={handleReset}
          className="mt-4 px-6 py-2.5 rounded-xl font-bold bg-[#1c4584] text-white hover:bg-[#153566] text-xs shadow-md transition-all cursor-pointer"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === "error" && errorMsg && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={`text-xs font-bold block mb-1.5 ${darkBg ? "text-slate-200" : "text-slate-700"}`}>
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none transition-all ${darkBg
                ? "bg-slate-900/90 border border-slate-700 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                : "bg-slate-50 border border-slate-300 text-slate-900 focus:border-[#1c4584] focus:ring-1 focus:ring-[#1c4584]"
              }`}
          />
        </div>

        <div>
          <label className={`text-xs font-bold block mb-1.5 ${darkBg ? "text-slate-200" : "text-slate-700"}`}>
            Work Email <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none transition-all ${darkBg
                ? "bg-slate-900/90 border border-slate-700 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                : "bg-slate-50 border border-slate-300 text-slate-900 focus:border-[#1c4584] focus:ring-1 focus:ring-[#1c4584]"
              }`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={`text-xs font-bold block mb-1.5 ${darkBg ? "text-slate-200" : "text-slate-700"}`}>
            Company / Fab Facility <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="text"
            placeholder="Acme Semiconductor Fab"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none transition-all ${darkBg
                ? "bg-slate-900/90 border border-slate-700 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                : "bg-slate-50 border border-slate-300 text-slate-900 focus:border-[#1c4584] focus:ring-1 focus:ring-[#1c4584]"
              }`}
          />
        </div>

        <div>
          <label className={`text-xs font-bold block mb-1.5 ${darkBg ? "text-slate-200" : "text-slate-700"}`}>
            Your Role / Focus
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none transition-all ${darkBg
                ? "bg-slate-900/90 border border-slate-700 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                : "bg-slate-50 border border-slate-300 text-slate-900 focus:border-[#1c4584] focus:ring-1 focus:ring-[#1c4584]"
              }`}
          >
            <option value="MES Solution Architect">MES Solution Architect</option>
            <option value="Fab Operations Director">Fab Operations Director</option>
            <option value="Quality & Process Lead">Quality & Process Lead</option>
            <option value="Automation Engineer">Automation Engineer</option>
            <option value="Executive Leader">Executive Leader</option>
          </select>
        </div>
      </div>

      <div>
        <label className={`text-xs font-bold block mb-1.5 ${darkBg ? "text-slate-200" : "text-slate-700"}`}>
          Primary Demo Focus
        </label>
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none transition-all ${darkBg
              ? "bg-slate-900/90 border border-slate-700 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              : "bg-slate-50 border border-slate-300 text-slate-900 focus:border-[#1c4584] focus:ring-1 focus:ring-[#1c4584]"
            }`}
        >
          <option value="FabOrchestrator.AI Platform Overview">FabOrchestrator.AI Platform Overview</option>
          <option value="FabInsight Operational Analytics">FabInsight Operational Analytics</option>
          <option value="AI Support & Troubleshooting">AI Support & Troubleshooting</option>
          <option value="Modeling Agent Impact Analysis">Modeling Agent Impact Analysis</option>
          <option value="Programming Agent MES Logic">Programming Agent MES Logic</option>
        </select>
      </div>

      <div>
        <label className={`text-xs font-bold block mb-1.5 ${darkBg ? "text-slate-200" : "text-slate-700"}`}>
          Fab Requirements / Comments (Optional)
        </label>
        <textarea
          rows={3}
          placeholder="Specify any cleanroom tools, MES platforms (e.g. Siemens Opcenter), or lot yield priorities..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none transition-all ${darkBg
              ? "bg-slate-900/90 border border-slate-700 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              : "bg-slate-50 border border-slate-300 text-slate-900 focus:border-[#1c4584] focus:ring-1 focus:ring-[#1c4584]"
            }`}
        />
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input
          required
          id="consent-check"
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="w-4 h-4 rounded border-slate-300 text-[#1c4584] focus:ring-[#1c4584]"
        />
        <label htmlFor="consent-check" className={`text-[11px] ${darkBg ? "text-slate-300" : "text-slate-600"}`}>
          I agree to receive communications regarding FabOrchestrator.AI. <span className="text-red-500">*</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`w-full py-3.5 rounded-xl font-bold transition-all text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg ${darkBg
            ? "bg-cyan-400 hover:bg-cyan-300 text-slate-900"
            : "bg-[#1c4584] hover:bg-[#153566] text-white"
          }`}
      >
        {submitting ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
            <span>Submitting Request...</span>
          </>
        ) : (
          <>
            <span>Submit Demo Request</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONTENT DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const manufacturingSources = [
  { label: "MES", icon: Server },
  { label: "Equipment", icon: Cog },
  { label: "Engineering", icon: Wrench },
  { label: "Quality", icon: ShieldCheck },
  { label: "Production", icon: Factory },
  { label: "Enterprise Data", icon: Database },
];

const capabilityPreviews = [
  { id: "fabinsight", name: "FabInsight", sub: "Operational Intelligence", icon: Eye },
  { id: "support", name: "AI Support Agent", sub: "Contextual Manufacturing Assistance", icon: MessageSquare },
  { id: "modeling", name: "Modeling Agent", sub: "Impact Analysis", icon: GitBranch },
  { id: "programming", name: "Programming Agent", sub: "Intelligent Development", icon: Code2 },
];

interface CapabilityDetail {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: any;
  flow: {
    step: string;
    title: string;
    desc: string;
  }[];
}

const capabilityDetails: CapabilityDetail[] = [
  {
    id: "fabinsight",
    name: "FabInsight",
    tagline: "Turn manufacturing data into actionable intelligence.",
    description:
      "Get contextual operational insights from manufacturing data and information to support faster, better informed decisions.",
    icon: Eye,
    flow: [
      { step: "1", title: "Data Collected", desc: "Manufacturing data from MES, equipment, and production systems" },
      { step: "2", title: "AI Analysis", desc: "Contextual pattern recognition across operational data" },
      { step: "3", title: "Insight Generated", desc: "Actionable intelligence for faster decision-making" },
      { step: "4", title: "Decision Supported", desc: "Teams act on data-driven recommendations" },
    ],
  },
  {
    id: "support",
    name: "AI Support Agent",
    tagline: "Resolve manufacturing issues with contextual AI assistance.",
    description:
      "Help teams investigate problems, find relevant information, and identify potential resolution paths faster.",
    icon: MessageSquare,
    flow: [
      { step: "1", title: "Issue Reported", desc: "Manufacturing problem identified on the shop floor" },
      { step: "2", title: "Context Retrieved", desc: "AI retrieves relevant historical data and documentation" },
      { step: "3", title: "Analysis Performed", desc: "Potential root causes and resolution paths identified" },
      { step: "4", title: "Resolution Accelerated", desc: "Team resolves the issue faster with AI guidance" },
    ],
  },
  {
    id: "modeling",
    name: "Modeling Agent",
    tagline: "Understand the impact before you make the change.",
    description:
      "Analyze engineering and process changes across the manufacturing environment to identify potential downstream impacts.",
    icon: GitBranch,
    flow: [
      { step: "1", title: "ECO Enters System", desc: "Engineering change order submitted for review" },
      { step: "2", title: "AI Analyzes Dependencies", desc: "Cross-references BOMs, routings, workflows, and rules" },
      { step: "3", title: "Impacts Identified", desc: "Affected workflows, processes, and downstream systems mapped" },
      { step: "4", title: "Impact View Produced", desc: "Comprehensive impact report for engineering decision" },
    ],
  },
  {
    id: "programming",
    name: "Programming Agent",
    tagline: "Accelerate manufacturing solution development.",
    description:
      "Use AI-assisted intelligence to accelerate application logic, workflow development, and MES solution engineering.",
    icon: Code2,
    flow: [
      { step: "1", title: "Development Need", desc: "New workflow, rule, or application logic required" },
      { step: "2", title: "AI-Assisted Design", desc: "Context-aware code and workflow generation" },
      { step: "3", title: "Validation Support", desc: "Automated testing and logic verification" },
      { step: "4", title: "Faster Delivery", desc: "Reduced development effort, higher productivity" },
    ],
  },
];

const businessValueStages = [
  { name: "Search", icon: Search, traditional: 90, ai: 20 },
  { name: "Investigate", icon: Microscope, traditional: 85, ai: 25 },
  { name: "Analyze", icon: BarChart3, traditional: 88, ai: 22 },
  { name: "Decide", icon: Target, traditional: 75, ai: 30 },
  { name: "Act", icon: Rocket, traditional: 80, ai: 28 },
];

const differentiatorQuestions = [
  "What process is running?",
  "What equipment is involved?",
  "What workflow is affected?",
  "What happens to WIP?",
  "What rules or master data are involved?",
  "What happens downstream?",
];

const manufacturingKnowledge = [
  { label: "Processes", icon: Workflow },
  { label: "MES", icon: Server },
  { label: "Equipment", icon: Cog },
  { label: "Workflows", icon: GitBranch },
  { label: "WIP", icon: Box },
  { label: "Rules", icon: ShieldCheck },
  { label: "Engineering", icon: Wrench },
  { label: "Data", icon: Database },
];

const journeySteps = [
  {
   
    title: "Customer Problems",
    desc: "Real manufacturing challenges across complex production environments",
    icon: Factory,
  },
  {
  
    title: "Athena MES Expertise",
    desc: "Years of manufacturing knowledge solving engineering, operations, quality challenges",
    icon: Award,
  },
  {
   
    title: "Accelerators & Use Cases",
    desc: "Repeatable proven solutions built from recurring patterns",
    icon: Rocket,
  },
  {
  
    title: "AI Empowerment",
    desc: "Context + intelligence + reasoning powering the next evolution",
    icon: Brain,
  },
  {
   
    title: "FabOrchestrator.AI",
    desc: "Manufacturing intelligence, orchestrated by AI",
    icon: Sparkles,
  },
];

const provenExamples = [
  {
    badge: "Engineering Change",
    title: "ECO Redliner",
    challenge: "Understanding the impact of engineering changes across complex manufacturing systems",
    solution: "ECO Redliner — visual comparison of product structures, routings, and master data across revisions",
    aiCapability: "AI-assisted impact analysis via the Modeling Agent",
    outcome: "Faster ECO decisions with reduced engineering effort",
  },
  {
    badge: "Master Data",
    title: "Master Data Migrator",
    challenge: "Moving and synchronizing complex manufacturing data across MES systems",
    solution: "Master Data Migrator — automated transfer and sync of updated master data after change approvals",
    aiCapability: "AI-assisted understanding, analysis, and action",
    outcome: "Reduced synchronization errors, faster data migration",
  },
  {
    badge: "MES Validation",
    title: "Automation Testing",
    challenge: "Reducing effort involved in MES validation across rule configurations and system readiness",
    solution: "Automation Scripting Tool — automated test scripts for validation activities",
    aiCapability: "AI-assisted test creation, analysis, and troubleshooting",
    outcome: "Shorter validation cycles, reduced engineering effort",
  },
  {
    badge: "Shop Floor",
    title: "Shop Floor Mobility",
    challenge: "Taking MES transactions closer to where work happens on the shop floor",
    solution: "Shop Floor Mobility Accelerator — handheld-ready MES transactions at point of work",
    aiCapability: "Contextual AI assistance at the point of action",
    outcome: "Improved operator productivity, reduced workstation dependency",
  },
];

const roiCards = [
  {
    title: "ECO Impact Analysis",
    traditional: "Hours of manual dependency analysis",
    aiAssisted: "Minutes",
    values: ["Faster ECO review", "Reduced engineering effort", "Lower risk of missed dependencies"],
  },
  {
    title: "Issue Investigation",
    traditional: "Hours spent searching across systems and documentation",
    aiAssisted: "Minutes to relevant context",
    values: ["Faster troubleshooting", "Reduced support effort", "Reduced disruption"],
  },
  {
    title: "MES Development",
    traditional: "High development and analysis effort",
    aiAssisted: "Reduced development effort",
    values: ["Faster delivery", "Higher developer productivity"],
  },
  {
    title: "Validation",
    traditional: "Manual test creation and analysis",
    aiAssisted: "Accelerated validation activities",
    values: ["Shorter validation cycles", "Reduced engineering effort"],
  },
];

const ecosystemInputs = [
  { label: "MES", icon: Server },
  { label: "Equipment", icon: Cog },
  { label: "Engineering", icon: Wrench },
  { label: "Quality", icon: ShieldCheck },
  { label: "Production", icon: Factory },
  { label: "Enterprise Systems", icon: Building2 },
  { label: "Manufacturing Data", icon: Database },
];

const ecosystemCoreFeatures = [
  { label: "Manufacturing Context", icon: Layers },
  { label: "AI Agents", icon: Bot },
  { label: "Accelerators", icon: Rocket },
  { label: "Use Cases", icon: ClipboardCheck },
];

const ecosystemOutputs = [
  { label: "Insights", icon: Eye },
  { label: "Recommendations", icon: Lightbulb },
  { label: "Assistance", icon: MessageSquare },
  { label: "Impact Analysis", icon: GitBranch },
  { label: "Development", icon: Code2 },
];

const whyAthenaSpokes = [
  { title: "MES Expertise", desc: "Deep Siemens Opcenter and manufacturing execution knowledge", icon: Server },
  { title: "Manufacturing Experience", desc: "Years solving complex production challenges", icon: Factory },
  { title: "Industry Knowledge", desc: "Semiconductor, medical devices, electronics, and more", icon: CircuitBoard },
  { title: "Proven Accelerators", desc: "Purpose-built solutions with measurable outcomes", icon: Rocket },
  { title: "Customer Problem Solving", desc: "Every challenge brings new insight and capability", icon: Users },
  { title: "AI Innovation", desc: "Manufacturing context meets agentic AI intelligence", icon: Sparkles },
];

export default function FabOrchestratorClient() {
  const [activeCapability, setActiveCapability] = useState("modeling");

  const activeCap = capabilityDetails.find((c) => c.id === activeCapability) || capabilityDetails[2];

  return (
    <div className="fab-page-light min-h-screen bg-white text-slate-900">

      <HeroSection
        title="Manufacturing Intelligence, Orchestrated by AI."
        description="FabOrchestrator.AI brings AI-powered intelligence into the heart of manufacturing—combining Athena's deep MES expertise, manufacturing context, proven accelerators, and AI agents to help teams make faster decisions, solve problems faster, and deliver more with less effort."
        image="/assets/images/FabOrchestratorAI.webp"
        align="left"
        buttonText="Explore FabOrchestrator.AI"
        buttonLink="#product-intro"
        secondaryButtonText="Talk to an Expert"
        secondaryButtonLink="#demo-form"
      />

      <section className="fab-product-intro" id="product-intro">
        <div className="fab-container">
          <ScrollReveal>
            <div className="intro-header">
              <span className="fab-section-label">Product Overview</span>
              <h2 className="fab-section-title">
                One Intelligence Layer. Four AI-Powered Capabilities.
              </h2>
              <p className="fab-section-subtitle">
                Manufacturing teams work across complex systems, processes, data, and decisions every day.
                FabOrchestrator.AI brings AI into this environment through a unified intelligence layer designed
                around real manufacturing operations. It helps teams understand what is happening, get the right
                assistance, evaluate what could change, and accelerate what needs to be built.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="product-diagram">
              <div className="diagram-sources">
                {manufacturingSources.map((s) => (
                  <div className="source-pill" key={s.label}>
                    <s.icon />
                    {s.label}
                  </div>
                ))}
              </div>
             
              <div className="diagram-center">
                <div className="center-hub">
                  <div className="hub-glow" />
                  <Brain />
                  FABORCHESTRATOR.AI
                </div>
              </div>

              <div className="diagram-capabilities">
                {capabilityPreviews.map((cap) => (
                  <div
                    className="capability-preview-card"
                    key={cap.id}
                    onClick={() => {
                      setActiveCapability(cap.id);
                      const el = document.getElementById("capabilities");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <div className="cap-icon">
                      <cap.icon />
                    </div>
                    <h4>{cap.name}</h4>
                    <p>{cap.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <section className="fab-capabilities" id="capabilities">
        <div className="fab-container">
          <ScrollReveal>
            <div className="cap-header">
              <span className="fab-section-label">AI Capabilities</span>
              <h2 className="fab-section-title">
                AI-Powered Intelligence Across the Manufacturing Lifecycle.
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="cap-tabs">
              {capabilityDetails.map((cap) => (
                <button
                  key={cap.id}
                  className={`cap-tab ${activeCapability === cap.id ? "active" : ""}`}
                  onClick={() => setActiveCapability(cap.id)}
                >
                  <cap.icon />
                  {cap.name}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="cap-detail">
              <div className="cap-detail-top">
                <div className="cap-info">
                  <div className="cap-info-icon">
                    <activeCap.icon />
                  </div>
                  <h3>{activeCap.name}</h3>
                  <div className="cap-tagline">{activeCap.tagline}</div>
                  <p>{activeCap.description}</p>
                </div>
                <div className="cap-flow">
                  <div className="flow-title">How It Works</div>
                  <div className="flow-steps">
                    {activeCap.flow.map((step, i) => (
                      <div className="flow-step" key={i}>
                        <div className="step-indicator">
                          <div className="step-dot">{step.step}</div>
                          <div className="step-line" />
                        </div>
                        <div className="step-content">
                          <h5>{step.title}</h5>
                          <p>{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="fab-business-value">
        <div className="fab-container">
          <ScrollReveal>
            <div className="bv-header">
              <span className="fab-section-label">Business Value</span>
              <h2 className="fab-section-title">
                From Manufacturing Complexity to Faster Decisions.
              </h2>
              <p className="fab-section-subtitle">
                FabOrchestrator.AI is designed around the moments where manufacturing teams spend valuable time—
                searching, investigating, analyzing, developing, and deciding.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bv-journey">
              {businessValueStages.map((stage) => (
                <div className="bv-stage" key={stage.name}>
                  <div className="stage-icon">
                    <stage.icon />
                  </div>
                  <div className="stage-name">{stage.name}</div>
                  <div className="stage-bars">
                    <div className="bar-group traditional">
                      <div className="bar-label">Traditional</div>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: `${stage.traditional}%` }} />
                      </div>
                    </div>
                    <div className="bar-group ai-assisted">
                      <div className="bar-label">AI-Assisted</div>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: `${stage.ai}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bv-message">
              <div className="bv-tagline">Less time on the process. More time on the outcome.</div>
              <div className="bv-subline">AI removes friction from manufacturing decision-making.</div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="fab-differentiator">
        <div className="fab-container">
          <div className="diff-layout">
            <ScrollReveal>
              <div className="diff-content">
                <span className="fab-section-label">The Differentiator</span>
                <h2>AI Is Powerful. Manufacturing Context Makes It Valuable.</h2>
                <p className="diff-intro">
                  Generic AI can generate answers. Manufacturing AI needs to understand the context
                  behind the question.
                </p>
                <ul className="diff-questions">
                  {differentiatorQuestions.map((q) => (
                    <li key={q}>
                      <HelpCircle />
                      {q}
                    </li>
                  ))}
                </ul>
                <div className="diff-conclusion">
                  FabOrchestrator.AI is designed around this manufacturing context—not bolted onto a generic AI platform.
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="diff-visual">
                <div className="brain-layers">
                  <div className="brain-layer">
                    <div className="brain-layer-label">Manufacturing Knowledge</div>
                    <div className="brain-grid">
                      {manufacturingKnowledge.map((item) => (
                        <div className="brain-tag" key={item.label}>
                          <item.icon />
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="brain-center">
                    <Brain />
                    AI Intelligence
                  </div>

                  <div className="brain-layer">
                    <div className="brain-layer-label">Output</div>
                    <div className="brain-outputs">
                      <div className="output-chip"><Lightbulb /> Insight</div>
                      <div className="output-chip"><Target /> Recommendation</div>
                      <div className="output-chip"><Rocket /> Action</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="fab-journey">
        <div className="fab-container">
          <ScrollReveal>
            <div className="journey-header">
              <span className="fab-section-label">The Athena Journey</span>
              <h2 className="fab-section-title">
                FabOrchestrator.AI Didn&apos;t Start With AI.
              </h2>
              <p className="fab-section-subtitle">
                It started with real manufacturing problems. Athena has spent years working with manufacturers
                across complex production environments. Every customer challenge brought new insight.
                When we saw recurring patterns, we turned that experience into repeatable solutions,
                accelerators, and proven manufacturing use cases.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="journey-timeline">


            </div>
          </ScrollReveal>
        </div>
      </section>

       <section className="fab-proven">
        <div className="fab-container">
          <ScrollReveal>
            <div className="proven-header">
              <span className="fab-section-label">Proven Experience</span>
              <h2 className="fab-section-title">
                Built From What We Know. Expanded by What AI Can Do.
              </h2>
              <p className="fab-section-subtitle">
                Real manufacturing challenges, solved by Athena accelerators, and now empowered by AI.
              </p>
            </div>
          </ScrollReveal>

          <div className="proven-grid">
            {provenExamples.map((example, i) => (
              <ScrollReveal key={example.title} delay={i * 0.08}>
                <div className="proven-card">
                  <div className="proven-card-header">
                    <span className="proven-badge">{example.badge}</span>
                    <h4>{example.title}</h4>
                  </div>
                  <div className="proven-card-body">
                    <div className="proven-flow">
                      <div className="proven-flow-step">
                        <div className="pf-indicator">
                          <div className="pf-dot challenge"><AlertCircle /></div>
                          <div className="pf-line" />
                        </div>
                        <div className="pf-content">
                          <div className="pf-label">Challenge</div>
                          <p>{example.challenge}</p>
                        </div>
                      </div>
                      <div className="proven-flow-step">
                        <div className="pf-indicator">
                          <div className="pf-dot solution"><Wrench /></div>
                          <div className="pf-line" />
                        </div>
                        <div className="pf-content">
                          <div className="pf-label">Athena Solution</div>
                          <p>{example.solution}</p>
                        </div>
                      </div>
                      <div className="proven-flow-step">
                        <div className="pf-indicator">
                          <div className="pf-dot ai"><Sparkles /></div>
                          <div className="pf-line" />
                        </div>
                        <div className="pf-content">
                          <div className="pf-label">AI Empowerment</div>
                          <p>{example.aiCapability}</p>
                        </div>
                      </div>
                      <div className="proven-flow-step">
                        <div className="pf-indicator">
                          <div className="pf-dot result"><Check /></div>
                        </div>
                        <div className="pf-content">
                          <div className="pf-label">Outcome</div>
                          <p>{example.outcome}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="fab-roi">
        <div className="fab-container">
          <ScrollReveal>
            <div className="roi-header">
              <span className="fab-section-label">ROI</span>
              <h2 className="fab-section-title">
                What If Hours of Manufacturing Work Could Become Minutes?
              </h2>
              <p className="fab-section-subtitle">
                The value of AI isn&apos;t the number of models behind it. It&apos;s the time, effort, and cost
                it removes from manufacturing processes.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="roi-grid">
              {roiCards.map((card) => (
                <div className="roi-card" key={card.title}>
                  <div className="roi-card-title">{card.title}</div>
                  <div className="roi-card-body">
                    <div className="roi-compare">
                      <div className="roi-compare-label traditional">Traditional</div>
                      <div className="roi-compare-value">{card.traditional}</div>
                    </div>
                    <div className="roi-compare">
                      <div className="roi-compare-label ai">AI-Assisted</div>
                      <div className="roi-compare-value">{card.aiAssisted}</div>
                    </div>
                    <ul className="roi-value-list">
                      {card.values.map((v) => (
                        <li key={v}><Check /> {v}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="roi-formula">
              <div className="formula-title">Potential Business Value</div>
              <div className="formula-equation">
                <div className="formula-block">
                  <span className="formula-value">Time Saved</span>
                  <span className="formula-label">Per Activity</span>
                </div>
                <div className="formula-operator">×</div>
                <div className="formula-block">
                  <span className="formula-value">Frequency</span>
                  <span className="formula-label">Activity Volume</span>
                </div>
                <div className="formula-operator">×</div>
                <div className="formula-block">
                  <span className="formula-value">Cost</span>
                  <span className="formula-label">Effort Cost</span>
                </div>
                <div className="formula-operator">=</div>
                <div className="formula-block">
                  <span className="formula-value" style={{ color: "#17ace4" }}>ROI</span>
                  <span className="formula-label">Business Value</span>
                </div>
              </div>
              <Link href="#demo-form" className="formula-cta">
                Discover Your AI ROI Opportunity
                <ArrowRight />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="fab-ecosystem">
        <div className="fab-container">
          <ScrollReveal>
            <div className="eco-header">
              <span className="fab-section-label">Ecosystem Integration</span>
              <h2 className="fab-section-title">
                AI That Works With Your Manufacturing Ecosystem.
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="eco-diagram">
              <div className="eco-inputs">
                {ecosystemInputs.map((item) => (
                  <div className="eco-input-tag" key={item.label}>
                    <item.icon />
                    {item.label}
                  </div>
                ))}
              </div>

              <div className="eco-core">
                <div className="eco-core-title">
                  <Brain />
                  FABORCHESTRATOR.AI
                </div>
                <div className="eco-core-features">
                  {ecosystemCoreFeatures.map((f) => (
                    <div className="eco-feature" key={f.label}>
                      <f.icon />
                      {f.label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="eco-outputs">
                {ecosystemOutputs.map((item) => (
                  <div className="eco-output-tag" key={item.label}>
                    <item.icon />
                    {item.label}
                  </div>
                ))}
              </div>

              <div className="eco-statement">
                <p>
                  FabOrchestrator.AI doesn&apos;t replace your manufacturing systems.
                  It makes your manufacturing ecosystem more intelligent.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="fab-why-athena">
        <div className="fab-container">
          <ScrollReveal>
            <div className="why-header">
              <span className="fab-section-label">Why Athena</span>
              <h2 className="fab-section-title">
                Deep Manufacturing Expertise. Now Empowered by AI.
              </h2>
              <p className="fab-section-subtitle">
                FabOrchestrator.AI is backed by Athena&apos;s experience in solving complex manufacturing
                challenges—not built as a generic AI layer and applied to manufacturing afterward.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="why-wheel">
              <div className="why-center">
                <div className="why-hub">
                  <Sparkles />
                  FABORCHESTRATOR.AI
                </div>
              </div>

              <div className="why-spokes">
                {whyAthenaSpokes.map((spoke) => (
                  <div className="why-spoke" key={spoke.title}>
                    <div className="spoke-icon">
                      <spoke.icon />
                    </div>
                    <h4>{spoke.title}</h4>
                    <p>{spoke.desc}</p>
                  </div>
                ))}
              </div>

              <div className="why-conclusion">
                <p className="conclusion-text">
                  <strong>AI is the technology.</strong> Manufacturing expertise is the brain.
                  FabOrchestrator.AI brings them together.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="fab-final-cta">
        <div className="fab-container">
          <ScrollReveal>
            <div className="cta-inner">
              <h2>
                Your Factory Already Has the Data.<br />
                Your Teams Already Have the Expertise.<br />
                Now Put AI to Work.
              </h2>
              <p className="cta-description">
                FabOrchestrator.AI brings Athena&apos;s manufacturing intelligence together with AI-powered
                capabilities to help your teams make faster decisions, solve problems faster, and deliver
                measurable operational value.
              </p>

              <div className="cta-flow">
                {["Manufacturing Data", "FabOrchestrator.AI", "AI Intelligence", "Decision", "Action", "Measurable ROI"].map((step, i, arr) => (
                  <React.Fragment key={step}>
                    <div className="cta-flow-step">{step}</div>
                    {i < arr.length - 1 && (
                      <div className="cta-flow-arrow"><ArrowRight /></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="cta-buttons">
                <Link href="#demo-form" className="cta-btn-primary">
                  Talk to a Manufacturing AI Expert
                  <ArrowRight />
                </Link>
                <Link href="#demo-form" className="cta-btn-secondary">
                  Request a Demo
                  <Send />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="fab-demo-section" id="demo-form">
        <div className="fab-container">
          <div className="demo-layout">
            <ScrollReveal>
              <div className="demo-info">
                <span className="fab-section-label">Get Started</span>
                <h2>See FabOrchestrator.AI in Action</h2>
                <p>
                  Schedule a personalized demo to explore how AI-powered manufacturing intelligence
                  can transform your team&apos;s decision-making, problem-solving, and delivery speed.
                </p>
                <ul className="demo-benefits">
                  <li><Check /> Personalized to your manufacturing environment</li>
                  <li><Check /> See all four AI capabilities in action</li>
                  <li><Check /> Understand the ROI opportunity for your team</li>
                  <li><Check /> Live walkthrough with a manufacturing AI specialist</li>
                  <li><Check /> No commitment required</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="demo-form-card">
                <FabOrchestratorDemoForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

    </div>
  );
}
