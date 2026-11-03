import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAdjacentLeaders,
  getLeaderBySlug,
  leadershipProfiles,
} from "@/app/data/leadership";
import { buildMetadata, truncate } from "@/lib/seo";
import LeadershipDetail from "./LeadershipDetail";
import "./leadership-detail.scss";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return leadershipProfiles.map((leader) => ({ slug: leader.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const leader = getLeaderBySlug(slug);

  if (!leader) {
    return buildMetadata({
      title: "Leadership Profile Not Found | Athenatec",
      description: "The requested leadership profile could not be found.",
      path: `/leadership/${slug}`,
      noIndex: true,
    });
  }

  const description =
    leader.slug === "maryanne-steidinger"
      ? "Meet Maryanne Steidinger, an Athenatec advisor focused on partner strategy, industrial software alliances, and go-to-market positioning."
      : truncate(leader.shortBio, 155);

  return buildMetadata({
    title: `${leader.name} | Athenatec Leadership`,
    description,
    path: `/leadership/${leader.slug}`,
    image: leader.profileImage,
    keywords: [
      leader.name,
      "Athenatec leadership",
      "manufacturing technology leadership",
      "MES leadership",
    ],
  });
}

export default async function LeadershipProfilePage({ params }: Props) {
  const { slug } = await params;
  const leader = getLeaderBySlug(slug);

  if (!leader) return notFound();

  const adjacentLeaders = getAdjacentLeaders(slug);

  return (
    <LeadershipDetail
      leader={leader}
      previousLeader={adjacentLeaders.previous}
      nextLeader={adjacentLeaders.next}
    />
  );
}
