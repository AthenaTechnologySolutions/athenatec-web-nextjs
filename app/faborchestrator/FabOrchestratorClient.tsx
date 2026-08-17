"use client";

import React, { useState } from "react";
import Image from "next/image";
import HeroSection from "@/app/components/HeroSection";
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
  ChevronRight,
  X,
  Bot,
  Brain,
  Sliders,
  Server,
  RefreshCw,
  FileCode,
  ShieldCheck,
  Clock,
  TrendingUp,
  Database,
  Building2,
  Workflow,
  Wrench,
  Check,
  Send,
  AlertCircle,
  HelpCircle,
  Award,
  Network,
} from "lucide-react";
import "./faborchestrator.scss";

const CF7_FORM_ID = "233708";
const CF7_URL = `/api/cf7/${CF7_FORM_ID}`;

interface AgentCapability {
  id: string;
  name: string;
  sub: string;
  headline: string;
  description: string;
  icon: any;
  challenge: string;
  aiAction: string;
  result: string;
  workflowSteps: { step: string; title: string; desc: string }[];
  promptExample: string;
  terminalCode: string;
}

const AGENTS_DATA: AgentCapability[] = [
  {
    id: "insight",
    name: "FabInsight",
    sub: "Operational Intelligence",
    headline: "Turn manufacturing data into actionable intelligence.",
    description:
      "Get contextual operational insights from manufacturing data and information to support faster, better-informed decisions.",
    icon: BarChart3,
    challenge: "High volume of fragmented sensor & MES telemetry causing delayed visibility into cleanroom lot yield drops.",
    aiAction: "FabInsight ingests telemetry across MES & Equipment, executes correlation reasoning, and pinpoints root-cause anomalies.",
    result: "Instant contextual operational dashboard with recommended parameter adjustments.",
    promptExample: "FabInsight, analyze lot yield drop on Chamber-4B and correlate against recent maintenance events.",
    terminalCode: `[QUERY] Executing correlation engine across 4,200 sensor parameters...
[CORRELATION DETECTED] Gas Flow Variance at RF Generator #2 (+4.2% stddev)
[ROOT CAUSE PROBABILITY] 94.8% confidence match with Lot #30948 yield drop
[RECOMMENDED ACTION] Recalibrate Mass Flow Controller (MFC-102) & hold Lot #30949
[STATUS] Insight package dispatched to Fab Floor Dashboard.`,
    workflowSteps: [
      { step: "01", title: "Data Ingestion", desc: "Collects real-time telemetry from MES, sensors & equipment logs." },
      { step: "02", title: "Contextual AI Synthesis", desc: "Correlates operational parameters against historical baseline norms." },
      { step: "03", title: "Actionable Insights", desc: "Delivers live anomaly alerts with exact root-cause probabilities." },
    ],
  },
  {
    id: "support",
    name: "AI Support Agent",
    sub: "Contextual Manufacturing Assistance",
    headline: "Resolve manufacturing issues with contextual AI assistance.",
    description:
      "Help teams investigate problems, find relevant information, and identify potential resolution paths faster.",
    icon: Bot,
    challenge: "Critical equipment breakdown ticket raised without clear resolution steps or historical pattern lookup.",
    aiAction: "AI Support Agent searches past work order tickets, spec documentation, and machine state history.",
    result: "Produces ranked diagnostic hypotheses and step-by-step resolution SOPs for line technicians.",
    promptExample: "AI Support Agent, retrieve past resolution SOPs for Error Code E-4092 on Siemens Opcenter dispatch.",
    terminalCode: `[SEARCH] Querying 15,000+ historical work orders & equipment manuals...
[MATCH FOUND] Ticket #WO-8842 (2025-11-14): "Vacuum Seal Pressure Fault"
[DIAGNOSTIC PATH]
  1. Inspect O-ring seal on Gate Valve V-3
  2. Perform pneumatic leak check sequence #SOP-4092
  3. Verify pressure delta < 0.05 Torr
[ESTIMATED MTTR REDUCTION] -65% compared to manual lookup.`,
    workflowSteps: [
      { step: "01", title: "Issue Logged", desc: "Machine anomaly or floor ticket submitted by operator." },
      { step: "02", title: "Deep Context Lookup", desc: "Queries maintenance histories, spec sheets & historical tickets." },
      { step: "03", title: "Guided Repair", desc: "Provides step-by-step resolution path directly to line operator." },
    ],
  },
  {
    id: "modeling",
    name: "Modeling Agent",
    sub: "Impact Analysis",
    headline: "Understand the impact before you make the change.",
    description:
      "Analyze engineering and process changes across the manufacturing environment to identify potential downstream impacts.",
    icon: Activity,
    challenge: "Engineering Change Order (ECO) enters system requiring validation across active production lines.",
    aiAction: "Modeling Agent parses ECO rules, evaluates affected recipes, WIP lots, and equipment capabilities.",
    result: "Generates risk-assessed impact report highlighting affected line workflows and recipe rule conflicts.",
    promptExample: "Modeling Agent, model downstream impact of ECO-7091 updating thermal etch duration across active WIP.",
    terminalCode: `[ECO INPUT] ECO-7091: Thermal Etch Time updated from 45s -> 52s
[IMPACT AUDIT]
  - Affected Work In Progress: 14 active lots (420 wafers)
  - Affected Recipes: RECIPE_ETCH_300B_V2
  - Conflict Detected: Photolithography queue bottleneck at Step 40
[RISK LEVEL] MEDIUM (Potential +18 min queue delay)
[MITIGATION] Re-route 6 lots to Line-B Photolithography track #2.`,
    workflowSteps: [
      { step: "01", title: "ECO Enters System", desc: "New engineering change request received from PLM." },
      { step: "02", title: "Dependency Analysis", desc: "AI scans all active MES workflows, routing rules & WIP lots." },
      { step: "03", title: "Impact View Generated", desc: "Produces comprehensive risk & downstream affected process report." },
    ],
  },
  {
    id: "programming",
    name: "Programming Agent",
    sub: "Intelligent Development",
    headline: "Accelerate manufacturing solution development.",
    description:
      "Use AI-assisted intelligence to accelerate application logic, workflow development, and MES solution engineering.",
    icon: Terminal,
    challenge: "New custom MES transaction workflow required for custom cleanroom lot dispatch rule.",
    aiAction: "Programming Agent auto-generates boilerplate code, validation test scripts, and UI layout components.",
    result: "Reduces solution engineering cycle time from 3 weeks to 2 days with automated test coverage.",
    promptExample: "Programming Agent, generate Siemens Opcenter custom transaction handler for cleanroom lot dispatch validation.",
    terminalCode: `[GENERATE] MES Custom Transaction Handler Code...
[LANG] C# / Siemens Opcenter API Architecture
[OUTPUT]
  public class CustomDispatchValidation : ITransactionHandler {
    public Response Execute(LotContext context) {
      if (context.EquipmentState != EquipmentState.Ready) 
        return Response.Reject("Tool state invalid");
      return Response.Success();
    }
  }
[TEST SUITE] Automated QA script generated with 100% test coverage.`,
    workflowSteps: [
      { step: "01", title: "Spec Input", desc: "Engineer defines business logic requirement in plain language." },
      { step: "02", title: "Code & Logic Generation", desc: "AI writes robust MES business logic & API validation rules." },
      { step: "03", title: "Automated Test Suite", desc: "Generates simulation scripts for instant QA & deployment." },
    ],
  },
];

const PRESETS_DATA = [
  { label: "Pilot Fab", team: 10, hours: 8, rate: 65 },
  { label: "Semiconductor Line", team: 35, hours: 14, rate: 85 },
  { label: "Multi-Site Enterprise", team: 100, hours: 18, rate: 110 },
];

const SCENARIOS_DATA = [
  {
    id: "yield",
    title: "Lot Yield Anomaly Analysis",
    description: "Investigating sudden wafer yield drop across Chamber 4B thermal etch.",
    stages: [
      { stage: "SEARCH", trad: "2.5 Hours", ai: "3 Mins", desc: "Scanning sensor telemetry & lot histories" },
      { stage: "INVESTIGATE", trad: "4.0 Hours", ai: "8 Mins", desc: "Cross-referencing tool maintenance logs" },
      { stage: "ANALYZE", trad: "6.0 Hours", ai: "15 Mins", desc: "Correlating gas flow variance vs yield" },
      { stage: "DECIDE", trad: "3.0 Hours", ai: "5 Mins", desc: "Formulating parameter recalibration" },
      { stage: "ACT", trad: "5.0 Hours", ai: "15 Mins", desc: "Applying recipe adjustment to MES" },
    ],
    totalTrad: "20.5 Hours",
    totalAi: "46 Minutes",
    timeSaved: "96%",
  },
  {
    id: "eco",
    title: "Engineering Change Order (ECO) Impact",
    description: "Evaluating downstream WIP impact of process temperature change.",
    stages: [
      { stage: "SEARCH", trad: "3.0 Hours", ai: "4 Mins", desc: "Parsing PLM specs & active WIP routing" },
      { stage: "INVESTIGATE", trad: "5.0 Hours", ai: "10 Mins", desc: "Checking equipment thermal limits" },
      { stage: "ANALYZE", trad: "5.5 Hours", ai: "12 Mins", desc: "Simulating bottleneck risk at photolith" },
      { stage: "DECIDE", trad: "2.5 Hours", ai: "4 Mins", desc: "Approving modified dispatch queue" },
      { stage: "ACT", trad: "2.0 Hours", ai: "5 Mins", desc: "Deploying updated ECO rule to MES" },
    ],
    totalTrad: "18.0 Hours",
    totalAi: "35 Minutes",
    timeSaved: "97%",
  },
  {
    id: "dev",
    title: "Custom MES Transaction Engineering",
    description: "Developing custom cleanroom lot dispatch rule with validation QA.",
    stages: [
      { stage: "SEARCH", trad: "4.0 Hours", ai: "5 Mins", desc: "Reviewing MES API documentation" },
      { stage: "INVESTIGATE", trad: "6.0 Hours", ai: "12 Mins", desc: "Mapping data schemas & constraints" },
      { stage: "ANALYZE", trad: "8.0 Hours", ai: "18 Mins", desc: "Generating boilerplate C# handler logic" },
      { stage: "DECIDE", trad: "2.0 Hours", ai: "5 Mins", desc: "Verifying automated test coverage" },
      { stage: "ACT", trad: "4.0 Hours", ai: "10 Mins", desc: "Deploying transaction to MES sandbox" },
    ],
    totalTrad: "24.0 Hours",
    totalAi: "50 Minutes",
    timeSaved: "96.5%",
  },
];

const PROVEN_EXPERIENCE_ITEMS = [
  {
    domain: "ENGINEERING CHANGE",
    name: "ECO Redliner",
    challenge: "Understanding the impact of engineering changes.",
    empowerment: "AI-assisted impact analysis (Modeling Agent)",
    outcome: "Faster ECO Decisions",
  },
  {
    domain: "MASTER DATA",
    name: "Master Data Migrator",
    challenge: "Moving and synchronizing complex manufacturing data.",
    empowerment: "AI-assisted understanding, analysis, and action.",
    outcome: "Faster Master Data Synchronization",
  },
  {
    domain: "MES VALIDATION",
    name: "Automation Testing",
    challenge: "Reducing effort involved in MES validation.",
    empowerment: "AI-assisted test creation, analysis, and troubleshooting.",
    outcome: "Accelerated MES Validation",
  },
  {
    domain: "SHOP FLOOR",
    name: "Shop Floor Mobility",
    challenge: "Taking MES transactions closer to where work happens.",
    empowerment: "Contextual AI assistance at the point of action.",
    outcome: "Guided Cleanroom & Shop Floor Operations",
  },
];

const ROI_CARDS = [
  {
    title: "ECO IMPACT ANALYSIS",
    trad: "Hours of manual dependency analysis",
    ai: "Minutes",
    value: "Faster ECO review | Reduced engineering effort | Lower risk of missed dependencies",
  },
  {
    title: "ISSUE INVESTIGATION",
    trad: "Hours spent searching across systems and documentation",
    ai: "Minutes to relevant context",
    value: "Faster troubleshooting | Reduced support effort | Reduced disruption",
  },
  {
    title: "MES DEVELOPMENT",
    trad: "High development and analysis effort",
    ai: "Reduced development effort",
    value: "Faster delivery | Higher developer productivity",
  },
  {
    title: "VALIDATION",
    trad: "Manual test creation and analysis",
    ai: "Accelerated validation activities",
    value: "Shorter validation cycles | Reduced engineering effort",
  },
];

// Form Component connected to CF7 Form 233708
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
            className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none transition-all ${
              darkBg
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
            className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none transition-all ${
              darkBg
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
            className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none transition-all ${
              darkBg
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
            className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none transition-all ${
              darkBg
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
          className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none transition-all ${
            darkBg
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
          className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none transition-all ${
            darkBg
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
        className={`w-full py-3.5 rounded-xl font-bold transition-all text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
          darkBg
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

export default function FabOrchestratorClient() {
  const [selectedAgentId, setSelectedAgentId] = useState<string>("modeling");
  const [activeTabMode, setActiveTabMode] = useState<"overview" | "terminal">("overview");
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("yield");
  const [selectedEcosystemTab, setSelectedEcosystemTab] = useState<"mes" | "equipment" | "enterprise">("mes");
  const [activePresetIndex, setActivePresetIndex] = useState<number>(1);

  // ROI Calculator State
  const [teamSize, setTeamSize] = useState<number>(35);
  const [weeklyHours, setWeeklyHours] = useState<number>(14);
  const [hourlyRate, setHourlyRate] = useState<number>(85);

  const activeAgent = AGENTS_DATA.find((a) => a.id === selectedAgentId) || AGENTS_DATA[2];
  const activeScenario = SCENARIOS_DATA.find((s) => s.id === selectedScenarioId) || SCENARIOS_DATA[0];

  // ROI Calculations
  const traditionalTotalHoursAnnual = teamSize * weeklyHours * 50;
  const hoursSavedAnnual = Math.round(traditionalTotalHoursAnnual * 0.72);
  const annualSavingsDollars = hoursSavedAnnual * hourlyRate;

  const handlePresetClick = (idx: number) => {
    setActivePresetIndex(idx);
    const p = PRESETS_DATA[idx];
    setTeamSize(p.team);
    setWeeklyHours(p.hours);
    setHourlyRate(p.rate);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fab-page-light min-h-screen bg-white text-slate-900">
      {/* 01 — HERO */}
      <HeroSection
        title="Manufacturing Intelligence, Orchestrated by AI."
        description="FabOrchestrator.AI brings AI-powered intelligence into the heart of manufacturing—combining Athena’s deep MES expertise, manufacturing context, proven accelerators, and AI agents to help teams make faster decisions, solve problems faster, and deliver more with less effort."
        image="/assets/images/002.webp"
        align="left"
        buttonText="Explore FabOrchestrator.AI"
        buttonLink="#product-intro"
        secondaryButtonText="Talk to an Expert"
        secondaryButtonLink="#demo-form"
      />

      {/* Hero Animation Flow Banner — Manufacturing -> Intelligence -> Action */}
      {/* <div className="bg-slate-900 border-y border-slate-800 py-6 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-3">
            <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-widest font-bold">
              Built on Manufacturing Expertise. Empowered by AI.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center text-center">
            <div className="md:col-span-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                MANUFACTURING SOURCES
              </span>
              <div className="flex flex-wrap justify-center gap-1.5 text-xs font-mono font-semibold text-slate-300">
                {["MES", "Equipment", "Engineering", "Quality", "Production", "Enterprise Data"].map((src) => (
                  <span key={src} className="px-2.5 py-1 rounded-md bg-slate-800/90 border border-slate-700">
                    {src}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 p-4 rounded-2xl bg-[#1c4584] border border-cyan-400/40 shadow-xl space-y-1">
              <div className="flex items-center justify-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-300" />
                <h4 className="text-base font-extrabold tracking-wider text-white">FABORCHESTRATOR.AI</h4>
              </div>
              <p className="text-[11px] text-sky-200 font-mono">Digital Manufacturing Control Layer</p>
            </div>

            <div className="md:col-span-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">
                INTELLIGENT OUTPUTS
              </span>
              <div className="flex flex-wrap justify-center gap-1.5 text-xs font-mono font-bold text-emerald-300">
                {["Insights", "Assistance", "Impact Analysis", "Development"].map((out) => (
                  <span key={out} className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-700/60">
                    {out}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Sticky Sub-Navigation */}
      <nav className="sticky-nav-bar hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1.5 font-bold text-[#1c4584]">
              <Cpu className="w-4 h-4 text-sky-600" />
              <span>FABORCHESTRATOR.AI</span>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => scrollToSection("product-intro")} className="hover:text-[#1c4584] transition-colors">
                Product Overview
              </button>
              <button onClick={() => scrollToSection("capabilities")} className="hover:text-[#1c4584] transition-colors">
                4 Capabilities
              </button>
              <button onClick={() => scrollToSection("business-value")} className="hover:text-[#1c4584] transition-colors">
                Business Value
              </button>
              <button onClick={() => scrollToSection("athena-differentiator")} className="hover:text-[#1c4584] transition-colors">
                Context Engine
              </button>
              <button onClick={() => scrollToSection("athena-journey")} className="hover:text-[#1c4584] transition-colors">
                Athena Journey
              </button>
              <button onClick={() => scrollToSection("proven-experience")} className="hover:text-[#1c4584] transition-colors">
                Accelerators
              </button>
              <button onClick={() => scrollToSection("roi-section")} className="hover:text-[#1c4584] transition-colors">
                ROI
              </button>
              <button onClick={() => scrollToSection("ecosystem-map")} className="hover:text-[#1c4584] transition-colors">
                Ecosystem
              </button>
            </div>
            <button
              onClick={() => scrollToSection("demo-form")}
              className="px-4 py-1.5 rounded-full bg-[#1c4584] text-white hover:bg-[#153566] transition-colors font-bold text-xs shadow-sm cursor-pointer"
            >
              Talk to an Expert
            </button>
          </div>
        </div>
      </nav>

      {/* 02 — PRODUCT INTRODUCTION */}
      <section id="product-intro" className="py-10 sm:py-14 relative border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              One Intelligence Layer. <span className="text-gradient-athena">Four AI-Powered Capabilities.</span>
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Manufacturing teams work across complex systems, processes, data, and decisions every day.
              FabOrchestrator.AI brings AI into this environment through a unified intelligence layer designed around real manufacturing operations.
              It helps teams understand what is happening, get the right assistance, evaluate what could change, and accelerate what needs to be built.
            </p>
          </div>

          {/* Interactive Product Diagram */}
          <div className="relative p-6 sm:p-8 rounded-3xl light-panel border border-slate-200 bg-white shadow-xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-6">
              <span className="text-xs font-mono text-slate-500 tracking-widest uppercase font-bold flex items-center gap-2">
                <Workflow className="w-4 h-4 text-sky-600" /> MAIN PRODUCT DIAGRAM // CLICK ANY AGENT TO EXPLORE
              </span>
              <span className="text-xs font-mono text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                ● Live MES Telemetry Active
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {["MES", "Equipment", "Engineering", "Data", "Manufacturing Systems"].map((sys) => (
                <span
                  key={sys}
                  className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700"
                >
                  {sys}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-4 space-y-3.5">
                {[AGENTS_DATA[0], AGENTS_DATA[1]].map((agent) => {
                  const Icon = agent.icon;
                  const isActive = selectedAgentId === agent.id;
                  return (
                    <div
                      key={agent.id}
                      onClick={() => {
                        setSelectedAgentId(agent.id);
                        scrollToSection("capabilities");
                      }}
                      className={`diagram-orbit-card-light p-5 rounded-2xl border transition-all ${isActive
                          ? "bg-sky-50 border-[#1c4584] shadow-md shadow-sky-100"
                          : "bg-white border-slate-200 hover:border-sky-300"
                        }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-xl ${isActive ? "bg-[#1c4584] text-white" : "bg-sky-100 text-[#1c4584]"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm">{agent.name}</h3>
                          <span className="text-[11px] text-[#1c4584] font-semibold">{agent.sub}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-snug">{agent.headline}</p>
                    </div>
                  );
                })}
              </div>

              <div className="md:col-span-4 my-4 md:my-0">
                <div className="diagram-core-light p-6 rounded-3xl text-center relative flex flex-col items-center justify-center min-h-[240px]">
                  <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping mb-3" />
                  <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-wider mb-2">
                    FABORCHESTRATOR.AI
                  </h3>
                  <p className="text-xs text-sky-100 max-w-xs leading-relaxed mb-3">
                    Unified Manufacturing Intelligence & Orchestration Layer
                  </p>
                  <div className="px-3.5 py-1 rounded-full bg-slate-900/70 border border-cyan-300 text-[10px] text-cyan-200 font-mono font-bold tracking-wider">
                    ATHENA MES KNOWLEDGE GRAPH
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 space-y-3.5">
                {[AGENTS_DATA[2], AGENTS_DATA[3]].map((agent) => {
                  const Icon = agent.icon;
                  const isActive = selectedAgentId === agent.id;
                  return (
                    <div
                      key={agent.id}
                      onClick={() => {
                        setSelectedAgentId(agent.id);
                        scrollToSection("capabilities");
                      }}
                      className={`diagram-orbit-card-light p-5 rounded-2xl border transition-all ${isActive
                          ? "bg-sky-50 border-[#1c4584] shadow-md shadow-sky-100"
                          : "bg-white border-slate-200 hover:border-sky-300"
                        }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-xl ${isActive ? "bg-[#1c4584] text-white" : "bg-sky-100 text-[#1c4584]"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm">{agent.name}</h3>
                          <span className="text-[11px] text-[#1c4584] font-semibold">{agent.sub}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-snug">{agent.headline}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — FOUR CAPABILITIES (Four-Quadrant Interactive Experience) */}
      <section id="capabilities" className="py-10 sm:py-14 relative border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              AI-Powered Intelligence Across the <span className="text-gradient-athena">Manufacturing Lifecycle.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Select an agent capability below to see its complete execution flow from challenge to result.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
            {AGENTS_DATA.map((agent) => {
              const Icon = agent.icon;
              const isActive = selectedAgentId === agent.id;
              return (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgentId(agent.id)}
                  className={`quadrant-tab-light ${isActive ? "active" : ""}`}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#1c4584]" : "text-slate-500"}`} />
                    <h3 className="font-bold text-slate-900 text-sm">{agent.name}</h3>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{agent.sub}</p>
                </div>
              );
            })}
          </div>

          {/* Four-Quadrant Interactive Explorer Container */}
          <div className="p-6 sm:p-8 rounded-3xl light-panel border border-slate-200 bg-slate-50 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#1c4584] text-white shadow-md">
                    {React.createElement(activeAgent.icon, { className: "w-5 h-5" })}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#1c4584] uppercase tracking-widest font-bold">
                      CAPABILITY DETAIL
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">{activeAgent.name}</h3>
                  </div>
                </div>

                <h4 className="text-base font-semibold text-[#1c4584] leading-snug">
                  {activeAgent.headline}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeAgent.description}
                </p>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-sm">
                  <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
                    Manufacturing Challenge Addressed:
                  </span>
                  <p className="text-xs text-slate-700 font-medium">{activeAgent.challenge}</p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 space-y-5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <span className="text-[11px] font-mono text-[#1c4584] uppercase font-bold">
                      AGENT INTERACTION FLOW // {activeAgent.name.toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Live Reasoning Engine
                    </span>
                  </div>

                  <div className="space-y-3">
                    {activeAgent.workflowSteps.map((s) => (
                      <div
                        key={s.step}
                        className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#1c4584]/40 transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#1c4584] text-white font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {s.step}
                        </div>
                        <div className="space-y-0.5">
                          <h5 className="text-xs font-bold text-slate-900">{s.title}</h5>
                          <p className="text-[11px] text-slate-600">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                        Verified Operational Outcome:
                      </span>
                      <p className="text-xs text-emerald-950 font-semibold mt-0.5">
                        {activeAgent.result}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — BUSINESS VALUE ("Time is the Productivity Gap") */}
      <section id="business-value" className="py-10 sm:py-14 relative border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              From Manufacturing Complexity to <span className="text-gradient-athena">Faster Decisions.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              FabOrchestrator.AI is designed around the moments where manufacturing teams spend valuable time—searching,
              investigating, analyzing, developing, and deciding.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl light-panel border border-slate-200 bg-white space-y-8 shadow-lg">
            <div className="text-center border-b border-slate-100 pb-3">
              <span className="text-xs font-mono text-[#1c4584] uppercase tracking-widest font-bold">
                TIME IS THE PRODUCTIVITY GAP // EFFORT SHRINKAGE JOURNEY
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 text-center">
              {activeScenario.stages.map((item) => {
                const iconMap: Record<string, any> = {
                  SEARCH: Search,
                  INVESTIGATE: Layers,
                  ANALYZE: Activity,
                  DECIDE: Brain,
                  ACT: Zap,
                };
                const Icon = iconMap[item.stage] || Zap;
                return (
                  <div key={item.stage} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <div className="w-9 h-9 rounded-xl bg-sky-100 text-[#1c4584] mx-auto flex items-center justify-center font-bold">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs tracking-wide">{item.stage}</h4>
                    <p className="text-[11px] text-slate-500 h-7 flex items-center justify-center">{item.desc}</p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-200 text-left">
                      <div>
                        <div className="flex justify-between text-[10px] text-slate-500 mb-0.5 font-medium">
                          <span>Traditional Effort:</span>
                          <span className="text-amber-600 font-mono font-bold">{item.trad}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 w-full" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] text-slate-500 mb-0.5 font-medium">
                          <span>AI-Assisted Effort:</span>
                          <span className="text-[#1c4584] font-mono font-bold">{item.ai}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-[#1c4584] w-2/12 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-[#1c4584] text-center max-w-xl mx-auto shadow-md">
              <span className="text-sm sm:text-base font-bold text-white">
                Less time on the process. More time on the outcome.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — THE ATHENA DIFFERENTIATOR ("The Manufacturing Brain") */}
      <section id="athena-differentiator" className="py-10 sm:py-14 relative border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                AI Is Powerful. <br />
                <span className="text-gradient-athena">Manufacturing Context Makes It Valuable.</span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Generic AI can generate answers. Manufacturing AI needs to understand the context behind the question.
              </p>

              <div className="space-y-2.5">
                {[
                  "What process is running?",
                  "What equipment is involved?",
                  "What workflow is affected?",
                  "What happens to WIP?",
                  "What rules or master data are involved?",
                  "What happens downstream?",
                ].map((q) => (
                  <div key={q} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="w-5 h-5 rounded-full bg-sky-100 text-[#1c4584] flex items-center justify-center text-xs font-bold flex-shrink-0">
                      ?
                    </div>
                    <span className="text-xs sm:text-sm text-slate-800 font-semibold">{q}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs sm:text-sm font-bold text-[#1c4584]">
                FabOrchestrator.AI is designed around this manufacturing context.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 sm:p-8 rounded-3xl light-panel border border-slate-200 bg-slate-50 text-center relative space-y-5 shadow-md">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">
                  THE MANUFACTURING BRAIN
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Processes", "MES", "Equipment", "Workflows", "WIP", "Rules", "Engineering", "Data"].map((item) => (
                    <div
                      key={item}
                      className="p-2.5 rounded-xl bg-white border border-slate-200 text-center text-xs font-bold text-slate-700 shadow-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-mono text-[#1c4584] uppercase mb-0.5 font-bold">ALL FEEDING INTO</span>
                    <div className="w-0.5 h-5 bg-[#1c4584] animate-pulse" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#1c4584] text-white shadow-lg text-center">
                  <h4 className="text-base font-extrabold tracking-wider flex items-center justify-center gap-2">
                    <Brain className="w-5 h-5 text-cyan-300" />
                    AI INTELLIGENCE
                  </h4>
                </div>

                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-5 bg-emerald-600 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-600 uppercase mt-0.5 font-bold">THEN</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {["Insight", "Recommendation", "Action"].map((out) => (
                    <div key={out} className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-200 text-xs font-bold text-emerald-900">
                      {out}
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <span className="text-xs font-mono font-bold text-[#1c4584] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-200">
                    AI + Manufacturing Context = Intelligent Manufacturing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — THE ATHENA JOURNEY (The Evolution Timeline) */}
      <section id="athena-journey" className="py-10 sm:py-14 relative border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              FabOrchestrator.AI Didn't Start With AI. <br />
              <span className="text-gradient-athena">It Started With Real Manufacturing Problems.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Athena has spent years working with manufacturers across complex production environments—solving challenges that impact engineering, operations, quality, production, and IT.
              Every customer challenge brought new insight. Some problems appeared once. Others appeared again and again.
              And when we saw recurring patterns, we didn't just solve them—we turned that experience into repeatable solutions, accelerators, and proven manufacturing use cases.
            </p>
          </div>

          {/* Left-to-Right Evolution Timeline */}
          <div className="p-6 sm:p-8 rounded-3xl light-panel border border-slate-200 bg-white space-y-6 shadow-xl">
            <div className="text-center border-b border-slate-100 pb-3">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">
                THE EVOLUTION TIMELINE // ATHENA'S MANUFACTURING JOURNEY
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              {[
                {
                  step: "01",
                  title: "CUSTOMER PROBLEMS",
                  desc: "Real manufacturing challenges",
                  tag: "Shop Floor Reality",
                },
                {
                  step: "02",
                  title: "ATHENA MES EXPERTISE",
                  desc: "Years of manufacturing knowledge",
                  tag: "Domain Mastery",
                },
                {
                  step: "03",
                  title: "ACCELERATORS & USE CASES",
                  desc: "Repeatable proven solutions",
                  tag: "Proven Products",
                },
                {
                  step: "04",
                  title: "AI EMPOWERMENT",
                  desc: "Context + intelligence + reasoning",
                  tag: "Neural Layer",
                },
                {
                  step: "05",
                  title: "FABORCHESTRATOR.AI",
                  desc: "Manufacturing intelligence, orchestrated by AI",
                  tag: "Orchestration Layer",
                },
              ].map((item, idx) => (
                <div
                  key={item.step}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 hover:border-[#1c4584] transition-all group relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#1c4584] px-2 py-0.5 rounded bg-sky-100 border border-sky-200">
                      STAGE {item.step}
                    </span>
                    {idx < 4 && (
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1c4584] transition-colors hidden md:block" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-xs tracking-wide">{item.title}</h4>
                    <p className="text-[11px] text-slate-600 leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center text-xs text-slate-500 italic pt-2">
              Transforming empirical shop floor knowledge into AI orchestration.
            </div>
          </div>
        </div>
      </section>

      {/* 07 — PROVEN EXPERIENCE, AI-EMPOWERED */}
      <section id="proven-experience" className="py-10 sm:py-14 relative border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              Built From What We Know. <span className="text-gradient-athena">Expanded by What AI Can Do.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Representative examples of Athena's proven accelerators transformed into AI-empowered workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROVEN_EXPERIENCE_ITEMS.map((item) => (
              <div
                key={item.name}
                className="light-panel-interactive p-6 space-y-4 bg-white border border-slate-200"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs font-mono text-[#1c4584] uppercase font-bold tracking-wider">
                    {item.domain}
                  </span>
                  <span className="text-xs font-bold text-[#1c4584] bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                    {item.name}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-bold text-amber-700 uppercase block mb-0.5">
                      Real Manufacturing Challenge:
                    </span>
                    <p className="text-xs text-slate-700">{item.challenge}</p>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="w-4 h-4 text-[#1c4584] rotate-90" />
                  </div>

                  <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
                    <span className="text-[11px] font-bold text-[#1c4584] uppercase block mb-0.5">
                      AI Empowerment Layer:
                    </span>
                    <p className="text-xs text-slate-900 font-semibold">{item.empowerment}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Outcome:</span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                    {item.outcome}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — ROI */}
      <section id="roi-section" className="py-10 sm:py-14 relative border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              What If Hours of Manufacturing Work <span className="text-gradient-athena">Could Become Minutes?</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              The value of AI isn't the number of models behind it. It's the time, effort, and cost it removes from manufacturing processes.
            </p>
          </div>

          {/* Large Numerical ROI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {ROI_CARDS.map((card) => (
              <div key={card.title} className="p-5 rounded-2xl light-panel border border-slate-200 bg-white space-y-3 shadow-sm">
                <h4 className="font-extrabold text-slate-900 text-xs tracking-wider border-b border-slate-100 pb-2">
                  {card.title}
                </h4>

                <div className="space-y-1.5 text-xs">
                  <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
                    <span className="font-bold block text-[10px] uppercase text-amber-700">Traditional:</span>
                    {card.trad}
                  </div>
                  <div className="p-2 rounded-lg bg-sky-50 border border-sky-200 text-[#1c4584] font-bold">
                    <span className="font-bold block text-[10px] uppercase text-[#1c4584]">AI-Assisted:</span>
                    {card.ai}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-xs text-slate-700 font-medium">
                  <span className="text-emerald-700 font-bold block mb-0.5">VALUE:</span>
                  {card.value}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive ROI Calculator with Formula Header */}
          <div className="p-6 sm:p-10 rounded-3xl light-panel border border-slate-200 bg-white shadow-xl">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="text-xs font-mono text-[#1c4584] uppercase tracking-widest block mb-1.5 font-bold">
                TIME SAVED × ACTIVITY FREQUENCY × COST OF EFFORT = POTENTIAL BUSINESS VALUE
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Discover Your AI ROI Opportunity
              </h3>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
              <span className="text-xs font-bold text-slate-500">Quick Presets:</span>
              {PRESETS_DATA.map((p, idx) => (
                <button
                  key={p.label}
                  onClick={() => handlePresetClick(idx)}
                  className={`preset-btn ${activePresetIndex === idx ? "preset-active" : ""}`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-slate-700 font-semibold">Engineering & Operations Team Size:</span>
                    <span className="text-[#1c4584] font-mono font-bold">{teamSize} Engineers</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="150"
                    value={teamSize}
                    onChange={(e) => setTeamSize(parseInt(e.target.value))}
                    className="range-slider-light"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-slate-700 font-semibold">Weekly Hours Spent Searching & Investigating:</span>
                    <span className="text-[#1c4584] font-mono font-bold">{weeklyHours} hrs/week</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="30"
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(parseInt(e.target.value))}
                    className="range-slider-light"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-slate-700 font-semibold">Blended Hourly Rate ($):</span>
                    <span className="text-[#1c4584] font-mono font-bold">${hourlyRate} / hr</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="180"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                    className="range-slider-light"
                  />
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-[#1c4584] to-[#0f172a] text-white text-center space-y-3.5 shadow-2xl">
                  <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest block font-bold">
                    POTENTIAL BUSINESS VALUE (ANNUAL)
                  </span>

                  <div className="text-3xl sm:text-4xl font-extrabold text-cyan-300">
                    ${annualSavingsDollars.toLocaleString()}
                  </div>

                  <p className="text-xs text-sky-100">
                    Saves approx. <strong className="text-cyan-300">{hoursSavedAnnual.toLocaleString()} hours</strong> of manual effort per year.
                  </p>

                  <button
                    onClick={() => scrollToSection("demo-form")}
                    className="w-full py-3 rounded-xl font-bold text-slate-900 bg-cyan-300 hover:bg-cyan-200 transition-colors shadow-lg cursor-pointer text-xs"
                  >
                    Discover Your AI ROI Opportunity
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 09 — HOW IT FITS INTO YOUR MANUFACTURING ENVIRONMENT */}
      <section id="ecosystem-map" className="py-10 sm:py-14 relative border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              AI That Works With Your <span className="text-gradient-athena">Manufacturing Ecosystem.</span>
            </h2>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl light-panel border border-slate-200 bg-white space-y-6 shadow-lg">
            <div className="text-center text-xs font-mono text-slate-500 uppercase tracking-widest font-bold mb-2">
              ECOSYSTEM MAP // INPUTS → ORCHESTRATION LAYER → OUTPUTS
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-3 space-y-2">
                <span className="text-[11px] font-mono text-slate-500 uppercase block mb-1.5 text-center lg:text-left font-bold">
                  MANUFACTURING SOURCES
                </span>
                {["MES", "Equipment", "Engineering", "Quality", "Production", "Enterprise Systems", "Manufacturing Data"].map((item) => (
                  <div
                    key={item}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 text-center lg:text-left shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="lg:col-span-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-[#1c4584] text-white text-center relative shadow-xl space-y-5">
                  <span className="text-[10px] font-mono font-bold text-cyan-200 px-3 py-1 rounded-full bg-slate-900/60 border border-cyan-400">
                    FABORCHESTRATOR.AI
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold tracking-wide text-white">
                    INTELLIGENCE ORCHESTRATION LAYER
                  </h3>

                  <div className="grid grid-cols-2 gap-2.5 max-w-sm mx-auto">
                    {["Manufacturing Context", "AI Agents", "Accelerators", "Use Cases"].map((mod) => (
                      <div key={mod} className="p-2.5 rounded-xl bg-slate-900/50 border border-cyan-300 text-xs font-bold text-cyan-100">
                        {mod}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 space-y-2">
                <span className="text-[11px] font-mono text-slate-500 uppercase block mb-1.5 text-center lg:text-right font-bold">
                  INTELLIGENT OUTPUTS
                </span>
                {["Insights", "Recommendations", "Assistance", "Impact Analysis", "Development"].map((out) => (
                  <div
                    key={out}
                    className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-200 text-xs font-bold text-emerald-800 text-center lg:text-right"
                  >
                    {out}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center max-w-2xl mx-auto shadow-sm">
              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                FabOrchestrator.AI doesn't replace your manufacturing systems. <br />
                <span className="text-[#1c4584] font-bold">It makes your manufacturing ecosystem more intelligent.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — WHY ATHENA */}
      <section id="why-athena" className="py-10 sm:py-14 relative border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              Deep Manufacturing Expertise. <span className="text-gradient-athena">Now Empowered by AI.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              FabOrchestrator.AI is backed by Athena's experience in solving complex manufacturing challenges—not built as a generic AI layer and applied to manufacturing afterward.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl light-panel border border-slate-200 bg-slate-50 text-center space-y-8 shadow-lg">
            <div className="text-center text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">
              WHY ATHENA // PROOF WHEEL
            </div>

            <div className="flex flex-col items-center justify-center relative my-4">
              <div className="radar-disc-light flex items-center justify-center">
                <div className="p-5 rounded-full bg-[#1c4584] text-white text-center z-10 shadow-xl">
                  <h4 className="text-xs font-extrabold tracking-wide">FABORCHESTRATOR.AI</h4>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 w-full mt-8">
                {[
                  "MES Expertise",
                  "Manufacturing Experience",
                  "Industry Knowledge",
                  "Proven Accelerators",
                  "Customer Problem Solving",
                  "AI Innovation",
                ].map((pillar) => (
                  <div
                    key={pillar}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#1c4584] text-center hover:border-[#1c4584] transition-colors shadow-sm"
                  >
                    {pillar}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 max-w-lg mx-auto">
              <p className="text-xs sm:text-sm font-medium text-slate-700">
                AI is the technology. Manufacturing expertise is the brain. <br />
                <strong className="text-[#1c4584] font-bold">FabOrchestrator.AI brings them together.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11 — FINAL CTA */}
      <section className="py-14 sm:py-16 relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#1c4584] to-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Your Factory Already Has the Data. <br />
              Your Teams Already Have the Expertise. <br />
              <span className="text-cyan-300">Now Put AI to Work.</span>
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              FabOrchestrator.AI brings Athena's manufacturing intelligence together with AI-powered capabilities to help your teams make faster decisions, solve problems faster, and deliver measurable operational value.
            </p>

            {/* Ecosystem animation flow completion */}
            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-cyan-400/30 max-w-2xl mx-auto backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono font-semibold text-cyan-200">
                <span>Manufacturing Data</span>
                <span>→</span>
                <span>FabOrchestrator.AI</span>
                <span>→</span>
                <span>AI Intelligence</span>
                <span>→</span>
                <span>Decision</span>
                <span>→</span>
                <span>Action</span>
                <span>→</span>
                <span className="text-emerald-400 font-bold">MEASURABLE ROI</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection("demo-form")}
                className="px-6 py-3.5 rounded-xl font-bold text-slate-900 bg-cyan-300 hover:bg-cyan-200 shadow-xl transition-all cursor-pointer text-xs sm:text-sm"
              >
                Talk to a Manufacturing AI Expert
              </button>
              <button
                onClick={() => scrollToSection("demo-form")}
                className="px-6 py-3.5 rounded-xl font-bold text-slate-100 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 hover:border-cyan-300 transition-all cursor-pointer text-xs sm:text-sm"
              >
                Request a Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Bottom Form CTA Section (Form ID 233708) */}
      <section id="demo-form" className="py-10 sm:py-14 relative bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-10 rounded-3xl light-panel border border-slate-200 bg-white shadow-xl space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#1c4584] uppercase tracking-widest block">
                CONTACT SPECIALISTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Request Your Custom <span className="text-gradient-athena">FabOrchestrator.AI</span> Demo
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Let our manufacturing solution architects demonstrate how FabOrchestrator.AI can accelerate your shop floor operations and lot yield workflows.
              </p>
            </div>

            <FabOrchestratorDemoForm darkBg={false} />
          </div>
        </div>
      </section>
    </div>
  );
}
