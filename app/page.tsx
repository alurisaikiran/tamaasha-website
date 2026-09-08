import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeTicker from "@/components/MarqueeTicker";
import CinematicSection from "@/components/CinematicSection";
import MenuSection from "@/components/MenuSection";
import EventsSection from "@/components/EventsSection";
import VideoSection from "@/components/VideoSection";
import GallerySection from "@/components/GallerySection";
import VIPSection from "@/components/VIPSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Navbar />
      <HeroSection />
      <MarqueeTicker />
      <CinematicSection />
      <MenuSection />
      <EventsSection />
      <VideoSection />
      <GallerySection />
      <VIPSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
