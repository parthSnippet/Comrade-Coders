import { useEffect } from "react";
import Navbar from "../components/navbar";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#05070b] dark:bg-[#05070b] dark:text-white">
      <Navbar />
      <main className="pt-16">
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
}
