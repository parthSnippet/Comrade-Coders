import {
  Bell,
  Menu,
  Search,
} from "lucide-react";
import { useLocation } from "react-router-dom";

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export default function AdminHeader({
  onMenuClick,
}: AdminHeaderProps) {
  const storedUser = sessionStorage.getItem("admin_user");

  let username = "Admin";

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      username = user.username || "Admin";
    } catch {
      username = "Admin";
    }
  }

  const { pathname: currentPath } = useLocation();

  const getPageTitle = () => {
    if (currentPath === "/admin" || currentPath === "/admin/dashboard") {
      return "Dashboard";
    }

    if (currentPath.startsWith("/admin/services")) {
      return "Services";
    }

    if (currentPath.startsWith("/admin/projects")) {
      return "Projects";
    }

    if (currentPath.startsWith("/admin/industries")) {
      return "Industries";
    }

    if (currentPath.startsWith("/admin/technologies")) {
      return "Technologies";
    }

    if (currentPath.startsWith("/admin/blog")) {
      return "Blog";
    }

    if (currentPath.startsWith("/admin/inquiries")) {
      return "Inquiries";
    }

    if (currentPath.startsWith("/admin/about")) {
      return "About Us";
    }

    if (currentPath.startsWith("/admin/settings")) {
      return "Settings";
    }

    return "Admin";
  };

  const pageTitle = getPageTitle();

  return (
    <header className="sticky top-0 z-30 flex h-[78px] items-center justify-between border-b border-black/[0.07] bg-[#f4f7fb]/90 px-5 backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#080b10]/90 sm:px-8 lg:px-10">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Open admin sidebar"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-black/55 transition hover:bg-black/[0.06] hover:text-black dark:text-white/55 dark:hover:bg-white/[0.06] dark:hover:text-white lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2f8fe6]">
            Admin workspace
          </p>

          <h1 className="mt-1 truncate text-lg font-semibold tracking-[-0.03em] sm:text-xl">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search */}
        <button
          type="button"
          aria-label="Search admin workspace"
          className="hidden h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-xs text-black/40 transition hover:border-black/[0.14] hover:text-black/60 dark:border-white/[0.10] dark:bg-white/[0.04] dark:text-white/40 dark:hover:border-white/[0.16] dark:hover:text-white/60 sm:flex"
        >
          <Search size={14} />
          <span>Search</span>
          <span className="ml-3 rounded border border-black/[0.08] px-1.5 py-0.5 text-[9px] dark:border-white/[0.10]">
            /
          </span>
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-black/50 transition hover:bg-black/[0.06] hover:text-black dark:text-white/50 dark:hover:bg-white/[0.06] dark:hover:text-white"
        >
          <Bell size={18} strokeWidth={1.8} />

          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#2f8fe6]" />
        </button>

        {/* User */}
        <div className="hidden items-center gap-2.5 border-l border-black/[0.08] pl-3 dark:border-white/[0.08] sm:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2f8fe6] text-[10px] font-bold text-white">
            {username.slice(0, 2).toUpperCase()}
          </div>

          <div className="max-w-[120px]">
            <p className="truncate text-xs font-semibold">
              {username}
            </p>

            <p className="text-[9px] uppercase tracking-[0.12em] text-black/35 dark:text-white/30">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}