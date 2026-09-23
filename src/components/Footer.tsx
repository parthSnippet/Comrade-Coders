import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Globe,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

import darkLogo from "../assets/logoCC.png";
import lightLogo from "../assets/logoCC White.png";
import { useTheme } from "../context/ThemeContext";
import useAPI from "../../hook/useAPI";
import apiConfig from "../../config/global.json";

interface SiteSetting {
  id: number;
  company_name: string;
  tagline: string;
  description: string;
  logo: string | null;
  favicon: string | null;
  phone: string;
  email: string;
  address: string;
  copyright_text: string;
  updated_at: string;
}

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  is_active: boolean;
  sort_order: number;
}

interface FooterMenu {
  id: number;
  title: string;
  label: string;
  url: string;
  is_active: boolean;
  sort_order: number;
}

interface Service {
  id: number;
  title: string;
  slug: string;
  is_active: boolean;
}

const socialIconMap: Record<
  string,
  React.ComponentType<{ size?: number | string }>
> = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  twitter: FaTwitter,
  github: FaGithub,
};

export default function Footer() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // Site Settings API
  const {
    data: siteSettings,
    request: requestSiteSettings,
  } = useAPI<SiteSetting[]>();

  // Social Links API
  const {
    data: socialLinks,
    loading: socialLinksLoading,
    request: requestSocialLinks,
  } = useAPI<SocialLink[]>();

  // Footer Menus API
  const {
    data: footerMenus,
    request: requestFooterMenus,
  } = useAPI<FooterMenu[]>();

  // Services API
  const {
    data: services,
    loading: servicesLoading,
    request: requestServices,
  } = useAPI<Service[]>();

  useEffect(() => {
    const loadFooterData = async () => {
      await Promise.all([
        requestSiteSettings(apiConfig.api.endpoints.siteSettings),
        requestSocialLinks(apiConfig.api.endpoints.socialLinks),
        requestFooterMenus(apiConfig.api.endpoints.footerMenus),
        requestServices(apiConfig.api.endpoints.services),
      ]);
    };

    loadFooterData();
  }, [
    requestSiteSettings,
    requestSocialLinks,
    requestFooterMenus,
    requestServices,
  ]);

  const site = siteSettings?.[0];

  const groupedMenus = useMemo(() => {
    if (!footerMenus) {
      return {};
    }

    return footerMenus.reduce<Record<string, FooterMenu[]>>(
      (groups, menu) => {
        if (!groups[menu.title]) {
          groups[menu.title] = [];
        }

        groups[menu.title].push(menu);

        return groups;
      },
      {}
    );
  }, [footerMenus]);

  const scrollTo = (section: string) => {
    const doScroll = () => {
      const el = document.getElementById(section);

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(doScroll, 300);
    } else {
      doScroll();
    }
  };

  const handleFooterLink = (
    event: React.MouseEvent<HTMLAnchorElement>,
    url: string
  ) => {
    if (url.startsWith("#")) {
      event.preventDefault();

      const section = url.replace("#", "");

      if (section) {
        scrollTo(section);
      }
    }
  };

  const getSocialIcon = (platform: string) => {
    return socialIconMap[platform.toLowerCase()] || Globe;
  };

  const getCopyright = () => {
    if (site?.copyright_text) {
      return site.copyright_text.replace(/�/g, "©");
    }

    return `© ${new Date().getFullYear()} ${
      site?.company_name || "Comerade Coders"
    }. All rights reserved.`;
  };

  const formatPhoneHref = (phone: string) => {
    return `tel:${phone.replace(/[^\d+]/g, "")}`;
  };

  return (
    <footer className="relative border-t border-black/[0.07] bg-white text-[#05070b] dark:border-white/[0.07] dark:bg-[#05070b] dark:text-white">
      {/* Top glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[1px] w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#58adff]/40 to-transparent" />

      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        {/* Main grid */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">

          {/* Brand column */}
          <div>
            <Link to="/" className="inline-block">
              <span className="relative block h-16 w-44 overflow-hidden">
                <img
                  src={
                    site?.logo
                      ? site.logo
                      : isDark
                        ? darkLogo
                        : lightLogo
                  }
                  alt={site?.company_name || "Comerade Coders"}
                  width={512}
                  height={512}
                  className="absolute left-0 top-1/2 h-auto w-full max-w-none -translate-y-1/2 object-contain"
                />
              </span>
            </Link>

            <p className="mt-4 max-w-[280px] text-[14px] leading-6 text-black/50 dark:text-white/45">
              {site?.description ||
                "We build software, automation and AI solutions that help businesses grow faster and operate smarter."}
            </p>

            {/* Contact info */}
            <div className="mt-6 flex flex-col gap-3">
              {site?.email && (
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 text-[13px] text-black/50 transition-colors hover:text-[#2f8fe6] dark:text-white/45 dark:hover:text-[#58adff]"
                >
                  <Mail size={14} className="shrink-0" />
                  {site.email}
                </a>
              )}

              {site?.phone && (
                <a
                  href={formatPhoneHref(site.phone)}
                  className="flex items-center gap-2.5 text-[13px] text-black/50 transition-colors hover:text-[#2f8fe6] dark:text-white/45 dark:hover:text-[#58adff]"
                >
                  <Phone size={14} className="shrink-0" />
                  +91 {site.phone}
                </a>
              )}

              {site?.address && (
                <span className="flex items-start gap-2.5 text-[13px] text-black/50 dark:text-white/45">
                  <MapPin size={14} className="mt-0.5 shrink-0" />
                  <span>{site.address}</span>
                </span>
              )}
            </div>

            {/* Social links */}
            <div className="mt-7 flex items-center gap-2.5">
              {!socialLinksLoading &&
                socialLinks
                  ?.filter((social) => social.is_active)
                  .sort((a, b) => a.sort_order - b.sort_order)
                  .map((social) => {
                    const Icon = getSocialIcon(social.platform);

                    return (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit Comerade Coders on ${social.platform}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.10] text-black/50 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2f8fe6]/40 hover:bg-[#2f8fe6]/10 hover:text-[#2f8fe6] dark:border-white/[0.12] dark:text-white/50 dark:hover:border-[#58adff]/40 dark:hover:bg-[#58adff]/10 dark:hover:text-[#58adff]"
                      >
                        <Icon size={16} />
                      </a>
                    );
                  })}
            </div>
          </div>

          {/* Services column */}
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-black/35 dark:text-white/30">
              Services
            </p>

            <ul className="flex flex-col gap-2.5">
              {!servicesLoading &&
                services
                  ?.filter((service) => service.is_active)
                  .map((service) => (
                    <li key={service.id}>
                      <Link
                        to={`/services/${service.slug}`}
                        className="group flex items-center gap-1 text-[13.5px] text-black/55 transition-colors hover:text-[#2f8fe6] dark:text-white/50 dark:hover:text-[#58adff]"
                      >
                        {service.title}

                        <ArrowUpRight
                          size={11}
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                        />
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>

          {/* Dynamic footer menu columns */}
          {Object.entries(groupedMenus).map(([title, menus]) => (
            <div key={title}>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-black/35 dark:text-white/30">
                {title}
              </p>

              <ul className="flex flex-col gap-2.5">
                {menus
                  .filter((menu) => menu.is_active)
                  .sort((a, b) => a.sort_order - b.sort_order)
                  .map((menu) => {
                    const isExternal = /^https?:\/\//i.test(menu.url);

                    if (isExternal) {
                      return (
                        <li key={menu.id}>
                          <a
                            href={menu.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center gap-1 text-[13.5px] text-black/55 transition-colors hover:text-[#2f8fe6] dark:text-white/50 dark:hover:text-[#58adff]"
                          >
                            {menu.label}

                            <ArrowUpRight
                              size={11}
                              className="opacity-0 transition-opacity group-hover:opacity-100"
                            />
                          </a>
                        </li>
                      );
                    }

                    return (
                      <li key={menu.id}>
                        <Link
                          to={menu.url}
                          onClick={(event) =>
                            handleFooterLink(event, menu.url)
                          }
                          className="group flex items-center gap-1 text-[13.5px] text-black/55 transition-colors hover:text-[#2f8fe6] dark:text-white/50 dark:hover:text-[#58adff]"
                        >
                          {menu.label}

                          <ArrowUpRight
                            size={11}
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                          />
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-black/[0.06] py-6 text-[12px] text-black/35 sm:flex-row dark:border-white/[0.06] dark:text-white/30">
          <p>{getCopyright()}</p>

          <div className="flex gap-5">
            <Link
              to="/contact"
              className="transition-colors hover:text-black/60 dark:hover:text-white/60"
            >
              Privacy Policy
            </Link>

            <Link
              to="/contact"
              className="transition-colors hover:text-black/60 dark:hover:text-white/60"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

