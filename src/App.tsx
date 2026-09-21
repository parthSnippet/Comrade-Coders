import ComradeAIWidget from "./components/ComradeAIWidget";
import CookieConsent from "./components/CookieConsent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import WhatWeDo from "./components/WhatWeDo";
import WhyComerade from "./components/WhyComerade";
import ClientTestimonials from "./components/ClientTestimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import AllServices from "./pages/AllServices";
import ServiceDetail from "./pages/ServiceDetail";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import AllIndustries from "./pages/AllIndustries";
import IndustryDetail from "./pages/IndustryDetail";
import AdminPage from "./pages/AdminPage";
import ComeradeScroll from "./components/ComeradeScroll";

function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#05070b] dark:bg-[#05070b] dark:text-white">
      <Navbar />
      <ComradeAIWidget />
      <main>
        <Hero />
        <ComeradeScroll />
        <WhatWeDo />
        <WhyComerade />
        <ClientTestimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CookieConsent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<AllServices />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/industries" element={<AllIndustries />} />
        <Route path="/industries/:slug" element={<IndustryDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
