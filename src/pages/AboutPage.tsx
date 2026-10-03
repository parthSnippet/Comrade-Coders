import { useEffect } from "react";
import Navbar from "../components/navbar";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#05070b] dark:bg-[#05070b] dark:text-white">
      <SEOHead
        title="About Us"
        description="Learn about Comrade Coders — a team of developers, designers, and strategists building premium software, AI platforms, and digital systems for modern businesses."
        canonical="/about"
      />
      <Navbar />
      <main className="pt-16">
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
}
