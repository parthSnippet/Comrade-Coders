import { useState } from "react";
import AdminBlogPostsPage from "./AdminBlogPostsPage";
import AdminBlogCategoriesPage from "./AdminBlogCategoriesPage";

type Tab = "posts" | "categories";

export default function AdminBlogPage() {
  const [tab, setTab] = useState<Tab>("posts");

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-black/[0.07] bg-white p-1 w-fit dark:border-white/[0.08] dark:bg-white/[0.04]">
        {(["posts", "categories"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition ${
              tab === t
                ? "bg-[#2f8fe6] text-white shadow-[0_4px_14px_rgba(47,143,230,0.22)]"
                : "text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "posts" ? <AdminBlogPostsPage /> : <AdminBlogCategoriesPage />}
    </div>
  );
}
