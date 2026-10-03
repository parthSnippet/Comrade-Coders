import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";

import darkLogo from "../assets/logoCC.png";
import lightLogo from "../assets/logoCC White.png";
import { useTheme } from "../context/ThemeContext";

import useAPI from "../../hook/useAPI";
import apiConfig from "../../config/global.json";

import type { Service } from "../types/service";
import type { Industry } from "../types/industry";

const navItems = [{ label: "Home", section: "home" }];

const pillItem = [
  "mx-0.5 flex h-[44px] items-center gap-1.5 rounded-full border border-transparent px-4",
  "text-[14px] font-medium transition-all duration-300 ease-out",
  "text-black/60 hover:border-black/[0.12] hover:bg-black/[0.06] hover:text-black",
  "dark:text-white/75 dark:hover:border-white/[0.18] dark:hover:bg-white/[0.07] dark:hover:text-white",
].join(" ");

const activeItem = [
  "border-black/[0.15] bg-black/[0.08] text-black",
  "dark:border-white/[0.22] dark:bg-white/[0.10] dark:text-white",
].join(" ");

function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isContactPage = location.pathname === "/contact";
  const isPortfolioPage = location.pathname === "/portfolio";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const {
    data: services,
    request: requestServices,
  } = useAPI<Service[]>();

  const {
    data: industries,
    request: requestIndustries,
  } = useAPI<Industry[]>();

  useEffect(() => {
    requestServices(apiConfig.api.endpoints.services);
    requestIndustries(apiConfig.api.endpoints.industries);
  }, [requestServices, requestIndustries]);

  const serviceItems =
    services?.map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
      sub_services: service.sub_services ?? [],
    })) ?? [];

  const industryItems =
    industries?.map((industry) => ({
      label: industry.title,
      href: `/industries/${industry.slug}`,
      sub_services: [],
    })) ?? [];

  const dropdownItems = [
    { label: "Services", items: serviceItems },
    { label: "Industries", items: industryItems },
  ];

  const openDropdown = (label: string) => {
    setActiveDropdown(label);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const toggleMobileDropdown = (label: string) => {
    setActiveDropdown((previous) =>
      previous === label ? null : label
    );
  };

  const scrollToSection = (section: string) => {
    const doScroll = () => {
      const el = document.getElementById(section);

      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(doScroll, 300);
    } else {
      doScroll();
    }
  };

  return (
    <header
      role="banner"
      className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"
    >
      {/* MAIN NAV PILL */}
      <nav
        aria-label="Main navigation"
        className={[
          "mx-auto flex h-[68px] max-w-[1280px] items-center justify-between rounded-full px-3",
          "border backdrop-blur-2xl transition-all duration-300",
          "border-black/[0.10] bg-white/90 shadow-[0_8px_40px_rgba(0,0,0,0.10)]",
          "dark:border-white/[0.11] dark:bg-[#080808]/92 dark:shadow-[0_8px_40px_rgba(0,0,0,0.45)]",
        ].join(" ")}
      >
        {/* LOGO */}
        <Link
          to="/"
          aria-label="Comrade Coders – go to homepage"
          className="ml-1 flex shrink-0 items-center gap-1.5"
        >
          <span className="relative h-12 w-32 shrink-0 overflow-hidden sm:h-14 sm:w-36">
            <img
              src={isDark ? darkLogo : lightLogo}
              alt="Comrade Coders logo"
              width={512}
              height={512}
              className="absolute left-0 top-1/2 h-auto w-full max-w-none -translate-y-1/2 object-contain drop-shadow-[0_0_14px_rgba(88,173,255,0.35)] transition-transform duration-300 hover:scale-105"
            />
          </span>

          <span className="hidden text-[17px] font-semibold tracking-[-0.02em] sm:inline">
              <span className="text-[#2f8fe6] dark:text-[#78bdff]">AI</span>
            </span>
        </Link>

        {/* DESKTOP CENTER PILL */}
        <div
          role="navigation"
          aria-label="Site sections"
          className={[
            "hidden items-center rounded-full border border-transparent px-1 transition-all duration-300 lg:flex",
            "bg-black/[0.03]",
            "dark:bg-white/[0.03]",
          ].join(" ")}
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              aria-label={`Navigate to ${item.label}`}
              onClick={() => scrollToSection(item.section)}
              className={`${pillItem} ${
                item.label === "Home" && isHomePage
                  ? activeItem
                  : ""
              }`}
            >
              {item.label}
            </button>
          ))}

          {dropdownItems.map((dropdown) => {
            const open = activeDropdown === dropdown.label;

            return (
              <div
                key={dropdown.label}
                className="relative"
                onMouseEnter={() => openDropdown(dropdown.label)}
                onMouseLeave={closeDropdown}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={open}
                  aria-label={`${dropdown.label} menu`}
                  className={`${pillItem} ${
                    open ? activeItem : ""
                  }`}
                >
                  {dropdown.label}

                  <ChevronDown
                    size={15}
                    strokeWidth={2}
                    className={`transition-transform duration-300 ease-out ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  role="menu"
                  aria-label={`${dropdown.label} submenu`}
                  className={[
                    "absolute left-1/2 top-[54px] w-[240px] -translate-x-1/2 rounded-2xl border p-2",
                    "backdrop-blur-2xl transition-all duration-300 ease-out",
                    "border-black/[0.10] bg-white/95 shadow-[0_20px_55px_rgba(0,0,0,0.12)]",
                    "dark:border-white/[0.10] dark:bg-[#0c0c0c]/96 dark:shadow-[0_20px_55px_rgba(0,0,0,0.60)]",
                    open
                      ? "visible translate-y-0 opacity-100 scale-100"
                      : "invisible -translate-y-2 opacity-0 scale-[0.97]",
                  ].join(" ")}
                >
                  <p className="mb-1 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.20em] text-[#2f8fe6] dark:text-[#58adff]">
                    {dropdown.label}
                  </p>

                  {dropdown.items.map((item) => (
                    <div key={item.href} className="relative group/item">
                      <Link
                        to={item.href}
                        role="menuitem"
                        aria-label={item.label}
                        onClick={closeDropdown}
                        className={[
                          "flex items-center justify-between rounded-xl border border-transparent px-3 py-2.5",
                          "text-[13px] transition-all duration-200 ease-out",
                          "text-black/60 hover:border-black/[0.08] hover:bg-black/[0.04] hover:text-black",
                          "dark:text-white/60 dark:hover:border-white/[0.09] dark:hover:bg-white/[0.05] dark:hover:text-white",
                        ].join(" ")}
                      >
                        {item.label}
                        <ArrowUpRight
                          size={13}
                          className="opacity-0 transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 group-hover/item:opacity-100"
                        />
                      </Link>

                      {/* Sub-services flyout */}
                      {item.sub_services.length > 0 && (
                        <div className={[
                          "invisible absolute left-full top-0 ml-1 w-[220px] rounded-2xl border p-2",
                          "opacity-0 scale-[0.97] transition-all duration-200 ease-out",
                          "group-hover/item:visible group-hover/item:opacity-100 group-hover/item:scale-100",
                          "border-black/[0.10] bg-white/95 shadow-[0_20px_55px_rgba(0,0,0,0.12)] backdrop-blur-2xl",
                          "dark:border-white/[0.10] dark:bg-[#0c0c0c]/96 dark:shadow-[0_20px_55px_rgba(0,0,0,0.60)]",
                        ].join(" ")}>
                          <p className="mb-1 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.20em] text-[#2f8fe6] dark:text-[#58adff]">
                            {item.label}
                          </p>
                          {item.sub_services.map((sub) => (
                            <Link
                              key={sub.slug}
                              to={`/services/${sub.slug}`}
                              role="menuitem"
                              onClick={closeDropdown}
                              className={[
                                "group/sub flex items-center justify-between rounded-xl border border-transparent px-3 py-2.5",
                                "text-[13px] transition-all duration-200 ease-out",
                                "text-black/60 hover:border-black/[0.08] hover:bg-black/[0.04] hover:text-black",
                                "dark:text-white/60 dark:hover:border-white/[0.09] dark:hover:bg-white/[0.05] dark:hover:text-white",
                              ].join(" ")}
                            >
                              {sub.title}
                              <ArrowUpRight
                                size={13}
                                className="opacity-0 transition-all duration-200 group-hover/sub:translate-x-0.5 group-hover/sub:-translate-y-0.5 group-hover/sub:opacity-100"
                              />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <Link
            to="/contact"
            aria-label="Navigate to Contact Us"
            className={`${pillItem} ${
              isContactPage ? activeItem : ""
            }`}
          >
            Contact Us
          </Link>

          <Link
            to="/portfolio"
            aria-label="Navigate to Portfolio"
            className={`${pillItem} ${
              isPortfolioPage ? activeItem : ""
            }`}
          >
            Portfolio
          </Link>

          <button
            type="button"
            aria-label="Navigate to About Us"
            onClick={() => navigate("/about")}
            className={pillItem}
          >
            About Us
          </button>
        </div>

        {/* DESKTOP RIGHT */}
        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            className={[
              "flex h-[42px] w-[42px] items-center justify-center rounded-full border border-transparent transition-all duration-200",
              "text-black/50 hover:border-black/[0.12] hover:bg-black/[0.06] hover:text-black",
              "dark:text-white/65 dark:hover:border-white/[0.18] dark:hover:bg-white/[0.07] dark:hover:text-white",
            ].join(" ")}
          >
            {isDark ? (
              <Sun size={17} strokeWidth={1.8} />
            ) : (
              <Moon size={17} strokeWidth={1.8} />
            )}
          </button>

          <Link
            to="/contact"
            aria-label="Contact Comrade Coders – Let's Talk"
            className="group ml-1 flex h-[42px] items-center gap-1.5 rounded-full bg-gradient-to-r from-[#58adff] to-[#2f8fe6] px-5 text-[13.5px] font-semibold text-white shadow-[0_6px_22px_rgba(47,143,230,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(47,143,230,0.42)]"
          >
            Let's Talk

            <ArrowUpRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* MOBILE ACTIONS */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.12] bg-black/[0.04] text-black/60 dark:border-white/[0.12] dark:bg-white/[0.04] dark:text-white/75"
          >
            {isDark ? (
              <Sun size={16} />
            ) : (
              <Moon size={16} />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((previous) => !previous)}
            aria-label={
              mobileOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.12] bg-black/[0.04] text-black dark:border-white/[0.12] dark:bg-white/[0.04] dark:text-white"
          >
            {mobileOpen ? (
              <X size={19} />
            ) : (
              <Menu size={19} />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        aria-label="Mobile navigation"
        className={[
          "mx-auto mt-2 max-w-[1280px] overflow-hidden rounded-3xl border backdrop-blur-2xl transition-all duration-300 lg:hidden",
          "border-black/[0.10] bg-white/95",
          "dark:border-white/[0.10] dark:bg-[#090909]/96",
          mobileOpen
            ? "max-h-[720px] opacity-100"
            : "max-h-0 border-transparent opacity-0",
        ].join(" ")}
      >
        <div className="p-3">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              aria-label={`Navigate to ${item.label}`}
              onClick={() => {
                scrollToSection(item.section);
                setMobileOpen(false);
              }}
              className="mb-1 flex w-full rounded-2xl border border-transparent px-4 py-3 text-sm font-medium transition-all duration-200 text-black/70 hover:border-black/[0.10] hover:bg-black/[0.05] hover:text-black dark:text-white/70 dark:hover:border-white/[0.12] dark:hover:bg-white/[0.05] dark:hover:text-white"
            >
              {item.label}
            </button>
          ))}

          {dropdownItems.map((dropdown) => (
            <div key={dropdown.label}>
              <button
                type="button"
                aria-expanded={
                  activeDropdown === dropdown.label
                }
                onClick={() =>
                  toggleMobileDropdown(dropdown.label)
                }
                className="mb-1 flex w-full items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-sm font-medium transition-all duration-200 text-black/70 hover:border-black/[0.10] hover:bg-black/[0.05] hover:text-black dark:text-white/70 dark:hover:border-white/[0.12] dark:hover:bg-white/[0.05] dark:hover:text-white"
              >
                {dropdown.label}

                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    activeDropdown === dropdown.label
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {activeDropdown === dropdown.label && (
                <div className="mb-2 ml-3 border-l border-black/[0.08] pl-2 dark:border-white/[0.09]">
                  {dropdown.items.map((item) => (
                    <div key={item.href}>
                      <Link
                        to={item.href}
                        aria-label={item.label}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-xl px-4 py-2.5 text-sm text-black/50 transition-colors hover:bg-black/[0.04] hover:text-[#2f8fe6] dark:text-white/50 dark:hover:bg-white/[0.04] dark:hover:text-[#58adff]"
                      >
                        {item.label}
                      </Link>

                      {item.sub_services.length > 0 && (
                        <div className="ml-3 border-l border-black/[0.06] pl-2 dark:border-white/[0.07]">
                          {item.sub_services.map((sub) => (
                            <Link
                              key={sub.slug}
                              to={`/services/${sub.slug}`}
                              onClick={() => setMobileOpen(false)}
                              className="block rounded-xl px-4 py-2 text-[13px] text-black/40 transition-colors hover:bg-black/[0.04] hover:text-[#2f8fe6] dark:text-white/35 dark:hover:bg-white/[0.04] dark:hover:text-[#58adff]"
                            >
                              ↳ {sub.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            to="/contact"
            aria-label="Navigate to Contact Us"
            onClick={() => setMobileOpen(false)}
            className={`mb-1 flex w-full rounded-2xl border border-transparent px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isContactPage
                ? "bg-black/[0.08] text-black dark:bg-white/[0.10] dark:text-white"
                : "text-black/70 hover:border-black/[0.10] hover:bg-black/[0.05] hover:text-black dark:text-white/70 dark:hover:border-white/[0.12] dark:hover:bg-white/[0.05] dark:hover:text-white"
            }`}
          >
            Contact Us
          </Link>

          <Link
            to="/portfolio"
            aria-label="Navigate to Portfolio"
            onClick={() => setMobileOpen(false)}
            className={`mb-1 flex w-full rounded-2xl border border-transparent px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isPortfolioPage
                ? "bg-black/[0.08] text-black dark:bg-white/[0.10] dark:text-white"
                : "text-black/70 hover:border-black/[0.10] hover:bg-black/[0.05] hover:text-black dark:text-white/70 dark:hover:border-white/[0.12] dark:hover:bg-white/[0.05] dark:hover:text-white"
            }`}
          >
            Portfolio
          </Link>

          <button
            type="button"
            aria-label="Navigate to About Us"
            onClick={() => {
              navigate("/about");
              setMobileOpen(false);
            }}
            className="mb-1 flex w-full rounded-2xl border border-transparent px-4 py-3 text-sm font-medium transition-all duration-200 text-black/70 hover:border-black/[0.10] hover:bg-black/[0.05] hover:text-black dark:text-white/70 dark:hover:border-white/[0.12] dark:hover:bg-white/[0.05] dark:hover:text-white"
          >
            About Us
          </button>

          <Link
            to="/contact"
            aria-label="Contact Comrade Coders – Let's Talk"
            onClick={() => setMobileOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#58adff] to-[#2f8fe6] px-5 py-3 text-sm font-semibold text-white"
          >
            Let's Talk
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;