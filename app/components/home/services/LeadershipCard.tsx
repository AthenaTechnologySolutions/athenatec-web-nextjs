"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { LeaderProfile } from "@/app/data/leadership";
import { leadershipCardMotion } from "@/app/lib/animation/leadership";

type LeadershipCardProps = {
  leader: LeaderProfile;
  featured?: boolean;
};

export default function LeadershipCard({
  leader,
  featured = false,
}: LeadershipCardProps) {
  return (
    <motion.article
      className={featured ? "leader-card leader-card--featured" : "leader-card"}
      style={
        {
          "--leader-photo-width": leader.photoWidth,
          "--leader-photo-aspect": leader.photoAspect,
        } as CSSProperties
      }
      initial="rest"
      whileHover="hover"
      variants={leadershipCardMotion}
    >
      <Link
        href={`/leadership/${leader.slug}`}
        className="leader-card__link"
        aria-label={`Read more about ${leader.name}`}
        data-cursor="view-profile"
      >
        <div className="leader-card__media">
          <Image
            src={leader.profileImage}
            alt={leader.name}
            fill
            sizes={
              featured
                ? "(max-width: 900px) 100vw, 420px"
                : "(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 340px"
            }
            className="leader-card__image"
            quality={featured ? 90 : 85}
            priority={featured}
          />
        </div>

        <div className="leader-card__body">
          <div>
            <h3 className="leader-card__name">{leader.name}</h3>
            <p className="leader-card__designation">{leader.designation}</p>
          </div>
          <p className="leader-card__bio">{leader.shortBio}</p>
          <span className="leader-card__cta" aria-hidden="true">
            Read More
            <ArrowUpRight size={18} strokeWidth={2.2} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
