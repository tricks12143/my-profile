"use client";

import { useState } from "react";
import { profileInfo } from "@/lib/profileData";

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate interactive submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 800);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
      {/* Header */}
      <div className="border-b border-white/10 pb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
          Reach Out
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-4 max-w-2xl text-base text-neutral-400 leading-relaxed">
          Have an upcoming project, architecture challenge, or full-stack engineering requirement? Let&apos;s start a conversation.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Column: Direct Info Cards & Links */}
        <div className="space-y-6 lg:col-span-5">
          {/* Availability Card */}
          <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
              </span>
              <h3 className="font-semibold text-white">Current Availability</h3>
            </div>
            <p className="mt-3 text-xs text-neutral-300 leading-relaxed">
              Open to full-stack software engineering, SaaS application development, senior frontend architecture, Next.js / React projects, and technical consulting.
            </p>
            <div className="mt-4 border-t border-white/5 pt-3 font-mono text-xs text-neutral-400">
              Response time: <span className="text-white">Within 24 hours</span>
            </div>
          </div>

          {/* Email Card */}
          <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
              Email Address
            </span>
            <div className="mt-2 flex items-center justify-between gap-2">
              <a
                href={`mailto:${profileInfo.email}`}
                className="text-base font-semibold text-white hover:underline truncate"
              >
                {profileInfo.email}
              </a>
              <button
                onClick={() => handleCopy(profileInfo.email, "email")}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-neutral-300 hover:border-white/30 hover:text-white"
                title="Copy to clipboard"
              >
                {copiedEmail ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Phone Card */}
          <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
              Direct Phone / WhatsApp
            </span>
            <div className="mt-2 flex items-center justify-between gap-2">
              <a
                href={`tel:${profileInfo.phone.replace(/\s+/g, "")}`}
                className="text-base font-semibold text-white hover:underline font-mono"
              >
                {profileInfo.phone}
              </a>
              <button
                onClick={() => handleCopy(profileInfo.phone, "phone")}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-neutral-300 hover:border-white/30 hover:text-white"
                title="Copy to clipboard"
              >
                {copiedPhone ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Location & Timezone Card */}
          <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
              Location &amp; Timezone
            </span>
            <p className="mt-2 text-base font-semibold text-white">
              {profileInfo.location}
            </p>
            <p className="mt-1 text-xs text-neutral-400 font-mono">
              Philippine Standard Time (GMT+8) &bull; Experienced with asynchronous remote collaboration.
            </p>
          </div>

          {/* Professional Profiles */}
          <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
              Online Profiles
            </span>
            <div className="mt-4 flex flex-col gap-2.5">
              <a
                href={profileInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-white transition-colors hover:border-white/30 hover:bg-white/10"
              >
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub Repositories
                </span>
                <span className="text-neutral-400 font-mono text-[11px]">&nearr;</span>
              </a>

              <a
                href={profileInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-white transition-colors hover:border-white/30 hover:bg-white/10"
              >
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn Profile
                </span>
                <span className="text-neutral-400 font-mono text-[11px]">&nearr;</span>
              </a>

              <a
                href={profileInfo.socials.jobstreet}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-white transition-colors hover:border-white/30 hover:bg-white/10"
              >
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  JobStreet Profile
                </span>
                <span className="text-neutral-400 font-mono text-[11px]">&nearr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-white/10 bg-neutral-900/50 p-6 sm:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Send a Direct Message
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400">
              Fill out the form below and I&apos;ll get back to you shortly.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">Message Received!</h3>
                <p className="mt-2 text-xs text-neutral-300">
                  Thank you for reaching out. I will review your message and reply via email at the earliest opportunity.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-neutral-200"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block font-mono text-xs text-neutral-400">
                      Your Name <span className="text-white">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-neutral-400">
                      Email Address <span className="text-white">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-neutral-400">
                    Subject <span className="text-white">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Project Inquiry / Job Opportunity"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-neutral-400">
                    Your Message <span className="text-white">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Describe your project, timeline, or engineering needs..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-white focus:outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all hover:bg-neutral-200 active:scale-98 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
