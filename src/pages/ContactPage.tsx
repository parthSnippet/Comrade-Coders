import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Mail, MessageSquareText, Phone, Sparkles, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

const projectOptions = [
  "Web Development",
  "Software Development",
  "Automation",
  "AI Platforms",
  "ERP & CRM",
  "IT Solutions",
  "Book a Call",
  "Not sure yet",
];

const callNumber = "+918128564899";

const budgetOptions = [
  "Under $1k",
  "$1k - $5k",
  "$5k - $15k",
  "$15k - $30k",
  "$30k+",
];

const initialForm = {
  name: "",
  email: "",
  company: "",
  phone: "",
  projectType: projectOptions[0],
  budget: budgetOptions[1],
  timeline: "",
  message: "",
};

export default function ContactPage() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof initialForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const isMobile = () => {
    const userAgent = navigator.userAgent || "";
    return /Android|iPhone|iPad|iPod|Mobile/i.test(userAgent) || window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
  };

  const handleBookCall = () => {
    if (isMobile()) {
      window.location.href = `tel:${callNumber.replace(/\s+/g, "")}`;
      return;
    }

    window.location.href = `mailto:info@comradecoders.com?subject=${encodeURIComponent("Book a Call")}&body=${encodeURIComponent("Hi Comerade Coders, I would like to book a call.\n\nPreferred time:\n\nCompany:\n\nProject overview:")}`;
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof typeof initialForm, string>> = {};

    if (!formData.name.trim()) nextErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email.";
    }
    if (!formData.message.trim()) nextErrors.message = "Tell us a bit about your project.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.projectType === "Book a Call") {
      if (isMobile()) {
        window.location.href = `tel:${callNumber.replace(/\s+/g, "")}`;
      } else {
        window.location.href = `mailto:info@comradecoders.com?subject=${encodeURIComponent("Book a Call")}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "Not provided"}\nCompany: ${formData.company || "Not provided"}\n\nI would like to book a call.`)}`;
      }
      return;
    }

    if (!validate()) return;

    const subject = `Project Inquiry from ${formData.name}`;
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      formData.company ? `Company: ${formData.company}` : "",
      formData.phone ? `Phone: ${formData.phone}` : "",
      `Service Needed: ${formData.projectType}`,
      `Budget: ${formData.budget}`,
      formData.timeline ? `Timeline: ${formData.timeline}` : "",
      "",
      "Project Details:",
      formData.message,
    ]
      .filter(Boolean)
      .join("\n");

    setSubmitted(true);
    window.location.href = `mailto:info@comradecoders.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-white text-[#05070b] dark:bg-[#05070b] dark:text-white">
      <Navbar />

      <main className="relative overflow-hidden pt-32 pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="contact-orb absolute left-[8%] top-[8%] h-[300px] w-[300px] rounded-full bg-[#328fe8]/8 blur-[90px]" />
          <div className="contact-orb absolute right-[8%] top-[10%] h-[350px] w-[350px] rounded-full bg-[#58adff]/8 blur-[90px]" style={{ animationDelay: "1.2s" }} />
          <div className="absolute bottom-[-8%] left-1/2 h-[280px] w-[560px] -translate-x-1/2 rounded-full bg-[#328fe8]/6 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
          <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-black/[0.10] bg-black/[0.04] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/60 dark:border-white/[0.10] dark:bg-white/[0.04] dark:text-white/60">
            <Sparkles size={14} className="text-[#58adff]" />
            Let’s build something smart
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <section className="relative">
              <div className="contact-panel rounded-[24px] border border-black/[0.08] bg-white/80 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#0b1120]/80 dark:shadow-[0_18px_50px_rgba(0,0,0,0.38)] sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#58adff]/25 bg-[#58adff]/10">
                    <MessageSquareText size={18} className="text-[#2f8fe6] dark:text-[#58adff]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/45 dark:text-white/45">
                      Contact us
                    </p>
                    <h1 className="mt-1 font-['Montserrat'] text-[clamp(1.8rem,3vw,3rem)] font-bold leading-[1.05] tracking-[-0.04em]">
                      Start your next project
                    </h1>
                  </div>
                </div>

                <p className="max-w-[500px] text-[14px] leading-6 text-black/55 dark:text-white/55">
                  Whether it is a website, automation workflow, AI product, or a custom software system, we can help you turn idea into execution.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="contact-card flex items-center gap-3 rounded-2xl border border-black/[0.07] bg-black/[0.02] p-3 dark:border-white/[0.08] dark:bg-white/[0.03]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#58adff]/20 bg-[#58adff]/10">
                      <Mail size={16} className="text-[#2f8fe6] dark:text-[#58adff]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40 dark:text-white/40">Email</p>
                      <a href="mailto:info@comradecoders.com" className="mt-1 block text-[13px] font-medium text-black/70 hover:text-[#2f8fe6] dark:text-white/75 dark:hover:text-[#58adff]">
                        info@comradecoders.com
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleBookCall}
                    className="contact-card flex w-full items-center justify-between gap-3 rounded-2xl border border-[#58adff]/20 bg-[#58adff]/10 p-3 text-left transition-all duration-200 hover:border-[#58adff]/35 hover:bg-[#58adff]/15 dark:border-[#58adff]/20 dark:bg-[#58adff]/10 dark:hover:border-[#58adff]/35"
                    style={{ animationDelay: "0.8s" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#58adff]/20 bg-[#58adff]/10">
                        <Phone size={16} className="text-[#2f8fe6] dark:text-[#58adff]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40 dark:text-white/40">Call</p>
                        <p className="mt-1 text-[13px] font-medium text-black/70 dark:text-white/75">{callNumber}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2f8fe6] dark:bg-[#0d1421]/80 dark:text-[#58adff]">
                      Book a Call
                    </span>
                  </button>

                  <div className="contact-card flex items-center gap-3 rounded-2xl border border-black/[0.07] bg-black/[0.02] p-3 dark:border-white/[0.08] dark:bg-white/[0.03]" style={{ animationDelay: "1.4s" }}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#58adff]/20 bg-[#58adff]/10">
                      <UserRound size={16} className="text-[#2f8fe6] dark:text-[#58adff]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40 dark:text-white/40">Response time</p>
                      <p className="mt-1 text-[13px] font-medium text-black/70 dark:text-white/75">Usually within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="relative">
              <div className="contact-panel rounded-[24px] border border-black/[0.08] bg-white/90 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#0d1421]/90 dark:shadow-[0_18px_55px_rgba(0,0,0,0.35)] sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40 dark:text-white/40">Request a quote</p>
                    <h2 className="mt-1 font-['Montserrat'] text-[1.2rem] font-bold tracking-[-0.03em]">Tell us about your idea</h2>
                  </div>
                  <span className="rounded-full border border-[#58adff]/20 bg-[#58adff]/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#2f8fe6] dark:text-[#58adff]">
                    Free consult
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.14em] text-black/45 dark:text-white/45">Name</label>
                      <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className="w-full rounded-xl border border-black/[0.08] bg-black/[0.02] px-3.5 py-2.5 text-[13px] text-black placeholder:text-black/30 outline-none transition duration-200 focus:border-[#58adff]/50 focus:bg-white dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white dark:placeholder:text-white/25 dark:focus:bg-[#0f172a]" />
                      {errors.name && <p className="mt-1.5 text-[11px] text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.14em] text-black/45 dark:text-white/45">Email</label>
                      <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="w-full rounded-xl border border-black/[0.08] bg-black/[0.02] px-3.5 py-2.5 text-[13px] text-black placeholder:text-black/30 outline-none transition duration-200 focus:border-[#58adff]/50 focus:bg-white dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white dark:placeholder:text-white/25 dark:focus:bg-[#0f172a]" />
                      {errors.email && <p className="mt-1.5 text-[11px] text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="company" className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.14em] text-black/45 dark:text-white/45">Company</label>
                      <input id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Company name" className="w-full rounded-xl border border-black/[0.08] bg-black/[0.02] px-3.5 py-2.5 text-[13px] text-black placeholder:text-black/30 outline-none transition duration-200 focus:border-[#58adff]/50 focus:bg-white dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white dark:placeholder:text-white/25 dark:focus:bg-[#0f172a]" />
                    </div>

                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.14em] text-black/45 dark:text-white/45">Phone</label>
                      <input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98xxx xxxxx" className="w-full rounded-xl border border-black/[0.08] bg-black/[0.02] px-3.5 py-2.5 text-[13px] text-black placeholder:text-black/30 outline-none transition duration-200 focus:border-[#58adff]/50 focus:bg-white dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white dark:placeholder:text-white/25 dark:focus:bg-[#0f172a]" />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="projectType" className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.14em] text-black/45 dark:text-white/45">Project type</label>
                      <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange} className="w-full rounded-xl border border-black/[0.08] bg-black/[0.02] px-3.5 py-2.5 text-[13px] text-black outline-none transition duration-200 focus:border-[#58adff]/50 focus:bg-white dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white dark:focus:bg-[#0f172a]">
                        {projectOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budget" className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.14em] text-black/45 dark:text-white/45">Budget</label>
                      <select id="budget" name="budget" value={formData.budget} onChange={handleChange} className="w-full rounded-xl border border-black/[0.08] bg-black/[0.02] px-3.5 py-2.5 text-[13px] text-black outline-none transition duration-200 focus:border-[#58adff]/50 focus:bg-white dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white dark:focus:bg-[#0f172a]">
                        {budgetOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.14em] text-black/45 dark:text-white/45">Timeline</label>
                    <input id="timeline" name="timeline" value={formData.timeline} onChange={handleChange} placeholder="e.g. 4-6 weeks" className="w-full rounded-xl border border-black/[0.08] bg-black/[0.02] px-3.5 py-2.5 text-[13px] text-black placeholder:text-black/30 outline-none transition duration-200 focus:border-[#58adff]/50 focus:bg-white dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white dark:placeholder:text-white/25 dark:focus:bg-[#0f172a]" />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.14em] text-black/45 dark:text-white/45">Project brief</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Tell us about your goals, challenges, and what you want to build..." className="w-full resize-none rounded-xl border border-black/[0.08] bg-black/[0.02] px-3.5 py-2.5 text-[13px] text-black placeholder:text-black/30 outline-none transition duration-200 focus:border-[#58adff]/50 focus:bg-white dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white dark:placeholder:text-white/25 dark:focus:bg-[#0f172a]" />
                    {errors.message && <p className="mt-1.5 text-[11px] text-red-500">{errors.message}</p>}
                  </div>

                  <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                    <button type="submit" className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#58adff] to-[#2f8fe6] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(47,143,230,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(47,143,230,0.36)]">
                      Send message
                      <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </button>

                    <Link to="/services" className="inline-flex items-center gap-2 text-[12px] font-medium text-black/60 transition-colors hover:text-[#2f8fe6] dark:text-white/60 dark:hover:text-[#58adff]">
                      Browse services
                      <ArrowRight size={12} />
                    </Link>
                  </div>

                  {submitted && (
                    <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2.5 text-[12px] text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
                      Your email client is opening with the message prepared. If it doesn’t open, email us directly at info@comradecoders.com.
                    </div>
                  )}
                </form>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
