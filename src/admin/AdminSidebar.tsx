import {
  BookOpen,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  FileText,
  Globe2,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navigationItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Services",
    path: "/admin/services",
    icon: SlidersHorizontal,
  },
  {
    label: "Projects",
    path: "/admin/projects",
    icon: BriefcaseBusiness,
  },
  {
    label: "Industries",
    path: "/admin/industries",
    icon: Building2,
  },
  {
    label: "Technologies",
    path: "/admin/technologies",
    icon: Globe2,
  },
  {
    label: "Blog",
    path: "/admin/blog",
    icon: BookOpen,
  },
  {
    label: "Inquiries",
    path: "/admin/inquiries",
    icon: Mail,
  },
  {
    label: "About Us",
    path: "/admin/about",
    icon: FileText,
  },
];

const systemItems = [
  {
    label: "Settings",
    path: "/admin/footer",
    icon: Settings,
  },
];

export default function AdminSidebar({
  isOpen = true,
  onClose,
}: AdminSidebarProps) {
  const currentPath = window.location.pathname;

  const handleLogout = () => {
    sessionStorage.removeItem("admin_access_token");
    sessionStorage.removeItem("admin_refresh_token");
    sessionStorage.removeItem("admin_user");

    window.location.href = "/admin";
  };

  const isActive = (path: string) => {
    if (path === "/admin/dashboard") {
      return (
        currentPath === "/admin" ||
        currentPath === "/admin/dashboard"
      );
    }

    return currentPath.startsWith(path);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <button
          type="button"
          aria-label="Close admin sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-[252px] flex-col
          border-r border-black/[0.07] bg-white
          transition-transform duration-300
          dark:border-white/[0.08] dark:bg-[#0b1017]
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Brand */}
        <div className="flex h-[78px] items-center justify-between border-b border-black/[0.07] px-5 dark:border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2f8fe6] text-[11px] font-bold text-white shadow-[0_6px_18px_rgba(47,143,230,0.20)]">
              CC
            </div>

            <div>
              <p className="text-sm font-bold tracking-[-0.03em]">
                Comerade{" "}
                <span className="text-[#2f8fe6]">
                  Coders
                </span>
              </p>

              <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.17em] text-black/35 dark:text-white/30">
                Admin workspace
              </p>
            </div>
          </div>

          {onClose && (
            <button
              type="button"
              aria-label="Close sidebar"
              onClick={onClose}
              className="rounded-lg p-1.5 text-black/40 transition hover:bg-black/[0.05] hover:text-black dark:text-white/40 dark:hover:bg-white/[0.06] dark:hover:text-white lg:hidden"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-6">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-black/35 dark:text-white/30">
            Workspace
          </p>

          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={onClose}
                  className={`
                    group flex w-full items-center gap-3 rounded-xl
                    px-3 py-2.5 text-sm font-medium
                    transition-all duration-200
                    ${
                      active
                        ? "bg-[#2f8fe6] text-white shadow-[0_8px_20px_rgba(47,143,230,0.20)]"
                        : "text-black/55 hover:bg-black/[0.05] hover:text-black dark:text-white/55 dark:hover:bg-white/[0.06] dark:hover:text-white"
                    }
                  `}
                >
                  <Icon
                    size={17}
                    strokeWidth={active ? 2 : 1.8}
                  />

                  <span className="flex-1">
                    {item.label}
                  </span>

                  <ChevronRight
                    size={14}
                    className={`
                      transition-transform duration-200
                      ${
                        active
                          ? "translate-x-0 opacity-80"
                          : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-40"
                      }
                    `}
                  />
                </a>
              );
            })}
          </nav>

          <p className="mb-3 mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-black/35 dark:text-white/30">
            System
          </p>

          <nav className="space-y-1">
            {systemItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={onClose}
                  className={`
                    group flex w-full items-center gap-3 rounded-xl
                    px-3 py-2.5 text-sm font-medium
                    transition-colors
                    ${
                      active
                        ? "bg-[#2f8fe6]/10 text-[#2f8fe6] dark:bg-[#2f8fe6]/10 dark:text-[#58adff]"
                        : "text-black/55 hover:bg-black/[0.05] hover:text-black dark:text-white/55 dark:hover:bg-white/[0.06] dark:hover:text-white"
                    }
                  `}
                >
                  <Icon size={17} strokeWidth={1.8} />

                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Admin account */}
        <div className="border-t border-black/[0.07] p-4 dark:border-white/[0.08]">
          <div className="rounded-xl bg-black/[0.03] p-3 dark:bg-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2f8fe6] text-xs font-bold text-white">
                AD
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">
                  Admin account
                </p>

                <p className="truncate text-[10px] text-black/40 dark:text-white/40">
                  Administrator
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                aria-label="Logout"
                className="rounded-lg p-1.5 text-black/35 transition hover:bg-red-500/10 hover:text-red-500 dark:text-white/35 dark:hover:text-red-400"
              >
                <LogOut size={15} />
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 px-1 text-[9px] uppercase tracking-[0.14em] text-black/25 dark:text-white/20">
            <Users size={11} />
            <span>Admin access</span>
          </div>
        </div>
      </aside>
    </>
  );
}