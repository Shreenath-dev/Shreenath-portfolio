import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A full breakdown of Shreenath Subramanian's engineering projects — CampaignFlow, MedMatch, Defacement Detector, and more.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
