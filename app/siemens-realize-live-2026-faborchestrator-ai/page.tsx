import { notFound } from "next/navigation";

// Siemens Realize LIVE 2026 is over. Keep the page code in
// SiemensBanClient.tsx and siemens-ban.scss for future reuse, but do not
// publish this expired event route.

export default function SiemensBanPage() {
  notFound();
}
