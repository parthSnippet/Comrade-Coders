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

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: number | null;
  featured_image: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  is_published: boolean;
}

const EMPTY_FORM: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  is_published: true,
};

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminBlogPostsPage() {
  const { data, loading, error, request } = useAPI<BlogPost[]>();
  const { data: categoriesData, request: fetchCategories } =
    useAPI<BlogCategory[]>();
  const { loading: saving, request: mutate } = useAPI<BlogPost>();

  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  const load = () =>
    request(apiConfig.api.endpoints.blogPosts, "GET", undefined, {
      headers: getAuthHeader(),
    });

  useEffect(() => {
    load();
    fetchCategories(apiConfig.api.endpoints.blogCategories, "GET", undefined, {
      headers: getAuthHeader(),
    });
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

  const openEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? "",
      content: post.content ?? "",
      category: post.category ? String(post.category) : "",
      is_published: post.is_published,
    });
    setFormOpen(true);
  };

  const handleTitleChange = (value: string) => {
    setForm((f) => ({
      ...f,
      title: value,
      slug: editing ? f.slug : createSlug(value),
    }));
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      showToast("Title is required.", "error");
      return;
    }

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim() || createSlug(form.title),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      category: form.category ? Number(form.category) : null,
      is_published: form.is_published,
    };

    const endpoint = editing
      ? `${apiConfig.api.endpoints.blogPosts}${editing.id}/`
      : apiConfig.api.endpoints.blogPosts;

    const res = await mutate(endpoint, editing ? "PUT" : "POST", payload, {
      headers: getAuthHeader(),
    });

    if (!res) {
      showToast("Something went wrong.", "error");
      return;
    }

    showToast(editing ? "Post updated." : "Post created.");
    setFormOpen(false);
    setEditing(null);
    setForm(EMPTY_FORM);
    load();
  };

  const handleTogglePublished = async (post: BlogPost) => {
    const res = await mutate(
      `${apiConfig.api.endpoints.blogPosts}${post.id}/`,
      "PATCH",
      { is_published: !post.is_published },
      { headers: getAuthHeader() }
    );
    if (!res) {
      showToast("Failed to update status.", "error");
      return;
    }
    load();
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    setDeleting(true);
    await mutate(
      `${apiConfig.api.endpoints.blogPosts}${deleteId}/`,
      "DELETE",
      undefined,
      { headers: getAuthHeader() }
    );
    setDeleting(false);
    setDeleteId(null);
    showToast("Post deleted.");
    load();
  };

  const categories = categoriesData ?? [];
  const filtered = (data ?? []).filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const getCategoryName = (id: number | null) =>
    categories.find((c) => c.id === id)?.name ?? "—";

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
            Blog Posts
          </h2>
          <p className="mt-1 text-sm text-black/45 dark:text-white/40">
            {data?.length ?? 0} post{data?.length !== 1 ? "s" : ""} total
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 self-start rounded-xl bg-[#2f8fe6] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(47,143,230,0.22)] transition hover:bg-[#3d9bf0] sm:self-auto"
        >
          <Plus size={16} />
          Add Post
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
              placeholder="Search posts..."
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
            Loading posts...
          </div>
        )}

        {error && !loading && (
          <div className="px-5 py-8 text-center text-sm text-red-500">
            Failed to load posts. Check your API connection.
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <p className="text-sm font-medium text-black/50 dark:text-white/40">
              {search ? "No posts match your search." : "No posts yet."}
            </p>
            {!search && (
              <button
                type="button"
                onClick={openCreate}
                className="mt-1 text-xs font-semibold text-[#2f8fe6] hover:underline dark:text-[#58adff]"
              >
                Write your first post
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
                    {["Title", "Slug", "Category", "Status", "Actions"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-black/35 dark:text-white/30"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((post, i) => (
                    <tr
                      key={post.id}
                      className={`group transition hover:bg-black/[0.015] dark:hover:bg-white/[0.025] ${
                        i !== filtered.length - 1
                          ? "border-b border-black/[0.05] dark:border-white/[0.06]"
                          : ""
                      }`}
                    >
                      <td className="px-5 py-3.5 font-semibold">
                        {post.title}
                      </td>
                      <td className="px-5 py-3.5">
                        <code className="rounded-md bg-black/[0.04] px-2 py-0.5 text-xs text-black/55 dark:bg-white/[0.06] dark:text-white/50">
                          {post.slug}
                        </code>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-black/45 dark:text-white/40">
                        {getCategoryName(post.category)}
                      </td>
                      <td className="px-5 py-3.5">
                        <button
                          type="button"
                          onClick={() => handleTogglePublished(post)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                            post.is_published
                              ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400"
                              : "bg-black/[0.05] text-black/40 hover:bg-black/[0.09] dark:bg-white/[0.06] dark:text-white/35"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              post.is_published
                                ? "bg-emerald-500"
                                : "bg-black/25 dark:bg-white/25"
                            }`}
                          />
                          {post.is_published ? "Published" : "Draft"}
                        </button>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => openEdit(post)}
                            className="rounded-lg p-2 text-black/35 transition hover:bg-[#2f8fe6]/10 hover:text-[#2f8fe6] dark:text-white/30 dark:hover:text-[#58adff]"
                            aria-label="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteId(post.id)}
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
              {filtered.map((post) => (
                <div
                  key={post.id}
                  className="rounded-xl border border-black/[0.07] bg-black/[0.015] p-4 dark:border-white/[0.08] dark:bg-white/[0.03]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{post.title}</p>
                      <code className="mt-1 block text-[11px] text-black/40 dark:text-white/35">
                        /{post.slug}
                      </code>
                      <p className="mt-1 text-xs text-black/45 dark:text-white/40">
                        {getCategoryName(post.category)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleTogglePublished(post)}
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        post.is_published
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-black/[0.05] text-black/40 dark:bg-white/[0.06] dark:text-white/35"
                      }`}
                    >
                      {post.is_published ? "Published" : "Draft"}
                    </button>
                  </div>
                  <div className="mt-3 flex gap-2 border-t border-black/[0.06] pt-3 dark:border-white/[0.07]">
                    <button
                      type="button"
                      onClick={() => openEdit(post)}
                      className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] px-3 py-1.5 text-xs font-medium text-black/55 transition hover:border-[#2f8fe6]/30 hover:text-[#2f8fe6] dark:border-white/[0.09] dark:text-white/50 dark:hover:text-[#58adff]"
                    >
                      <Edit2 size={12} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteId(post.id)}
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
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-[3px]">
          <div className="my-8 w-full max-w-2xl rounded-2xl border border-black/[0.10] bg-white p-6 shadow-2xl dark:border-white/[0.10] dark:bg-[#0d1219]">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-semibold">
                {editing ? "Edit Post" : "New Post"}
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
              {/* Title */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/60">
                  Title *
                </label>
                <input
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Post title"
                  className="h-10 w-full rounded-xl border border-black/[0.10] bg-black/[0.02] px-3.5 text-sm outline-none transition focus:border-[#2f8fe6]/50 focus:ring-2 focus:ring-[#2f8fe6]/10 dark:border-white/[0.10] dark:bg-white/[0.04]"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/60">
                  Slug
                </label>
                <input
                  value={form.slug}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, slug: e.target.value }))
                  }
                  placeholder="auto-generated-from-title"
                  className="h-10 w-full rounded-xl border border-black/[0.10] bg-black/[0.02] px-3.5 text-sm outline-none transition focus:border-[#2f8fe6]/50 focus:ring-2 focus:ring-[#2f8fe6]/10 dark:border-white/[0.10] dark:bg-white/[0.04]"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/60">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  className="h-10 w-full rounded-xl border border-black/[0.10] bg-black/[0.02] px-3.5 text-sm outline-none transition focus:border-[#2f8fe6]/50 focus:ring-2 focus:ring-[#2f8fe6]/10 dark:border-white/[0.10] dark:bg-white/[0.04]"
                >
                  <option value="">No category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Excerpt */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/60">
                  Excerpt
                </label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, excerpt: e.target.value }))
                  }
                  rows={2}
                  placeholder="Short description shown in listings..."
                  className="w-full rounded-xl border border-black/[0.10] bg-black/[0.02] px-3.5 py-2.5 text-sm outline-none transition focus:border-[#2f8fe6]/50 focus:ring-2 focus:ring-[#2f8fe6]/10 dark:border-white/[0.10] dark:bg-white/[0.04]"
                />
              </div>

              {/* Content */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/60">
                  Content
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, content: e.target.value }))
                  }
                  rows={8}
                  placeholder="Write your post content here..."
                  className="w-full rounded-xl border border-black/[0.10] bg-black/[0.02] px-3.5 py-2.5 text-sm outline-none transition focus:border-[#2f8fe6]/50 focus:ring-2 focus:ring-[#2f8fe6]/10 dark:border-white/[0.10] dark:bg-white/[0.04]"
                />
              </div>

              {/* Published toggle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      is_published: !f.is_published,
                    }))
                  }
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    form.is_published
                      ? "bg-[#2f8fe6]"
                      : "bg-black/20 dark:bg-white/20"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      form.is_published ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
                <span className="text-sm text-black/60 dark:text-white/60">
                  Published
                </span>
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
                {editing ? "Update" : "Publish"}
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
            <h3 className="mt-3 text-base font-semibold">Delete post?</h3>
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
