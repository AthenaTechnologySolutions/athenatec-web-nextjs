import GallerySection, { GalleryItem } from "@/app/components/events/GallerySection";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Event Gallery | Athenatec",
  description:
    "Explore Athenatec event photos from Siemens Realize Live, partner conferences, and manufacturing technology events.",
  path: "/gallery",
});

const EVENTS: GalleryItem[] = [
  {
    title: "Realize Live Americas 2025",
    image: "/assets/images/events/rla25/event-01.webp",
    slug: "realize-live-americas-2025",
  },
  {
    title: "Americas Partner Conference 2025",
    image: "/assets/images/events/apc25/event-01.webp",
    slug: "americas-partner-conference-2025",
  },
  {
    title: "Realize Live Americas 2024",
    image: "/assets/images/events/rla24/event-01.webp",
    slug: "realize-live-americas-2024",
  },
  {
    title: "Realize Live Europe 2024",
    image: "/assets/images/events/rle24/event-01.webp",
    slug: "realize-live-europe-2024",
  },
    {
    title: "Realize Live Americas 2023",
    image: "/assets/images/events/rla23/event-01.webp",
    slug: "realize-live-americas-2023",
  },
];

export default function GalleryPage() {
  return <GallerySection title="Event Gallery" data={EVENTS} bg="light" />;
}
