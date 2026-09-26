import { useEffect, useRef, useState, type FormEvent } from "react";
import { ChevronDown, Loader2, Plus, X } from "lucide-react";
import type { Service, ServiceUseCase } from "../../types/service";

interface Props {
  service: Service | null;
  allServices: Service[];
  onClose: () => void;
  onSave: (data: Partial<Service>, id?: number) => Promise<void>;
  saving: boolean;
}

const empty = {
  title: "",
  slug: "",
  tagline: "",
  short_description: "",
  description: "",
  highlights: [] as string[],
  deliverables: [] as string[],
  use_cases: [] as ServiceUseCase[],
  youtube_url: "",
  meta_title: "",
  meta_description: "",
  seo_keywords: "",
  page_h1: "",
  page_h2: "",
  image_alt_text: "",
  is_active: true,
  parent: null as number | null,
};

function toSlug(val: string) {
  return val.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function ParentDropdown({ value, options, onChange }: {
  value: number | null;
  options: Service[];
  onChange: (v: number | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((s) => s.id === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-xl border border-black/[0.10] bg-black/[0.02] px-4 py-2.5 text-sm transition focus:border-[#2f8fe6]/50 focus:outline-none focus:ring-2 focus:ring-[#2f8fe6]/10 dark:border-white/[0.10] dark:bg-white/[0.03]"
      >
        <span className={selected ? "text-black dark:text-white" : "text-black/40 dark:text-white/30"}>
          {selected ? selected.title : "— None (top-level service) —"}
        </span>
        <ChevronDown size={15} className={`shrink-0 text-black/40 transition-transform dark:text-white/40 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-52 overflow-y-auto rounded-xl border border-black/[0.10] bg-white shadow-xl dark:border-white/[0.12] dark:bg-[#0d1219]">
          <button
            type="button"
            onClick={() => { onChange(null); setOpen(false); }}
            className={`w-full px-4 py-2.5 text-left text-sm transition hover:bg-black/[0.04] dark:hover:bg-white/[0.06] ${value === null ? "font-semibold text-[#2f8fe6] dark:text-[#58adff]" : "text-black/55 dark:text-white/55"}`}
          >
            — None (top-level service) —
          </button>
          {options.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => { onChange(s.id); setOpen(false); }}
              className={`w-full px-4 py-2.5 text-left text-sm transition hover:bg-black/[0.04] dark:hover:bg-white/[0.06] ${value === s.id ? "font-semibold text-[#2f8fe6] dark:text-[#58adff]" : "text-black/75 dark:text-white/75"}`}
            >
              {s.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TagInput({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setInput("");
  };

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 rounded-xl border border-black/[0.10] bg-black/[0.02] p-2.5 dark:border-white/[0.10] dark:bg-white/[0.03]">
        {values.map((v) => (
          <span
            key={v}
            className="flex items-center gap-1.5 rounded-lg bg-[#2f8fe6]/10 px-2.5 py-1 text-xs font-medium text-[#2f8fe6] dark:text-[#58adff]"
          >
            {v}
            <button
              type="button"
              onClick={() => onChange(values.filter((x) => x !== v))}
              className="opacity-60 hover:opacity-100"
            >
              <X size={11} />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="Type and press Enter"
          className="min-w-[140px] flex-1 bg-transparent text-xs outline-none placeholder:text-black/30 dark:placeholder:text-white/25"
        />
      </div>
    </div>
  );
}

export default function AdminServiceForm({
  service,
  allServices,
  onClose,
  onSave,
  saving,
}: Props) {
  const [form, setForm] = useState({ ...empty });
  const [slugManual, setSlugManual] = useState(false);

  useEffect(() => {
    if (service) {
      setForm({
        title: service.title,
        slug: service.slug,
        tagline: service.tagline ?? "",
        short_description: service.short_description,
        description: service.description,
        highlights: service.highlights ?? [],
        deliverables: service.deliverables ?? [],
        use_cases: service.use_cases ?? [],
        youtube_url: service.youtube_url ?? "",
        meta_title: service.meta_title ?? "",
        meta_description: service.meta_description ?? "",
        seo_keywords: service.seo_keywords ?? "",
        page_h1: service.page_h1 ?? "",
        page_h2: service.page_h2 ?? "",
        image_alt_text: service.image_alt_text ?? "",
        is_active: service.is_active,
        parent: service.parent ?? null,
      });
      setSlugManual(true);
    } else {
      setForm({ ...empty });
      setSlugManual(false);
    }
  }, [service]);

  const set = (key: string, val: unknown) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const handleTitle = (val: string) => {
    set("title", val);
    if (!slugManual) set("slug", toSlug(val));
  };

  const addUseCase = () =>
    set("use_cases", [...form.use_cases, { title: "", desc: "" }]);

  const updateUseCase = (
    index: number,
    key: keyof ServiceUseCase,
    val: string
  ) =>
    set(
      "use_cases",
      form.use_cases.map((uc, i) =>
        i === index ? { ...uc, [key]: val } : uc
      )
    );

  const removeUseCase = (index: number) =>
    set(
      "use_cases",
      form.use_cases.filter((_, i) => i !== index)
    );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSave(form, service?.id);
  };

  const inputCls =
    "w-full rounded-xl border border-black/[0.10] bg-black/[0.02] px-4 py-2.5 text-sm outline-none transition placeholder:text-black/30 focus:border-[#2f8fe6]/50 focus:ring-2 focus:ring-[#2f8fe6]/10 dark:border-white/[0.10] dark:bg-white/[0.03] dark:placeholder:text-white/25 dark:focus:border-[#58adff]/50";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[3px]">
      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-black/[0.10] bg-white shadow-2xl dark:border-white/[0.10] dark:bg-[#0d1219]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/[0.07] px-6 py-4 dark:border-white/[0.08]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2f8fe6]">
              {service ? "Edit" : "New"} Service
            </p>
            <h2 className="mt-0.5 text-base font-semibold tracking-[-0.03em]">
              {service ? `Editing: ${service.title}` : "Create a new service"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-black/40 transition hover:bg-black/[0.06] hover:text-black dark:text-white/40 dark:hover:bg-white/[0.06] dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
            {/* Parent Service */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
                Parent Service
              </label>
              <ParentDropdown
                value={form.parent}
                options={allServices.filter((s) => s.id !== service?.id)}
                onChange={(v) => set("parent", v)}
              />
              <p className="mt-1 text-[11px] text-black/35 dark:text-white/30">
                Select a parent to make this a sub-service.
              </p>
            </div>

            {/* Title + Slug */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => handleTitle(e.target.value)}
                  placeholder="e.g. Web Development"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
                  Slug <span className="text-red-400">*</span>
                </label>
                <input
                  required
                  value={form.slug}
                  onChange={(e) => {
                    setSlugManual(true);
                    set("slug", toSlug(e.target.value));
                  }}
                  placeholder="web-development"
                  className={inputCls}
                />
              </div>
            </div>

            {/* Tagline */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
                Tagline
              </label>
              <input
                value={form.tagline}
                onChange={(e) => set("tagline", e.target.value)}
                placeholder="Short catchy tagline"
                className={inputCls}
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
                Short Description <span className="text-red-400">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={form.short_description}
                onChange={(e) => set("short_description", e.target.value)}
                placeholder="Brief summary shown in cards"
                className={`${inputCls} resize-none`}
              />
            </div>

            {/* Full Description */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
                Full Description
              </label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Detailed description for the service page"
                className={`${inputCls} resize-none`}
              />
            </div>

            {/* Highlights + Deliverables */}
            <TagInput
              label="Highlights (press Enter to add)"
              values={form.highlights}
              onChange={(v) => set("highlights", v)}
            />
            <TagInput
              label="Deliverables (press Enter to add)"
              values={form.deliverables}
              onChange={(v) => set("deliverables", v)}
            />

            {/* YouTube Video */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
                YouTube Video URL
              </label>
              <input
                type="url"
                value={form.youtube_url}
                onChange={(e) => set("youtube_url", e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className={inputCls}
              />
              <p className="mt-1 text-[11px] text-black/35 dark:text-white/30">
                Paste any YouTube URL — watch, share, or embed link all work.
              </p>
            </div>

            {/* Use Cases */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-semibold text-black/60 dark:text-white/55">
                  Use Cases
                </label>
                <button
                  type="button"
                  onClick={addUseCase}
                  className="flex items-center gap-1 rounded-lg bg-[#2f8fe6]/10 px-2.5 py-1 text-xs font-semibold text-[#2f8fe6] transition hover:bg-[#2f8fe6]/20 dark:text-[#58adff]"
                >
                  <Plus size={12} /> Add
                </button>
              </div>

              {form.use_cases.length === 0 && (
                <p className="rounded-xl border border-dashed border-black/[0.10] py-4 text-center text-xs text-black/30 dark:border-white/[0.10] dark:text-white/25">
                  No use cases yet — click Add to create one
                </p>
              )}

              <div className="space-y-3">
                {form.use_cases.map((uc, i) => (
                  <div
                    key={i}
                    className="relative rounded-xl border border-black/[0.08] bg-black/[0.02] p-4 dark:border-white/[0.08] dark:bg-white/[0.02]"
                  >
                    <button
                      type="button"
                      onClick={() => removeUseCase(i)}
                      className="absolute right-3 top-3 rounded-lg p-1 text-black/30 transition hover:bg-red-500/10 hover:text-red-500 dark:text-white/25 dark:hover:text-red-400"
                    >
                      <X size={13} />
                    </button>

                    <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-black/35 dark:text-white/30">
                      Use Case #{i + 1}
                    </p>

                    <div className="space-y-2.5">
                      <input
                        value={uc.title}
                        onChange={(e) =>
                          updateUseCase(i, "title", e.target.value)
                        }
                        placeholder="Title (e.g. Business Automation)"
                        className={inputCls}
                      />
                      <textarea
                        rows={2}
                        value={uc.desc}
                        onChange={(e) =>
                          updateUseCase(i, "desc", e.target.value)
                        }
                        placeholder="Short description of this use case"
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Settings */}
            <div className="space-y-4 rounded-xl border border-[#2f8fe6]/20 bg-[#2f8fe6]/[0.04] p-4 dark:border-[#58adff]/20 dark:bg-[#58adff]/[0.04]">
              <div>
                <p className="text-sm font-semibold">SEO Settings</p>
                <p className="mt-1 text-[11px] text-black/45 dark:text-white/40">
                  Search metadata and page headings for this service.
                </p>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
                  Meta Title
                </label>
                <input
                  value={form.meta_title}
                  onChange={(e) => set("meta_title", e.target.value)}
                  placeholder="Page title shown in search results"
                  className={inputCls}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
                  Meta Description
                </label>
                <textarea
                  rows={3}
                  value={form.meta_description}
                  onChange={(e) => set("meta_description", e.target.value)}
                  placeholder="Short summary for search engine results"
                  className={`${inputCls} resize-none`}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
                  SEO Keywords
                </label>
                <input
                  value={form.seo_keywords}
                  onChange={(e) => set("seo_keywords", e.target.value)}
                  placeholder="keyword one, keyword two, keyword three"
                  className={inputCls}
                />
                <p className="mt-1 text-[11px] text-black/35 dark:text-white/30">
                  Keep as a content reference; search engines may not use this
                  field for ranking.
                </p>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
                  Page H1
                </label>
                <input
                  value={form.page_h1}
                  onChange={(e) => set("page_h1", e.target.value)}
                  placeholder="Main heading displayed on the service page"
                  className={inputCls}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
                  Page H2
                </label>
                <input
                  value={form.page_h2}
                  onChange={(e) => set("page_h2", e.target.value)}
                  placeholder="Supporting section heading"
                  className={inputCls}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
                  Image Alt Text
                </label>
                <input
                  value={form.image_alt_text}
                  onChange={(e) => set("image_alt_text", e.target.value)}
                  placeholder="Describe the service image"
                  className={inputCls}
                />
              </div>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between rounded-xl border border-black/[0.08] bg-black/[0.02] px-4 py-3 dark:border-white/[0.08] dark:bg-white/[0.03]">
              <div>
                <p className="text-xs font-semibold">Active</p>
                <p className="text-[11px] text-black/40 dark:text-white/35">
                  Visible on the public website
                </p>
              </div>
              <button
                type="button"
                onClick={() => set("is_active", !form.is_active)}
                className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
                  form.is_active
                    ? "bg-[#2f8fe6]"
                    : "bg-black/20 dark:bg-white/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                    form.is_active ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-black/[0.07] px-6 py-4 dark:border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-black/[0.10] px-4 py-2 text-sm font-medium text-black/60 transition hover:bg-black/[0.04] dark:border-white/[0.10] dark:text-white/60 dark:hover:bg-white/[0.04]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-[#2f8fe6] px-5 py-2 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(47,143,230,0.22)] transition hover:bg-[#3d9bf0] disabled:opacity-60"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              {service ? "Save changes" : "Create service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}