"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import type { CSSProperties } from "react";
import { createClient } from "@/lib/supabase/client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Badge } from "@/components/ui/badge";
import {
    PenTool, Plus, Clock, Search, FileText, Hash, Flame, Award,
    Bold, Italic, Heading1, Heading2, List, ListOrdered, Undo, Redo,
    ArrowLeft, X, GripVertical, LayoutGrid, LayoutList, History, Check,
    Quote, Minus, Trash2, Copy, Download, Maximize2,
    Minimize2, Tag, Timer, CheckCircle2, BarChart3,
} from "lucide-react";
import { computeReadability, computeStats, findPassiveVoice, findFillerWords, findCliches, getWordFrequency } from "./writing-analysis";
import "./essays.css";

/* ─── Types ─── */
interface EssayItem {
    id: string;
    title: string;
    content: string;
    version: number;
    status: string;
    word_count: number;
    prompt?: string;
    word_limit?: number;
    sort_order?: number;
    prompt_id?: string;
    tags?: string[];
    writing_time?: number;
    created_at: string;
    updated_at: string;
}

interface VersionItem {
    id: string;
    essay_id: string;
    content: string;
    version: number;
    created_at: string;
}

interface Props {
    initialEssays: EssayItem[];
    userId: string;
    initialVersions: Record<string, VersionItem[]>;
}

/* ─── Status constants ─── */
const STATUSES = ["draft", "in_review", "revised", "final"] as const;
const STATUS_LABELS: Record<string, string> = {
    draft: "Draft",
    in_review: "Review",
    revised: "Revised",
    final: "Final",
};
const statusColors: Record<string, "default" | "info" | "warning" | "success"> = {
    draft: "default",
    in_review: "warning",
    revised: "info",
    final: "success",
};

/* ─── Helpers ─── */
function countWords(text: string) {
    return text.trim().split(/\s+/).filter(Boolean).length;
}

function stripHtml(html: string) {
    if (typeof document !== "undefined") {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    }
    return html.replace(/<[^>]*>/g, "");
}

function getPlainPreview(content: string, len = 120) {
    const plain = stripHtml(content);
    return plain.length > len ? plain.slice(0, len) + "…" : plain;
}

function getWordBarColor(ratio: number) {
    if (ratio < 0.8) return "green";
    if (ratio < 0.95) return "yellow";
    return "red";
}

function getProgressStroke(ratio: number) {
    if (ratio < 0.8) return "#10b981";
    if (ratio < 0.95) return "#f59e0b";
    return "#ef4444";
}

function formatWritingTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m`;
    return `<1m`;
}

const COMMON_TAGS = ['Common App', 'Coalition', 'Why Us', 'Supplemental', 'Short Answer', 'Personal'];

function computeStreak(essays: EssayItem[]): { current: number; best: number } {
    if (essays.length === 0) return { current: 0, best: 0 };
    const dates = new Set(
        essays.map((e) => new Date(e.updated_at).toDateString())
    );
    const sortedDates = Array.from(dates)
        .map((d) => new Date(d))
        .sort((a, b) => b.getTime() - a.getTime());

    let current = 0;
    let best = 0;
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedDates.length; i++) {
        const diff = Math.floor((today.getTime() - sortedDates[i].getTime()) / (1000 * 60 * 60 * 24));
        if (i === 0 && diff > 1) {
            current = 0;
            streak = 1;
        } else if (i === 0) {
            current = 1;
            streak = 1;
        } else {
            const prevDiff = Math.floor(
                (sortedDates[i - 1].getTime() - sortedDates[i].getTime()) / (1000 * 60 * 60 * 24)
            );
            if (prevDiff === 1) {
                streak++;
                if (i === 1 || current > 0) current = streak;
            } else {
                best = Math.max(best, streak);
                streak = 1;
            }
        }
    }
    best = Math.max(best, streak);
    return { current, best };
}

/* ─── Progress Ring SVG ─── */
function ProgressRing({ ratio, size = 40 }: { ratio: number; size?: number }) {
    const r = (size - 6) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ * (1 - Math.min(ratio, 1));
    const pct = Math.min(Math.round(ratio * 100), 999);

    return (
        <div className="essay-progress-ring" data-size={size}>
            <svg width={size} height={size}>
                <circle className="essay-progress-ring-bg" cx={size / 2} cy={size / 2} r={r} />
                <circle
                    className="essay-progress-ring-fill"
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    stroke={getProgressStroke(ratio)}
                    strokeDasharray={circ}
                    strokeDashoffset={offset}
                />
            </svg>
            <span className="essay-progress-ring-text">{pct}%</span>
        </div>
    );
}

/* ─── Empty State SVG Illustration ─── */
function EmptyIllustration() {
    return (
        <svg viewBox="0 0 200 200" fill="none" className="essays-empty-svg">
            {/* Paper */}
            <rect x="50" y="30" width="100" height="130" rx="8" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
            <rect x="50" y="30" width="100" height="130" rx="8" fill="url(#paperGrad)" opacity="0.5" />
            {/* Lines */}
            <line x1="66" y1="60" x2="134" y2="60" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
            <line x1="66" y1="75" x2="120" y2="75" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
            <line x1="66" y1="90" x2="128" y2="90" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
            <line x1="66" y1="105" x2="105" y2="105" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
            {/* Pen */}
            <g transform="translate(120, 100) rotate(30)">
                <rect x="-3" y="-35" width="6" height="50" rx="2" fill="#c9283a" />
                <polygon points="-3,15 3,15 0,22" fill="#374151" />
                <rect x="-3" y="-35" width="6" height="8" rx="1" fill="#a91d2e" />
            </g>
            {/* Sparkle */}
            <circle cx="48" cy="50" r="3" fill="#f59e0b" opacity="0.6">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="155" cy="70" r="2" fill="#c9283a" opacity="0.5">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="142" cy="45" r="2.5" fill="#3b82f6" opacity="0.4">
                <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite" />
            </circle>
            <defs>
                <linearGradient id="paperGrad" x1="50" y1="30" x2="150" y2="160">
                    <stop offset="0%" stopColor="#c9283a" stopOpacity="0.03" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.02" />
                </linearGradient>
            </defs>
        </svg>
    );
}

/* ─── Tiptap Editor Wrapper ─── */
function TiptapEditor({
    content,
    onUpdate,
}: {
    content: string;
    onUpdate: (html: string) => void;
}) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
            }),
        ],
        content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onUpdate(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "tiptap",
            },
        },
    });

    if (!editor) return null;

    return (
        <div className="essay-tiptap-wrap">
            {/* Toolbar */}
            <div className="essay-toolbar">
                <button
                    type="button"
                    className={`essay-toolbar-btn ${editor.isActive("bold") ? "essay-toolbar-btn--active" : ""}`}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    title="Bold"
                >
                    <Bold />
                </button>
                <button
                    type="button"
                    className={`essay-toolbar-btn ${editor.isActive("italic") ? "essay-toolbar-btn--active" : ""}`}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    title="Italic"
                >
                    <Italic />
                </button>
                <div className="essay-toolbar-divider" />
                <button
                    type="button"
                    className={`essay-toolbar-btn ${editor.isActive("heading", { level: 1 }) ? "essay-toolbar-btn--active" : ""}`}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    title="Heading 1"
                >
                    <Heading1 />
                </button>
                <button
                    type="button"
                    className={`essay-toolbar-btn ${editor.isActive("heading", { level: 2 }) ? "essay-toolbar-btn--active" : ""}`}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    title="Heading 2"
                >
                    <Heading2 />
                </button>
                <div className="essay-toolbar-divider" />
                <button
                    type="button"
                    className={`essay-toolbar-btn ${editor.isActive("bulletList") ? "essay-toolbar-btn--active" : ""}`}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    title="Bullet List"
                >
                    <List />
                </button>
                <button
                    type="button"
                    className={`essay-toolbar-btn ${editor.isActive("orderedList") ? "essay-toolbar-btn--active" : ""}`}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    title="Ordered List"
                >
                    <ListOrdered />
                </button>
                <button
                    type="button"
                    className={`essay-toolbar-btn ${editor.isActive("blockquote") ? "essay-toolbar-btn--active" : ""}`}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    title="Quote"
                >
                    <Quote />
                </button>
                <button
                    type="button"
                    className="essay-toolbar-btn"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    title="Horizontal Rule"
                >
                    <Minus />
                </button>
                <div className="essay-toolbar-divider" />
                <button
                    type="button"
                    className="essay-toolbar-btn"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Undo"
                >
                    <Undo />
                </button>
                <button
                    type="button"
                    className="essay-toolbar-btn"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Redo"
                >
                    <Redo />
                </button>
            </div>
            {/* Content */}
            <div className="essay-tiptap-content">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

/* ─── Main Component ─── */
export default function EssaysClient({ initialEssays, userId, initialVersions }: Props) {
    const [essays, setEssays] = useState<EssayItem[]>(initialEssays);
    const [versions, setVersions] = useState<Record<string, VersionItem[]>>(initialVersions);
    const [editingEssay, setEditingEssay] = useState<EssayItem | null>(null);
    const [editorContent, setEditorContent] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showHistory, setShowHistory] = useState(false);
    const [selectedVersion, setSelectedVersion] = useState<VersionItem | null>(null);

    // Drag state
    const [dragIdx, setDragIdx] = useState<number | null>(null);
    const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<EssayItem | null>(null);

    // New feature state
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
    const [focusMode, setFocusMode] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [writingSeconds, setWritingSeconds] = useState(0);
    const [tagInput, setTagInput] = useState('');
    const [showTagPicker, setShowTagPicker] = useState(false);
    const [copyToast, setCopyToast] = useState(false);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const lastSavedContent = useRef(editorContent);
    const writingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Form state
    const [formTitle, setFormTitle] = useState("");
    const [formPrompt, setFormPrompt] = useState("");
    const [formWordLimit, setFormWordLimit] = useState(650);

    const supabase = createClient();

    const filteredEssays = useMemo(
        () => essays.filter((e) => {
            const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
            return matchesSearch && matchesStatus;
        }),
        [essays, searchQuery, statusFilter]
    );

    // Stats
    const totalWords = useMemo(() => essays.reduce((sum, e) => sum + (e.word_count || 0), 0), [essays]);
    const streak = useMemo(() => computeStreak(essays), [essays]);

    /* ─── CRUD ─── */
    async function handleCreateEssay() {
        if (!formTitle.trim()) return;
        setLoading(true);

        const { data, error } = await supabase
            .from("essays")
            .insert({
                user_id: userId,
                title: formTitle,
                content: "",
                word_count: 0,
                version: 1,
                status: "draft",
                prompt: formPrompt,
                word_limit: formWordLimit || 650,
                sort_order: essays.length,
            })
            .select()
            .single();

        if (!error && data) {
            await supabase.from("essay_versions").insert({
                essay_id: data.id,
                content: "",
                version: 1,
            });
            setEssays((prev) => [...prev, data]);
            setVersions((prev) => ({
                ...prev,
                [data.id]: [{ id: crypto.randomUUID(), essay_id: data.id, content: "", version: 1, created_at: new Date().toISOString() }],
            }));
            setShowForm(false);
            setFormTitle("");
            setFormPrompt("");
            setFormWordLimit(650);
            // Open the new essay in editor
            setEditingEssay(data);
            setEditorContent("");
        }
        setLoading(false);
    }

    async function handleSaveEssay() {
        if (!editingEssay) return;
        setLoading(true);

        const plain = stripHtml(editorContent);
        const wordCount = countWords(plain);
        const newVersion = editingEssay.version + 1;

        await supabase
            .from("essays")
            .update({
                content: editorContent,
                word_count: wordCount,
                version: newVersion,
                updated_at: new Date().toISOString(),
                writing_time: writingSeconds,
            })
            .eq("id", editingEssay.id);

        const { data: vData } = await supabase.from("essay_versions").insert({
            essay_id: editingEssay.id,
            content: editorContent,
            version: newVersion,
        }).select().single();

        const updatedEssay = {
            ...editingEssay,
            content: editorContent,
            word_count: wordCount,
            version: newVersion,
            updated_at: new Date().toISOString(),
            writing_time: writingSeconds,
        };

        setEditingEssay(updatedEssay);
        setEssays((prev) =>
            prev.map((e) => (e.id === editingEssay.id ? updatedEssay : e))
        );

        if (vData) {
            setVersions((prev) => ({
                ...prev,
                [editingEssay.id]: [vData, ...(prev[editingEssay.id] || [])],
            }));
        }

        setLoading(false);
    }

    async function handleStatusChange(essayId: string, newStatus: string, e?: React.MouseEvent) {
        if (e) e.stopPropagation();

        await supabase
            .from("essays")
            .update({ status: newStatus, updated_at: new Date().toISOString() })
            .eq("id", essayId);

        setEssays((prev) =>
            prev.map((es) => (es.id === essayId ? { ...es, status: newStatus } : es))
        );

        if (editingEssay?.id === essayId) {
            setEditingEssay((prev) => prev ? { ...prev, status: newStatus } : prev);
        }
    }

    async function handleDeleteEssay(essayId: string, e?: React.MouseEvent) {
        if (e) e.stopPropagation();
        try {
            setLoading(true);
            // Delete essay (versions cascade automatically via ON DELETE CASCADE)
            const { error } = await supabase.from("essays").delete().eq("id", essayId);
            if (error) {
                console.error("Delete essay error:", error);
                alert("Failed to delete essay: " + error.message);
                return;
            }
            setEssays((prev) => prev.filter((es) => es.id !== essayId));
            if (editingEssay?.id === essayId) {
                setEditingEssay(null);
            }
        } catch (err) {
            console.error("Delete essay exception:", err);
            alert("Failed to delete essay");
        } finally {
            setLoading(false);
        }
    }

    /* ─── Drag & Drop ─── */
    function handleDragStart(idx: number) {
        setDragIdx(idx);
    }

    function handleDragOver(e: React.DragEvent, idx: number) {
        e.preventDefault();
        setDragOverIdx(idx);
    }

    function handleDragLeave() {
        setDragOverIdx(null);
    }

    async function handleDrop(idx: number) {
        if (dragIdx === null || dragIdx === idx) {
            setDragIdx(null);
            setDragOverIdx(null);
            return;
        }

        const updated = [...filteredEssays];
        const [moved] = updated.splice(dragIdx, 1);
        updated.splice(idx, 0, moved);

        // Update sort_order
        const reordered = updated.map((e, i) => ({ ...e, sort_order: i }));
        setEssays(reordered);
        setDragIdx(null);
        setDragOverIdx(null);

        // Persist order
        for (const e of reordered) {
            await supabase.from("essays").update({ sort_order: e.sort_order }).eq("id", e.id);
        }
    }

    function handleDragEnd() {
        setDragIdx(null);
        setDragOverIdx(null);
    }

    /* ─── Auto-Save (30s) ─── */
    useEffect(() => {
        if (!editingEssay) return;
        const interval = setInterval(async () => {
            if (editorContent !== lastSavedContent.current && editorContent.length > 0) {
                setSaveStatus('saving');
                const plain = stripHtml(editorContent);
                const wc = countWords(plain);
                await supabase.from("essays").update({
                    content: editorContent,
                    word_count: wc,
                    updated_at: new Date().toISOString(),
                    writing_time: writingSeconds,
                }).eq("id", editingEssay.id);
                lastSavedContent.current = editorContent;
                setEssays(prev => prev.map(e => e.id === editingEssay.id ? { ...e, content: editorContent, word_count: wc, writing_time: writingSeconds } : e));
                setSaveStatus('saved');
                setTimeout(() => setSaveStatus('idle'), 2500);
            }
        }, 30000);
        return () => clearInterval(interval);
    }, [editingEssay, editorContent, writingSeconds, supabase]);

    /* ─── Writing Timer ─── */
    useEffect(() => {
        if (!editingEssay) {
            if (writingTimerRef.current) clearInterval(writingTimerRef.current);
            return;
        }
        setWritingSeconds(editingEssay.writing_time || 0);
        writingTimerRef.current = setInterval(() => {
            setWritingSeconds(s => s + 1);
        }, 1000);
        return () => {
            if (writingTimerRef.current) clearInterval(writingTimerRef.current);
        };
    }, [editingEssay]);

    /* ─── Focus Mode (Escape key) ─── */

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape' && focusMode) setFocusMode(false);
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [focusMode]);

    /* ─── Export & Copy ─── */
    function handleCopyPlainText() {
        const plain = stripHtml(editorContent);
        navigator.clipboard.writeText(plain).then(() => {
            setCopyToast(true);
            setTimeout(() => setCopyToast(false), 2000);
        });
    }

    function handleExportPdf() {
        if (!editingEssay) return;
        const printWin = window.open('', '_blank');
        if (printWin) {
            printWin.document.write(`<!DOCTYPE html><html><head><title>${editingEssay.title}</title><style>body{font-family:Georgia,"Times New Roman",serif;max-width:680px;margin:40px auto;padding:20px;line-height:1.8;color:#1a1a1a;font-size:12pt}h1{font-size:1.3em;margin-bottom:0.3em;border-bottom:1px solid #ddd;padding-bottom:8px}.meta{font-size:0.85em;color:#666;margin-bottom:1.5em}p{margin:0.5em 0}</style></head><body><h1>${editingEssay.title}</h1><div class="meta">${countWords(stripHtml(editorContent))} words · ${new Date().toLocaleDateString()}</div>${editorContent}<script>setTimeout(()=>{window.print();window.close()},300)<\/script></body></html>`);
            printWin.document.close();
        }
    }

    /* ─── Tag Management ─── */
    async function handleAddTag(tag: string) {
        if (!editingEssay || !tag.trim()) return;
        const currentTags = editingEssay.tags || [];
        if (currentTags.includes(tag.trim())) return;
        const newTags = [...currentTags, tag.trim()];
        await supabase.from("essays").update({ tags: newTags }).eq("id", editingEssay.id);
        const updated = { ...editingEssay, tags: newTags };
        setEditingEssay(updated);
        setEssays(prev => prev.map(e => e.id === editingEssay.id ? updated : e));
        setTagInput('');
    }

    async function handleRemoveTag(tag: string) {
        if (!editingEssay) return;
        const newTags = (editingEssay.tags || []).filter(t => t !== tag);
        await supabase.from("essays").update({ tags: newTags }).eq("id", editingEssay.id);
        const updated = { ...editingEssay, tags: newTags };
        setEditingEssay(updated);
        setEssays(prev => prev.map(e => e.id === editingEssay.id ? updated : e));
    }

    /* ─── Open editor ─── */
    function openEditor(essay: EssayItem) {
        setEditingEssay(essay);
        setEditorContent(essay.content || "");
        lastSavedContent.current = essay.content || "";
        setShowHistory(false);
        setSelectedVersion(null);
        setSaveStatus('idle');
        setShowTagPicker(false);
    }

    /* ─── Editor View ─── */
    if (editingEssay) {
        const plain = stripHtml(editorContent);
        const currentWords = countWords(plain);
        const wordLimit = editingEssay.word_limit || 650;
        const ratio = wordLimit > 0 ? currentWords / wordLimit : 0;
        const barColor = getWordBarColor(ratio);
        const essayVersions = versions[editingEssay.id] || [];

        // Analysis data (computed on each render — fast for essay-length text)
        const stats = computeStats(plain);
        const readability = computeReadability(plain);
        const passiveVoice = findPassiveVoice(plain);
        const fillerWords = findFillerWords(plain);
        const cliches = findCliches(plain);
        const wordFreq = getWordFrequency(plain);
        const totalIssues = passiveVoice.length + fillerWords.length + cliches.length;
        const currentStatusIdx = STATUSES.indexOf(editingEssay.status as typeof STATUSES[number]);

        return (
            <div className={focusMode ? "essay-focus-mode" : ""}>
                {/* Top bar */}
                <div className="essay-editor-topbar">
                    <div className="essay-editor-topbar-left">
                        <button
                            className="essay-editor-back"
                            onClick={() => {
                                // Save writing time before leaving
                                if (writingSeconds > 0) {
                                    supabase.from("essays").update({ writing_time: writingSeconds }).eq("id", editingEssay.id);
                                }
                                setEditingEssay(null);
                                setShowHistory(false);
                                setFocusMode(false);
                            }}
                        >
                            <ArrowLeft /> Back
                        </button>
                        <div>
                            <h2 className="essay-editor-title">
                                {editingEssay.title}
                            </h2>
                            <div className="essay-editor-meta">
                                <Badge variant={statusColors[editingEssay.status]}>{STATUS_LABELS[editingEssay.status] || editingEssay.status}</Badge>
                                <span className="essay-editor-meta-version">v{editingEssay.version}</span>
                                <span className="essay-editor-timer"><Timer /> {formatWritingTime(writingSeconds)}</span>
                                {saveStatus === 'saving' && <span className="essay-autosave essay-autosave--saving">Saving…</span>}
                                {saveStatus === 'saved' && <span className="essay-autosave essay-autosave--saved"><CheckCircle2 /> Saved</span>}
                            </div>
                        </div>
                    </div>
                    <div className="essay-editor-topbar-right">
                        <button className="essay-editor-action-btn" onClick={handleCopyPlainText} title="Copy as plain text">
                            <Copy /> {copyToast ? "Copied!" : "Copy"}
                        </button>
                        <button className="essay-editor-action-btn" onClick={handleExportPdf} title="Export as PDF">
                            <Download /> PDF
                        </button>
                        <button
                            className={`essay-editor-action-btn ${focusMode ? "essay-editor-action-btn--active" : ""}`}
                            onClick={() => setFocusMode(!focusMode)}
                            title={focusMode ? "Exit focus mode (Esc)" : "Enter focus mode"}
                        >
                            {focusMode ? <Minimize2 /> : <Maximize2 />} {focusMode ? "Exit" : "Focus"}
                        </button>
                        <button
                            className={`essay-editor-action-btn ${showAnalysis ? "essay-editor-action-btn--active" : ""}`}
                            onClick={() => { setShowAnalysis(!showAnalysis); if (!showAnalysis) setShowHistory(false); }}
                            title="Writing analysis"
                        >
                            <BarChart3 /> Analyze {totalIssues > 0 && <span className="essay-analyze-badge">{totalIssues}</span>}
                        </button>
                        <button
                            className={`essay-editor-history-btn ${showHistory ? "essay-editor-history-btn--active" : ""}`}
                            onClick={() => { setShowHistory(!showHistory); if (!showHistory) setShowAnalysis(false); }}
                        >
                            <History />
                            {showHistory ? "Hide" : "History"}
                        </button>
                        <button className="essay-editor-save-btn" onClick={handleSaveEssay} disabled={loading}>
                            Save v{editingEssay.version + 1}
                        </button>
                    </div>
                </div>

                {/* Tags Section */}
                <div className="essay-tags-section">
                    <div className="essay-tags-list">
                        <Tag className="essay-tags-icon" />
                        {(editingEssay.tags || []).map(tag => (
                            <span key={tag} className="essay-tag-chip">
                                {tag}
                                <button onClick={() => handleRemoveTag(tag)} className="essay-tag-remove" title={`Remove ${tag}`} aria-label={`Remove ${tag}`}><X /></button>
                            </span>
                        ))}
                        {showTagPicker ? (
                            <div className="essay-tag-input-wrap">
                                <div className="essay-tag-input-row">
                                    <input
                                        className="essay-tag-input"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter') handleAddTag(tagInput); if (e.key === 'Escape') setShowTagPicker(false); }}
                                        onBlur={() => setTimeout(() => setShowTagPicker(false), 200)}
                                        placeholder="Type tag…"
                                        autoFocus
                                    />
                                    <button
                                        className="essay-tag-close"
                                        onClick={() => setShowTagPicker(false)}
                                        title="Close"
                                        aria-label="Close tag picker"
                                    >
                                        <X />
                                    </button>
                                </div>
                                <div className="essay-tag-suggestions">
                                    {COMMON_TAGS.filter(t => !(editingEssay.tags || []).includes(t)).map(t => (
                                        <button key={t} className="essay-tag-suggestion" onClick={() => handleAddTag(t)}>{t}</button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <button className="essay-tag-add" onClick={() => setShowTagPicker(true)}>+ Add Tag</button>
                        )}
                    </div>
                </div>

                {/* Prompt card */}
                {editingEssay.prompt && (
                    <div className="essay-prompt-card">
                        <div className="essay-prompt-label">Your Prompt</div>
                        <div className="essay-prompt-text">{editingEssay.prompt}</div>
                    </div>
                )}

                {/* Editor + History layout */}
                <div className="essay-editor-layout">
                    <div className="essay-editor-main">
                        {/* Tiptap Editor */}
                        <TiptapEditor
                            content={editorContent}
                            onUpdate={setEditorContent}
                        />

                        {/* Word limit bar */}
                        <div className="essay-word-bar">
                            <div className="essay-word-bar-track">
                                <div
                                    className={`essay-word-bar-fill essay-word-bar-fill--${barColor}`}
                                    data-progress={Math.round(Math.min(ratio * 100, 100))}
                                />
                            </div>
                            <div className="essay-word-bar-label">
                                <strong>{currentWords}</strong> / {wordLimit} words
                            </div>
                        </div>

                        {/* Status pipeline */}
                        <div className="essay-status-pipeline">
                            {STATUSES.map((status, i) => (
                                <div key={status} className="essay-status-step">
                                    <div
                                        role="button"
                                        tabIndex={0}
                                        className={`essay-status-dot ${i === currentStatusIdx
                                            ? "essay-status-dot--active"
                                            : i < currentStatusIdx
                                                ? "essay-status-dot--completed"
                                                : ""
                                            }`}
                                        onClick={() => handleStatusChange(editingEssay.id, status)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                handleStatusChange(editingEssay.id, status);
                                            }
                                        }}
                                        title={STATUS_LABELS[status]}
                                        aria-label={`Mark as ${STATUS_LABELS[status]}`}
                                    >
                                        {i < currentStatusIdx ? (
                                            <Check className="essay-check-icon" />
                                        ) : (
                                            i + 1
                                        )}
                                        <span className="essay-status-label">{STATUS_LABELS[status]}</span>
                                    </div>
                                    {i < STATUSES.length - 1 && (
                                        <div
                                            className={`essay-status-line ${i < currentStatusIdx ? "essay-status-line--completed" : ""
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Version History Panel */}
                    {/* Writing Analysis Panel */}
                    {showAnalysis && (
                        <div className="essay-analysis-panel">
                            <div className="essay-analysis-header">
                                <h3>Writing Analysis</h3>
                                <button className="essay-history-close" onClick={() => setShowAnalysis(false)} aria-label="Close analysis">
                                    <X />
                                </button>
                            </div>

                            {/* Stats Grid */}
                            <div className="essay-analysis-stats">
                                <div className="essay-analysis-stat">
                                    <span className="essay-analysis-stat-value">{stats.words}</span>
                                    <span className="essay-analysis-stat-label">Words</span>
                                </div>
                                <div className="essay-analysis-stat">
                                    <span className="essay-analysis-stat-value">{stats.characters}</span>
                                    <span className="essay-analysis-stat-label">Characters</span>
                                </div>
                                <div className="essay-analysis-stat">
                                    <span className="essay-analysis-stat-value">{stats.sentences}</span>
                                    <span className="essay-analysis-stat-label">Sentences</span>
                                </div>
                                <div className="essay-analysis-stat">
                                    <span className="essay-analysis-stat-value">{stats.avgSentenceLen}</span>
                                    <span className="essay-analysis-stat-label">Avg Length</span>
                                </div>
                                <div className="essay-analysis-stat">
                                    <span className="essay-analysis-stat-value">{stats.readingTime}m</span>
                                    <span className="essay-analysis-stat-label">Read Time</span>
                                </div>
                                <div className="essay-analysis-stat">
                                    <span className="essay-analysis-stat-value">{stats.paragraphs}</span>
                                    <span className="essay-analysis-stat-label">Paragraphs</span>
                                </div>
                            </div>

                            {/* Readability Gauge */}
                            <div className="essay-readability-section">
                                <h4>Readability</h4>
                                <div className="essay-readability-gauge">
                                    <svg viewBox="0 0 120 70" className="essay-gauge-svg">
                                        <path d="M 10 65 A 50 50 0 0 1 110 65" fill="none" stroke="#e5e7eb" strokeWidth="8" strokeLinecap="round" />
                                        <path
                                            d="M 10 65 A 50 50 0 0 1 110 65"
                                            fill="none"
                                            stroke={readability.grade <= 8 ? '#10b981' : readability.grade <= 12 ? '#f59e0b' : '#ef4444'}
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            strokeDasharray={`${Math.min(readability.score, 100) * 1.57} 157`}
                                        />
                                    </svg>
                                    <div className="essay-gauge-label">
                                        <span className="essay-gauge-score">{readability.grade}</span>
                                        <span className="essay-gauge-level">{readability.level}</span>
                                    </div>
                                </div>
                                <p className="essay-readability-hint">
                                    {readability.grade <= 10
                                        ? '✅ Great! Aim for 8th–10th grade for essays.'
                                        : '⚠️ Consider simplifying — aim for 8th–10th grade.'}
                                </p>
                            </div>

                            {/* Issues */}
                            <div className="essay-issues-section">
                                <h4>Issues ({totalIssues})</h4>

                                {passiveVoice.length > 0 && (
                                    <div className="essay-issue-group">
                                        <div className="essay-issue-group-header essay-issue-group--passive">
                                            <span className="essay-issue-dot essay-issue-dot--passive" />
                                            Passive Voice ({passiveVoice.length})
                                        </div>
                                        {passiveVoice.slice(0, 5).map((pv, i) => (
                                            <div key={i} className="essay-issue-item">
                                                <span className="essay-issue-match">{pv.match}</span>
                                                <span className="essay-issue-context">{pv.context}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {fillerWords.length > 0 && (
                                    <div className="essay-issue-group">
                                        <div className="essay-issue-group-header essay-issue-group--filler">
                                            <span className="essay-issue-dot essay-issue-dot--filler" />
                                            Filler Words ({fillerWords.reduce((s, f) => s + f.count, 0)})
                                        </div>
                                        {fillerWords.map(fw => (
                                            <div key={fw.word} className="essay-issue-item">
                                                <span className="essay-issue-match">&ldquo;{fw.word}&rdquo;</span>
                                                <span className="essay-issue-count">×{fw.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {cliches.length > 0 && (
                                    <div className="essay-issue-group">
                                        <div className="essay-issue-group-header essay-issue-group--cliche">
                                            <span className="essay-issue-dot essay-issue-dot--cliche" />
                                            Clichés ({cliches.length})
                                        </div>
                                        {cliches.map(c => (
                                            <div key={c} className="essay-issue-item">
                                                <span className="essay-issue-match">&ldquo;{c}&rdquo;</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {totalIssues === 0 && (
                                    <p className="essay-no-issues">✨ No issues found — nice writing!</p>
                                )}
                            </div>

                            {/* Repeated Word Cloud */}
                            {wordFreq.length > 0 && (
                                <div className="essay-wordcloud-section">
                                    <h4>Most Used Words</h4>
                                    <div className="essay-word-cloud">
                                        {wordFreq.map((w, i) => (
                                            <span
                                                key={w.word}
                                                className="essay-word-bubble"
                                                data-index={i}
                                                data-count={w.count}
                                            >
                                                {w.word} <sup>{w.count}</sup>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {showHistory && (
                        <div className="essay-history-panel">
                            <div className="essay-history-header">
                                <h3>Version History</h3>
                                <button className="essay-history-close" onClick={() => setShowHistory(false)} aria-label="Close history">
                                    <X />
                                </button>
                            </div>
                            <div className="essay-timeline">
                                {essayVersions.map((v, i) => {
                                    const prevV = essayVersions[i + 1];
                                    const words = countWords(stripHtml(v.content));
                                    const prevWords = prevV ? countWords(stripHtml(prevV.content)) : 0;
                                    const delta = words - prevWords;

                                    return (
                                        <div
                                            key={v.id || v.version}
                                            className="essay-timeline-item"
                                            onClick={() => setSelectedVersion(v)}
                                        >
                                            <div
                                                className={`essay-timeline-dot ${selectedVersion?.version === v.version ? "essay-timeline-dot--active" : ""
                                                    }`}
                                            />
                                            <div className="essay-timeline-version">
                                                Version {v.version}
                                                {delta !== 0 && (
                                                    <span
                                                        className={`essay-timeline-delta ${delta > 0 ? "essay-timeline-delta--up" : "essay-timeline-delta--down"
                                                            }`}
                                                    >
                                                        {delta > 0 ? "+" : ""}{delta}w
                                                    </span>
                                                )}
                                            </div>
                                            <div className="essay-timeline-date">
                                                {new Date(v.created_at).toLocaleDateString(undefined, {
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                                {" · "}{words} words
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Selected version preview */}
                            {selectedVersion && (
                                <div className="essay-history-preview">
                                    <h4>Version {selectedVersion.version} Preview</h4>
                                    <div className="essay-history-preview-content">
                                        {stripHtml(selectedVersion.content || "Empty")}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    /* ─── List View ─── */
    return (
        <div>
            {/* Header */}
            <div className="essays-header">
                <div className="essays-header-left">
                    <h1>Essays</h1>
                    <p>Draft, revise, and perfect your application essays</p>
                </div>
                <button className="essays-header-btn" onClick={() => setShowForm(true)}>
                    <Plus /> New Essay
                </button>
            </div>

            {/* Stats */}
            <div className="essays-stats">
                <div className="essays-stat-card essays-stat-card--red">
                    <div className="essays-stat-top">
                        <div className="essays-stat-icon essays-stat-icon--red"><FileText /></div>
                    </div>
                    <div className="essays-stat-value">{essays.length}</div>
                    <div className="essays-stat-label">Total Essays</div>
                </div>
                <div className="essays-stat-card essays-stat-card--blue">
                    <div className="essays-stat-top">
                        <div className="essays-stat-icon essays-stat-icon--blue"><Hash /></div>
                    </div>
                    <div className="essays-stat-value">{totalWords.toLocaleString()}</div>
                    <div className="essays-stat-label">Total Words</div>
                </div>
                <div className="essays-stat-card essays-stat-card--amber">
                    <div className="essays-stat-top">
                        <div className="essays-stat-icon essays-stat-icon--amber"><Flame /></div>
                    </div>
                    <div className="essays-stat-value">{streak.current}</div>
                    <div className="essays-stat-label">Day Streak</div>
                </div>
                <div className="essays-stat-card essays-stat-card--green">
                    <div className="essays-stat-top">
                        <div className="essays-stat-icon essays-stat-icon--green"><Award /></div>
                    </div>
                    <div className="essays-stat-value">{streak.best}</div>
                    <div className="essays-stat-label">Best Streak</div>
                </div>
            </div>

            {/* Search + View Toggle */}
            {essays.length > 0 && (
                <div className="essays-controls">
                    <div className="essays-search">
                        <Search className="essays-search-icon" />
                        <input
                            type="text"
                            placeholder="Search essays..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="essays-search-input"
                            aria-label="Search essays"
                        />
                    </div>
                    <div className="essays-view-toggle">
                        <button
                            className={`essays-view-btn ${viewMode === "grid" ? "essays-view-btn--active" : ""}`}
                            onClick={() => setViewMode("grid")}
                            title="Grid view"
                        >
                            <LayoutGrid />
                        </button>
                        <button
                            className={`essays-view-btn ${viewMode === "list" ? "essays-view-btn--active" : ""}`}
                            onClick={() => setViewMode("list")}
                            title="List view"
                        >
                            <LayoutList />
                        </button>
                    </div>
                </div>
            )}

            {/* Status Filters */}
            {essays.length > 0 && (
                <div className="essays-status-filters">
                    <button
                        className={`essays-filter-chip ${statusFilter === 'all' ? 'essays-filter-chip--active' : ''}`}
                        onClick={() => setStatusFilter('all')}
                    >
                        All ({essays.length})
                    </button>
                    {STATUSES.map(status => {
                        const count = essays.filter(e => e.status === status).length;
                        return (
                            <button
                                key={status}
                                className={`essays-filter-chip essays-filter-chip--${status} ${statusFilter === status ? 'essays-filter-chip--active' : ''}`}
                                onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)}
                            >
                                {STATUS_LABELS[status]} ({count})
                            </button>
                        );
                    })}
                </div>
            )}

            {/* New Essay Modal */}
            {showForm && (
                <div className="essay-form-overlay" onClick={() => setShowForm(false)}>
                    <div className="essay-form-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="essay-form-header">
                            <h2>Create New Essay</h2>
                            <button className="essay-form-close" onClick={() => setShowForm(false)} aria-label="Close">
                                <X />
                            </button>
                        </div>
                        <div className="essay-form-body">
                            <div className="essay-form-group">
                                <label htmlFor="essay-title">Essay Title</label>
                                <input
                                    id="essay-title"
                                    type="text"
                                    placeholder="e.g., Common App Personal Statement"
                                    value={formTitle}
                                    onChange={(e) => setFormTitle(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <div className="essay-form-group">
                                <label htmlFor="essay-prompt">Prompt (optional)</label>
                                <textarea
                                    id="essay-prompt"
                                    placeholder="Paste or write your essay prompt here..."
                                    value={formPrompt}
                                    onChange={(e) => setFormPrompt(e.target.value)}
                                />
                            </div>
                            <div className="essay-form-group">
                                <label htmlFor="essay-word-limit">Word Limit</label>
                                <input
                                    id="essay-word-limit"
                                    type="number"
                                    value={formWordLimit}
                                    onChange={(e) => setFormWordLimit(parseInt(e.target.value) || 650)}
                                    min={1}
                                    placeholder="650"
                                />
                            </div>
                            <div className="essay-form-actions">
                                <button
                                    className="essay-form-submit"
                                    onClick={handleCreateEssay}
                                    disabled={loading || !formTitle.trim()}
                                >
                                    <Plus /> Create & Start Writing
                                </button>
                                <button className="essay-form-cancel" onClick={() => setShowForm(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {essays.length === 0 && !showForm ? (
                <div className="essays-empty">
                    <div className="essays-empty-illustration">
                        <EmptyIllustration />
                        <div className="essays-empty-glow" />
                    </div>
                    <h3>Start Your First Essay</h3>
                    <p>
                        Create your personal statement, supplemental essays, or any college application writing.
                        We&apos;ll help you track your progress and versions.
                    </p>
                    <button className="essays-empty-btn" onClick={() => setShowForm(true)}>
                        <PenTool /> Begin Writing
                    </button>
                </div>
            ) : filteredEssays.length === 0 && searchQuery ? (
                <div className="essays-no-results">
                    <div className="essays-no-results-icon"><Search /></div>
                    <h3>No essays match &ldquo;{searchQuery}&rdquo;</h3>
                    <p>Try a different search term</p>
                </div>
            ) : (
                /* Essay cards */
                <div className={viewMode === "grid" ? "essays-grid" : "essays-list"}>
                    {filteredEssays.map((essay, idx) => {
                        const wordLimit = essay.word_limit || 650;
                        const ratio = wordLimit > 0 ? (essay.word_count || 0) / wordLimit : 0;
                        const currentStatusIdx = STATUSES.indexOf(essay.status as typeof STATUSES[number]);

                        return (
                            <div
                                key={essay.id}
                                className={`essay-card ${dragIdx === idx ? "dragging" : ""} ${dragOverIdx === idx ? "drag-over" : ""}`}
                                draggable
                                onDragStart={() => handleDragStart(idx)}
                                onDragOver={(e) => handleDragOver(e, idx)}
                                onDragLeave={handleDragLeave}
                                onDrop={() => handleDrop(idx)}
                                onDragEnd={handleDragEnd}
                                onClick={() => openEditor(essay)}
                            >
                                {/* Drag Handle */}
                                <div
                                    className="essay-card-drag-handle"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <GripVertical />
                                </div>

                                {/* Delete Button */}
                                <button
                                    className="essay-card-delete"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        setDeleteTarget(essay);
                                    }}
                                    title="Delete essay"
                                    aria-label="Delete essay"
                                >
                                    <Trash2 />
                                </button>

                                <div className="essay-card-body">
                                    <div className="essay-card-header">
                                        <div className="essay-card-title-wrap">
                                            <div className="essay-card-title">{essay.title}</div>
                                            {essay.content && (
                                                <div className="essay-card-preview">
                                                    {getPlainPreview(essay.content)}
                                                </div>
                                            )}
                                        </div>
                                        <ProgressRing ratio={ratio} size={44} />
                                    </div>

                                    <div className="essay-card-meta">
                                        <span className="essay-card-meta-item">
                                            <Hash /> {essay.word_count || 0} / {wordLimit}w
                                        </span>
                                        <span className="essay-card-meta-item">
                                            v{essay.version}
                                        </span>
                                        <span className="essay-card-meta-item">
                                            <Clock /> {new Date(essay.updated_at).toLocaleDateString()}
                                        </span>
                                        {(essay.writing_time || 0) > 0 && (
                                            <span className="essay-card-meta-item">
                                                <Timer /> {formatWritingTime(essay.writing_time || 0)}
                                            </span>
                                        )}
                                    </div>
                                    {/* Tag chips on card */}
                                    {(essay.tags || []).length > 0 && (
                                        <div className="essay-card-tags">
                                            {(essay.tags || []).map(tag => (
                                                <span key={tag} className="essay-card-tag">{tag}</span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Status pipeline */}
                                    <div className="essay-status-pipeline">
                                        {STATUSES.map((status, i) => (
                                            <div key={status} className="essay-status-step">
                                                <div
                                                    className={`essay-status-dot ${i === currentStatusIdx
                                                        ? "essay-status-dot--active"
                                                        : i < currentStatusIdx
                                                            ? "essay-status-dot--completed"
                                                            : ""
                                                        }`}
                                                    onClick={(e) => handleStatusChange(essay.id, status, e)}
                                                    title={STATUS_LABELS[status]}
                                                >
                                                    {i < currentStatusIdx ? (
                                                        <Check />
                                                    ) : (
                                                        i + 1
                                                    )}
                                                    <span className="essay-status-label">{STATUS_LABELS[status]}</span>
                                                </div>
                                                {i < STATUSES.length - 1 && (
                                                    <div
                                                        className={`essay-status-line ${i < currentStatusIdx ? "essay-status-line--completed" : ""
                                                            }`}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteTarget && (
                <div className="essay-form-overlay" onClick={() => setDeleteTarget(null)}>
                    <div className="essay-delete-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="essay-delete-icon">
                            <Trash2 />
                        </div>
                        <h3>Delete Essay</h3>
                        <p>Are you sure you want to delete <strong>&ldquo;{deleteTarget.title}&rdquo;</strong>? This action cannot be undone.</p>
                        <div className="essay-delete-actions">
                            <button className="essay-form-cancel" onClick={() => setDeleteTarget(null)}>
                                Cancel
                            </button>
                            <button
                                className="essay-delete-confirm"
                                onClick={async () => {
                                    const id = deleteTarget.id;
                                    setDeleteTarget(null);
                                    await handleDeleteEssay(id);
                                }}
                            >
                                <Trash2 /> Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
