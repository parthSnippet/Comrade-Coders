import { useEffect, useState } from "react";
import {
  Loader2,
  Mail,
  Phone,
  Search,
  SlidersHorizontal,
  X,
  Building2,
  Clock,
  DollarSign,
  FileText,
  Calendar,
} from "lucide-react";

import useAPI from "../../../hook/useAPI";
import apiConfig from "../../../config/global.json";

function getAuthHeader() {
  const token = sessionStorage.getItem("admin_access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

interface Inquiry {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  project_type: string;
  budget: string;
  timeline: string;
  project_brief: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const PROJECT_TYPE_LABELS: Record<string, string> = {
  web_development: "Web Development",
  software_development: "Software Development",
  automation: "Automation",
  ai_platforms: "AI Platforms",
  erp_crm: "ERP & CRM",
  it_solutions: "IT Solutions",
  book_a_call: "Book a Call",
  not_sure: "Not sure yet",
};

const BUDGET_LABELS: Record<string, string> = {
  under_1k: "Under $1k",
  "1k_5k": "$1k – $5k",
  "5k_15k": "$5k – $15k",
  "15k_30k": "$15k – $30k",
  "30k_plus": "$30k+",
};

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  contacted: "bg-purple-500/10 text-purple-500 dark:text-purple-400",
  closed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? "bg-black/[0.05] text-black/40 dark:bg-white/[0.06] dark:text-white/35";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${style}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status || "new"}
    </span>
  );
}

export default function AdminInquiriesPage() {
  const { data, loading, error, request } = useAPI<Inquiry[]>();
  const { request: mutate } = useAPI<Inquiry>();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const load = () =>
    request(apiConfig.api.endpoints.contact, "GET", undefined, {
      headers: getAuthHeader(),
    });

  useEffect(() => { load(); }, []);

  const [statusError, setStatusError] = useState<string | null>(null);

  const handleStatusChange = async (inquiry: Inquiry, newStatus: string) => {
  setStatusError(null);

  const res = await mutate(
    `${apiConfig.api.endpoints.contact}${inquiry.id}/`,
    "PATCH",
    { status: newStatus },
    {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    }
  );

  if (!res) {
    setStatusError("Status update failed. Please try again.");
    return;
  }

  if (selected?.id === inquiry.id) {
    setSelected({
      ...inquiry,
      status: newStatus,
    });
  }

  load();
};

  const filtered = (data ?? []).filter((inq) => {
    const matchSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      (inq.company ?? "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || inq.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statuses = ["all", "new", "pending", "contacted", "closed"];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2f8fe6]">CRM</p>
        <h2 className="mt-1 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Inquiries</h2>
        <p className="mt-1 text-sm text-black/45 dark:text-white/40">
          {data?.length ?? 0} total inquir{data?.length !== 1 ? "ies" : "y"}
        </p>
      </div>

      {/* Table card */}
      <div className="rounded-2xl border border-black/[0.07] bg-white dark:border-white/[0.08] dark:bg-white/[0.04]">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-black/[0.07] px-5 py-4 dark:border-white/[0.08] sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-black/35 dark:text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, company..."
              className="h-9 w-full rounded-lg border border-black/[0.08] bg-black/[0.02] pl-9 pr-4 text-sm outline-none transition placeholder:text-black/30 focus:border-[#2f8fe6]/40 focus:ring-2 focus:ring-[#2f8fe6]/10 dark:border-white/[0.08] dark:bg-white/[0.03] dark:placeholder:text-white/25"
            />
          </div>

          {/* Status filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {statuses.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${
                  statusFilter === s
                    ? "bg-[#2f8fe6] text-white"
                    : "text-black/45 hover:bg-black/[0.05] dark:text-white/40 dark:hover:bg-white/[0.06]"
                }`}
              >
                {s}
              </button>
            ))}
            <div className="ml-2 flex items-center gap-1.5 text-xs text-black/40 dark:text-white/35">
              <SlidersHorizontal size={13} />
              <span>{filtered.length}</span>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-black/40 dark:text-white/35">
            <Loader2 size={18} className="animate-spin" /> Loading inquiries...
          </div>
        )}

        {error && !loading && (
          <div className="px-5 py-8 text-center">
            <p className="text-sm font-medium text-red-500">Failed to load inquiries.</p>
            <p className="mt-1 text-xs text-black/40 dark:text-white/35">Backend GET endpoint not enabled yet — ask backend dev to allow GET on /contact/</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/[0.04] dark:bg-white/[0.05]">
              <Mail size={20} className="text-black/30 dark:text-white/25" />
            </div>
            <p className="text-sm font-medium text-black/50 dark:text-white/40">
              {search || statusFilter !== "all" ? "No inquiries match your filters." : "No inquiries yet."}
            </p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <>
            {/* Desktop table */}
            <div className="hidden md:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-black/[0.06] dark:border-white/[0.07]">
                    {["Name", "Email", "Project Type", "Budget", "Status", "Date", ""].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-black/35 dark:text-white/30">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((inq, i) => (
                    <tr
                      key={inq.id}
                      className={`group cursor-pointer transition hover:bg-black/[0.015] dark:hover:bg-white/[0.025] ${
                        i !== filtered.length - 1 ? "border-b border-black/[0.05] dark:border-white/[0.06]" : ""
                      }`}
                      onClick={() => setSelected(inq)}
                    >
                      <td className="px-5 py-3.5">
                        <p className="font-semibold">{inq.name}</p>
                        {inq.company && (
                          <p className="text-xs text-black/40 dark:text-white/35">{inq.company}</p>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-black/55 dark:text-white/50">{inq.email}</td>
                      <td className="px-5 py-3.5">
                        <span className="rounded-lg bg-[#2f8fe6]/8 px-2 py-1 text-xs font-medium text-[#2f8fe6] dark:bg-[#58adff]/10 dark:text-[#58adff]">
                          {PROJECT_TYPE_LABELS[inq.project_type] ?? inq.project_type}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-black/50 dark:text-white/45">
                        {(BUDGET_LABELS[inq.budget] ?? inq.budget) || "—"}
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={inq.status} />
                      </td>
                      <td className="px-5 py-3.5 text-xs text-black/40 dark:text-white/35">
                        {formatDate(inq.created_at)}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs font-medium text-[#2f8fe6] opacity-0 transition group-hover:opacity-100 dark:text-[#58adff]">
                          View →
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="space-y-3 p-4 md:hidden">
              {filtered.map((inq) => (
                <button
                  key={inq.id}
                  type="button"
                  onClick={() => setSelected(inq)}
                  className="w-full rounded-xl border border-black/[0.07] bg-black/[0.015] p-4 text-left dark:border-white/[0.08] dark:bg-white/[0.03]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{inq.name}</p>
                      <p className="mt-0.5 text-xs text-black/45 dark:text-white/40">{inq.email}</p>
                    </div>
                    <StatusBadge status={inq.status} />
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-lg bg-[#2f8fe6]/8 px-2 py-0.5 text-xs font-medium text-[#2f8fe6] dark:bg-[#58adff]/10 dark:text-[#58adff]">
                      {PROJECT_TYPE_LABELS[inq.project_type] ?? inq.project_type}
                    </span>
                    {inq.budget && (
                      <span className="rounded-lg bg-black/[0.04] px-2 py-0.5 text-xs text-black/50 dark:bg-white/[0.05] dark:text-white/40">
                        {BUDGET_LABELS[inq.budget] ?? inq.budget}
                      </span>
                    )}
                    <span className="rounded-lg bg-black/[0.04] px-2 py-0.5 text-xs text-black/40 dark:bg-white/[0.05] dark:text-white/35">
                      {formatDate(inq.created_at)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[3px]">
          <div className="relative flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-black/[0.10] bg-white shadow-2xl dark:border-white/[0.10] dark:bg-[#0d1219]">
            {/* Modal header */}
            <div className="flex items-start justify-between border-b border-black/[0.07] px-6 py-4 dark:border-white/[0.08]">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2f8fe6]">Inquiry #{selected.id}</p>
                <h2 className="mt-0.5 text-base font-semibold tracking-[-0.03em]">{selected.name}</h2>
                <p className="text-xs text-black/40 dark:text-white/35">
                  {formatDate(selected.created_at)} at {formatTime(selected.created_at)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg p-2 text-black/40 transition hover:bg-black/[0.06] hover:text-black dark:text-white/40 dark:hover:bg-white/[0.06] dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {/* Contact info */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl border border-black/[0.07] bg-black/[0.02] p-3 dark:border-white/[0.08] dark:bg-white/[0.03]">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#58adff]/10">
                    <Mail size={14} className="text-[#2f8fe6] dark:text-[#58adff]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/40 dark:text-white/35">Email</p>
                    <a href={`mailto:${selected.email}`} className="block truncate text-xs font-medium text-black/70 hover:text-[#2f8fe6] dark:text-white/70 dark:hover:text-[#58adff]">
                      {selected.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-black/[0.07] bg-black/[0.02] p-3 dark:border-white/[0.08] dark:bg-white/[0.03]">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#58adff]/10">
                    <Phone size={14} className="text-[#2f8fe6] dark:text-[#58adff]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/40 dark:text-white/35">Phone</p>
                    <p className="text-xs font-medium text-black/70 dark:text-white/70">{selected.phone || "—"}</p>
                  </div>
                </div>

                {selected.company && (
                  <div className="flex items-center gap-3 rounded-xl border border-black/[0.07] bg-black/[0.02] p-3 dark:border-white/[0.08] dark:bg-white/[0.03]">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#58adff]/10">
                      <Building2 size={14} className="text-[#2f8fe6] dark:text-[#58adff]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/40 dark:text-white/35">Company</p>
                      <p className="text-xs font-medium text-black/70 dark:text-white/70">{selected.company}</p>
                    </div>
                  </div>
                )}

                {selected.timeline && (
                  <div className="flex items-center gap-3 rounded-xl border border-black/[0.07] bg-black/[0.02] p-3 dark:border-white/[0.08] dark:bg-white/[0.03]">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#58adff]/10">
                      <Clock size={14} className="text-[#2f8fe6] dark:text-[#58adff]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/40 dark:text-white/35">Timeline</p>
                      <p className="text-xs font-medium text-black/70 dark:text-white/70">{selected.timeline}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Project details */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-black/[0.07] bg-black/[0.02] p-3 dark:border-white/[0.08] dark:bg-white/[0.03]">
                  <div className="mb-1.5 flex items-center gap-2">
                    <FileText size={13} className="text-[#2f8fe6] dark:text-[#58adff]" />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/40 dark:text-white/35">Project Type</p>
                  </div>
                  <p className="text-sm font-semibold">
                    {PROJECT_TYPE_LABELS[selected.project_type] ?? selected.project_type}
                  </p>
                </div>

                <div className="rounded-xl border border-black/[0.07] bg-black/[0.02] p-3 dark:border-white/[0.08] dark:bg-white/[0.03]">
                  <div className="mb-1.5 flex items-center gap-2">
                    <DollarSign size={13} className="text-[#2f8fe6] dark:text-[#58adff]" />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/40 dark:text-white/35">Budget</p>
                  </div>
                  <p className="text-sm font-semibold">
                    {(BUDGET_LABELS[selected.budget] ?? selected.budget) || "—"}
                  </p>
                </div>
              </div>

              {/* Project brief */}
              {selected.project_brief && (
                <div className="rounded-xl border border-black/[0.07] bg-black/[0.02] p-4 dark:border-white/[0.08] dark:bg-white/[0.03]">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/40 dark:text-white/35">Project Brief</p>
                  <p className="text-sm leading-6 text-black/65 dark:text-white/60">{selected.project_brief}</p>
                </div>
              )}

              {/* Status + date */}
              <div className="flex items-center justify-between rounded-xl border border-black/[0.07] bg-black/[0.02] p-3 dark:border-white/[0.08] dark:bg-white/[0.03]">
                <div className="flex items-center gap-2">
                  <Calendar size={13} className="text-black/35 dark:text-white/30" />
                  <p className="text-xs text-black/45 dark:text-white/40">
                    Submitted {formatDate(selected.created_at)}
                  </p>
                </div>
                <StatusBadge status={selected.status} />
              </div>

              {/* Status update */}
              <div>
                <p className="mb-2 text-xs font-semibold text-black/50 dark:text-white/45">Update status</p>
                <div className="flex flex-wrap gap-2">
                  {["new", "pending", "contacted", "closed"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleStatusChange(selected, s)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${
                        selected.status === s
                          ? "bg-[#2f8fe6] text-white"
                          : "border border-black/[0.08] text-black/50 hover:border-[#2f8fe6]/30 hover:text-[#2f8fe6] dark:border-white/[0.09] dark:text-white/45 dark:hover:text-[#58adff]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-between border-t border-black/[0.07] px-6 py-4 dark:border-white/[0.08]">
              <a
                href={`mailto:${selected.email}?subject=Re: Your inquiry at Comrade Coders`}
                className="flex items-center gap-2 rounded-xl bg-[#2f8fe6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3d9bf0]"
              >
                <Mail size={14} /> Reply via Email
              </a>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-xl border border-black/[0.10] px-4 py-2 text-sm font-medium text-black/60 transition hover:bg-black/[0.04] dark:border-white/[0.10] dark:text-white/60"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
