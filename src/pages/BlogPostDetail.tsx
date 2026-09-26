import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight, Clock } from "lucide-react";

import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import InlineLoader from "../components/InlineLoader";
import useAPI from "../../hook/useAPI";
import apiConfig from "../../config/global.json";

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
  category: BlogCategory | null;
  featured_image: string | null;
  author?: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

const ACCENTS = [
  "from-cyan-400 via-blue-500 to-sky-700",
  "from-violet-400 via-purple-500 to-indigo-700",
  "from-amber-300 via-orange-500 to-rose-600",
];

function readTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data: allPosts, loading, error, request: fetchAllPosts } = useAPI<BlogPost[]>();

  useEffect(() => {
    if (!slug) return;
    fetchAllPosts(apiConfig.api.endpoints.blogPosts);
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const post = (allPosts ?? []).find((p) => p.slug === slug) ?? null;

  const getCategoryName = (category: BlogCategory | null) =>
    category?.name ?? "Insights";

  const relatedPosts = (allPosts ?? [])
    .filter((p) => p.is_published && p.slug !== slug)
    .slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-[#05070b] dark:bg-[#05070b] dark:text-white">
        <Navbar />
        <InlineLoader />
        <Footer />
      </div>
    );
  }

  if (error || !post || !post.is_published) {
    return (
      <div className="min-h-screen bg-white text-[#05070b] dark:bg-[#05070b] dark:text-white">
        <Navbar />
        <main className="flex min-h-screen items-center justify-center px-5 pt-32">
          <div className="max-w-md text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2f8fe6] dark:text-[#58adff]">
              Post not found
            </p>
            <h1 className="font-['Montserrat'] text-3xl font-bold">
              We couldn't find this article.
            </h1>
            <p className="mt-3 text-sm leading-6 text-black/50 dark:text-white/50">
              The post may have been removed or the URL may be incorrect.
            </p>
            <Link
              to="/"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#58adff] to-[#2f8fe6] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(47,143,230,0.25)] transition-all duration-200 hover:-translate-y-0.5"
            >
              <ArrowLeft size={15} />
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#05070b] dark:bg-[#05070b] dark:text-white">
      <SEOHead
        title={post.title}
        description={post.excerpt || post.title}
        canonical={`/blog/${post.slug}`}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[10%] top-[20%] h-[320px] w-[320px] rounded-full bg-[#328fe8]/6 blur-[80px] dark:bg-[#328fe8]/10" />
          <div className="absolute right-[8%] top-[30%] h-[280px] w-[280px] rounded-full bg-[#58adff]/5 blur-[70px] dark:bg-[#58adff]/8" />
        </div>

        <div className="relative mx-auto max-w-[800px] px-5 sm:px-8">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-[13px] text-black/40 dark:text-white/40">
            <Link to="/" className="cursor-pointer transition-colors hover:text-black dark:hover:text-white">
              Home
            </Link>
            <ChevronRight size={13} />
            <Link to="/#blog" className="cursor-pointer transition-colors hover:text-black dark:hover:text-white">
              Blog
            </Link>
            <ChevronRight size={13} />
            <span className="truncate text-black/70 dark:text-white/70">{post.title}</span>
          </div>

          {/* Category badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/[0.10] bg-black/[0.04] px-3.5 py-1.5 dark:border-white/[0.10] dark:bg-white/[0.04]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#58adff]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/50 dark:text-white/50">
              {getCategoryName(post.category as BlogCategory | null)}
            </span>
          </div>

          <h1 className="font-['Montserrat'] text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.035em]">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-4 text-[1.05rem] leading-7 text-black/55 dark:text-white/55">
              {post.excerpt}
            </p>
          )}

          <div className="mt-6 flex items-center gap-4 text-[13px] text-black/40 dark:text-white/40">
            {post.author && (
              <>
                <span>{post.author}</span>
                <span>·</span>
              </>
            )}
            <div className="flex items-center gap-1.5">
              <Clock size={13} />
              <span>{readTime(post.content)}</span>
            </div>
            <span>·</span>
            <span>{formatDate(post.published_at ?? post.created_at)}</span>
          </div>
        </div>
      </section>

      {/* Cover gradient banner */}
      <div className="mx-auto max-w-[800px] px-5 sm:px-8">
        <div
          className={`h-56 w-full overflow-hidden rounded-2xl bg-gradient-to-br sm:h-72 ${ACCENTS[post.id % ACCENTS.length]}`}
        >
          <div className="h-full w-full opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-[800px] px-5 py-12 sm:px-8">
        <div className="prose prose-lg max-w-none text-black/75 dark:prose-invert dark:text-white/75 prose-headings:font-['Montserrat'] prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[#05070b] dark:prose-headings:text-white prose-a:text-[#2f8fe6] prose-strong:text-[#05070b] dark:prose-strong:text-white">
          {post.content.split("\n").map((para, i) =>
            para.trim() ? (
              <p key={i} className="mb-5 leading-8 text-[15px] text-black/65 dark:text-white/65">
                {para}
              </p>
            ) : (
              <br key={i} />
            )
          )}
        </div>

        <div className="mt-10">
          <Link
            to="/#blog"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-black/50 transition-colors hover:text-black dark:text-white/50 dark:hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to Blog
          </Link>
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-black/[0.07] pb-24 dark:border-white/[0.07]">
          <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-8 lg:px-10">
            <h2 className="mb-6 font-['Montserrat'] text-[20px] font-bold tracking-[-0.03em]">
              More articles
            </h2>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((p, i) => (
                <Link
                  key={p.id}
                  to={`/blog/${p.slug}`}
                  className="group overflow-hidden rounded-2xl border border-black/[0.07] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#58adff]/30 hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)] dark:border-white/[0.08] dark:bg-white/[0.03]"
                >
                  <div
                    className={`h-28 w-full bg-gradient-to-br ${ACCENTS[i % ACCENTS.length]} opacity-80`}
                  />
                  <div className="p-5">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2f8fe6] dark:text-[#58adff]">
                      {getCategoryName(p.category as BlogCategory | null)}
                    </p>
                    <h3 className="text-sm font-semibold leading-snug text-[#05070b] dark:text-white">
                      {p.title}
                    </h3>
                    {p.excerpt && (
                      <p className="mt-2 line-clamp-2 text-xs text-black/45 dark:text-white/45">
                        {p.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
