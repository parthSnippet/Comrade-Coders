import { useEffect, useState, type FormEvent } from "react";
import { X, Loader2 } from "lucide-react";
import type { Project } from "../../types/project";

interface Props {
  project: Project | null;
  onClose: () => void;
  onSave: (data: Partial<Project>, id?: number) => Promise<void>;
  saving: boolean;
}

const empty = {
  title: "",
  slug: "",
  category: "",
  short_description: "",
  description: "",
  client_name: "",
  project_url: "",
  featured_image: "",
  services: [] as string[],
  industries: [] as string[],
  technologies: [] as string[],
  is_featured: false,
  is_active: true,
};

function toSlug(val: string) {
  return val.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function TagInput({
  label,
  placeholder,
  values,
  onChange,
}: {
  label: string;
  placeholder?: string;
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !values.includes(trimmed)) onChange([...values, trimmed]);
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
          placeholder={placeholder ?? "Type and press Enter"}
          className="min-w-[140px] flex-1 bg-transparent text-xs outline-none placeholder:text-black/30 dark:placeholder:text-white/25"
        />
      </div>
    </div>
  );
}

function Toggle({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-black/[0.08] bg-black/[0.02] px-4 py-3 dark:border-white/[0.08] dark:bg-white/[0.03]">
      <div>
        <p className="text-xs font-semibold">{label}</p>
        <p className="text-[11px] text-black/40 dark:text-white/35">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
          value ? "bg-[#2f8fe6]" : "bg-black/20 dark:bg-white/20"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
            value ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default function AdminProjectForm({ project, onClose, onSave, saving }: Props) {
  const [form, setForm] = useState({ ...empty });
  const [slugManual, setSlugManual] = useState(false);

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title,
        slug: project.slug,
        category: project.category ?? "",
        short_description: project.short_description,
        description: project.description,
        client_name: project.client_name,
        project_url: project.project_url ?? "",
        featured_image: project.featured_image ?? "",
        services: project.services ?? [],
        industries: project.industries ?? [],
        technologies: project.technologies ?? [],
        is_featured: project.is_featured,
        is_active: project.is_active,
      });
      setSlugManual(true);
    } else {
      setForm({ ...empty });
      setSlugManual(false);
    }
  }, [project]);

  const set = (key: string, val: unknown) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleTitle = (val: string) => {
    set("title", val);
    if (!slugManual) set("slug", toSlug(val));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSave(form, project?.id);
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
              {project ? "Edit" : "New"} Project
            </p>
            <h2 className="mt-0.5 text-base font-semibold tracking-[-0.03em]">
              {project ? `Editing: ${project.title}` : "Create a new project"}
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

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">

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
                  placeholder="e.g. E-commerce Platform"
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
                  placeholder="ecommerce-platform"
                  className={inputCls}
                />
              </div>
            </div>

            {/* Category + Client */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
                  Category
                </label>
                <input
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  placeholder="e.g. Web Platform"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
                  Client Name
                </label>
                <input
                  value={form.client_name}
                  onChange={(e) => set("client_name", e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className={inputCls}
                />
              </div>
            </div>

            {/* Project URL */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
                Project URL
              </label>
              <input
                type="url"
                value={form.project_url}
                onChange={(e) => set("project_url", e.target.value)}
                placeholder="https://example.com"
                className={inputCls}
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
                Featured Image URL
              </label>
              <input
                type="url"
                value={form.featured_image}
                onChange={(e) => set("featured_image", e.target.value)}
                placeholder="https://example.com/image.jpg"
                className={inputCls}
              />
              {form.featured_image && (
                <div className="mt-2 overflow-hidden rounded-xl border border-black/[0.08] dark:border-white/[0.08]">
                  <img
                    src={form.featured_image}
                    alt="Preview"
                    className="h-36 w-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              )}
            </div>

            {/* Short description */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
                Short Description <span className="text-red-400">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={form.short_description}
                onChange={(e) => set("short_description", e.target.value)}
                placeholder="Brief summary shown in portfolio cards"
                className={`${inputCls} resize-none`}
              />
            </div>

            {/* Full description */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">
                Full Description
              </label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Detailed project description"
                className={`${inputCls} resize-none`}
              />
            </div>

            {/* Tags */}
            <TagInput
              label="Technologies (press Enter to add)"
              placeholder="e.g. React, Node.js"
              values={form.technologies}
              onChange={(v) => set("technologies", v)}
            />
            <TagInput
              label="Services (press Enter to add)"
              placeholder="e.g. Web Development"
              values={form.services}
              onChange={(v) => set("services", v)}
            />
            <TagInput
              label="Industries (press Enter to add)"
              placeholder="e.g. E-commerce"
              values={form.industries}
              onChange={(v) => set("industries", v)}
            />

            {/* Toggles */}
            <Toggle
              label="Featured"
              description="Show on homepage / featured section"
              value={form.is_featured}
              onChange={(v) => set("is_featured", v)}
            />
            <Toggle
              label="Active"
              description="Visible on the public portfolio"
              value={form.is_active}
              onChange={(v) => set("is_active", v)}
            />
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
              {project ? "Save changes" : "Create project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
