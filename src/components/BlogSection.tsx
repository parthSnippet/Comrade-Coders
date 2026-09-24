import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

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
  category: BlogCategory | null;
  is_published: boolean;
}

const ACCENTS = [
  "from-cyan-400 via-blue-500 to-sky-700",
  "from-violet-400 via-purple-500 to-indigo-700",
  "from-amber-300 via-orange-500 to-rose-600",
];

export default function BlogSection() {
  const { data: posts, request: fetchPosts } = useAPI<BlogPost[]>();

  useEffect(() => {
    fetchPosts(apiConfig.api.endpoints.blogPosts);
  }, []);

  const published = (posts ?? [])
    .filter((p) => p.is_published)
    .slice(0, 3);

  const getCategoryName = (category: BlogCategory | null) =>
    category?.name ?? "Insights";

  if (published.length === 0) return null;

  return (
    <section id="blog" className="relative bg-[#f7f9fc] py-24 text-[#05070b] dark:bg-[#05070b] dark:text-white sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2f8fe6] dark:text-cyan-300">
              Insights
            </p>
            <h2 className="max-w-[600px] font-['Montserrat'] text-[clamp(2rem,4vw,3.3rem)] font-bold leading-[1.08] tracking-[-0.05em]">
              Practical ideas for modern digital teams.
            </h2>
          </div>

          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-black/[0.12] bg-transparent px-5 py-2.5 text-sm font-semibold text-black/70 transition-all duration-200 hover:border-black/[0.2] hover:text-black dark:border-white/[0.12] dark:text-white/70 dark:hover:border-white/[0.24] dark:hover:text-white"
          >
            Explore insights
            <ArrowUpRight
              size={15}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {published.map((post, i) => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-[1.5rem] border border-black/[0.07] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#58adff]/40 hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)] dark:border-white/[0.08] dark:bg-white/[0.03] dark:shadow-[0_12px_30px_rgba(0,0,0,0.18)] dark:hover:border-white/[0.14]"
            >
              <div
                className={`relative h-52 overflow-hidden bg-gradient-to-br ${ACCENTS[i % ACCENTS.length]}`}
              >
                <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="absolute left-6 top-6 rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
                  {post.category?.name ?? "Insights"}
                </div>
                <div className="absolute bottom-5 right-5 h-16 w-16 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm" />
              </div>

              <div className="p-6 sm:p-7">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2f8fe6] dark:text-cyan-300">
                    {post.category?.name ?? "Insights"}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-black/45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-white/45"
                  />
                </div>

                <h3 className="text-[1.3rem] font-semibold leading-[1.2] tracking-[-0.04em] text-[#05070b] dark:text-white">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="mt-4 text-[15px] leading-7 text-black/55 dark:text-white/55">
                    {post.excerpt}
                  </p>
                )}

                <Link
                  to={`/blog/${post.slug}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0b1118] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-transform duration-200 hover:translate-x-0.5 dark:bg-white dark:text-[#05070b]"
                >
                  Read article
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
