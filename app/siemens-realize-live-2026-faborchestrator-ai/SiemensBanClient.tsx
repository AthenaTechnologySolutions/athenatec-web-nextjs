"use client";

import Image from "next/image";
import {
  AlertCircle,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";

const CF7_FORM_ID = "232878";
const CF7_URL = `/api/cf7/${CF7_FORM_ID}/`;

const industryOptions = [
  "Semiconductor",
  "Medical Devices",
  "Electronics",
  "Batteries",
  "Solar Panels",
  "Discrete Manufacturing",
  "Other",
];

const focusOptions = [
  "Athena Opcenter Capabilities",
  "Athena Accelerators",
  "FabOrchestrator.AI",
  "Realize LIVE Booth Meeting",
  "Speaker Session",
  "Knowledge Theatre K2",
];

type MeetingFormData = {
  name: string;
  email: string;
  companyName: string;
  jobTitle: string;
  industry: string;
  meetingFocus: string;
  message: string;
  receiveUpdates: boolean;
  agreePolicy: boolean;
};

type MeetingErrors = Partial<Record<keyof MeetingFormData, string>>;

type Cf7Response = {
  status?: string;
  message?: string;
  invalid_fields?: Array<{
    field?: string;
    message?: string;
  }>;
};

const cf7FieldMap: Record<string, keyof MeetingFormData> = {
  consent: "agreePolicy",
  "company-name": "companyName",
  "full-name": "name",
  industry: "industry",
  "job-title": "jobTitle",
  message: "message",
  "meeting-focus": "meetingFocus",
  "textarea-11": "message",
  "work-email": "email",
};

const emptyForm: MeetingFormData = {
  name: "",
  email: "",
  companyName: "",
  jobTitle: "",
  industry: "",
  meetingFocus: "",
  message: "",
  receiveUpdates: false,
  agreePolicy: false,
};

const opcenterCapabilityItems = [
  "Green Field/Brown Field implementation",
  "Upgrades from older versions of Opcenter/Camstar",
  "Templatized solutions",
  "Multisite rollout strategy",
  "Purpose built accelerators",
];

const industryExpertiseItems = [
  "Process knowledge of Semiconductors, Medical Devices and Electronics",
  "Process to Module mapping",
  "Compliance and Validation Awareness",
];

const boothFocusItems = [
  "Athena Accelerators",
  "Athena Opcenter Capabilities",
  "FabOrchestrator.AI",
];

type AgendaDetail = {
  icon: "date" | "location" | "time";
  text: string;
};

type AgendaSpeaker = {
  name: string;
  role: string;
  image?: string;
};

type AgendaSession = {
  kicker: string;
  title: string;
  speakers: AgendaSpeaker[];
  details: AgendaDetail[];
  points: string[];
};

const speakerSession: AgendaSession = {
  kicker: "At the Speaker Session",
  title:
    "Accelerating Siemens Opcenter for Medical Device Manufacturing with Intelligent Automation",
  speakers: [
    {
      name: "Senthil Ranganathan",
      role: "CEO/Founder, Athenatec",
      image: "/assets/images/Senthil.webp",
    },
    {
      name: "Chaitra Raviprakash",
      role: "Director of Manufacturing Systems (Opcenter COE) & Site Head, Athenatec",
      image: "/assets/images/Media1.webp",
    },
  ],
  details: [
    { icon: "location", text: "Room 251B" },
    { icon: "time", text: "02:00 - 02:45 PM" },
    { icon: "date", text: "Wed, June 3" },
  ],
  points: [
    "Accelerate Siemens Opcenter deployments with proven accelerators",
    "Reduce testing effort through automation driven validation",
    "Enable faster engineering change and master data execution",
  ],
};

const knowledgeTheatreSessions: AgendaSession[] = [
   {
    kicker: "Knowledge Theatre K2",
    title:
      "Transforming Manufacturing Operations with AI-Powered Orchestration and Connected Intelligence",
    speakers: [
      {
        name: "Senthil Ranganathan",
        role: "CEO/Founder, Athenatec",
        image: "/assets/images/Senthil.webp",
      },
      {
        name: "Jothi Periasamy",
        role: "Chief Agentic AI Architect, Athenatec",
        image: "/assets/images/Jothi.webp",
      },
    ],
    details: [
      { icon: "time", text: "10:30 - 11:00 AM" },
      { icon: "date", text: "#1 Tues. June 2" },
      { icon: "location", text: "KT 2" },
    ],
    points: [
      "Intelligent Impact Analysis",
      "Connected Manufacturing Intelligence",
      "Proactive Operational Decisions",
    ],
  },
  {
    kicker: "Knowledge Theatre K2",
    title:
      "Accelerating Digital Manufacturing Transformation Through Scalable Siemens Opcenter MES Modernization Strategies",
    speakers: [
      {
        name: "Chaitra Raviprakash",
        role: "Director of Manufacturing Systems (Opcenter COE) & Site Head, Athenatec",
        image: "/assets/images/Media1.webp",
      },
    ],
    details: [
      { icon: "time", text: "4:30 - 5:00 PM" },
      { icon: "date", text: "#1 Tues. June 2" },
      { icon: "location", text: "KT 2" },
    ],
    points: [
      "Accelerate Siemens Opcenter deployments with proven accelerators",
      "Reduce testing effort through automation driven validation",
      "Enable faster engineering change and master data execution",
    ],
  },
 
];

export default function SiemensBanClient() {
  const formRef = useRef<HTMLElement | null>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="siemens-ban-page">
      <section className="siemens-ban-hero">
        <Image
          src="/assets/images/siemens-realize-live2026.webp"
          alt="Athenatec Realize LIVE 2026 banner"
          fill
          priority
          sizes="100vw"
          className="siemens-ban-hero__image"
        />
        {/* <div className="siemens-ban-hero__overlay" /> */}
        <div className="siemens-ban-hero__content">
          <p className="siemens-ban-kicker">Siemens Realize LIVE 2026</p>
          <h1>
            We&apos;re heading to Realize LIVE 2026, and bringing
            FabOrchestrator.AI to Detroit!
          </h1>
          <p>
            Meet our leadership team at Booth P2 to learn more about
            Athena&apos;s Siemens Opcenter capabilities, purpose built
            accelerators, and FabOrchestrator.AI, our AI powered orchestration
            platform designed for real manufacturing operations and connected
            shop floor intelligence.
          </p>

          <div className="siemens-ban-hero__actions">
            <button
              type="button"
              className="siemens-ban-button siemens-ban-button--primary"
              onClick={scrollToForm}
            >
              Book a meeting
            </button>
          </div>

          <div className="siemens-ban-hero__details" aria-label="Event details">
            <span>
              <CalendarDays size={18} />
              June 1 - 4, 2026 | 7 AM - 9 PM
            </span>
            <span>
              <Building2 size={18} />
              Booth P2
            </span>
            <span>
              <MapPin size={18} />
              Huntington Place, Detroit
            </span>
          </div>
        </div>
      </section>

      <section className="siemens-ban-intro">
        <div className="siemens-ban-container">
          <p className="siemens-ban-kicker">Realize LIVE 2026</p>
          <h2>What we&apos;re bringing to Detroit</h2>
        </div>
      </section>

      <section className="siemens-ban-cards">
        <div className="siemens-ban-container siemens-ban-cards__grid">
          <article className="siemens-ban-card">
            <div className="siemens-ban-card__icon">
              <CheckCircle2 size={21} />
            </div>
            <h3>Athena Opcenter Capabilities</h3>
            <ul className="siemens-ban-check-list">
              {opcenterCapabilityItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="siemens-ban-card">
            <div className="siemens-ban-card__icon">
              <CheckCircle2 size={21} />
            </div>
            <h3>Industry Expertise That Runs Deep</h3>
            <ul className="siemens-ban-check-list">
              {industryExpertiseItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="siemens-ban-booth siemens-ban-container">
          <div className="siemens-ban-booth__content">
            <div>
              <span className="siemens-ban-kicker">At the Booth</span>
              <h3>Meet Athena at Booth P2</h3>
            </div>
            <ul className="siemens-ban-booth__list">
              {boothFocusItems.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="siemens-ban-agenda siemens-ban-container">
          <div className="siemens-ban-agenda__header">
            <span className="siemens-ban-kicker"></span>
            <h3>Speaker Session</h3>
          </div>

          <AgendaCard session={speakerSession} featured />

          <div className="siemens-ban-agenda__header siemens-ban-agenda__header--spaced">
            <span className="siemens-ban-kicker"></span>
            <h3>Knowledge Theatre K2</h3>
          </div>

          <div className="siemens-ban-event-grid">
            {knowledgeTheatreSessions.map((session) => (
              <AgendaCard key={session.title} session={session} />
            ))}
          </div>
        </div>
      </section>

      <section className="siemens-ban-fab">
        <div className="siemens-ban-container">
          <div className="siemens-ban-fab__copy">
            <h2>We&apos;re introducing FabOrchestrator.AI</h2>
            <p>
              Join us at the event to get an early understanding of
              FabOrchestrator.AI: our next generation Agentic AI offering that
              extends deep value to MES solutions through its five integrated
              capabilities built on an Agentic AI Foundry.
            </p>
            <p>
              FabInsight<sup>&trade;</sup>, AI Support Engineer, Modeling Agent,
              Back-end Agent and FIS (Factory Information system), work as one
              unified platform to orchestrate workflows, operations, decisions,
              integrations, and real-time factory information across the entire
              manufacturing enterprise.
            </p>
            <p>
              From modeling agents and programming agents to AI-supported shop
              floor intelligence, FabOrchestrator.AI is designed for real
              manufacturing operations.
            </p>
          </div>

          <div className="siemens-ban-fab-unveil">
            <div className="siemens-ban-fab-unveil__copy">
              <p className="siemens-ban-kicker">Agentic AI Foundry</p>
              <h3>Athena Unveils Faborchestrator</h3>
              <p>
                The manufacturing industry&apos;s first Agentic AI Foundry
                designed to eliminate operational inefficiencies and unlock
                unprecedented productivity. Stop chasing data across
                disconnected systems and start commanding your factory with
                intelligent AI agents that work alongside your team.
              </p>
              <a
                className="siemens-ban-button siemens-ban-button--primary"
                href="https://243988893.hs-sites-na2.com/faborchestratorai"
              >
                Explore FabOrchestrator.AI
              </a>
            </div>

            <div className="siemens-ban-fab-unveil__media">
              <Image
                src="/assets/images/SRL.webp"
                alt="FabOrchestrator.AI agentic AI foundry graphic"
                width={900}
                height={9000}
                sizes="(max-width: 900px) 100vw, 760px"
                className="siemens-ban-fab-unveil__image"
              />
            </div>
          </div>

          <div className="siemens-ban-fab__closing">
            <Sparkles size={22} />
            <p>
              For all this and so much more, watch this space for more
              information on our drilled down, value led information and
              take-aways from our Realize Live booth. We are ready to share our
              insights and introduce you to our industry-leading Agentic AI
              Foundry, FabOrchestrator.AI. See you there!
            </p>
            <button
              type="button"
              className="siemens-ban-button siemens-ban-button--primary"
              onClick={scrollToForm}
            >
              Book a meeting
            </button>
          </div>
        </div>
      </section>

      <section
        className="siemens-ban-form-section"
        id="book-a-meeting"
        ref={formRef}
      >
        <div className="siemens-ban-container">
          <div className="siemens-ban-meeting-card">
            <aside className="siemens-ban-meeting-card__event">
              <span className="siemens-ban-meeting-card__kicker">
                Siemens Realize LIVE 2026
              </span>
              <h2>Book a Meeting with Athena</h2>
              <p>
                Book a meeting with our team at Booth P2 during Siemens Realize
                LIVE 2026 to discuss Opcenter MES capabilities, Athena
                accelerators, and FabOrchestrator.AI for modern manufacturing
                operations.
              </p>

              <dl className="siemens-ban-meeting-card__details">
                <div>
                  <CalendarDays size={19} />
                  <dd>June 1-4, 2026 | 7 AM - 9 PM</dd>
                </div>
                <div>
                  <MapPin size={19} />
                  <dd>Huntington Place, Detroit</dd>
                </div>
                <div>
                  <Building2 size={19} />
                  <dd>Booth No: P2</dd>
                </div>
              </dl>
            </aside>

            <div className="siemens-ban-meeting-card__form-panel">
              <span className="siemens-ban-form__kicker">Book a Meeting</span>
              <h2>Save your spot with Athena</h2>
              <MeetingForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function AgendaCard({
  session,
  featured = false,
}: {
  session: AgendaSession;
  featured?: boolean;
}) {
  return (
    <article
      className={`siemens-ban-event-card ${
        featured ? "siemens-ban-event-card--featured" : ""
      }`}
    >
      <div className="siemens-ban-event-card__topline">
        <span>{session.kicker}</span>
        <Sparkles size={17} />
      </div>

      <div className="siemens-ban-event-card__content">
        <div>
          <h4>{session.title}</h4>
          <dl className="siemens-ban-event-card__speakers">
            {session.speakers.map((speaker) => (
              <div key={speaker.name} className="siemens-ban-event-card__speaker">
                {speaker.image && (
                  <div className="siemens-ban-event-card__speaker-image">
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      width={64}
                      height={64}
                      className="siemens-ban-event-card__speaker-img"
                    />
                  </div>
                )}
                <div className="siemens-ban-event-card__speaker-info">
                  <dt>{speaker.name}</dt>
                  <dd>{speaker.role}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="siemens-ban-event-card__details">
          {session.details.map((detail) => (
            <span key={`${detail.icon}-${detail.text}`}>
              <EventDetailIcon icon={detail.icon} />
              {detail.text}
            </span>
          ))}
        </div>

        {/* <div className="siemens-ban-event-card__miss">
          <span>Don&apos;t miss it</span>
          <ul className="siemens-ban-check-list">
            {session.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div> */}
      </div>
    </article>
  );
}

function EventDetailIcon({ icon }: { icon: AgendaDetail["icon"] }) {
  if (icon === "time") return <Clock size={17} />;
  if (icon === "location") return <MapPin size={17} />;
  return <CalendarDays size={17} />;
}

function MeetingForm() {
  const [formData, setFormData] = useState<MeetingFormData>(emptyForm);
  const [errors, setErrors] = useState<MeetingErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const nextErrors: MeetingErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Full name is required.";
    if (!formData.email.trim()) {
      nextErrors.email = "Work email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!formData.companyName.trim()) {
      nextErrors.companyName = "Company name is required.";
    }
    if (!formData.jobTitle.trim()) {
      nextErrors.jobTitle = "Job title is required.";
    }
    if (!formData.industry) nextErrors.industry = "Select your industry.";
    if (!formData.meetingFocus) {
      nextErrors.meetingFocus = "Select a meeting focus.";
    }
    if (!formData.agreePolicy) {
      nextErrors.agreePolicy = "Please agree before submitting.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = event.target;
    const { name, value, type } = target;
    const nextValue =
      type === "checkbox" ? (target as HTMLInputElement).checked : value;

    setFormData((current) => ({ ...current, [name]: nextValue }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSelectChange = (
    name: "industry" | "meetingFocus",
    value: string,
  ) => {
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    setSubmitting(true);

    try {
      const messageLines = [
        `Meeting focus: ${formData.meetingFocus}`,
        formData.message.trim()
          ? `Message: ${formData.message.trim()}`
          : "Message: Not provided",
      ];

      const fd = new FormData();
      fd.append("full-name", formData.name.trim());
      fd.append("work-email", formData.email.trim().toLowerCase());
      fd.append("company-name", formData.companyName.trim());
      fd.append("job-title", formData.jobTitle.trim());
      fd.append("industry", formData.industry);
      fd.append("meeting-focus", formData.meetingFocus);
      fd.append("message", messageLines.join("\n"));
      fd.append("topic", "Siemens Realize LIVE 2026 Book a Meeting");
      fd.append("page-url", window.location.href);
      fd.append("consent", "1");

      if (formData.receiveUpdates) {
        fd.append(
          "receive",
          "I would like to receive relevant updates and resources from Athena Technology Solutions.",
        );
      }

      const response = await fetch(CF7_URL, { method: "POST", body: fd });
      const result = (await response.json()) as Cf7Response;

      if (result.status !== "mail_sent") {
        if (
          result.status === "validation_failed" &&
          Array.isArray(result.invalid_fields)
        ) {
          const nextErrors: MeetingErrors = {};

          for (const invalidField of result.invalid_fields) {
            const fieldName = invalidField.field
              ? cf7FieldMap[invalidField.field]
              : undefined;

            if (fieldName) {
              nextErrors[fieldName] =
                invalidField.message || "Please check this field.";
            }
          }

          setErrors(nextErrors);
        }

        throw new Error(result.message || "Meeting request could not be sent.");
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Meeting request could not be sent. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="siemens-ban-form siemens-ban-form--success">
        <CheckCircle2 size={46} />
        <h3>Meeting request sent.</h3>
        <p>
          Thank you, <strong>{formData.name}</strong>. We&apos;ll follow up at{" "}
          <strong>{formData.email}</strong> to coordinate the next step.
        </p>
      </div>
    );
  }

  return (
    <form className="siemens-ban-form" onSubmit={handleSubmit} noValidate>
      <div className="siemens-ban-form__row">
        <FormField label="Full Name" error={errors.name} required>
          <FormControl icon={<User size={17} />}>
            <input
              name="name"
              type="text"
              placeholder="Full name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
        </FormField>

        <FormField label="Work Email" error={errors.email} required>
          <FormControl icon={<Mail size={17} />}>
            <input
              name="email"
              type="email"
              placeholder="name@company.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
        </FormField>
      </div>

      <div className="siemens-ban-form__row">
        <FormField label="Company" error={errors.companyName} required>
          <FormControl icon={<Building2 size={17} />}>
            <input
              name="companyName"
              type="text"
              placeholder="Company name"
              autoComplete="organization"
              value={formData.companyName}
              onChange={handleChange}
            />
          </FormControl>
        </FormField>

        <FormField label="Job Title" error={errors.jobTitle} required>
          <FormControl icon={<BriefcaseBusiness size={17} />}>
            <input
              name="jobTitle"
              type="text"
              placeholder="Your role"
              autoComplete="organization-title"
              value={formData.jobTitle}
              onChange={handleChange}
            />
          </FormControl>
        </FormField>
      </div>

      <div className="siemens-ban-form__row">
        <FormField label="Industry" error={errors.industry} required>
          <FormControl icon={<Building2 size={17} />}>
            <StyledSelect
              name="industry"
              label="Industry"
              value={formData.industry}
              placeholder="Select your industry"
              options={industryOptions}
              onChange={handleSelectChange}
            />
          </FormControl>
        </FormField>

        <FormField label="Meeting Focus" error={errors.meetingFocus} required>
          <FormControl icon={<Sparkles size={17} />}>
            <StyledSelect
              name="meetingFocus"
              label="Meeting Focus"
              value={formData.meetingFocus}
              placeholder="Select a focus"
              options={focusOptions}
              onChange={handleSelectChange}
            />
          </FormControl>
        </FormField>
      </div>

      <FormField label="Message" error={errors.message}>
        <FormControl icon={<MessageSquare size={17} />} multiline>
          <textarea
            name="message"
            rows={4}
            placeholder="Share what you would like to discuss."
            value={formData.message}
            onChange={handleChange}
          />
        </FormControl>
      </FormField>

      {/* <label className="siemens-ban-form__checkbox">
        <input
          name="receiveUpdates"
          type="checkbox"
          checked={formData.receiveUpdates}
          onChange={handleChange}
        />
        <span />
        <em>
          I&apos;d like to receive relevant updates and resources from Athena
          Technology Solutions.
        </em>
      </label> */}

      <label
        className={`siemens-ban-form__checkbox ${
          errors.agreePolicy ? "siemens-ban-form__checkbox--error" : ""
        }`}
      >
        <input
          name="agreePolicy"
          type="checkbox"
          checked={formData.agreePolicy}
          onChange={handleChange}
        />
        <span />
        <em>
          I agree to receive communications about this event and related
          content.
        </em>
      </label>
      {errors.agreePolicy && (
        <p className="siemens-ban-form__error">
          <AlertCircle size={14} />
          {errors.agreePolicy}
        </p>
      )}

      {submitError && (
        <p className="siemens-ban-form__submit-error">
          <AlertCircle size={15} />
          {submitError}
        </p>
      )}

      <button
        type="submit"
        className="siemens-ban-form__submit"
        disabled={submitting}
      >
        {submitting ? (
          <>
            <Loader2 size={18} />
            Submitting
          </>
        ) : (
          <>
            <Send size={18} />
            Submit Book Meeting Request
          </>
        )}
      </button>
    </form>
  );
}

function StyledSelect({
  name,
  label,
  value,
  placeholder,
  options,
  onChange,
}: {
  name: "industry" | "meetingFocus";
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (name: "industry" | "meetingFocus", value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listboxId = useId();
  const allOptions = [placeholder, ...options];

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const chooseOption = (option: string) => {
    onChange(name, option === placeholder ? "" : option);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    event.preventDefault();

    const currentLabel = value || placeholder;
    const currentIndex = allOptions.indexOf(currentLabel);
    const nextIndex =
      event.key === "ArrowDown"
        ? Math.min(currentIndex + 1, allOptions.length - 1)
        : Math.max(currentIndex - 1, 0);

    if (!open) {
      setOpen(true);
      return;
    }

    chooseOption(allOptions[nextIndex]);
  };

  return (
    <div
      ref={selectRef}
      className={`siemens-ban-form__select ${
        open ? "siemens-ban-form__select--open" : ""
      }`}
    >
      <input type="hidden" name={name} value={value} />
      <button
        ref={triggerRef}
        type="button"
        className="siemens-ban-form__select-trigger"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleTriggerKeyDown}
      >
        <span
          className={
            value
              ? "siemens-ban-form__select-value"
              : "siemens-ban-form__select-placeholder"
          }
        >
          {value || placeholder}
        </span>
        <ChevronDown size={17} aria-hidden="true" />
      </button>

      {open && (
        <div
          id={listboxId}
          className="siemens-ban-form__select-menu"
          role="listbox"
          aria-label={label}
        >
          {allOptions.map((option) => {
            const selected = (value || placeholder) === option;

            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={selected}
                className={`siemens-ban-form__select-option ${
                  selected ? "siemens-ban-form__select-option--selected" : ""
                }`}
                onClick={() => chooseOption(option)}
              >
                <span>{option}</span>
                {selected && <Check size={16} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FormField({
  label,
  error,
  required = false,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="siemens-ban-form__field">
      <span>
        {label}
        {required && <strong>*</strong>}
      </span>
      {children}
      {error && (
        <p className="siemens-ban-form__error">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </label>
  );
}

function FormControl({
  icon,
  multiline = false,
  children,
}: {
  icon: ReactNode;
  multiline?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`siemens-ban-form__control ${
        multiline ? "siemens-ban-form__control--multiline" : ""
      }`}
    >
      {icon}
      {children}
    </div>
  );
}
