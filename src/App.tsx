import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import AboutUs from "./components/AboutUs";
import WhatWeDo from "./components/WhatWeDo";
import WhyComerade from "./components/WhyComerade";
import ClientTestimonials from "./components/ClientTestimonials";
import Footer from "./components/Footer";
import AllServices from "./pages/AllServices";
import ServiceDetail from "./pages/ServiceDetail";
import ContactPage from "./pages/ContactPage";
import ComeradeScroll from "./components/ComeradeScroll";

function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#05070b] dark:bg-[#05070b] dark:text-white">
      <Navbar />
      <main>
        <Hero />
        <ComeradeScroll />
        <WhatWeDo />
        <WhyComerade />
        <ClientTestimonials />
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<AllServices />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
