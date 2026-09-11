import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube, Twitter, MapPin, Phone } from "lucide-react";
import { KanagamLogo } from "@/components/KanagamLogo";

const BRAND = "Kanagam Technology Solutions";
const ADDRESS = "11/15A, KP Link Rd, Goldwins, Civil Aerodrome Post, Coimbatore, Tamil Nadu 641062";
const PHONE = "+91 95787 79977";
const PHONE_TEL = "tel:+919578779977";

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com", icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com", icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
  { label: "X (Twitter)", href: "https://twitter.com", icon: Twitter },
  { label: "YouTube", href: "https://www.youtube.com", icon: Youtube },
];

const QUICK_LINKS: { label: string; to: string; hash?: string }[] = [
  { label: "About Us", to: "/about" },
  { label: "Core Focus", to: "/", hash: "focus" },
  { label: "Academia & Talent", to: "/", hash: "academia" },
  { label: "Partner With Us", to: "/", hash: "inquire" },
  { label: "Student Enquire", to: "/student-enquire" },
];

const COLUMN_HEADING =
  "text-[0.62rem] tracking-[0.25em] text-primary uppercase font-mono font-bold";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/70 bg-card/50 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        {/* Three fixed, predictable columns — never reflow or wrap unexpectedly
            at in-between widths the way content-sized flex items would. */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_1fr] lg:gap-12">
          {/* Brand */}
          <div className="flex flex-col items-start gap-4 sm:col-span-2 lg:col-span-1 lg:max-w-sm">
            <Link to="/" className="inline-flex shrink-0 items-center gap-2">
              <KanagamLogo size="lg" />
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-muted-foreground font-normal">
              A veteran-led GenQ enterprise engineering deep-tech solutions for industry and global
              academia, quantum, semiconductors, AI, drones, 3D fabrication and skill development.
            </p>
            <div className="flex shrink-0 items-center gap-2">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D7AB6A]/25 bg-background/60 text-[#E9CD97] transition-all hover:border-[#D7AB6A]/70 hover:bg-[#D7AB6A]/10 hover:text-[#EAD3A0] hover:shadow-[0_0_14px_rgba(215,171,106,0.35)]"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links — a plain vertical list, so its column width never
              depends on how many links fit on one line */}
          <div className="flex flex-col items-start gap-3.5">
            <span className={COLUMN_HEADING}>Quick Links</span>
            <ul className="flex flex-col items-start gap-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    {...(l.hash ? { hash: l.hash } : {})}
                    className="text-xs font-medium tracking-[0.04em] text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — icon + text pairs stacked vertically */}
          <div className="flex flex-col items-start gap-3.5">
            <span className={COLUMN_HEADING}>Contact</span>
            <div className="flex flex-col items-start gap-3">
              <span className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D7AB6A]" />
                <span className="max-w-[16rem] text-xs leading-relaxed text-muted-foreground font-normal">
                  {ADDRESS}
                </span>
              </span>
              <span className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#D7AB6A]" />
                <a
                  href={PHONE_TEL}
                  className="text-xs leading-relaxed text-muted-foreground font-normal transition-colors hover:text-primary"
                >
                  {PHONE}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar — copyright & tagline */}
      <div className="border-t border-border/50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 sm:px-6 py-3 text-center md:flex-row md:text-left">
          <span className="text-[0.62rem] tracking-[0.2em] text-[#EAD3A0] uppercase font-mono font-semibold">
            © {new Date().getFullYear()} {BRAND}. All Rights Reserved.
          </span>
          <span className="text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase font-mono font-medium">
            Driving the Next Wave of Technological Evolution
          </span>
        </div>
      </div>
    </footer>
  );
}
