import Hero from "@/components/Hero";
import FeaturedListings from "@/components/FeaturedListings";
import OpenHouse from "@/components/OpenHouse";
import BuyerProgram from "@/components/BuyerProgram";
import BuySellSection from "@/components/BuySellSection";
import AboutAngela from "@/components/AboutAngela";
import CoastalLifestyle from "@/components/CoastalLifestyle";
import CommunityExplorer from "@/components/CommunityExplorer";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedListings />
      <OpenHouse />
      <BuyerProgram />
      <BuySellSection />
      <AboutAngela />
      <CoastalLifestyle />
      <CommunityExplorer />
      <ContactSection />
    </>
  );
}
