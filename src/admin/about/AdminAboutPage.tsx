import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Save, X } from "lucide-react";

import useAPI from "../../../hook/useAPI";
import apiConfig from "../../../config/global.json";

function getAuthHeader() {
  const token = sessionStorage.getItem("admin_access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

interface AboutData {
  id: number;
  projects_delivered: string;
  happy_clients: string;
  years_experience: string;
  tech_experts: string;
  how_we_work_title: string;
  how_we_work_description: string;
  how_we_work_points: string[];
  updated_at: string;
}

const empty = {
  projects_delivered: "",
  happy_clients: "",
  years_experience: "",
  tech_experts: "",
  how_we_work_title: "",
  how_we_work_description: "",
  how_we_work_points: [] as string[],
};

function TagInput({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !values.includes(trimmed)) onChange([...values, trimmed]);
    setInput("");
  };

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">{label}</label>
      <div className="flex flex-wrap gap-2 rounded-xl border border-black/[0.10] bg-black/[0.02] p-2.5 dark:border-white/[0.10] dark:bg-white/[0.03]">
        {values.map((v, i) => (
          <span key={i} className="flex items-center gap-1.5 rounded-lg bg-[#2f8fe6]/10 px-2.5 py-1 text-xs font-medium text-[#2f8fe6] dark:text-[#58adff]">
            {v}
            <button type="button" onClick={() => onChange(values.filter((_, idx) => idx !== i))} className="opacity-60 hover:opacity-100">
              <X size={11} />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(); } }}
          placeholder={placeholder ?? "Type and press Enter"}
          className="min-w-[180px] flex-1 bg-transparent text-xs outline-none placeholder:text-black/30 dark:placeholder:text-white/25"
        />
      </div>
    </div>
  );
}

export default function AdminAboutPage() {
  const { data, loading, error, request } = useAPI<AboutData[]>();
  const { loading: saving, request: mutate } = useAPI<AboutData>();

  const [form, setForm] = useState({ ...empty });
  const [recordId, setRecordId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const load = () =>
    request(apiConfig.api.endpoints.about, "GET", undefined, {
      headers: getAuthHeader(),
    });

  useEffect(() => { load(); }, []);

  useEffect(() => {
    const about = data?.[0];
    if (about) {
      setRecordId(about.id);
      setForm({
        projects_delivered: about.projects_delivered,
        happy_clients: about.happy_clients,
        years_experience: about.years_experience,
        tech_experts: about.tech_experts,
        how_we_work_title: about.how_we_work_title,
        how_we_work_description: about.how_we_work_description,
        how_we_work_points: about.how_we_work_points ?? [],
      });
    }
  }, [data]);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const set = (key: string, val: unknown) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const endpoint = recordId
      ? `${apiConfig.api.endpoints.about}${recordId}/`
      : apiConfig.api.endpoints.about;

    const res = await mutate(endpoint, recordId ? "PATCH" : "POST", form, {
      headers: getAuthHeader(),
    });

    if (res) {
      showToast("About page updated successfully.");
      load();
    } else {
      showToast("Failed to save. Try again.", "error");
    }
  };

  const inputCls =
    "w-full rounded-xl border border-black/[0.10] bg-black/[0.02] px-4 py-2.5 text-sm outline-none transition placeholder:text-black/30 focus:border-[#2f8fe6]/50 focus:ring-2 focus:ring-[#2f8fe6]/10 dark:border-white/[0.10] dark:bg-white/[0.03] dark:placeholder:text-white/25 dark:focus:border-[#58adff]/50";

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-[60] rounded-xl border px-5 py-3 text-sm font-medium shadow-lg ${
          toast.type === "success"
            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "border-red-400/20 bg-red-400/10 text-red-500 dark:text-red-400"
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2f8fe6]">Content</p>
          <h2 className="mt-1 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">About Us</h2>
          <p className="mt-1 text-sm text-black/45 dark:text-white/40">
            Manage stats and "How we work" section
          </p>
        </div>

        {data?.[0]?.updated_at && (
          <p className="text-xs text-black/35 dark:text-white/30">
            Last updated: {new Date(data[0].updated_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
          </p>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center gap-2 py-20 text-sm text-black/40 dark:text-white/35">
          <Loader2 size={18} className="animate-spin" /> Loading about data...
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-5 py-4 text-sm text-red-500 dark:text-red-400">
          Failed to load about data. Check your API connection.
        </div>
      )}

      {/* Form */}
      {!loading && (
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Stats section */}
          <div className="rounded-2xl border border-black/[0.07] bg-white p-6 dark:border-white/[0.08] dark:bg-white/[0.04]">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#58adff]/10">
                <CheckCircle2 size={15} className="text-[#2f8fe6] dark:text-[#58adff]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/40 dark:text-white/35">Stats</p>
                <p className="text-sm font-semibold">Key numbers shown on About page</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { key: "projects_delivered", label: "Projects Delivered", placeholder: "e.g. 120+" },
                { key: "happy_clients", label: "Happy Clients", placeholder: "e.g. 80+" },
                { key: "years_experience", label: "Years Experience", placeholder: "e.g. 5+" },
                { key: "tech_experts", label: "Tech Experts", placeholder: "e.g. 20+" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">{label}</label>
                  <input
                    value={form[key as keyof typeof form] as string}
                    onChange={(e) => set(key, e.target.value)}
                    placeholder={placeholder}
                    className={inputCls}
                  />
                </div>
              ))}
            </div>

            {/* Live preview */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { value: form.projects_delivered, label: "Projects Delivered" },
                { value: form.happy_clients, label: "Happy Clients" },
                { value: form.years_experience, label: "Years Experience" },
                { value: form.tech_experts, label: "Tech Experts" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-black/[0.07] bg-black/[0.02] px-4 py-4 text-center dark:border-white/[0.07] dark:bg-white/[0.03]">
                  <p className="font-['Montserrat'] text-2xl font-bold text-[#05070b] dark:text-white">
                    {s.value || "—"}
                  </p>
                  <p className="mt-1 text-[11px] text-black/45 dark:text-white/40">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-black/30 dark:text-white/25">↑ Live preview of how stats will appear</p>
          </div>

          {/* How We Work section */}
          <div className="rounded-2xl border border-black/[0.07] bg-white p-6 dark:border-white/[0.08] dark:bg-white/[0.04]">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#58adff]/10">
                <Save size={15} className="text-[#2f8fe6] dark:text-[#58adff]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/40 dark:text-white/35">How We Work</p>
                <p className="text-sm font-semibold">Process section content</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
                  Section Title
                </label>
                <input
                  value={form.how_we_work_title}
                  onChange={(e) => set("how_we_work_title", e.target.value)}
                  placeholder="e.g. How we work"
                  className={inputCls}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.how_we_work_description}
                  onChange={(e) => set("how_we_work_description", e.target.value)}
                  placeholder="Brief description of your process..."
                  className={`${inputCls} resize-none`}
                />
              </div>

              <TagInput
                label="Process Points (press Enter to add)"
                values={form.how_we_work_points}
                onChange={(v) => set("how_we_work_points", v)}
                placeholder="e.g. We start with a discovery call"
              />

              {/* Points preview */}
              {form.how_we_work_points.length > 0 && (
                <div className="rounded-xl border border-black/[0.07] bg-black/[0.02] p-4 dark:border-white/[0.07] dark:bg-white/[0.03]">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-black/35 dark:text-white/30">Preview</p>
                  <ul className="flex flex-col gap-2.5">
                    {form.how_we_work_points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#2f8fe6] dark:text-[#58adff]" />
                        <span className="text-[13px] leading-5 text-black/65 dark:text-white/60">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Save button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-[#2f8fe6] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(47,143,230,0.22)] transition hover:bg-[#3d9bf0] disabled:opacity-60"
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
