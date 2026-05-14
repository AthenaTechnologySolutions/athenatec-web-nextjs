import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import {
  advisoryBoard,
  leadershipTeam,
  strategicCollaborators,
} from "@/app/data/leadership";
import LeadershipCard from "./LeadershipCard";
import "./leadership.scss";

export default function Leadership() {
  return (
    <section className="leadership" id="leadership">
      <div className="container">
        <div className="leadership-header">
          <h2>Meet Our Leadership Team</h2>
          <p>
            Meet the visionaries behind our success. Our leadership team brings a wealth of
            experience, expertise, and a commitment to driving innovation and excellence in every
            aspect of our business.
          </p>
        </div>

        <div className="leadership-showcase">
          <LeadershipCard leader={leadershipTeam[0]} featured />

          <div className="leadership-grid">
            {leadershipTeam.slice(1).map((leader) => (
              <LeadershipCard leader={leader} key={leader.id} />
            ))}
          </div>
        </div>

        <div className="collaborators-header">
          <h2>Strategic Collobarators</h2>
          <p>
            Partnering with world-class organizations to deliver manufacturing excellence and
            accelerate digital transformation across industries.
          </p>
        </div>

        <div className="advisory-list">
          {strategicCollaborators.map((collab) => (
            <Link
              className="advisory-profile-card advisory-profile-card--collaborator"
              href={`/leadership/${collab.slug}`}
              key={collab.id}
              aria-label={`Read more about ${collab.name}`}
              style={
                {
                  "--leader-photo-position": collab.photoObjectPosition,
                } as CSSProperties
              }
            >
              <div className="advisory-profile-card__image">
                <Image
                  src={collab.profileImage}
                  alt={collab.name}
                  fill
                  sizes="(max-width: 760px) 100vw, 340px"
                  className="advisory-profile-card__img"
                  quality={90}
                />
              </div>

              <div className="advisory-profile-card__content">
                <h3>{collab.name}</h3>
                <p className="advisory-profile-card__role">{collab.designation}</p>
                <p className="advisory-profile-card__bio">{collab.shortBio}</p>
                <span className="advisory-profile-card__cta">
                  Read More
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="advisory-header">
          <h2>Advisory Board</h2>
          <p>
            Our advisory board provides strategic guidance, industry insight, and long-term vision
            to support Athena&apos;s growth.
          </p>
        </div>

        <div className="advisory-list">
          {advisoryBoard.map((advisor) => (
            <article
              className="advisory-profile-card"
              key={advisor.id}
              style={
                {
                  "--leader-photo-position": advisor.photoObjectPosition,
                } as CSSProperties
              }
            >
              <div className="advisory-profile-card__image">
                <Image
                  src={advisor.profileImage}
                  alt={advisor.name}
                  fill
                  sizes="(max-width: 760px) 100vw, 320px"
                  className="advisory-profile-card__img"
                  quality={88}
                />
              </div>

              <div className="advisory-profile-card__content">
                <h3>{advisor.name}</h3>
                <p className="advisory-profile-card__role">{advisor.designation}</p>
                <p className="advisory-profile-card__bio">{advisor.fullBio.join(" ")}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
