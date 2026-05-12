"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Linkedin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { LeaderProfile } from "@/app/data/leadership";
import {
  leadershipPageReveal,
  leadershipStagger,
} from "@/app/lib/animation/leadership";

type LeadershipDetailProps = {
  leader: LeaderProfile;
  previousLeader?: LeaderProfile;
  nextLeader?: LeaderProfile;
};

type ProfileContactAction = {
  label: string;
  href: string;
  ariaLabel: string;
  icon: LucideIcon;
  external?: boolean;
};

const defaultLinkedinUrl = "https://www.linkedin.com/company/athena-technology-solutions/";

function getProfileContactActions(leader: LeaderProfile): ProfileContactAction[] {
  const hasProfileLinkedIn = Boolean(leader.linkedinUrl);
  const linkedinUrl = leader.linkedinUrl ?? defaultLinkedinUrl;

  return [
    {
      label: "LinkedIn",
      href: linkedinUrl,
      ariaLabel: hasProfileLinkedIn ? `${leader.name} on LinkedIn` : "Athena on LinkedIn",
      icon: Linkedin,
      external: true,
    },
  ];
}

export default function LeadershipDetail({
  leader,
  previousLeader,
  nextLeader,
}: LeadershipDetailProps) {
  const pageRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 34,
    restDelta: 0.001,
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const profileContactActions = getProfileContactActions(leader);
  const profileRole =
    leader.group === "advisory"
      ? "Advisor"
      : leader.group === "collaborator"
        ? "Collaborator"
        : "Executive";
  const profileEyebrow =
    leader.group === "collaborator"
      ? "Strategic Collaborator Profile"
      : "Executive Profile";
  return (
    <main className="leader-detail" ref={pageRef}>
      <motion.div
        className="leader-detail__progress"
        style={{ scaleX: progressScale }}
        aria-hidden="true"
      />

      <section className="leader-detail__hero" aria-labelledby="leader-profile-title">
        <div className="leader-detail__shell">
          <motion.div
            className="leader-detail__intro"
            initial="hidden"
            animate="visible"
            variants={leadershipStagger}
          >
            <motion.div variants={leadershipPageReveal}>
              <Link href="/#leadership" className="leader-detail__back">
                <ArrowLeft size={17} />
                Back to Leadership
              </Link>
            </motion.div>

            <motion.p className="leader-detail__eyebrow" variants={leadershipPageReveal}>
              {profileEyebrow}
            </motion.p>
            <motion.h1 id="leader-profile-title" variants={leadershipPageReveal}>
              {leader.name}
            </motion.h1>
            <motion.p className="leader-detail__designation" variants={leadershipPageReveal}>
              {leader.designation}
            </motion.p>
            <motion.div className="leader-detail__summary" variants={leadershipPageReveal}>
              {leader.fullBio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </motion.div>

            <motion.div className="leader-detail__metrics" variants={leadershipPageReveal}>
              {leader.yearsExperience && (
                <div>
                  <strong>{leader.yearsExperience}+</strong>
                  <span>Years Experience</span>
                </div>
              )}
              {/* <div>
                <strong>{leader.expertise?.length ?? 0}</strong>
                <span>Core Focus Areas</span>
              </div> */}
              <div>
                <strong>{profileRole}</strong>
                <span>Leadership Role</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.aside
            className="leader-detail__profile"
            initial={{ opacity: 0, y: 34, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          >
            <motion.div className="leader-detail__image-wrap" style={{ y: imageY }}>
              <Image
                src={leader.profileImage}
                alt={leader.name}
                fill
                sizes="(max-width: 900px) 88vw, 420px"
                className="leader-detail__image"
                quality={92}
                priority
              />
            </motion.div>
            <div className="leader-detail__profile-card">
              <span className="leader-detail__profile-role">{leader.designation}</span>
              <h2>{leader.name}</h2>
              <div className="leader-detail__actions">
                {profileContactActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <Link
                      href={action.href}
                      key={action.label}
                      target={action.external ? "_blank" : undefined}
                      rel={action.external ? "noreferrer" : undefined}
                      aria-label={action.ariaLabel}
                      title={action.ariaLabel}
                    >
                      <Icon size={18} />
                      <span>{action.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="leader-detail__content">
        <div className="leader-detail__shell leader-detail__grid">
          <div className="leader-detail__main">
            {leader.philosophy && (
              <RevealBlock className="leader-detail__section leader-detail__philosophy">
                <p className="leader-detail__section-kicker">Leadership Philosophy</p>
                <blockquote>{leader.philosophy}</blockquote>
              </RevealBlock>
            )}

            {leader.expertise && leader.expertise.length > 0 && (
              <RevealBlock className="leader-detail__section">
                <p className="leader-detail__section-kicker">Expertise</p>
                <h2>Focus Areas</h2>
                <div className="leader-detail__chips">
                  {leader.expertise.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </RevealBlock>
            )}

            {leader.achievements && leader.achievements.length > 0 && (
              <RevealBlock className="leader-detail__section">
                <p className="leader-detail__section-kicker">Highlights</p>
                <h2>Executive Impact</h2>
                <div className="leader-detail__highlights">
                  {leader.achievements.map((achievement, index) => (
                    <article key={achievement}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{achievement}</p>
                    </article>
                  ))}
                </div>
              </RevealBlock>
            )}

            {leader.milestones && leader.milestones.length > 0 && (
              <RevealBlock className="leader-detail__section">
                <p className="leader-detail__section-kicker">Career Milestones</p>
                <h2>Milestones</h2>
                <ol className="leader-detail__timeline">
                  {leader.milestones.map((milestone) => (
                    <li key={milestone}>{milestone}</li>
                  ))}
                </ol>
              </RevealBlock>
            )}

            {leader.quote && (
              <RevealBlock className="leader-detail__quote">
                <blockquote>&ldquo;{leader.quote}&rdquo;</blockquote>
              </RevealBlock>
            )}

            <nav className="leader-detail__nav" aria-label="Leadership profile navigation">
              {previousLeader && (
                <Link href={`/leadership/${previousLeader.slug}`}>
                  <ArrowLeft size={18} />
                  <span>
                    Previous
                    <strong>{previousLeader.name}</strong>
                  </span>
                </Link>
              )}
              {nextLeader && (
                <Link href={`/leadership/${nextLeader.slug}`}>
                  <span>
                    Next
                    <strong>{nextLeader.name}</strong>
                  </span>
                  <ArrowRight size={18} />
                </Link>
              )}
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}

function RevealBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <motion.section
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={leadershipPageReveal}
    >
      {children}
    </motion.section>
  );
}
