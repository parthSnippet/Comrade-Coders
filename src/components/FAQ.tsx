import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What kind of IT projects does Comrade Coders handle?",
    answer: "We build websites, web applications, custom software, automation workflows, AI platforms, ERP and CRM solutions, and connected digital systems for growing businesses.",
  },
  {
    question: "Can you work with our existing technology stack?",
    answer: "Yes. We can extend, modernize, integrate, or gradually replace an existing stack. During discovery, we review your current tools and recommend the most practical technical path.",
  },
  {
    question: "How long does a typical project take?",
    answer: "It depends on scope and complexity. A focused website or automation workflow may take a few weeks, while a larger business platform is planned in milestones across a longer delivery cycle.",
  },
  {
    question: "Do you provide support after launch?",
    answer: "Yes. We can provide post-launch monitoring, maintenance, improvements, security updates, and ongoing product support based on what your business needs.",
  },
  {
    question: "How do you approach security and scalability?",
    answer: "Security, performance, access control, backups, and maintainable architecture are considered from the beginning. We build systems that can evolve as your users, data, and workflows grow.",
  },
  {
    question: "How do we start a project with your team?",
    answer: "Send us a short overview through the contact form or book a call. We will understand your goals, identify the right scope, and propose a clear next step.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden border-t border-black/[0.07] bg-white py-24 dark:border-white/[0.07] dark:bg-[#05070b] sm:py-32">
      <div className="pointer-events-none absolute -right-32 top-12 h-80 w-80 rounded-full bg-[#58adff]/10 blur-3xl dark:bg-[#58adff]/[0.07]" />
      <div className="relative mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2f8fe6] dark:text-[#78bdff]">FAQ / Comrade Coders</p>
          <h2 className="max-w-[520px] text-[clamp(2.2rem,5vw,4.7rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-[#05070b] dark:text-white">
            Clear answers for your next build.
          </h2>
          <p className="mt-6 max-w-[390px] text-[15px] leading-7 text-black/50 dark:text-white/50">
            A few things clients usually want to know before turning an idea into a reliable digital product.
          </p>
          <a href="/contact" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#2f8fe6] dark:text-[#78bdff]">
            Still have a question?
            <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="relative z-10 divide-y divide-black/[0.09] border-y border-black/[0.09] dark:divide-white/[0.10] dark:border-white/[0.10]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-[15px] font-semibold text-[#05070b] transition-colors hover:text-[#2f8fe6] dark:text-white dark:hover:text-[#78bdff] sm:py-7 sm:text-base"
                >
                  <span className="flex items-start gap-4">
                    <span className="pt-0.5 font-mono text-[11px] font-normal text-[#2f8fe6]/70 dark:text-[#78bdff]/70">0{index + 1}</span>
                    {faq.question}
                  </span>
                  <ChevronDown size={18} className={`shrink-0 text-black/40 transition-transform duration-300 dark:text-white/40 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div id={`faq-answer-${index}`} hidden={!isOpen}>
                  <p className="max-w-[650px] pb-6 pl-9 text-sm leading-7 text-black/50 dark:text-white/50 sm:pb-7 sm:text-[15px]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
