"use client";

import { useState } from "react";
import Link from "next/link";
import { sampleProjects } from "@/lib/profileData";
import PlayableModal from "@/components/PlayableModal";
import { useCart } from "@/lib/cartContext";

const STOREFRONT_PRODUCTS = [
  {
    id: "prod-cloud-cart",
    name: "Enterprise Headless Cart Engine",
    price: 899,
    category: "Storefront Module",
    description: "Ultra-fast headless cart state engine with optimistic mutations, local storage caching, and multi-tab sync.",
    badge: "Best Seller",
    icon: "⚡",
  },
  {
    id: "prod-stripe-checkout",
    name: "Stripe & Webhook Checkout Suite",
    price: 1250,
    category: "Payment Pipeline",
    description: "Complete payment workflow with automated webhooks, receipt generation, fraud detection, and tax calc.",
    badge: "Production Ready",
    icon: "💳",
  },
  {
    id: "prod-inventory-sync",
    name: "Real-time Stock & Inventory Sync",
    price: 650,
    category: "Backend Engine",
    description: "Low-latency inventory validation service preventing race-condition overselling during peak traffic spikes.",
    badge: "High Concurrency",
    icon: "📦",
  },
  {
    id: "prod-promo-engine",
    name: "Dynamic Promo & Tiered Discounts",
    price: 499,
    category: "Conversion Tool",
    description: "Configurable promotion engine for coupons, bundle discounts, automated checkout cross-sells, and tiered rewards.",
    badge: "Conversion +28%",
    icon: "🏷️",
  },
];

export default function WorkPage() {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activePlayable, setActivePlayable] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const categories = [
    "All",
    "Full-Stack & Web",
    "Cloud & Enterprise",
    "Interactive & AI",
  ];

  const filteredProjects = sampleProjects.filter((project) => {
    if (selectedCategory !== "All" && project.category !== selectedCategory) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const titleMatch = project.title.toLowerCase().includes(q);
    const descMatch = project.description.toLowerCase().includes(q);
    const techMatch = project.techStack.some((t) => t.toLowerCase().includes(q));
    return titleMatch || descMatch || techMatch;
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
      {/* Header */}
      <div className="border-b border-white/10 pb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">
          Portfolio &amp; Solutions
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Sample Work &amp; Engineered Systems
        </h1>
        <p className="mt-4 max-w-2xl text-base text-neutral-400 leading-relaxed">
          A showcase of web applications, enterprise tooling, mobile solutions, and interactive platforms developed over the years. Focused purely on system architecture, technical implementations, and engineering results.
        </p>

        {/* Filter & Search Bar */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-4 py-2 text-xs font-medium transition-all ${selectedCategory === cat
                  ? "bg-white text-black shadow"
                  : "border border-white/10 bg-neutral-900/60 text-neutral-400 hover:border-white/20 hover:text-white"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="w-full sm:w-64">
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by tech or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-neutral-900/80 px-3.5 py-2 pl-9 text-xs text-white placeholder-neutral-500 focus:border-white focus:outline-none"
              />
              <svg
                className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Interactive Playable Spotlight Banner */}
      <section className="mt-10 overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-neutral-900/90 via-neutral-900/60 to-cyan-950/30 p-6 sm:p-8 shadow-2xl shadow-cyan-950/40 relative">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono font-medium text-cyan-300">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              Featured Interactive Demo • Playable Ad
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Jenga – Interactive HTML5 Playable
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Experience the full interactive playable ad directly in your browser. Powered by <strong>Phaser 3</strong>, <strong>Matter.js rigid-body physics</strong>, and <strong>Spine 2D skeletal animations</strong>, featuring touch/drag block manipulation and dynamic victory/retry loops.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs text-neutral-400">
              <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1">Phaser 3.88</span>
              <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1">Matter.js Physics</span>
              <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1">Spine 2D Runtime</span>
              <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1">Standalone Single-File</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={() =>
                setActivePlayable({
                  url: "/jenga.html",
                  title: "Jenga – Interactive HTML5 Playable",
                })
              }
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-black shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:scale-[1.03] hover:shadow-cyan-500/40 active:scale-[0.98]"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              <span>Play Interactive Demo</span>
            </button>
            <span className="text-[11px] font-mono text-neutral-400">
              Opens simulated mobile/tablet modal
            </span>
          </div>
        </div>
      </section>

      {/* Projects List */}
      <div className="mt-12 space-y-10">
        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 p-12 text-center">
            <p className="text-sm text-neutral-400">
              No projects found matching your query &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              id={project.id}
              className={`group rounded-3xl border bg-neutral-900/40 p-6 sm:p-8 transition-all duration-200 hover:bg-neutral-900/70 ${project.playableUrl
                ? "border-cyan-500/30 hover:border-cyan-400/50 shadow-lg shadow-cyan-500/5"
                : "border-white/10 hover:border-white/25"
                }`}
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider text-neutral-300">
                      {project.category}
                    </span>
                    {project.playableUrl && (
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-cyan-400/40 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-mono font-medium text-cyan-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        {project.playableBadge || "Playable Demo"}
                      </span>
                    )}
                    <span className="font-mono text-xs text-neutral-500">
                      Project #{String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {project.title}
                  </h2>
                </div>

                {/* Action buttons: Playable launch + External links */}
                <div className="flex flex-wrap items-center gap-2">
                  {project.playableUrl && (
                    <button
                      type="button"
                      onClick={() =>
                        setActivePlayable({
                          url: project.playableUrl!,
                          title: project.title,
                        })
                      }
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-2 text-xs font-semibold text-black shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] hover:shadow-cyan-500/40 active:scale-[0.98]"
                    >
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                      <span>Play Demo</span>
                    </button>
                  )}

                  {/* Add to Cart / Request Quote Button for this project */}
                  {project.price && (
                    <button
                      type="button"
                      onClick={() => {
                        addToCart({
                          id: project.id,
                          name: project.title,
                          category: project.category,
                          price: project.price!,
                          badge: "Engineering Solution",
                        });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition-all hover:bg-cyan-500/20 hover:border-cyan-400 active:scale-95"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span>Add to Cart (${project.price.toLocaleString()})</span>
                    </button>
                  )}

                  {project.links && project.links.length > 0 && (
                    <>
                      {project.links.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-white/40 hover:bg-white/15"
                        >
                          <span>{link.label}</span>
                          <svg
                            className="h-3.5 w-3.5 text-neutral-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      ))}
                    </>
                  )}
                </div>
              </div>

              <p className="mt-4 text-sm text-neutral-300 leading-relaxed sm:text-base">
                {project.description}
              </p>

              {/* Special Interactive E-Commerce Demo Grid if project is the E-Commerce Showcase */}
              {project.isEcommerceShowcase && (
                <div className="mt-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 via-neutral-950/80 to-blue-950/20 p-5 sm:p-6 shadow-inner">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-wider font-semibold">
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                        </span>
                        Interactive Live Demonstration
                      </div>
                      <h4 className="mt-1 text-base sm:text-lg font-bold text-white">
                        Try the Cart System: Select Any Architecture Module
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Click &ldquo;Add to Cart&rdquo; below to test instant state updates, toast alerts, drawer checkout, and pricing recalculations.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsCartOpen(true)}
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-black shadow hover:bg-neutral-200 transition-colors self-start sm:self-auto"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span>Open Cart Drawer</span>
                    </button>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {STOREFRONT_PRODUCTS.map((prod) => (
                      <div
                        key={prod.id}
                        className="flex flex-col justify-between rounded-xl border border-white/10 bg-neutral-900/70 p-4 transition-all duration-200 hover:border-cyan-400/50 hover:bg-neutral-900/90"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl">{prod.icon}</span>
                            <span className="rounded-full bg-cyan-500/10 border border-cyan-400/30 px-2 py-0.5 font-mono text-[10px] font-semibold text-cyan-300">
                              {prod.badge}
                            </span>
                          </div>
                          <h5 className="mt-3 text-sm font-bold text-white leading-snug">
                            {prod.name}
                          </h5>
                          <span className="font-mono text-[11px] text-neutral-400">
                            {prod.category}
                          </span>
                          <p className="mt-2 text-xs text-neutral-400 line-clamp-2">
                            {prod.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                          <span className="font-mono text-sm font-bold text-white">
                            ${prod.price.toLocaleString()}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              addToCart({
                                id: prod.id,
                                name: prod.name,
                                category: prod.category,
                                price: prod.price,
                                badge: prod.badge,
                              })
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 px-3 py-1.5 text-xs font-bold text-black shadow shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all"
                          >
                            <span>Add</span>
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Highlights */}
              <div className="mt-6 rounded-2xl border border-white/5 bg-neutral-950/60 p-5">
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                  Key Technical Implementations &amp; Results:
                </h3>
                <ul className="mt-3 space-y-2 text-xs sm:text-sm text-neutral-300">
                  {project.keyHighlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Applied */}
              <div className="mt-6">
                <span className="block font-mono text-xs uppercase tracking-wider text-neutral-400">
                  Technologies &amp; Architecture:
                </span>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {project.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-neutral-300 transition-colors group-hover:border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 rounded-3xl border border-white/10 bg-neutral-900/40 p-8 text-center sm:p-12">
        <h3 className="text-2xl font-bold text-white">
          Interested in similar technical solutions?
        </h3>
        <p className="mt-2 text-sm text-neutral-400">
          Let’s discuss your technical roadmap, stack requirements, or architecture challenges.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-neutral-200"
          >
            Get In Touch
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Playable Interactive Modal */}
      <PlayableModal
        isOpen={!!activePlayable}
        onClose={() => setActivePlayable(null)}
        gameUrl={activePlayable?.url || "/jenga.html"}
        title={activePlayable?.title}
      />
    </div>
  );
}
