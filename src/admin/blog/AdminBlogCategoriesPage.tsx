import { useEffect, useState } from "react";
import {
  Edit2,
  Loader2,
  Plus,
  Save,
  Search,
  SlidersHorizontal,
  Trash2,
  X,
} from "lucide-react";

import useAPI from "../../../hook/useAPI";
import apiConfig from "../../../config/global.json";

function getAuthHeader() {
  const token = sessionStorage.getItem("admin_access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

interface FormState {
  name: string;
  slug: string;
}

const EMPTY_FORM: FormState = { name: "", slug: "" };

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminBlogCategoriesPage() {
  const { data, loading, error, request } = useAPI<BlogCategory[]>();
  const { loading: saving, request: mutate } = useAPI<BlogCategory>();

  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<BlogCategory | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  const load = () =>
    request(apiConfig.api.endpoints.blogCategories, "GET", undefined, {
      headers: getAuthHeader(),
    });

  useEffect(() => {
    load();
  }, []);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEdit = (category: BlogCategory) => {
    setEditing(category);
    setForm({ name: category.name, slug: category.slug });
    setFormOpen(true);
  };

  const handleNameChange = (value: string) => {
    setForm((f) => ({
      ...f,
      name: value,
      slug: editing ? f.slug : createSlug(value),
    }));
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      showToast("Category name is required.", "error");
      return;
    }

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim() || createSlug(form.name),
    };

    const endpoint = editing
      ? `${apiConfig.api.endpoints.blogCategories}${editing.id}/`
      : apiConfig.api.endpoints.blogCategories;

    const res = await mutate(endpoint, editing ? "PUT" : "POST", payload, {
      headers: getAuthHeader(),
    });

    if (!res) {
      showToast("Something went wrong.", "error");
      return;
    }

    showToast(editing ? "Category updated." : "Category created.");
    setFormOpen(false);
    setEditing(null);
    setForm(EMPTY_FORM);
    load();
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    setDeleting(true);
    await mutate(
      `${apiConfig.api.endpoints.blogCategories}${deleteId}/`,
      "DELETE",
      undefined,
      { headers: getAuthHeader() }
    );
    setDeleting(false);
    setDeleteId(null);
    showToast("Category deleted.");
    load();
  };

  const filtered = (data ?? []).filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[60] rounded-xl border px-5 py-3 text-sm font-medium shadow-lg ${
            toast.type === "success"
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "border-red-400/20 bg-red-400/10 text-red-500 dark:text-red-400"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2f8fe6]">
            Content
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">
            Blog Categories
          </h2>
          <p className="mt-1 text-sm text-black/45 dark:text-white/40">
            {data?.length ?? 0} categor{data?.length !== 1 ? "ies" : "y"} total
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 self-start rounded-xl bg-[#2f8fe6] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(47,143,230,0.22)] transition hover:bg-[#3d9bf0] sm:self-auto"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-black/[0.07] bg-white dark:border-white/[0.08] dark:bg-white/[0.04]">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-black/[0.07] px-5 py-4 dark:border-white/[0.08] sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-black/35 dark:text-white/30"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="h-9 w-full rounded-lg border border-black/[0.08] bg-black/[0.02] pl-9 pr-4 text-sm outline-none transition placeholder:text-black/30 focus:border-[#2f8fe6]/40 focus:ring-2 focus:ring-[#2f8fe6]/10 dark:border-white/[0.08] dark:bg-white/[0.03] dark:placeholder:text-white/25"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-black/40 dark:text-white/35">
            <SlidersHorizontal size={13} />
            <span>
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-black/40 dark:text-white/35">
            <Loader2 size={18} className="animate-spin" />
            Loading categories...
          </div>
        )}

        {error && !loading && (
          <div className="px-5 py-8 text-center text-sm text-red-500">
            Failed to load categories. Check your API connection.
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <p className="text-sm font-medium text-black/50 dark:text-white/40">
              {search ? "No categories match your search." : "No categories yet."}
            </p>
            {!search && (
              <button
                type="button"
                onClick={openCreate}
                className="mt-1 text-xs font-semibold text-[#2f8fe6] hover:underline dark:text-[#58adff]"
              >
                Create your first category
              </button>
            )}
          </div>
        )}

        {/* Desktop Table */}
        {!loading && !error && filtered.length > 0 && (
          <>
            <div className="hidden md:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-black/[0.06] dark:border-white/[0.07]">
                    {["Name", "Slug", "Actions"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-black/35 dark:text-white/30"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((category, i) => (
                    <tr
                      key={category.id}
                      className={`group transition hover:bg-black/[0.015] dark:hover:bg-white/[0.025] ${
                        i !== filtered.length - 1
                          ? "border-b border-black/[0.05] dark:border-white/[0.06]"
                          : ""
                      }`}
                    >
                      <td className="px-5 py-3.5 font-semibold">
                        {category.name}
                      </td>
                      <td className="px-5 py-3.5">
                        <code className="rounded-md bg-black/[0.04] px-2 py-0.5 text-xs text-black/55 dark:bg-white/[0.06] dark:text-white/50">
                          {category.slug}
                        </code>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => openEdit(category)}
                            className="rounded-lg p-2 text-black/35 transition hover:bg-[#2f8fe6]/10 hover:text-[#2f8fe6] dark:text-white/30 dark:hover:text-[#58adff]"
                            aria-label="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteId(category.id)}
                            className="rounded-lg p-2 text-black/35 transition hover:bg-red-500/10 hover:text-red-500 dark:text-white/30 dark:hover:text-red-400"
                            aria-label="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-3 p-4 md:hidden">
              {filtered.map((category) => (
                <div
                  key={category.id}
                  className="rounded-xl border border-black/[0.07] bg-black/[0.015] p-4 dark:border-white/[0.08] dark:bg-white/[0.03]"
                >
                  <p className="font-semibold">{category.name}</p>
                  <code className="mt-1 block text-[11px] text-black/40 dark:text-white/35">
                    {category.slug}
                  </code>
                  <div className="mt-3 flex gap-2 border-t border-black/[0.06] pt-3 dark:border-white/[0.07]">
                    <button
                      type="button"
                      onClick={() => openEdit(category)}
                      className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] px-3 py-1.5 text-xs font-medium text-black/55 transition hover:border-[#2f8fe6]/30 hover:text-[#2f8fe6] dark:border-white/[0.09] dark:text-white/50 dark:hover:text-[#58adff]"
                    >
                      <Edit2 size={12} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteId(category.id)}
                      className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] px-3 py-1.5 text-xs font-medium text-black/55 transition hover:border-red-400/30 hover:text-red-500 dark:border-white/[0.09] dark:text-white/50 dark:hover:text-red-400"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Form Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[3px]">
          <div className="w-full max-w-md rounded-2xl border border-black/[0.10] bg-white p-6 shadow-2xl dark:border-white/[0.10] dark:bg-[#0d1219]">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-semibold">
                {editing ? "Edit Category" : "Add Category"}
              </h3>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="rounded-lg p-1.5 text-black/40 hover:bg-black/[0.05] dark:text-white/40 dark:hover:bg-white/[0.06]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/60">
                  Name *
                </label>
                <input
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Technology"
                  className="h-10 w-full rounded-xl border border-black/[0.10] bg-black/[0.02] px-3.5 text-sm outline-none transition focus:border-[#2f8fe6]/50 focus:ring-2 focus:ring-[#2f8fe6]/10 dark:border-white/[0.10] dark:bg-white/[0.04]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/60">
                  Slug
                </label>
                <input
                  value={form.slug}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, slug: e.target.value }))
                  }
                  placeholder="auto-generated"
                  className="h-10 w-full rounded-xl border border-black/[0.10] bg-black/[0.02] px-3.5 text-sm outline-none transition focus:border-[#2f8fe6]/50 focus:ring-2 focus:ring-[#2f8fe6]/10 dark:border-white/[0.10] dark:bg-white/[0.04]"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="flex-1 rounded-xl border border-black/[0.10] py-2.5 text-sm font-medium text-black/60 transition hover:bg-black/[0.04] dark:border-white/[0.10] dark:text-white/60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2f8fe6] py-2.5 text-sm font-semibold text-white transition hover:bg-[#3d9bf0] disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Save size={14} />
                )}
                {editing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[3px]">
          <div className="w-full max-w-sm rounded-2xl border border-black/[0.10] bg-white p-6 shadow-2xl dark:border-white/[0.10] dark:bg-[#0d1219]">
            <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
              <Trash2 size={20} />
            </div>
            <h3 className="mt-3 text-base font-semibold">Delete category?</h3>
            <p className="mt-1.5 text-sm text-black/45 dark:text-white/40">
              This action cannot be undone.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-xl border border-black/[0.10] py-2.5 text-sm font-medium text-black/60 transition hover:bg-black/[0.04] dark:border-white/[0.10] dark:text-white/60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
              >
                {deleting && <Loader2 size={14} className="animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
