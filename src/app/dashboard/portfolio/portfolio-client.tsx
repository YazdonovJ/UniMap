"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { UnimapLogo } from "@/components/brand/unimap-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Code,
  Copy,
  ExternalLink,
  FileText,
  Filter,
  FolderOpen,
  Globe,
  GraduationCap,
  Heart,
  LayoutGrid,
  Link2,
  Palette,
  Plus,
  Search,
  Sparkles,
  Target,
  Timer,
  Trash2,
  TrendingUp,
  Upload,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties, FormEvent, MouseEvent as ReactMouseEvent } from "react";
import type { PortfolioItem } from "@/types";

import "./portfolio.css";

/* ─── Types ─── */
type PortfolioType = PortfolioItem["type"];
type PortfolioFilter = PortfolioType | "all";
type PortfolioSort = "newest" | "oldest" | "title";
type PortfolioStatus = "completed" | "in_progress" | "planning";
type ViewMode = "grid" | "timeline";

type PortfolioDraft = {
  title: string;
  description: string;
  linkUrl: string;
  type: PortfolioType;
  reflection: string;
  skills: string[];
  status: PortfolioStatus;
  alignedMajor: string;
  startDate: string;
  collaborators: string;
  impactMetrics: {
    users: string;
    raised: string;
    hours: string;
    mentored: string;
    awards: string;
  };
};

const INITIAL_DRAFT: PortfolioDraft = {
  title: "",
  description: "",
  linkUrl: "",
  type: "coding_project",
  reflection: "",
  skills: [],
  status: "completed",
  alignedMajor: "",
  startDate: "",
  collaborators: "",
  impactMetrics: { users: "", raised: "", hours: "", mentored: "", awards: "" },
};

/* ─── Config ─── */
const typeConfig: Record<PortfolioType, { icon: LucideIcon; label: string; tone: string; chipTone: string }> = {
  research_paper: { icon: FileText, label: "Research Paper", tone: "pf-icon-blue", chipTone: "pf-chip-blue" },
  coding_project: { icon: Code, label: "Coding Project", tone: "pf-icon-emerald", chipTone: "pf-chip-emerald" },
  website: { icon: Globe, label: "Website", tone: "pf-icon-red", chipTone: "pf-chip-red" },
  design: { icon: Palette, label: "Design", tone: "pf-icon-pink", chipTone: "pf-chip-pink" },
  other: { icon: FolderOpen, label: "Other", tone: "pf-icon-slate", chipTone: "pf-chip-slate" },
};

const statusConfig: Record<PortfolioStatus, { label: string; dot: string }> = {
  completed: { label: "Completed", dot: "pf-status-green" },
  in_progress: { label: "In Progress", dot: "pf-status-blue" },
  planning: { label: "Planning", dot: "pf-status-yellow" },
};

const MAJORS = [
  "Computer Science", "Engineering", "Biology", "Chemistry", "Physics",
  "Mathematics", "Business", "Economics", "Psychology", "Political Science",
  "English", "History", "Art", "Music", "Pre-Med", "Education", "Other",
];


/* ─── Helpers ─── */
function createPortfolioFileName(userId: string, file: File) {
  const safeFileName = file.name.trim().replace(/\s+/g, "-");
  return `${userId}/${file.lastModified}-${file.size}-${safeFileName}`;
}

function formatItemDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function getGradeLabel(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  const year = d.getFullYear();
  const month = d.getMonth();
  const schoolYear = month >= 8 ? year : year - 1;
  const currentYear = new Date().getFullYear();
  const gradYear = currentYear + 1;
  const grade = 12 - (gradYear - schoolYear - 1);
  if (grade >= 9 && grade <= 12) return `${grade}th Grade`;
  if (grade < 9) return "Middle School";
  return "Post-HS";
}

function computeScoreBreakdown(items: PortfolioItem[]) {
  const total = items.length;
  if (total === 0) return { depth: 0, diversity: 0, evidence: 0, reflection: 0, alignment: 0, overall: 0 };

  const hasStartDate = items.filter(i => i.start_date).length;
  const depth = Math.min(100, Math.round((hasStartDate / total) * 40 + Math.min(total, 8) * 7.5));

  const types = new Set(items.map(i => i.type)).size;
  const diversity = Math.min(100, Math.round((types / Object.keys(typeConfig).length) * 100));

  const withEvidence = items.filter(i => i.link_url || i.file_url).length;
  const evidence = Math.min(100, Math.round((withEvidence / total) * 100));

  const withReflection = items.filter(i => i.reflection && i.reflection.trim().length > 20).length;
  const reflectionScore = Math.min(100, Math.round((withReflection / total) * 100));

  const withMajor = items.filter(i => i.aligned_major).length;
  const alignment = Math.min(100, Math.round((withMajor / total) * 100));

  const overall = Math.min(100, Math.round((depth * 0.25 + diversity * 0.2 + evidence * 0.25 + reflectionScore * 0.15 + alignment * 0.15)));

  return { depth, diversity, evidence, reflection: reflectionScore, alignment, overall };
}

/* ─── 3D Tilt Hook ─── */
function useTiltEffect() {
  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  }, []);

  const handleMouseLeave = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
  }, []);

  return { handleMouseMove, handleMouseLeave };
}

/* ─── Hero 3D Scene Hook ─── */
function useHeroSceneEffect() {
  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 980) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    }

    const scene = e.currentTarget;
    const rect = scene.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const tiltX = (0.5 - py) * 10;
    const tiltY = (px - 0.5) * 12;
    const shiftX = (px - 0.5) * 16;
    const shiftY = (py - 0.5) * 10;

    scene.style.setProperty("--pf-scene-tilt-x", `${tiltX.toFixed(2)}deg`);
    scene.style.setProperty("--pf-scene-tilt-y", `${tiltY.toFixed(2)}deg`);
    scene.style.setProperty("--pf-scene-shift-x", `${shiftX.toFixed(2)}px`);
    scene.style.setProperty("--pf-scene-shift-y", `${shiftY.toFixed(2)}px`);
  }, []);

  const handleMouseLeave = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const scene = e.currentTarget;
    scene.style.setProperty("--pf-scene-tilt-x", "0deg");
    scene.style.setProperty("--pf-scene-tilt-y", "0deg");
    scene.style.setProperty("--pf-scene-shift-x", "0px");
    scene.style.setProperty("--pf-scene-shift-y", "0px");
  }, []);

  return { handleMouseMove, handleMouseLeave };
}

/* ─── Component ─── */
export default function PortfolioClient({ initialItems, userId }: { initialItems: PortfolioItem[]; userId: string }) {
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [draft, setDraft] = useState<PortfolioDraft>(INITIAL_DRAFT);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTypeFilter, setActiveTypeFilter] = useState<PortfolioFilter>("all");
  const [sortBy, setSortBy] = useState<PortfolioSort>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [skillInput, setSkillInput] = useState("");
  const [showImpact, setShowImpact] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formSection, setFormSection] = useState<"basic" | "details" | "evidence">("basic");
  const skillInputRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();
  const tilt = useTiltEffect();
  const sceneTilt = useHeroSceneEffect();

  /* ─── Computed ─── */
  const scores = useMemo(() => computeScoreBreakdown(items), [items]);

  const metrics = useMemo(() => {
    const total = items.length;
    const withEvidence = items.filter(i => i.link_url || i.file_url).length;
    const typeCoverage = new Set(items.map(i => i.type)).size;
    const withReflection = items.filter(i => i.reflection && i.reflection.trim().length > 0).length;
    const evidenceRate = total === 0 ? 0 : Math.round((withEvidence / total) * 100);

    let nextAction = "Portfolio looks strong. Keep weekly updates consistent.";
    if (total === 0) nextAction = "Add your first project to start building your portfolio depth.";
    else if (typeCoverage < 3) nextAction = "Add one item in a new category to improve portfolio breadth.";
    else if (evidenceRate < 80) nextAction = "Attach links or files to each item to strengthen proof.";
    else if (withReflection < total) nextAction = "Add reflections to your projects — admissions officers love seeing 'why it matters.'";

    return { total, withEvidence, typeCoverage, evidenceRate, withReflection, nextAction };
  }, [items]);

  const skillsCloud = useMemo(() => {
    const map: Record<string, number> = {};
    for (const item of items) {
      for (const skill of item.skills || []) {
        map[skill] = (map[skill] || 0) + 1;
      }
    }
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [items]);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const base = items.filter(item => {
      const matchesType = activeTypeFilter === "all" || item.type === activeTypeFilter;
      if (!matchesType) return false;
      if (!query) return true;
      const haystack = `${item.title} ${item.description || ""} ${(item.skills || []).join(" ")}`.toLowerCase();
      return haystack.includes(query);
    });
    const sorted = [...base];
    sorted.sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      const aTime = new Date(a.start_date || a.created_at).getTime();
      const bTime = new Date(b.start_date || b.created_at).getTime();
      if (sortBy === "oldest") return aTime - bTime;
      return bTime - aTime;
    });
    return sorted;
  }, [items, activeTypeFilter, searchQuery, sortBy]);

  const timelineGroups = useMemo(() => {
    const groups: Record<string, PortfolioItem[]> = {};
    for (const item of filteredItems) {
      const label = getGradeLabel(item.start_date || item.created_at);
      if (!groups[label]) groups[label] = [];
      groups[label].push(item);
    }
    return groups;
  }, [filteredItems]);

  /* ─── Actions ─── */
  function resetForm() {
    setShowForm(false);
    setFormError(null);
    setDraft(INITIAL_DRAFT);
    setSelectedFile(null);
    setSkillInput("");
    setShowImpact(false);
    setFormSection("basic");
  }

  function addSkill() {
    const s = skillInput.trim();
    if (s && !draft.skills.includes(s)) {
      setDraft(prev => ({ ...prev, skills: [...prev.skills, s] }));
    }
    setSkillInput("");
    skillInputRef.current?.focus();
  }

  function removeSkill(skill: string) {
    setDraft(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  }

  async function copyPortfolioLink() {
    const link = `${window.location.origin}/portfolio/${userId}`;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.title.trim()) { setFormError("Title is required."); return; }
    setLoading(true);
    setFormError(null);

    let fileUrl: string | undefined;
    try {
      if (selectedFile && selectedFile.size > 0) {
        const fileName = createPortfolioFileName(userId, selectedFile);
        const { data: uploadData, error: uploadError } = await supabase.storage.from("portfolios").upload(fileName, selectedFile);
        if (uploadError || !uploadData) { setFormError(uploadError?.message || "Could not upload the file."); return; }
        const { data: urlData } = supabase.storage.from("portfolios").getPublicUrl(uploadData.path);
        fileUrl = urlData.publicUrl;
      }

      const impactObj: PortfolioItem["impact_metrics"] = {};
      if (draft.impactMetrics.users) impactObj.users = Number(draft.impactMetrics.users);
      if (draft.impactMetrics.raised) impactObj.raised = Number(draft.impactMetrics.raised);
      if (draft.impactMetrics.hours) impactObj.hours = Number(draft.impactMetrics.hours);
      if (draft.impactMetrics.mentored) impactObj.mentored = Number(draft.impactMetrics.mentored);
      if (draft.impactMetrics.awards) impactObj.awards = Number(draft.impactMetrics.awards);

      const insertPayload: Record<string, unknown> = {
        user_id: userId,
        title: draft.title.trim(),
        description: draft.description.trim() || null,
        link_url: draft.linkUrl.trim() || null,
        file_url: fileUrl || null,
        type: draft.type,
        reflection: draft.reflection.trim() || null,
        skills: draft.skills.length > 0 ? draft.skills : null,
        status: draft.status,
        aligned_major: draft.alignedMajor || null,
        start_date: draft.startDate || null,
        collaborators: draft.collaborators.trim() || null,
        impact_metrics: Object.keys(impactObj).length > 0 ? impactObj : null,
      };

      const { data, error } = await supabase.from("portfolios").insert(insertPayload).select().single();
      if (error || !data) { setFormError(error?.message || "Could not save this portfolio item."); return; }
      setItems(prev => [data, ...prev]);
      resetForm();
    } finally {
      setLoading(false);
    }
  }

  async function deleteItem(id: string) {
    const confirmed = window.confirm("Delete this portfolio item?");
    if (!confirmed) return;
    const snapshot = items;
    setItems(prev => prev.filter(item => item.id !== id));
    const { error } = await supabase.from("portfolios").delete().eq("id", id);
    if (error) setItems(snapshot);
  }

  /* ─── Render helpers ─── */
  function renderImpactPills(item: PortfolioItem) {
    const m = item.impact_metrics;
    if (!m) return null;
    const pills: Array<{ icon: LucideIcon; value: string; label: string }> = [];
    if (m.users) pills.push({ icon: Users, value: String(m.users), label: "users" });
    if (m.hours) pills.push({ icon: Clock, value: `${m.hours}h`, label: "hours" });
    if (m.raised) pills.push({ icon: TrendingUp, value: `$${m.raised}`, label: "raised" });
    if (m.mentored) pills.push({ icon: Heart, value: String(m.mentored), label: "mentored" });
    if (m.awards) pills.push({ icon: Award, value: String(m.awards), label: "awards" });
    if (pills.length === 0) return null;
    return (
      <div className="pf-impact-pills">
        {pills.map(p => {
          const PIcn = p.icon;
          return (
            <span key={p.label} className="pf-impact-pill">
              <PIcn className="h-3 w-3" /> {p.value}
            </span>
          );
        })}
      </div>
    );
  }

  function renderPortfolioCard(item: PortfolioItem, inTimeline = false) {
    const config = typeConfig[item.type] || typeConfig.other;
    const Icon = config.icon;
    const isExpanded = expandedCard === item.id;
    const st = item.status ? statusConfig[item.status] : null;

    return (
      <div
        key={item.id}
        className={`pf-card ${inTimeline ? "pf-card--timeline" : ""} ${isExpanded ? "pf-card--expanded" : ""}`}
        onMouseMove={tilt.handleMouseMove}
        onMouseLeave={tilt.handleMouseLeave}
      >
        <div className="pf-card-glow" />
        <div className="pf-card-inner">
          {/* Top row */}
          <div className="pf-card-top">
            <span className={`pf-card-icon ${config.tone}`}>
              <Icon className="h-5 w-5" />
            </span>
            <div className="pf-card-top-right">
              {st && (
                <span className={`pf-status-badge ${st.dot}`}>
                  <span className="pf-status-dot" /> {st.label}
                </span>
              )}
              <button type="button" title="Delete item" aria-label="Delete portfolio item" className="pf-delete-btn" onClick={() => deleteItem(item.id)}>
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Title & description */}
          <h3 className="pf-card-title">{item.title}</h3>
          <p className="pf-card-desc">{item.description || "No description added yet."}</p>

          {/* Skills tags */}
          {item.skills && item.skills.length > 0 && (
            <div className="pf-card-skills">
              {item.skills.slice(0, 4).map(skill => (
                <span key={skill} className="pf-skill-chip">{skill}</span>
              ))}
              {item.skills.length > 4 && <span className="pf-skill-more">+{item.skills.length - 4}</span>}
            </div>
          )}

          {/* Impact metrics */}
          {renderImpactPills(item)}

          {/* Meta row */}
          <div className="pf-card-meta">
            <Badge className={config.chipTone}>{config.label}</Badge>
            {item.aligned_major && (
              <span className="pf-major-tag">
                <GraduationCap className="h-3 w-3" /> {item.aligned_major}
              </span>
            )}
            <span className="pf-card-date">
              <CalendarClock className="h-3 w-3" /> {formatItemDate(item.start_date || item.created_at)}
            </span>
          </div>

          {/* Expand toggle */}
          <button type="button" className="pf-expand-btn" onClick={() => setExpandedCard(isExpanded ? null : item.id)} aria-label={isExpanded ? "Collapse" : "Expand"}>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {isExpanded ? "Less" : "More"}
          </button>

          {/* Expanded content */}
          {isExpanded && (
            <div className="pf-card-expanded">
              {/* Reflection */}
              {item.reflection && (
                <div className="pf-reflection-block">
                  <h4><Sparkles className="h-4 w-4" /> Why This Matters</h4>
                  <p>{item.reflection}</p>
                </div>
              )}

              {/* Collaborators */}
              {item.collaborators && (
                <div className="pf-collab-block">
                  <h4><Users className="h-4 w-4" /> Collaborators</h4>
                  <p>{item.collaborators}</p>
                </div>
              )}

              {/* Evidence links */}
              <div className="pf-card-links">
                {item.link_url && (
                  <a href={item.link_url} target="_blank" rel="noopener noreferrer" className="pf-link-btn pf-link-btn--primary">
                    <Link2 className="h-3.5 w-3.5" /> Open Link <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {item.file_url && (
                  <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="pf-link-btn pf-link-btn--file">
                    <FileText className="h-3.5 w-3.5" /> View File
                  </a>
                )}
                {!item.link_url && !item.file_url && (
                  <span className="pf-no-proof"><CheckCircle2 className="h-3.5 w-3.5" /> Add proof to strengthen this item</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ─── Render ─── */
  return (
    <div className="pf-page animate-fade-in">
      {/* Ambient background */}
      <div className="pf-ambient" aria-hidden>
        <span className="pf-ambient-gradient" />
        <span className="pf-ambient-light" />
        <span className="pf-ambient-orb pf-ambient-orb-one" />
        <span className="pf-ambient-orb pf-ambient-orb-two" />
      </div>

      {/* ─── Hero ─── */}
      <section className="pf-hero pf-reveal pf-reveal-1">
        <div className="pf-hero-left">
          <span className="pf-eyebrow">Portfolio</span>
          <h1 className="pf-title">Showcase your projects, research, and creative execution.</h1>
          <p className="pf-subtitle">
            Your professional evidence layer. Add high-signal work, attach proof, and keep it application-ready.
          </p>

        </div>

        {/* Score panel */}
        <div className="pf-score-panel">
          <div className="pf-score-top">
            <div className="pf-3d-scene" onMouseMove={sceneTilt.handleMouseMove} onMouseLeave={sceneTilt.handleMouseLeave}>
              <div className="pf-3d-object">
                <span className="pf-3d-ring pf-3d-ring-outer" />
                <span className="pf-3d-ring pf-3d-ring-inner" />
                <span className="pf-3d-spark pf-3d-spark-a" />
                <span className="pf-3d-spark pf-3d-spark-b" />
                <span className="pf-3d-spark pf-3d-spark-c" />
                <div className="pf-3d-core">
                  <UnimapLogo className="pf-3d-logo" decorative />
                </div>
              </div>
            </div>

            <div className="pf-score-ring-wrap">
              <svg className="pf-score-svg" viewBox="0 0 120 120">
                <circle className="pf-ring-bg" cx="60" cy="60" r="52" />
                <circle className="pf-ring-depth" cx="60" cy="60" r="52" data-progress={scores.depth} />
                <circle className="pf-ring-diversity" cx="60" cy="60" r="44" data-progress={scores.diversity} />
                <circle className="pf-ring-evidence" cx="60" cy="60" r="36" data-progress={scores.evidence} />
                <circle className="pf-ring-reflection" cx="60" cy="60" r="28" data-progress={scores.reflection} />
                <circle className="pf-ring-alignment" cx="60" cy="60" r="20" data-progress={scores.alignment} />
              </svg>
              <div className="pf-score-center">
                <span className="pf-score-number">{scores.overall}</span>
                <span className="pf-score-label">Score</span>
              </div>
            </div>
          </div>

          {/* Score legend */}
          <div className="pf-score-legend">
            <div className="pf-legend-row"><span className="pf-legend-dot pf-legend-depth" /> Depth <strong>{scores.depth}%</strong></div>
            <div className="pf-legend-row"><span className="pf-legend-dot pf-legend-diversity" /> Diversity <strong>{scores.diversity}%</strong></div>
            <div className="pf-legend-row"><span className="pf-legend-dot pf-legend-evidence" /> Evidence <strong>{scores.evidence}%</strong></div>
            <div className="pf-legend-row"><span className="pf-legend-dot pf-legend-reflection" /> Reflection <strong>{scores.reflection}%</strong></div>
            <div className="pf-legend-row"><span className="pf-legend-dot pf-legend-alignment" /> Alignment <strong>{scores.alignment}%</strong></div>
          </div>

          <div className="pf-next-action">
            <div className="pf-next-action-title"><Sparkles className="h-4 w-4" /> Next Best Action</div>
            <p>{metrics.nextAction}</p>
          </div>

          <div className="pf-hero-actions">
            <Button className="pf-add-btn" onClick={() => { setShowForm(true); setFormSection("basic"); }}>
              <Plus className="h-4 w-4" /> Add Item
            </Button>
            <button type="button" className="pf-share-btn" onClick={copyPortfolioLink} aria-label="Copy portfolio link">
              {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Share Link"}
            </button>
          </div>
        </div>
      </section>

      {/* ─── Metrics strip ─── */}
      <section className="pf-metrics pf-reveal pf-reveal-2" role="list" aria-label="Portfolio metrics">
        <article className="pf-metric" role="listitem">
          <span className="pf-metric-label">Total Items</span>
          <strong className="pf-metric-value">{metrics.total}</strong>
          <span className="pf-metric-meta">Keep adding fresh work weekly</span>
        </article>
        <article className="pf-metric" role="listitem">
          <span className="pf-metric-label">Evidence Coverage</span>
          <strong className="pf-metric-value">{metrics.evidenceRate}%</strong>
          <span className="pf-metric-meta">Items with links or files</span>
        </article>
        <article className="pf-metric" role="listitem">
          <span className="pf-metric-label">Type Coverage</span>
          <strong className="pf-metric-value">{metrics.typeCoverage}/5</strong>
          <span className="pf-metric-meta">Diversity across categories</span>
        </article>
        <article className="pf-metric" role="listitem">
          <span className="pf-metric-label">Reflections</span>
          <strong className="pf-metric-value">{metrics.withReflection}/{metrics.total}</strong>
          <span className="pf-metric-meta">Projects with &ldquo;Why It Matters&rdquo;</span>
        </article>
      </section>

      {/* ─── Skills Cloud ─── */}
      {skillsCloud.length > 0 && (
        <section className="pf-skills-cloud-section pf-reveal pf-reveal-3">
          <h3 className="pf-section-heading"><Target className="h-4 w-4" /> Skills Overview</h3>
          <div className="pf-skills-cloud">
            {skillsCloud.map(([skill, count]) => (
              <span key={skill} className="pf-cloud-tag" data-count={Math.min(5, count)}>
                {skill} <span className="pf-cloud-count">{count}</span>
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ─── Toolbar ─── */}
      <section className="pf-toolbar pf-reveal pf-reveal-4">
        <div className="pf-search-wrap">
          <Search className="pf-search-icon" />
          <Input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by title, description, or skill"
            className="pf-search-input"
            aria-label="Search portfolio items"
          />
        </div>

        <div className="pf-toolbar-row">
          <div className="pf-filter-chips" role="list" aria-label="Filter by type">
            <button type="button" className={`pf-chip ${activeTypeFilter === "all" ? "is-active" : ""}`} onClick={() => setActiveTypeFilter("all")} role="listitem">All Types</button>
            {(Object.keys(typeConfig) as PortfolioType[]).map(type => (
              <button key={type} type="button" className={`pf-chip ${activeTypeFilter === type ? "is-active" : ""}`} onClick={() => setActiveTypeFilter(type)} role="listitem">
                {typeConfig[type].label}
              </button>
            ))}
          </div>

          <div className="pf-toolbar-right">
            <div className="pf-view-toggle">
              <button type="button" className={`pf-view-btn ${viewMode === "grid" ? "is-active" : ""}`} onClick={() => setViewMode("grid")} aria-label="Grid view">
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button type="button" className={`pf-view-btn ${viewMode === "timeline" ? "is-active" : ""}`} onClick={() => setViewMode("timeline")} aria-label="Timeline view">
                <Timer className="h-4 w-4" />
              </button>
            </div>

            <div className="pf-sort-wrap">
              <span className="pf-sort-label"><Filter className="h-4 w-4" /> Sort</span>
              <select title="Sort portfolio items" aria-label="Sort portfolio items" value={sortBy} onChange={e => setSortBy(e.target.value as PortfolioSort)} className="pf-sort-select">
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Form ─── */}
      {showForm && (
        <Card className="pf-form-card">
          <CardHeader className="pf-form-header">
            <CardTitle className="pf-form-title">Add Portfolio Item</CardTitle>
            <p className="pf-form-subtitle">Capture the outcome, attach proof, and keep your story application-ready.</p>
            {/* Form section tabs */}
            <div className="pf-form-tabs">
              <button type="button" className={`pf-form-tab ${formSection === "basic" ? "is-active" : ""}`} onClick={() => setFormSection("basic")}>Basics</button>
              <button type="button" className={`pf-form-tab ${formSection === "details" ? "is-active" : ""}`} onClick={() => setFormSection("details")}>Details</button>
              <button type="button" className={`pf-form-tab ${formSection === "evidence" ? "is-active" : ""}`} onClick={() => setFormSection("evidence")}>Evidence</button>
            </div>
          </CardHeader>

          <CardContent className="pf-form-content">
            <form onSubmit={handleSubmit} className="pf-form-grid">
              {/* ── Section: Basics ── */}
              {formSection === "basic" && (
                <>
                  <div className="pf-field span-2">
                    <label htmlFor="pf-title">Project title</label>
                    <Input id="pf-title" value={draft.title} onChange={e => setDraft(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Climate Change Research Paper" required />
                  </div>
                  <div className="pf-field">
                    <label htmlFor="pf-type">Type</label>
                    <select id="pf-type" value={draft.type} onChange={e => setDraft(p => ({ ...p, type: e.target.value as PortfolioType }))} className="pf-select">
                      {(Object.keys(typeConfig) as PortfolioType[]).map(t => <option key={t} value={t}>{typeConfig[t].label}</option>)}
                    </select>
                  </div>
                  <div className="pf-field">
                    <label htmlFor="pf-status">Status</label>
                    <select id="pf-status" value={draft.status} onChange={e => setDraft(p => ({ ...p, status: e.target.value as PortfolioStatus }))} className="pf-select">
                      <option value="completed">🟢 Completed</option>
                      <option value="in_progress">🔵 In Progress</option>
                      <option value="planning">🟡 Planning</option>
                    </select>
                  </div>
                  <div className="pf-field span-2">
                    <label htmlFor="pf-desc">Description</label>
                    <textarea id="pf-desc" value={draft.description} onChange={e => setDraft(p => ({ ...p, description: e.target.value }))} placeholder="Describe what you built, why it matters, and measurable impact." className="pf-textarea" rows={3} />
                  </div>
                  <div className="pf-field">
                    <label htmlFor="pf-start-date">Start Date</label>
                    <Input id="pf-start-date" type="date" value={draft.startDate} onChange={e => setDraft(p => ({ ...p, startDate: e.target.value }))} />
                  </div>
                  <div className="pf-field">
                    <label htmlFor="pf-major">Aligned Major</label>
                    <select id="pf-major" value={draft.alignedMajor} onChange={e => setDraft(p => ({ ...p, alignedMajor: e.target.value }))} className="pf-select">
                      <option value="">— Select major —</option>
                      {MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </>
              )}

              {/* ── Section: Details ── */}
              {formSection === "details" && (
                <>
                  <div className="pf-field span-2">
                    <label htmlFor="pf-reflection">Why This Matters (Reflection)</label>
                    <textarea id="pf-reflection" value={draft.reflection} onChange={e => setDraft(p => ({ ...p, reflection: e.target.value }))} placeholder="What did you learn? What challenges did you overcome? How does this connect to your goals?" className="pf-textarea" rows={4} />
                    <span className="pf-field-hint">Admissions officers highly value personal reflections.</span>
                  </div>
                  <div className="pf-field span-2">
                    <label>Skills</label>
                    <div className="pf-skills-input-wrap">
                      <Input ref={skillInputRef} value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }} placeholder="Type a skill and press Enter" aria-label="Add skill tag" />
                      <button type="button" className="pf-skill-add-btn" onClick={addSkill}>Add</button>
                    </div>
                    {draft.skills.length > 0 && (
                      <div className="pf-skills-tags">
                        {draft.skills.map(s => (
                          <span key={s} className="pf-skill-tag">
                            {s} <button type="button" onClick={() => removeSkill(s)} aria-label={`Remove ${s}`}><X className="h-3 w-3" /></button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="pf-field span-2">
                    <label htmlFor="pf-collaborators">Collaborators</label>
                    <Input id="pf-collaborators" value={draft.collaborators} onChange={e => setDraft(p => ({ ...p, collaborators: e.target.value }))} placeholder="e.g. Prof. Smith, Jane Doe, CS Club" />
                  </div>

                  {/* Impact metrics */}
                  <div className="pf-field span-2">
                    <button type="button" className="pf-impact-toggle" onClick={() => setShowImpact(!showImpact)}>
                      <TrendingUp className="h-4 w-4" /> Impact Metrics {showImpact ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                    {showImpact && (
                      <div className="pf-impact-fields">
                        <div className="pf-impact-field">
                          <label htmlFor="pf-impact-users">Users / Downloads</label>
                          <Input id="pf-impact-users" type="number" value={draft.impactMetrics.users} onChange={e => setDraft(p => ({ ...p, impactMetrics: { ...p.impactMetrics, users: e.target.value } }))} placeholder="0" />
                        </div>
                        <div className="pf-impact-field">
                          <label htmlFor="pf-impact-raised">Money Raised ($)</label>
                          <Input id="pf-impact-raised" type="number" value={draft.impactMetrics.raised} onChange={e => setDraft(p => ({ ...p, impactMetrics: { ...p.impactMetrics, raised: e.target.value } }))} placeholder="0" />
                        </div>
                        <div className="pf-impact-field">
                          <label htmlFor="pf-impact-hours">Hours Contributed</label>
                          <Input id="pf-impact-hours" type="number" value={draft.impactMetrics.hours} onChange={e => setDraft(p => ({ ...p, impactMetrics: { ...p.impactMetrics, hours: e.target.value } }))} placeholder="0" />
                        </div>
                        <div className="pf-impact-field">
                          <label htmlFor="pf-impact-mentored">People Mentored</label>
                          <Input id="pf-impact-mentored" type="number" value={draft.impactMetrics.mentored} onChange={e => setDraft(p => ({ ...p, impactMetrics: { ...p.impactMetrics, mentored: e.target.value } }))} placeholder="0" />
                        </div>
                        <div className="pf-impact-field">
                          <label htmlFor="pf-impact-awards">Awards Won</label>
                          <Input id="pf-impact-awards" type="number" value={draft.impactMetrics.awards} onChange={e => setDraft(p => ({ ...p, impactMetrics: { ...p.impactMetrics, awards: e.target.value } }))} placeholder="0" />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* ── Section: Evidence ── */}
              {formSection === "evidence" && (
                <>
                  <div className="pf-field span-2">
                    <label htmlFor="pf-link">Link URL</label>
                    <Input id="pf-link" value={draft.linkUrl} onChange={e => setDraft(p => ({ ...p, linkUrl: e.target.value }))} placeholder="https://github.com/your-project" />
                    <span className="pf-field-hint">GitHub, deployed site, published article, YouTube video, etc.</span>
                  </div>
                  <div className="pf-field span-2">
                    <label htmlFor="pf-file">Evidence file (optional)</label>
                    <label className="pf-upload-zone" htmlFor="pf-file">
                      <Upload className="h-5 w-5" />
                      <div>
                        <p>{selectedFile ? selectedFile.name : "Drop file here or click to upload"}</p>
                        <span>PDF, DOCX, ZIP, PNG, JPG</span>
                      </div>
                      <input id="pf-file" name="file" type="file" className="sr-only" accept=".pdf,.doc,.docx,.zip,.png,.jpg" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
                    </label>
                  </div>
                </>
              )}

              {formError && <p className="pf-form-error span-2">{formError}</p>}

              <div className="pf-form-actions span-2">
                <Button type="submit" isLoading={loading}>Save Item</Button>
                <Button type="button" variant="ghost" onClick={resetForm}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* ─── Content: Grid or Timeline ─── */}
      {filteredItems.length === 0 ? (
        <Card className="pf-empty">
          <CardContent className="pf-empty-content">
            <FolderOpen className="h-12 w-12" />
            <h2>{items.length === 0 ? "No portfolio items yet" : "No matching items"}</h2>
            <p>{items.length === 0 ? "Start with a template and add one high-quality project with proof." : "Try a different search term or reset filters."}</p>
            {items.length === 0 ? (
              <Button onClick={() => setShowForm(true)}><Plus className="h-4 w-4" /> Add First Item</Button>
            ) : (
              <Button variant="outline" onClick={() => { setSearchQuery(""); setActiveTypeFilter("all"); }}>Clear Filters</Button>
            )}
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <div className="pf-grid">
          {filteredItems.map(item => renderPortfolioCard(item))}
        </div>
      ) : (
        <div className="pf-timeline">
          {Object.entries(timelineGroups).map(([grade, groupItems]) => (
            <div key={grade} className="pf-timeline-group">
              <div className="pf-timeline-label">{grade}</div>
              <div className="pf-timeline-items">
                {groupItems.map(item => renderPortfolioCard(item, true))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
