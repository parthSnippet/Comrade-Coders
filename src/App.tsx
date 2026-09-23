// import ComradeAIWidget from "./components/ComradeAIWidget";
// import CookieConsent from "./components/CookieConsent";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/navbar";
// import Hero from "./components/hero";
// import WhatWeDo from "./components/WhatWeDo";
// import WhyComerade from "./components/WhyComerade";
// import FAQ from "./components/FAQ";
// import BlogSection from "./components/BlogSection";
// import Footer from "./components/Footer";
// import AllServices from "./pages/AllServices";
// import ServiceDetail from "./pages/ServiceDetail";
// import ContactPage from "./pages/ContactPage";
// import AboutPage from "./pages/AboutPage";
// import AllIndustries from "./pages/AllIndustries";
// import IndustryDetail from "./pages/IndustryDetail";
// import AdminPage from "./pages/AdminPage";
// import PortfolioPage from "./pages/PortfolioPage";
// import ComeradeScroll from "./components/ComeradeScroll";

// function HomePage() {
//   return (
//     <div className="min-h-screen bg-white text-[#05070b] dark:bg-[#05070b] dark:text-white">
//       <Navbar />
//       <ComradeAIWidget />
//       <main>
//         <Hero />
//         <ComeradeScroll />
//         <WhatWeDo />
//         <WhyComerade />
//         <BlogSection />
//         <FAQ />
//       </main>
//       <Footer />
//     </div>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <CookieConsent />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/services" element={<AllServices />} />
//         <Route path="/services/:slug" element={<ServiceDetail />} />
//         <Route path="/industries" element={<AllIndustries />} />
//         <Route path="/industries/:slug" element={<IndustryDetail />} />
//         <Route path="/contact" element={<ContactPage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/portfolio" element={<PortfolioPage />} />
//         <Route path="/admin" element={<AdminPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import ComradeAIWidget from "./components/ComradeAIWidget";
import CookieConsent from "./components/CookieConsent";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import Hero from "./components/hero";
import WhatWeDo from "./components/WhatWeDo";
import WhyComerade from "./components/WhyComerade";
import FAQ from "./components/FAQ";
import BlogSection from "./components/BlogSection";
import Footer from "./components/Footer";
import SEOHead from "./components/SEOHead";

import AllServices from "./pages/AllServices";
import ServiceDetail from "./pages/ServiceDetail";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import AllIndustries from "./pages/AllIndustries";
import IndustryDetail from "./pages/IndustryDetail";
import AdminPage from "./pages/AdminPage";
import PortfolioPage from "./pages/PortfolioPage";
import ComeradeScroll from "./components/ComeradeScroll";

import AdminLayout from "./admin/AdminLayout";
import DashboardPage from "./admin/AdminDashboard";
import AdminServicesPage from "./admin/services/AdminServicesPage";
import AdminProjectsPage from "./admin/projects/AdminProjectsPage";
import AdminIndustriesPage from "./admin/industries/AdminIndustriesPage";
import AdminInquiriesPage from "./admin/inquiries/AdminInquiriesPage";
import AdminAboutPage from "./admin/about/AdminAboutPage";
import AdminFooterPage from "./admin/footer/AdminFooterPage";

function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#05070b] dark:bg-[#05070b] dark:text-white">
      <SEOHead
        title="Software Development & IT Solutions"
        description="Comrade Coders delivers premium software development, web development, AI platforms, ERP, CRM, and IT solutions for startups, e-commerce, healthcare, and more."
        canonical="/"
      />
      <Navbar />
      <ComradeAIWidget />

      <main>
        <Hero />
        <ComeradeScroll />
        <WhatWeDo />
        <WhyComerade />
        <BlogSection />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}

function ProtectedAdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = sessionStorage.getItem("admin_access_token");

  if (!accessToken) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}

function AdminDashboard() {
  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <DashboardPage />
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}

function AdminServices() {
  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <AdminServicesPage />
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}

function AdminProjects() {
  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <AdminProjectsPage />
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}

function AdminIndustries() {
  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <AdminIndustriesPage />
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}

function AdminInquiries() {
  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <AdminInquiriesPage />
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}

function AdminAbout() {
  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <AdminAboutPage />
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}

function AdminFooter() {
  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <AdminFooterPage />
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CookieConsent />

      <Routes>
        {/* Public website */}
        <Route path="/" element={<HomePage />} />

        <Route path="/services" element={<AllServices />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />

        <Route path="/industries" element={<AllIndustries />} />
        <Route path="/industries/:slug" element={<IndustryDetail />} />

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminPage />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/services" element={<AdminServices />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        <Route path="/admin/industries" element={<AdminIndustries />} />
        <Route path="/admin/inquiries" element={<AdminInquiries />} />
        <Route path="/admin/about" element={<AdminAbout />} />
        <Route path="/admin/footer" element={<AdminFooter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;