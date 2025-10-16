import { AboutUsHero, CompanyOverview, OurSection, YouTubeJourneySection } from "src/_components/sections/AboutUs";

// src/app/about/page.tsx
export default function AboutPage() {
  return (
    <>
      <AboutUsHero />
      <OurSection />
      <YouTubeJourneySection />
      
      <CompanyOverview />
    </>
  );
}
