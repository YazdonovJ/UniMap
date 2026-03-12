"use client";

import Link from "next/link";
import { UnimapLogo } from "@/components/brand/unimap-logo";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Calendar,
  ChevronDown,
  Clock,
  GraduationCap,
  Layers,
  Menu,
  MessageSquare,
  PenTool,
  Shield,
  Sparkles,
  Target,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { createElement, useEffect, useMemo, useState } from "react";
import {
  BALANCE_BANDS,
  DASHBOARD_DEADLINES,
  DASHBOARD_STATS,
  FAQ_ITEMS,
  FEATURE_ITEMS,
  FOOTER_LINKS,
  HERO_CHIPS,
  HERO_DESCRIPTION,
  HERO_LABEL,
  HERO_TITLE_EMPHASIS,
  HERO_TITLE_TOP,
  NAV_ITEMS,
  PROCESS_STEPS,
  type DashboardDeadline,
  type FaqItem,
  type FeatureItem,
  type LandingIconName,
  type ProcessStep,
} from "./landing.theme";
import type { CSSProperties } from "react";

import "./landing.css";

const ICON_BY_NAME: Record<LandingIconName, LucideIcon> = {
  shield: Shield,
  calendar: Calendar,
  penTool: PenTool,
  target: Target,
  bookOpen: BookOpen,
  barChart3: BarChart3,
  sparkles: Sparkles,
  layers: Layers,
  clock: Clock,
  messageSquare: MessageSquare,
  users: Users,
  graduationCap: GraduationCap,
};

const TOP_UNIVERSITIES = [
  "Ivy League",
  "Harvard University",
  "Yale University",
  "Princeton University",
  "Columbia University",
  "University of Pennsylvania",
  "Cornell University",
  "Brown University",
  "Dartmouth College",
  "MIT",
  "Stanford University",
  "University of Chicago",
  "Caltech",
  "Oxford",
  "Cambridge",
  "Imperial College London",
] as const;

const SAT_LOGIN_URL = "https://unimap.space/login";

function resolveIcon(iconName: LandingIconName) {
  return ICON_BY_NAME[iconName];
}

function LandingIcon({ name, className }: { name: LandingIconName; className?: string }) {
  return createElement(resolveIcon(name), { className });
}

function splitHeroTitleLines(text: string) {
  const words = text.trim().split(/\s+/);
  if (words.length <= 3) return [text];
  if (words.length === 4) return [words.slice(0, 2).join(" "), words.slice(2).join(" ")];
  return [words.slice(0, 2).join(" "), words.slice(2).join(" ")];
}

function lineIndexStyle(index: number) {
  return { ["--line-index" as string]: index } as CSSProperties;
}

function useReducedMotionPreference() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useScrollState() {
  const [state, setState] = useState({ progress: 0, isScrolled: false });

  useEffect(() => {
    let rafId = 0;

    const measure = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const isScrolled = window.scrollY > 14;
      if (height <= 0) {
        setState((previous) => (previous.progress === 0 && previous.isScrolled === isScrolled ? previous : { progress: 0, isScrolled }));
        return;
      }

      const progress = Math.min(100, (window.scrollY / height) * 100);
      setState((previous) => {
        const progressUnchanged = Math.abs(previous.progress - progress) < 0.1;
        const scrolledUnchanged = previous.isScrolled === isScrolled;
        if (progressUnchanged && scrolledUnchanged) return previous;
        return { progress, isScrolled };
      });
    };

    const schedule = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        measure();
      });
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return state;
}

function useRevealOnScroll(reducedMotion: boolean) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".js-reveal"));
    if (nodes.length === 0) return;

    if (reducedMotion) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    nodes.forEach((node, index) => {
      const stagger = Math.min(index * 56, 560);
      node.style.setProperty("--reveal-delay", `${stagger}ms`);
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, [reducedMotion]);
}

function useInteractiveTilt(reducedMotion: boolean) {
  useEffect(() => {
    const shouldDisable =
      reducedMotion ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(update: slow)").matches ||
      window.innerWidth < 980;

    if (shouldDisable) return;

    const cards = Array.from(document.querySelectorAll<HTMLElement>(".js-tilt-card"));
    if (cards.length === 0) return;

    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      const handleMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;

        const rotateY = (px - 0.5) * 5.6;
        const rotateX = (0.5 - py) * 5.6;

        card.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
        card.style.setProperty("--spot-x", `${(px * 100).toFixed(2)}%`);
        card.style.setProperty("--spot-y", `${(py * 100).toFixed(2)}%`);
        card.style.setProperty("--spot-opacity", "1");
      };

      const reset = () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
        card.style.setProperty("--spot-opacity", "0");
      };

      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", reset);
      card.addEventListener("blur", reset);

      cleanups.push(() => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", reset);
        card.removeEventListener("blur", reset);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [reducedMotion]);
}

function useHeroShieldMotion(reducedMotion: boolean) {
  useEffect(() => {
    const shouldDisable =
      reducedMotion ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(update: slow)").matches ||
      window.innerWidth < 980;

    if (shouldDisable) return;

    const shields = Array.from(document.querySelectorAll<HTMLElement>(".js-hero-shield"));
    if (shields.length === 0) return;

    const cleanups: Array<() => void> = [];

    shields.forEach((shield) => {
      const move = (event: MouseEvent) => {
        const rect = shield.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;

        const shiftX = (px - 0.5) * 24;
        const shiftY = (py - 0.5) * -16;
        const rotateX = (0.5 - py) * 6;
        const rotateY = (px - 0.5) * 10;

        shield.style.setProperty("--shield-shift-x", `${shiftX.toFixed(2)}px`);
        shield.style.setProperty("--shield-shift-y", `${shiftY.toFixed(2)}px`);
        shield.style.setProperty("--shield-tilt-x", `${rotateX.toFixed(2)}deg`);
        shield.style.setProperty("--shield-tilt-y", `${rotateY.toFixed(2)}deg`);
      };

      const reset = () => {
        shield.style.setProperty("--shield-shift-x", "0px");
        shield.style.setProperty("--shield-shift-y", "0px");
        shield.style.setProperty("--shield-tilt-x", "0deg");
        shield.style.setProperty("--shield-tilt-y", "0deg");
      };

      shield.addEventListener("mousemove", move);
      shield.addEventListener("mouseleave", reset);
      shield.addEventListener("blur", reset);

      cleanups.push(() => {
        shield.removeEventListener("mousemove", move);
        shield.removeEventListener("mouseleave", reset);
        shield.removeEventListener("blur", reset);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [reducedMotion]);
}

function SectionEyebrow({ children }: { children: string }) {
  return <span className="section-eyebrow">{children}</span>;
}

function TopNav({
  onToggleMobile,
  mobileOpen,
  progress,
  isScrolled,
}: {
  onToggleMobile: () => void;
  mobileOpen: boolean;
  progress: number;
  isScrolled: boolean;
}) {
  return (
    <header className={`landing-nav-shell ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="landing-scroll-progress" data-progress={Math.round(progress)} aria-hidden />
      <nav className="landing-nav" aria-label="Primary">
        <div className="landing-container landing-nav-inner">
          <Link href="/" className="brand-link" aria-label="UNIMAP Home">
            <span className="brand-icon">
              <UnimapLogo className="h-full w-full" />
            </span>
            <span className="brand-text">UNIMAP</span>
          </Link>

          <ul className="nav-desktop-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            <a href={SAT_LOGIN_URL} className="nav-login-link">
              Log In for SAT
            </a>
            <Link href="/signup" className="btn btn-primary nav-cta-btn js-magnet" data-magnet-strength="0.08">
              Start UNIMAP <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              className="nav-mobile-toggle"
              onClick={onToggleMobile}
              {...(mobileOpen ? { "aria-expanded": true } : { "aria-expanded": false })}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="landing-mobile-panel">
          <div className="landing-container landing-mobile-panel-inner">
            <div className="mobile-links">
              {NAV_ITEMS.map((item) => (
                <a key={item.label} href={item.href} className="mobile-link-item">
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mobile-actions">
              <a href={SAT_LOGIN_URL} className="mobile-login-btn">
                Log In for SAT
              </a>
              <Link href="/signup" className="mobile-primary-btn">
                Start UNIMAP
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function HeroSection() {
  const heroTitleLines = splitHeroTitleLines(HERO_TITLE_TOP);

  return (
    <section className="landing-hero" aria-labelledby="hero-title">
      <div className="hero-light-shift" aria-hidden />
      <div className="hero-grain" aria-hidden />
      <div className="hero-orb hero-orb-one" aria-hidden />
      <div className="hero-orb hero-orb-two" aria-hidden />
      <div className="hero-grid" aria-hidden />

      <div className="landing-container hero-inner js-reveal">
        <div className="hero-copy">
          <SectionEyebrow>{HERO_LABEL}</SectionEyebrow>
          <h1 id="hero-title" className="hero-title">
            {heroTitleLines.map((line, index) => (
              <span key={`${line}-${index}`} className="hero-title-line hero-title-line-top" data-index={index}>
                {line}
              </span>
            ))}
            <span className="hero-title-line hero-title-line-emphasis" data-index={heroTitleLines.length}>
              {HERO_TITLE_EMPHASIS}
            </span>
          </h1>
          <p className="hero-description">{HERO_DESCRIPTION}</p>

          <div className="hero-actions">
            <Link href="/signup" className="btn btn-primary btn-lg js-magnet" data-magnet-strength="0.07">
              Start UNIMAP <ArrowRight className="h-5 w-5" />
            </Link>
            <a href={SAT_LOGIN_URL} className="btn btn-ghost btn-lg">
              <Users className="h-5 w-5" /> Log In for SAT
            </a>
          </div>

          <div className="hero-chips" role="list" aria-label="Platform capabilities">
            {HERO_CHIPS.map((chip) => (
              <span key={chip} className="hero-chip" role="listitem">
                {chip}
              </span>
            ))}
          </div>
        </div>

        <figure className="hero-photo-card js-tilt-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Widener_Library.jpg/1280px-Widener_Library.jpg"
            alt="Harvard campus"
            className="hero-photo"
            loading="eager"
            decoding="async"
            onError={(event) => {
              const image = event.currentTarget;
              if (image.dataset.fallbackApplied === "true") return;
              image.dataset.fallbackApplied = "true";
              image.src =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/HarvardYard.jpg/1280px-HarvardYard.jpg";
            }}
          />
        </figure>
      </div>
    </section>
  );
}

function PartnerMarquee() {
  const doubled = useMemo(() => [...TOP_UNIVERSITIES, ...TOP_UNIVERSITIES], []);

  return (
    <section className="partner-marquee-section js-reveal" aria-label="Partner network">
      <div className="landing-container partner-marquee-inner">
        <div className="partner-marquee-track" role="list">
          {doubled.map((item, index) => (
            <span key={`${item}-${index}`} className="partner-chip" role="listitem">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: FeatureItem; index: number }) {
  return (
    <li className="feature-card js-tilt-card" data-index={index}>
      <div className="feature-card-top">
        <span className="feature-icon-wrap" aria-hidden>
          <LandingIcon name={feature.icon} className="h-6 w-6" />
        </span>
        <span className="feature-badge">{feature.eyebrow}</span>
      </div>
      <h3 className="feature-title">{feature.title}</h3>
      <p className="feature-description">{feature.description}</p>
      <div className="feature-footer">
        <span className="feature-highlight">{feature.highlight}</span>
        <span className="feature-link" aria-hidden>
          Explore <ArrowRight className="h-4 w-4" />
        </span>
      </div>
      <span className="feature-number">{String(index + 1).padStart(2, "0")}</span>
    </li>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="landing-section section-surface js-reveal" aria-labelledby="features-heading">
      <div className="landing-container landing-container-wide">
        <div className="section-heading-block">
          <SectionEyebrow>Features</SectionEyebrow>
          <h2 id="features-heading" className="section-title">
            Everything you need, built with operational clarity.
          </h2>
          <p className="section-subtitle">
            Purpose-built workflows for students, counselors, and educators. Every module is designed to reduce friction and increase execution quality.
          </p>
        </div>

        <ul className="feature-grid">
          {FEATURE_ITEMS.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProcessCard({ step, index }: { step: ProcessStep; index: number }) {
  return (
    <li className="process-card js-tilt-card" data-index={index}>
      <div className="process-id-wrap">
        <span className="process-id">{step.id}</span>
        <span className="process-detail">{step.detail}</span>
      </div>
      <h3 className="process-title">{step.title}</h3>
      <p className="process-description">{step.description}</p>
    </li>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="landing-section section-soft js-reveal" aria-labelledby="process-heading">
      <div className="landing-container">
        <div className="section-heading-block">
          <SectionEyebrow>Process</SectionEyebrow>
          <h2 id="process-heading" className="section-title">
            A predictable four-step path from invite to submission.
          </h2>
        </div>

        <ul className="process-grid">
          {PROCESS_STEPS.map((step, index) => (
            <ProcessCard key={step.id} step={step} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function UrgencyChip({ urgency }: { urgency: DashboardDeadline["urgency"] }) {
  if (urgency === "high") return <span className="urgency-chip urgency-high">High</span>;
  if (urgency === "medium") return <span className="urgency-chip urgency-medium">Medium</span>;
  return <span className="urgency-chip urgency-low">Low</span>;
}

function DashboardSection() {
  return (
    <section id="platform" className="landing-section section-surface js-reveal" aria-labelledby="platform-heading">
      <div className="landing-container landing-container-wide">
        <div className="section-heading-block">
          <SectionEyebrow>Platform</SectionEyebrow>
          <h2 id="platform-heading" className="section-title">
            One command center for strategy, writing, and execution.
          </h2>
          <p className="section-subtitle">
            See the full application picture, prioritize what matters now, and align everyone around a shared operating plan.
          </p>
        </div>

        <div className="dashboard-shell js-tilt-card">
          <div className="dashboard-topbar">
            <div className="topbar-dots" aria-hidden>
              <span />
              <span />
              <span />
            </div>
            <span className="topbar-url">unimap.io/dashboard</span>
            <span className="topbar-sync">Synced</span>
          </div>

          <div className="dashboard-content">
            <div className="dashboard-stat-grid">
              {DASHBOARD_STATS.map((stat) => (
                <article key={stat.label} className="dashboard-stat-card">
                  <div className="dashboard-stat-label-wrap">
                    <span className="dashboard-stat-icon">
                      <LandingIcon name={stat.icon} className="h-4 w-4" />
                    </span>
                    <span className="dashboard-stat-label">{stat.label}</span>
                  </div>
                  <p className="dashboard-stat-value">{stat.value}</p>
                  <p className="dashboard-stat-trend">{stat.trend}</p>
                </article>
              ))}
            </div>

            <div className="dashboard-lower-grid">
              <article className="dashboard-panel">
                <h3 className="panel-title">Upcoming Deadlines</h3>
                <div className="deadline-list" role="list">
                  {DASHBOARD_DEADLINES.map((deadline) => (
                    <div key={deadline.title} className="deadline-item" role="listitem">
                      <div className="deadline-main">
                        <Clock className="h-4 w-4" />
                        <span>{deadline.title}</span>
                      </div>
                      <div className="deadline-side">
                        <span className="deadline-date">{deadline.date}</span>
                        <UrgencyChip urgency={deadline.urgency} />
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="dashboard-panel">
                <h3 className="panel-title">College List Balance</h3>
                <div className="balance-list" role="list">
                  {BALANCE_BANDS.map((band) => (
                    <div key={band.label} className="balance-item" role="listitem">
                      <div className="balance-row">
                        <span className="balance-label">{band.label}</span>
                        <span className="balance-value">{band.percent}%</span>
                      </div>
                      <div className="balance-track" aria-hidden>
                        <span className="balance-fill" data-width={band.percent} data-bg={band.color} />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqRow({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <li className={`faq-row ${isOpen ? "is-open" : ""}`}>
      <button type="button" className="faq-trigger" onClick={onToggle} {...(isOpen ? { "aria-expanded": true } : { "aria-expanded": false })}>
        <span>{item.question}</span>
        <span className="faq-icon-wrap" aria-hidden>
          <ChevronDown className="h-4.5 w-4.5" />
        </span>
      </button>
      <div className="faq-content" data-expanded={isOpen ? "true" : "false"}>
        <p>{item.answer}</p>
      </div>
    </li>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="landing-section section-surface js-reveal" aria-labelledby="faq-heading">
      <div className="landing-container landing-container-narrow">
        <div className="section-heading-block">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 id="faq-heading" className="section-title">
            Common questions from students, families, and schools.
          </h2>
        </div>

        <ul className="faq-list">
          {FAQ_ITEMS.map((item, index) => (
            <FaqRow key={item.question} item={item} isOpen={index === openIndex} onToggle={() => setOpenIndex(index === openIndex ? -1 : index)} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="landing-final-cta js-reveal" aria-labelledby="final-cta-heading">
      <div className="final-cta-glow final-cta-glow-left" aria-hidden />
      <div className="final-cta-glow final-cta-glow-right" aria-hidden />

      <div className="landing-container final-cta-inner">
        <div className="final-cta-icon-wrap" aria-hidden>
          <UnimapLogo className="h-full w-full" />
        </div>
        <SectionEyebrow>Get Started</SectionEyebrow>
        <h2 id="final-cta-heading" className="final-cta-title">
          Build your application with clarity and control.
        </h2>
        <p className="final-cta-description">
          Replace scattered docs and late-night scrambling with one coordinated system from first draft to final submission.
        </p>

        <div className="final-cta-actions">
          <Link href="/signup" className="btn btn-primary btn-lg final-cta-primary js-magnet" data-magnet-strength="0.06">
            Start UNIMAP <ArrowRight className="h-5 w-5" />
          </Link>
          <a href="mailto:contact@unimap.io?subject=Question about UNIMAP" className="btn btn-ghost btn-lg final-cta-secondary">
            <MessageSquare className="h-5 w-5" /> Ask a question
          </a>
        </div>
      </div>
    </section>
  );
}

function FooterBar() {
  return (
    <footer className="landing-footer">
      <div className="landing-container landing-footer-inner">
        <div className="footer-brand">
          <span className="footer-brand-icon">
            <UnimapLogo className="h-full w-full" />
          </span>
          <span className="footer-brand-text">UNIMAP</span>
        </div>

        <div className="footer-links" role="list">
          {FOOTER_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="footer-link" role="listitem">
              {link.label}
            </a>
          ))}
        </div>

        <p className="footer-copy">© 2026 UNIMAP. All rights reserved.</p>
      </div>
    </footer>
  );
}

function useMagneticButtons(reducedMotion: boolean) {
  useEffect(() => {
    const shouldDisable =
      reducedMotion ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(update: slow)").matches ||
      window.innerWidth < 980;

    if (shouldDisable) return;

    const buttons = Array.from(document.querySelectorAll<HTMLElement>(".js-magnet"));
    if (buttons.length === 0) return;

    const cleanups: Array<() => void> = [];

    buttons.forEach((button) => {
      const strength = Number(button.dataset.magnetStrength || "0.06");
      const handleMove = (event: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        button.style.setProperty("--magnet-x", `${(x * strength).toFixed(2)}px`);
        button.style.setProperty("--magnet-y", `${(y * strength).toFixed(2)}px`);
      };

      const reset = () => {
        button.style.setProperty("--magnet-x", "0px");
        button.style.setProperty("--magnet-y", "0px");
      };

      button.addEventListener("mousemove", handleMove);
      button.addEventListener("mouseleave", reset);
      button.addEventListener("blur", reset);

      cleanups.push(() => {
        button.removeEventListener("mousemove", handleMove);
        button.removeEventListener("mouseleave", reset);
        button.removeEventListener("blur", reset);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [reducedMotion]);
}

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const reducedMotion = useReducedMotionPreference();
  const { progress, isScrolled } = useScrollState();

  useRevealOnScroll(reducedMotion);
  useInteractiveTilt(reducedMotion);
  useHeroShieldMotion(reducedMotion);
  useMagneticButtons(reducedMotion);

  return (
    <main className="landing-root">
      <TopNav onToggleMobile={() => setMobileOpen((prev) => !prev)} mobileOpen={mobileOpen} progress={progress} isScrolled={isScrolled} />

      <HeroSection />
      <PartnerMarquee />
      <FeaturesSection />
      <ProcessSection />
      <DashboardSection />
      <FaqSection />
      <FinalCta />
      <FooterBar />
    </main>
  );
}
