import {
  ArrowUpRight,
  BarChart3,
  FileText,
  FolderKanban,
  Globe2,
  Mail,
  MessageSquareText,
  Plus,
  Settings,
  SlidersHorizontal,
  Users,
} from "lucide-react";

const stats = [
  {
    label: "Total Services",
    value: "0",
    description: "Active services",
    icon: SlidersHorizontal,
  },
  {
    label: "Projects",
    value: "0",
    description: "Published projects",
    icon: FolderKanban,
  },
  {
    label: "Industries",
    value: "0",
    description: "Active industries",
    icon: Globe2,
  },
  {
    label: "Inquiries",
    value: "0",
    description: "Website inquiries",
    icon: Mail,
  },
];

const quickActions = [
  {
    title: "Add Service",
    description: "Create a new service",
    icon: SlidersHorizontal,
  },
  {
    title: "Add Project",
    description: "Publish a new project",
    icon: FolderKanban,
  },
  {
    title: "Add Industry",
    description: "Add an industry",
    icon: Globe2,
  },
  {
    title: "Write Blog",
    description: "Create a new article",
    icon: FileText,
  },
];

const managementItems = [
  {
    title: "Services",
    description: "Manage your company services",
    icon: SlidersHorizontal,
    path: "/admin/services",
  },
  {
    title: "Projects",
    description: "Manage portfolio projects",
    icon: FolderKanban,
    path: "/admin/projects",
  },
  {
    title: "Industries",
    description: "Manage industries and solutions",
    icon: Globe2,
    path: "/admin/industries",
  },
  {
    title: "Technologies",
    description: "Manage technology stack",
    icon: BarChart3,
    path: "/admin/technologies",
  },
  {
    title: "Blog",
    description: "Manage articles and categories",
    icon: FileText,
    path: "/admin/blog",
  },
  {
    title: "Inquiries",
    description: "Review website inquiries",
    icon: MessageSquareText,
    path: "/admin/inquiries",
  },
];

export default function DashboardPage() {
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

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2f8fe6]">
            Overview
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">
            Welcome back, {username}.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-black/45 dark:text-white/40">
            Manage your website content, monitor inquiries and keep your
            digital presence up to date from one workspace.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-4 py-2.5 text-xs font-semibold text-black/65 transition hover:border-[#2f8fe6]/30 hover:text-[#2f8fe6] dark:border-white/[0.09] dark:bg-white/[0.04] dark:text-white/65 dark:hover:text-[#58adff]"
          >
            View website
            <ArrowUpRight size={14} />
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="group rounded-2xl border border-black/[0.07] bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#2f8fe6]/20 hover:shadow-[0_12px_35px_rgba(15,23,42,0.06)] dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-[#58adff]/20"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-black/45 dark:text-white/40">
                    {stat.label}
                  </p>

                  <p className="mt-4 text-3xl font-bold tracking-[-0.05em]">
                    {stat.value}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2f8fe6]/10 text-[#2f8fe6] dark:text-[#58adff]">
                  <Icon size={18} strokeWidth={1.8} />
                </div>
              </div>

              <p className="mt-3 text-[11px] text-black/35 dark:text-white/30">
                {stat.description}
              </p>
            </div>
          );
        })}
      </section>

      {/* Quick actions */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2f8fe6]">
              Quick actions
            </p>

            <h3 className="mt-1 text-lg font-semibold tracking-[-0.03em]">
              Manage content
            </h3>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.title}
                type="button"
                className="group flex items-center gap-4 rounded-2xl border border-black/[0.07] bg-white p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#2f8fe6]/30 hover:shadow-[0_12px_30px_rgba(15,23,42,0.05)] dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-[#58adff]/25"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2f8fe6]/10 text-[#2f8fe6] dark:text-[#58adff]">
                  <Icon size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold">
                    {action.title}
                  </p>

                  <p className="mt-1 truncate text-[10px] text-black/40 dark:text-white/35">
                    {action.description}
                  </p>
                </div>

                <Plus
                  size={15}
                  className="text-black/25 transition-transform duration-200 group-hover:rotate-90 group-hover:text-[#2f8fe6] dark:text-white/25 dark:group-hover:text-[#58adff]"
                />
              </button>
            );
          })}
        </div>
      </section>

      {/* Management + system */}
      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        {/* Management */}
        <div className="rounded-2xl border border-black/[0.07] bg-white dark:border-white/[0.08] dark:bg-white/[0.04]">
          <div className="flex items-center justify-between border-b border-black/[0.07] px-5 py-4 dark:border-white/[0.08]">
            <div>
              <h3 className="text-sm font-semibold">
                Content management
              </h3>

              <p className="mt-1 text-xs text-black/40 dark:text-white/35">
                Manage the content powering your website.
              </p>
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2f8fe6]/10 text-[#2f8fe6] dark:text-[#58adff]">
              <Settings size={15} />
            </div>
          </div>

          <div className="grid gap-px bg-black/[0.06] sm:grid-cols-2 dark:bg-white/[0.07]">
            {managementItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.title}
                  href={item.path}
                  className="group flex items-center gap-4 bg-white p-5 transition hover:bg-[#f8fbff] dark:bg-[#0d1219] dark:hover:bg-white/[0.055]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black/[0.04] text-black/45 transition group-hover:bg-[#2f8fe6]/10 group-hover:text-[#2f8fe6] dark:bg-white/[0.05] dark:text-white/40 dark:group-hover:text-[#58adff]">
                    <Icon size={16} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold">
                      {item.title}
                    </p>

                    <p className="mt-1 truncate text-[10px] text-black/40 dark:text-white/35">
                      {item.description}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={14}
                    className="text-black/20 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#2f8fe6] dark:text-white/20 dark:group-hover:text-[#58adff]"
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* Admin status */}
        <div className="rounded-2xl border border-black/[0.07] bg-white p-5 dark:border-white/[0.08] dark:bg-white/[0.04]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">
                Workspace status
              </h3>

              <p className="mt-1 text-xs text-black/40 dark:text-white/35">
                Current administration status
              </p>
            </div>

            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.45)]" />
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-black/[0.025] px-4 py-3 dark:bg-white/[0.04]">
              <div className="flex items-center gap-3">
                <Users
                  size={15}
                  className="text-black/35 dark:text-white/30"
                />
                <span className="text-xs text-black/55 dark:text-white/50">
                  Authentication
                </span>
              </div>

              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-black/[0.025] px-4 py-3 dark:bg-white/[0.04]">
              <div className="flex items-center gap-3">
                <BarChart3
                  size={15}
                  className="text-black/35 dark:text-white/30"
                />
                <span className="text-xs text-black/55 dark:text-white/50">
                  API connection
                </span>
              </div>

              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                Connected
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-black/[0.025] px-4 py-3 dark:bg-white/[0.04]">
              <div className="flex items-center gap-3">
                <Settings
                  size={15}
                  className="text-black/35 dark:text-white/30"
                />
                <span className="text-xs text-black/55 dark:text-white/50">
                  CMS
                </span>
              </div>

              <span className="text-[10px] font-semibold text-[#2f8fe6] dark:text-[#58adff]">
                Ready
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-[#2f8fe6]/15 bg-[#2f8fe6]/[0.04] p-4">
            <p className="text-xs font-semibold text-[#2f8fe6] dark:text-[#58adff]">
              CMS workspace
            </p>

            <p className="mt-1.5 text-[11px] leading-5 text-black/40 dark:text-white/35">
              Content statistics will automatically populate as the
              existing APIs are connected to the admin dashboard.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}