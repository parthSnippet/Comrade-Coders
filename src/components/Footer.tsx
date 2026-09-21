import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import darkLogo from "../assets/logoCC.png";
import lightLogo from "../assets/logoCC White.png";
import { services } from "../data/services";
import { useTheme } from "../context/ThemeContext";

const company = [
  { label: "About Us", href: "/about" },
  { label: "Why Comrade", section: "why" },
  { label: "Our Work", section: "work" },
  { label: "Contact", href: "/contact" },
];

const resources = [
  { label: "All Services", href: "/services" },
  { label: "Industries", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Case Studies", href: "#" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/comrade_coders/", icon: FaInstagram },
  { label: "Facebook", href: "https://www.facebook.com/people/Comrade-Coders/61576269116532/", icon: FaFacebookF },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/comrade-coders/", icon: FaLinkedinIn },
];

export default function Footer() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const scrollTo = (section: string) => {
    const doScroll = () => {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(doScroll, 300);
    } else {
      doScroll();
    }
  };

  return (
    <footer className="relative border-t border-black/[0.07] bg-white text-[#05070b] dark:border-white/[0.07] dark:bg-[#05070b] dark:text-white">
      {/* Top glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[1px] w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#58adff]/40 to-transparent" />

      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">

        {/* Main grid */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">

          {/* Brand col */}
          <div>
            <Link to="/" className="inline-block">
              <span className="relative block h-16 w-44 overflow-hidden">
                <img
                  src={isDark ? darkLogo : lightLogo}
                  alt="Comrade Coders"
                  width={512}
                  height={512}
                  className="absolute left-0 top-1/2 h-auto w-full max-w-none -translate-y-1/2 object-contain"
                />
              </span>
            </Link>
            <p className="mt-4 max-w-[280px] text-[14px] leading-6 text-black/50 dark:text-white/45">
              We build software, automation and AI solutions that help businesses grow faster and operate smarter.
            </p>

            {/* Contact info */}
            <div className="mt-6 flex flex-col gap-3">
              <a href="mailto:hello@comeradecoders.com" className="flex items-center gap-2.5 text-[13px] text-black/50 transition-colors hover:text-[#2f8fe6] dark:text-white/45 dark:hover:text-[#58adff]">
                <Mail size={14} className="shrink-0" />
                info@comradecoders.com

              </a>
              <a href="tel:+911234567890" className="flex items-center gap-2.5 text-[13px] text-black/50 transition-colors hover:text-[#2f8fe6] dark:text-white/45 dark:hover:text-[#58adff]">
                <Phone size={14} className="shrink-0" />
                +91 8128564899
              </a>
              <span className="flex items-center gap-2.5 text-[13px] text-black/50 dark:text-white/45">
                <MapPin size={14} className="shrink-0" />
                India
              </span>
            </div>

            <div className="mt-7 flex items-center gap-2.5">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit Comrade Coders on ${label}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.10] text-black/50 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2f8fe6]/40 hover:bg-[#2f8fe6]/10 hover:text-[#2f8fe6] dark:border-white/[0.12] dark:text-white/50 dark:hover:border-[#58adff]/40 dark:hover:bg-[#58adff]/10 dark:hover:text-[#58adff]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services col */}
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-black/35 dark:text-white/30">
              Services
            </p>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="group flex items-center gap-1 text-[13.5px] text-black/55 transition-colors hover:text-[#2f8fe6] dark:text-white/50 dark:hover:text-[#58adff]"
                  >
                    {s.title}
                    <ArrowUpRight size={11} className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company col */}
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-black/35 dark:text-white/30">
              Company
            </p>
            <ul className="flex flex-col gap-2.5">
              {company.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="text-[13.5px] text-black/55 transition-colors hover:text-[#2f8fe6] dark:text-white/50 dark:hover:text-[#58adff]"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => scrollTo(item.section as string)}
                      className="text-[13.5px] text-black/55 transition-colors hover:text-[#2f8fe6] dark:text-white/50 dark:hover:text-[#58adff]"
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources col */}
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-black/35 dark:text-white/30">
              Resources
            </p>
            <ul className="flex flex-col gap-2.5">
              {resources.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="group flex items-center gap-1 text-[13.5px] text-black/55 transition-colors hover:text-[#2f8fe6] dark:text-white/50 dark:hover:text-[#58adff]"
                  >
                    {item.label}
                    <ArrowUpRight size={11} className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-black/[0.06] py-6 text-[12px] text-black/35 sm:flex-row dark:border-white/[0.06] dark:text-white/30">
          <p>© {new Date().getFullYear()} Comrade Coders. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/contact" className="transition-colors hover:text-black/60 dark:hover:text-white/60">Privacy Policy</Link>
            <Link to="/contact" className="transition-colors hover:text-black/60 dark:hover:text-white/60">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
