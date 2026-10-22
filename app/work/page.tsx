"use client";

import { useState } from "react";
import Link from "next/link";
import { sampleProjects } from "@/lib/profileData";

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

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
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
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
                className={`rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                  selectedCategory === cat
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
              className="group rounded-3xl border border-white/10 bg-neutral-900/40 p-6 sm:p-8 transition-all duration-200 hover:border-white/25 hover:bg-neutral-900/70"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider text-neutral-300">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-neutral-500">
                      Project #{String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {project.title}
                  </h2>
                </div>

                {/* External links if available */}
                {project.links && project.links.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
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
                  </div>
                )}
              </div>

              <p className="mt-4 text-sm text-neutral-300 leading-relaxed sm:text-base">
                {project.description}
              </p>

              {/* Key Highlights */}
              <div className="mt-6 rounded-2xl border border-white/5 bg-neutral-950/60 p-5">
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                  Key Technical Implementations &amp; Results:
                </h3>
                <ul className="mt-3 space-y-2 text-xs sm:text-sm text-neutral-300">
                  {project.keyHighlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white flex-shrink-0" />
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
    </div>
  );
}
