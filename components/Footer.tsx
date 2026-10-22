import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-neutral-950 py-12 text-neutral-400">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-black font-mono font-bold text-xs">
                JI
              </span>
              <span className="font-semibold text-white">John Irvin C. Udang</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-neutral-400 leading-relaxed">
              Full-stack developer focused on building robust, scalable web architectures, modern reactive frontends, and AI-powered interfaces.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500 font-mono">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              <span>Based in Bacolod City, Philippines &bull; Available globally</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors"
                >
                  Home &amp; Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="hover:text-white transition-colors"
                >
                  Sample Work
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Connect
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/tricks12143?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  GitHub
                  <span className="text-xs text-neutral-500">&nearr;</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/john-irvin-udang-3b1482109/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  LinkedIn
                  <span className="text-xs text-neutral-500">&nearr;</span>
                </a>
              </li>
              <li>
                <a
                  href="https://ph.jobstreet.com/profile/johnirvin-udang-j4tLsTFM72"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  JobStreet
                  <span className="text-xs text-neutral-500">&nearr;</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:johnirvinudang@gmail.com"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  Email Me
                  <span className="text-xs text-neutral-500">&nearr;</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row text-xs text-neutral-500">
          <p>&copy; 2026 John Irvin Udang. All rights reserved.</p>
          <p className="font-mono">Engineered with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
