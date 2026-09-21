import { useState } from "react";
import {
  BarChart3,
  Bell,
  ChevronDown,
  FileText,
  FolderKanban,
  Globe2,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Mail,
  Menu,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Projects", icon: FolderKanban },
  { label: "Services", icon: SlidersHorizontal },
  { label: "Industries", icon: Globe2 },
  { label: "Content", icon: FileText },
  { label: "Inquiries", icon: Mail },
];

const stats = [
  { label: "Total visitors", value: "2,841", change: "+18.4%", icon: Users },
  { label: "Project inquiries", value: "48", change: "+12.8%", icon: Mail },
  { label: "Published projects", value: "12", change: "+3 this month", icon: FolderKanban },
  { label: "Conversion rate", value: "4.8%", change: "+0.6%", icon: BarChart3 },
];

const inquiries = [
  { name: "Aarav Mehta", company: "Northstar Labs", type: "Web platform", time: "12 min ago", status: "New" },
  { name: "Riya Sharma", company: "Vanta Commerce", type: "Automation", time: "48 min ago", status: "Review" },
  { name: "Kabir Malhotra", company: "Orbit Manufacturing", type: "Business software", time: "2 hrs ago", status: "New" },
  { name: "Simran Patel", company: "Brightline Health", type: "Healthcare", time: "Yesterday", status: "Contacted" },
];

export default function AdminPage() {
  const [activePage, setActivePage] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#111827] dark:bg-[#080b10] dark:text-white">
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[252px] flex-col border-r border-black/[0.07] bg-white transition-transform duration-300 dark:border-white/[0.08] dark:bg-[#0b1017] lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[78px] items-center justify-between border-b border-black/[0.07] px-6 dark:border-white/[0.08]">
          <div>
            <p className="text-sm font-bold tracking-[-0.03em]">Comrade<span className="text-[#2f8fe6]">AI</span></p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-black/40 dark:text-white/35">Admin workspace</p>
          </div>
          <button type="button" aria-label="Close sidebar" onClick={() => setSidebarOpen(false)} className="rounded-lg p-1.5 text-black/45 hover:bg-black/[0.05] dark:text-white/45 dark:hover:bg-white/[0.06] lg:hidden"><X size={18} /></button>
        </div>

        <div className="flex-1 px-3 py-6">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-black/35 dark:text-white/30">Workspace</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activePage === item.label;
              return (
                <button key={item.label} type="button" onClick={() => { setActivePage(item.label); setSidebarOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${active ? "bg-[#2f8fe6] text-white shadow-[0_8px_20px_rgba(47,143,230,0.22)]" : "text-black/55 hover:bg-black/[0.05] hover:text-black dark:text-white/55 dark:hover:bg-white/[0.06] dark:hover:text-white"}`}>
                  <Icon size={17} strokeWidth={1.8} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <p className="mb-3 mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-black/35 dark:text-white/30">System</p>
          <nav className="space-y-1">
            <button type="button" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-black/55 transition-colors hover:bg-black/[0.05] hover:text-black dark:text-white/55 dark:hover:bg-white/[0.06] dark:hover:text-white"><Settings size={17} /> Settings</button>
            <button type="button" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-black/55 transition-colors hover:bg-black/[0.05] hover:text-black dark:text-white/55 dark:hover:bg-white/[0.06] dark:hover:text-white"><ShieldCheck size={17} /> Admin access</button>
          </nav>
        </div>

        <div className="border-t border-black/[0.07] p-4 dark:border-white/[0.08]">
          <div className="flex items-center gap-3 rounded-xl bg-black/[0.03] p-3 dark:bg-white/[0.04]">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2f8fe6] text-xs font-bold text-white">CC</div>
            <div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold">Admin account</p><p className="truncate text-[10px] text-black/40 dark:text-white/40">admin@comradecoders.com</p></div>
            <LogOut size={15} className="text-black/35 dark:text-white/35" />
          </div>
        </div>
      </aside>

      {sidebarOpen && <button type="button" aria-label="Close sidebar overlay" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/30 lg:hidden" />}

      <main className="min-h-screen lg:pl-[252px]">
        <header className="sticky top-0 z-30 flex h-[78px] items-center justify-between border-b border-black/[0.07] bg-[#f4f7fb]/90 px-5 backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#080b10]/90 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3"><button type="button" aria-label="Open sidebar" onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-black/55 hover:bg-black/[0.06] dark:text-white/55 dark:hover:bg-white/[0.06] lg:hidden"><Menu size={20} /></button><div><p className="text-xs text-black/45 dark:text-white/40">Tuesday, September 21, 2026</p><h1 className="mt-1 text-lg font-semibold tracking-[-0.03em]">Good morning, Admin</h1></div></div>
          <div className="flex items-center gap-3"><button type="button" aria-label="Search dashboard" className="hidden h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-xs text-black/40 dark:border-white/[0.10] dark:bg-white/[0.04] dark:text-white/40 sm:flex"><Search size={14} /> Search</button><button type="button" aria-label="Notifications" className="relative rounded-lg p-2 text-black/55 hover:bg-black/[0.06] dark:text-white/55 dark:hover:bg-white/[0.06]"><Bell size={18} /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#2f8fe6]" /></button></div>
        </header>

        <div className="mx-auto max-w-[1440px] p-5 sm:p-8 lg:p-10">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2f8fe6]">{activePage}</p><h2 className="mt-2 text-3xl font-bold tracking-[-0.05em]">{activePage === "Overview" ? "Your website at a glance" : `${activePage} management`}</h2></div><button type="button" className="flex w-fit items-center gap-2 rounded-xl bg-[#2f8fe6] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(47,143,230,0.22)]"><Plus size={16} /> Add {activePage === "Overview" ? "content" : activePage.slice(0, -1).toLowerCase()}</button></div>

          {activePage === "Overview" ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => { const Icon = stat.icon; return <div key={stat.label} className="rounded-2xl border border-black/[0.07] bg-white p-5 dark:border-white/[0.08] dark:bg-white/[0.04]"><div className="flex items-start justify-between"><span className="text-xs text-black/50 dark:text-white/45">{stat.label}</span><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2f8fe6]/10 text-[#2f8fe6] dark:text-[#78bdff]"><Icon size={16} /></span></div><p className="mt-5 text-2xl font-bold tracking-[-0.04em]">{stat.value}</p><p className="mt-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">{stat.change}</p></div>; })}
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
                <section className="rounded-2xl border border-black/[0.07] bg-white dark:border-white/[0.08] dark:bg-white/[0.04]"><div className="flex items-center justify-between border-b border-black/[0.07] px-5 py-4 dark:border-white/[0.08]"><div><h3 className="text-sm font-semibold">Recent inquiries</h3><p className="mt-1 text-xs text-black/40 dark:text-white/40">Latest messages from your website</p></div><button type="button" onClick={() => setActivePage("Inquiries")} className="text-xs font-semibold text-[#2f8fe6]">View all</button></div><div className="overflow-x-auto"><table className="w-full min-w-[600px] text-left"><thead><tr className="text-[10px] uppercase tracking-[0.14em] text-black/35 dark:text-white/30"><th className="px-5 py-3 font-semibold">Contact</th><th className="px-5 py-3 font-semibold">Project type</th><th className="px-5 py-3 font-semibold">Received</th><th className="px-5 py-3 font-semibold">Status</th></tr></thead><tbody>{inquiries.map((inquiry) => <tr key={inquiry.name} className="border-t border-black/[0.06] text-sm dark:border-white/[0.07]"><td className="px-5 py-4"><p className="font-medium">{inquiry.name}</p><p className="mt-1 text-xs text-black/40 dark:text-white/40">{inquiry.company}</p></td><td className="px-5 py-4 text-black/55 dark:text-white/55">{inquiry.type}</td><td className="px-5 py-4 text-xs text-black/45 dark:text-white/45">{inquiry.time}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${inquiry.status === "New" ? "bg-[#2f8fe6]/10 text-[#2f8fe6]" : inquiry.status === "Review" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"}`}>{inquiry.status}</span></td></tr>)}</tbody></table></div></section>
                <section className="rounded-2xl border border-black/[0.07] bg-white p-5 dark:border-white/[0.08] dark:bg-white/[0.04]"><div className="flex items-center justify-between"><div><h3 className="text-sm font-semibold">Quick actions</h3><p className="mt-1 text-xs text-black/40 dark:text-white/40">Manage your content</p></div><LifeBuoy size={18} className="text-[#2f8fe6]" /></div><div className="mt-5 space-y-2">{["Add a project", "Update an industry", "Edit FAQ content", "Review inquiries"].map((action) => <button key={action} type="button" onClick={() => setActivePage(action.includes("project") ? "Projects" : action.includes("industry") ? "Industries" : action.includes("FAQ") ? "Content" : "Inquiries")} className="flex w-full items-center justify-between rounded-xl border border-black/[0.07] px-3.5 py-3 text-left text-xs font-medium transition hover:border-[#2f8fe6]/40 hover:bg-[#2f8fe6]/[0.04] dark:border-white/[0.08]"><span>{action}</span><ChevronDown size={14} className="-rotate-90 text-black/35 dark:text-white/35" /></button>)}</div></section>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-black/[0.14] bg-white p-10 text-center dark:border-white/[0.15] dark:bg-white/[0.04]"><FolderKanban className="mx-auto text-[#2f8fe6]" size={32} /><h3 className="mt-4 text-lg font-semibold">{activePage} workspace ready</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-black/50 dark:text-white/50">This management area is ready for database-backed CRUD forms. The next integration will connect these controls to Supabase or your chosen backend.</p><button type="button" className="mt-5 rounded-full border border-[#2f8fe6]/30 px-4 py-2 text-xs font-semibold text-[#2f8fe6]">Configure data source</button></div>
          )}
        </div>
      </main>
    </div>
  );
}
