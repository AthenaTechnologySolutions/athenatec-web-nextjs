"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight, MapPin, ChevronDown } from "lucide-react";
import Link from "next/link";
import "./career.scss";
import HeroSection from "../components/HeroSection";
import { jobs } from "@/app/data/jobs";

// ── CUSTOM SELECT ──────────────────────────────────────────────────────────
interface SelectOption { label: string; value: string; }

function CustomSelect({ options, value, onChange, placeholder }: {
  options: SelectOption[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={`c-select ${open ? "c-select--open" : ""}`} ref={ref}>
      <button type="button" className={`c-select__trigger ${!selected ? "c-select__trigger--ph" : ""}`}
        onClick={() => setOpen(p => !p)}>
        <span className="c-select__val">{selected ? selected.label : (placeholder ?? "Select…")}</span>
        <span className="c-select__chevron"><ChevronDown size={16} /></span>
      </button>

      {open && (
        <ul className="c-select__menu">
          {options.map((opt, i) => (
            <li key={opt.value}
              className={`c-select__opt ${value === opt.value ? "c-select__opt--active" : ""}`}
              style={{ "--i": i } as React.CSSProperties}
              onMouseDown={() => { onChange(opt.value); setOpen(false); }}>
              <span className="c-select__dot" />
              <span className="c-select__opt-label">{opt.label}</span>
              {value === opt.value && (
                <svg className="c-select__check" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2.2"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── OPTIONS ────────────────────────────────────────────────────────────────
const JOB_TYPE_OPTIONS: SelectOption[] = [
  { value: "All", label: "All Job Types" },
  { value: "Full Time", label: "Full Time" },
];

const LOCATION_OPTIONS: SelectOption[] = [
  { value: "All",       label: "All Locations" },
  { value: "Bangalore", label: "Bangalore" },
  { value: "Chennai",   label: "Chennai" },
  { value: "Hyderabad", label: "Hyderabad" },
  { value: "Trichy",    label: "Trichy" },
  // { value: "Pune",      label: "Pune" },
  { value: "India",     label: "India" },
];

// ── CLIENT COMPONENT ───────────────────────────────────────────────────────
export default function CareersClient() {
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const filteredJobs = jobs.filter(job =>
    (selectedLocation === "All" || job.locations.includes(selectedLocation))
  );

  return (
    <div className="careers-page">
      <HeroSection
        title="Join Our Team"
        description="We build intelligent manufacturing solutions with a culture that values innovation, ownership, and trust."
        image="/assets/images/careers.webp"
        align="center"
        buttonText="Contact Us"
        buttonLink="/contact"
      />

      <section className="careers-filter">
        <div className="container filter-wrapper">
          <div className="select-group">
            <label>Job Type</label>
            <CustomSelect options={JOB_TYPE_OPTIONS} value={selectedType} onChange={setSelectedType}/>
          </div>
          <div className="select-group">
            <label>Location</label>
            <CustomSelect options={LOCATION_OPTIONS} value={selectedLocation} onChange={setSelectedLocation}/>
          </div>
        </div>
      </section>

      <section className="careers-jobs">
        <div className="container jobs-grid">
          {filteredJobs.length === 0 ? (
            <p className="no-jobs">No openings available for this location.</p>
          ) : (
            filteredJobs.map((job, index) => (
              <div key={index} className="job-card">
                <h3>{job.title}</h3>
                <div className="location">
                  <MapPin size={18} />
                  <span>{job.locations.join(", ")}</span>
                </div>
                <Link href={`/careers/${job.slug}`} className="details-link">
                  More Details <ChevronRight size={18} />
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="careers-culture">
        <div className="container">
          <h2>Our Culture</h2>
          <p>
            Athena Technology has a performance-based culture that talented people find very attractive.
            Employees share a sense of community and work in an environment that values intelligence and
            innovation. You will find yourself working with some of the brightest and the best – in a
            company that has complete trust in you and your capabilities.
          </p>
        </div>
      </section>
    </div>
  );
}
