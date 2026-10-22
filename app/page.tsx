"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { profileInfo, skillCategories, sampleProjects } from "@/lib/profileData";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [skillSearch, setSkillSearch] = useState<string>("");

  // Flattened skills with their categories for searching
  const allCategories = ["All", ...skillCategories.map((c) => c.title)];

  const filteredCategories = skillCategories.filter((category) => {
    if (selectedCategory !== "All" && category.title !== selectedCategory) {
      return false;
    }
    if (!skillSearch.trim()) return true;
    const query = skillSearch.toLowerCase();
    const matchesCategory = category.title.toLowerCase().includes(query);
    const matchesSkills = category.skills.some((s) =>
      s.toLowerCase().includes(query)
    );
    return matchesCategory || matchesSkills;
  });

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 sm:pt-20">
        {/* Subtle background glow/radial effect */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-white/[0.03] blur-3xl" />

        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7">
              {/* Availability Badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-neutral-300 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span className="font-mono text-neutral-200">
                  Open for Full-Stack &amp; Frontend Opportunities
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {profileInfo.name}
              </h1>

              <p className="mt-3 text-lg font-medium text-neutral-300 sm:text-xl font-mono">
                {profileInfo.title}
              </p>

              <p className="mt-5 max-w-2xl text-base text-neutral-400 leading-relaxed sm:text-lg">
                {profileInfo.tagline}
              </p>

              {profileInfo.philosophy && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2 text-xs text-neutral-300">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    <strong className="text-emerald-400 font-medium">Philosophy:</strong> {profileInfo.philosophy}
                  </span>
                </div>
              )}

              {/* Call to Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href="/work"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 sm:px-6 py-3.5 text-sm font-semibold text-black transition-all duration-200 hover:bg-neutral-200 hover:shadow-lg active:scale-95"
                >
                  Explore Sample Work
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("open-gemini-chat"));
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 sm:px-6 py-3.5 text-sm font-semibold text-emerald-300 transition-all duration-200 hover:bg-emerald-500/20 hover:border-emerald-500/60 active:scale-95"
                >
                  <svg
                    className="h-4 w-4 text-emerald-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                    />
                  </svg>
                  Ask Gemini AI
                </button>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 sm:px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white/50 hover:bg-white/10 active:scale-95"
                >
                  Get In Touch
                </Link>
              </div>

              {/* Quick Contact & Location Badges */}
              <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-neutral-400 font-mono">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-neutral-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{profileInfo.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-neutral-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{profileInfo.email}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Profile Picture Card */}
            <div className="flex justify-center lg:col-span-5 lg:justify-end">
              <div className="relative group">
                {/* Decorative border frame */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-white/20 via-white/5 to-transparent opacity-75 blur-sm transition-all duration-300 group-hover:opacity-100" />
                <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-neutral-900 p-2 shadow-2xl">
                  <div className="relative h-80 w-72 sm:h-96 sm:w-80 overflow-hidden rounded-2xl bg-neutral-950">
                    <Image
                      src={profileInfo.avatar}
                      alt={profileInfo.name}
                      fill
                      priority
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                        Senior Developer
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {profileInfo.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics / Stats Bar */}
          <div className="mt-16 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-neutral-900/40 p-6 backdrop-blur-sm sm:grid-cols-4">
            {profileInfo.stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-2 text-center"
              >
                <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-xs font-mono uppercase tracking-wider text-neutral-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE SKILLS SHOWCASE */}
      <section className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Technical Expertise
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Skills Acquired Throughout the Years
            </h2>
            <p className="mt-2 text-sm text-neutral-400">
              A comprehensive inventory of engineering capabilities, tools, and technical competencies.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-64">
            <div className="relative">
              <input
                type="text"
                placeholder="Search skill (e.g. Next.js, Azure)..."
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
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

        {/* Category Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                selectedCategory === category
                  ? "bg-white text-black shadow"
                  : "border border-white/10 bg-neutral-900/60 text-neutral-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((cat, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-2xl border border-white/10 bg-neutral-900/50 p-6 transition-all duration-200 hover:border-white/25 hover:bg-neutral-900/80"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">
                  {cat.title}
                </h3>
                <span className="font-mono text-xs text-neutral-500">
                  {cat.skills.length} skills
                </span>
              </div>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                {cat.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => {
                  const isHighlighted =
                    skillSearch.trim() &&
                    skill.toLowerCase().includes(skillSearch.toLowerCase());
                  return (
                    <span
                      key={sIdx}
                      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-mono transition-colors ${
                        isHighlighted
                          ? "bg-white text-black font-semibold"
                          : "border border-white/10 bg-white/5 text-neutral-300 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CORE ENGINEERING HIGHLIGHTS / PHILOSOPHY */}
      <section className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-900/80 to-neutral-950 p-8 sm:p-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Engineering Mindset
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Principles Behind the Code
            </h2>
            <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
              Every system is engineered with an emphasis on clarity, scalability, and seamless user interaction.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/5 bg-neutral-950/60 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white font-mono">
                01
              </div>
              <h4 className="mt-4 font-semibold text-white">Clean Architecture</h4>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                Building modular, self-contained components and services with strict typing and maintainability.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-neutral-950/60 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white font-mono">
                02
              </div>
              <h4 className="mt-4 font-semibold text-white">High Performance</h4>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                Query caching, code splitting, lazy asset loading, and minimal bundle sizes for fast interactions.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-neutral-950/60 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white font-mono">
                03
              </div>
              <h4 className="mt-4 font-semibold text-white">AI-Driven Workflows</h4>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                I utilize Gemini AI for speedy development while monitoring the readability of the code and adhering to clean architecture.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-neutral-950/60 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white font-mono">
                04
              </div>
              <h4 className="mt-4 font-semibold text-white">Agile &amp; Collaborative</h4>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                Thrives in fast-paced environments, partnering with cross-functional teams and mentoring teammates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SAMPLE WORK PREVIEW */}
      <section className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Portfolio
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Featured Sample Work
            </h2>
            <p className="mt-2 text-sm text-neutral-400">
              A glimpse into web architectures and solutions developed across different industries.
            </p>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-neutral-300"
          >
            View All Work ({sampleProjects.length})
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {sampleProjects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-neutral-900/40 p-6 transition-all duration-200 hover:border-white/30 hover:bg-neutral-900/70"
            >
              <div>
                <span className="inline-block rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                  {project.category}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white group-hover:text-neutral-200">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs text-neutral-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 border-t border-white/5 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-mono text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-mono text-neutral-500">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Link
                    href={`/work#${project.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:underline"
                  >
                    View Details
                    <span>&rarr;</span>
                  </Link>

                  {project.links && project.links.length > 0 && (
                    <a
                      href={project.links[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-neutral-400 hover:text-white"
                    >
                      Live Link &nearr;
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION & CREDENTIALS (NO COMPANY NAMES) */}
      <section className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-8 sm:p-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Academic Background
              </span>
              <h3 className="mt-1 text-xl font-bold text-white">
                {profileInfo.education.degree}
              </h3>
              <p className="mt-1 text-sm text-neutral-400">
                {profileInfo.education.school} &bull; {profileInfo.education.period}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white hover:border-white/50 hover:bg-white/10"
              >
                View Applied Projects
                <span className="font-mono">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CALL TO ACTION */}
      <section className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-neutral-900 px-8 py-12 text-center sm:px-16 sm:py-16">
          <div className="relative z-10 mx-auto max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to collaborate?
            </h2>
            <p className="mt-3 text-sm text-neutral-400 leading-relaxed sm:text-base">
              Whether you need full-stack development, frontend architecture, Next.js / React expertise, or AI integration, let’s discuss your technical goals.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-semibold text-black hover:bg-neutral-200 active:scale-95 transition-all"
              >
                Contact Me
              </Link>
              <a
                href={`mailto:${profileInfo.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white hover:border-white/50 hover:bg-white/10 active:scale-95 transition-all"
              >
                Send Direct Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
