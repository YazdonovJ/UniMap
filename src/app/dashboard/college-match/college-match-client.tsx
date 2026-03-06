"use client";

import { useDeferredValue, useMemo, useState, type CSSProperties } from "react";
import { createClient } from "@/lib/supabase/client";
import {
    ArrowUpRight,
    GraduationCap,
    MapPin,
    Plus,
    Search,
    ShieldCheck,
    Sparkles,
    Trash2,
} from "lucide-react";
import type { CollegeListEntry, MatchCategory, University } from "@/types";
import { HARDCODED_UNIVERSITIES } from "@/data/universities";
import "./college-match.css";

type Region = "USA" | "Europe" | "Middle East" | "Asia";
type CollegeListWithUniversity = CollegeListEntry & { universities: University };

interface CollegeMatchProps {
    universities: University[];
    initialList: CollegeListWithUniversity[];
    userId: string;
    academicProfile: { sat_score?: number; gpa_converted?: number } | null;
}

type SelectivityTone = "critical" | "balanced" | "open";

function getSelectivity(rate: number | undefined | null): { tone: SelectivityTone; label: string; helper: string } {
    if (rate == null) return { tone: "open", label: "Open Profile", helper: "No public acceptance rate" };
    if (rate < 15) return { tone: "critical", label: "Highly Selective", helper: "< 15% acceptance rate" };
    if (rate <= 25) return { tone: "balanced", label: "Selective", helper: "15% - 25% acceptance rate" };
    return { tone: "open", label: "Accessible", helper: "> 25% acceptance rate" };
}

const regionMeta: Record<Region, { emoji: string; subtitle: string }> = {
    USA: { emoji: "🇺🇸", subtitle: "Top private + public mix" },
    Europe: { emoji: "🇪🇺", subtitle: "Research-first ecosystems" },
    "Middle East": { emoji: "🌍", subtitle: "High-scholarship campuses" },
    Asia: { emoji: "🌏", subtitle: "Global-tech growth hubs" },
};
const REGION_ORDER: Region[] = ["USA", "Europe", "Middle East", "Asia"];

const statusOptions: Array<{ value: CollegeListEntry["application_status"]; label: string }> = [
    { value: "not_started", label: "Not Started" },
    { value: "in_progress", label: "In Progress" },
    { value: "submitted", label: "Submitted" },
    { value: "waitlisted", label: "Waitlisted" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
];

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default function CollegeMatchClient({ universities, initialList, userId, academicProfile }: CollegeMatchProps) {
    const [collegeList, setCollegeList] = useState<CollegeListWithUniversity[]>(initialList);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterAid, setFilterAid] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState<Region>("USA");
    const supabase = createClient();
    const deferredSearchTerm = useDeferredValue(searchTerm);
    const deferredFilterAid = useDeferredValue(filterAid);
    const deferredRegion = useDeferredValue(selectedRegion);
    const activeRegionIndex = REGION_ORDER.indexOf(selectedRegion);
    const isFiltering = deferredSearchTerm !== searchTerm || deferredFilterAid !== filterAid || deferredRegion !== selectedRegion;

    const allUniversities = useMemo(() => {
        return [
            ...universities,
            ...HARDCODED_UNIVERSITIES.filter((candidate) => !universities.some((uni) => uni.id === candidate.id || uni.name === candidate.name)),
        ];
    }, [universities]);

    const regionCounts = useMemo(() => {
        const counts: Record<Region, number> = { USA: 0, Europe: 0, "Middle East": 0, Asia: 0 };
        allUniversities.forEach((uni) => {
            counts[uni.region] += 1;
        });
        return counts;
    }, [allUniversities]);

    const filteredUniversities = useMemo(() => {
        return allUniversities
            .filter((uni) => {
                const matchesRegion = uni.region === deferredRegion;
                const normalizedQuery = deferredSearchTerm.trim().toLowerCase();
                const matchesSearch = normalizedQuery.length === 0
                    || uni.name.toLowerCase().includes(normalizedQuery)
                    || uni.culture_tags?.some((tag) => tag.toLowerCase().includes(normalizedQuery))
                    || uni.strong_majors?.some((major) => major.toLowerCase().includes(normalizedQuery));
                const matchesAid = !deferredFilterAid || uni.financial_aid_intl;
                const notInList = !collegeList.some((entry) => entry.university_id === uni.id || entry.universities?.name === uni.name);
                return matchesRegion && matchesSearch && matchesAid && notInList;
            })
            .sort((a, b) => {
                const rateA = a.acceptance_rate ?? 1000;
                const rateB = b.acceptance_rate ?? 1000;
                return rateA - rateB;
            });
    }, [allUniversities, deferredRegion, deferredSearchTerm, deferredFilterAid, collegeList]);

    const profileStats = useMemo(() => {
        const stats: Array<{ label: string; value: string }> = [];
        if (academicProfile?.sat_score) {
            stats.push({ label: "Your SAT", value: `${academicProfile.sat_score}` });
        }
        if (academicProfile?.gpa_converted) {
            stats.push({ label: "Your GPA (4.0)", value: academicProfile.gpa_converted.toFixed(2) });
        }
        return stats;
    }, [academicProfile]);

    function buildUniversityInsertPayload(university: University) {
        const rate = Number.isFinite(university.acceptance_rate) ? university.acceptance_rate : null;
        return {
            name: university.name,
            location: university.location || null,
            country: university.country || "US",
            acceptance_rate: rate,
            avg_sat: university.avg_sat ?? null,
            avg_act: university.avg_act ?? null,
            avg_gpa: university.avg_gpa ?? null,
            financial_aid_intl: !!university.financial_aid_intl,
            need_blind_intl: !!university.need_blind_intl,
            culture_tags: university.culture_tags || [],
            strong_majors: university.strong_majors || [],
            application_deadlines: university.application_deadlines || {},
            website_url: university.website_url || null,
            logo_url: university.logo_url || null,
        };
    }

    async function resolveUniversityId(university: University) {
        if (UUID_PATTERN.test(university.id)) return university.id;

        const existingByName = await supabase
            .from("universities")
            .select("id")
            .eq("name", university.name)
            .eq("country", university.country)
            .limit(1)
            .maybeSingle();

        if (existingByName.data?.id) return existingByName.data.id;

        const payload = buildUniversityInsertPayload(university);

        const attemptWithRegion = await supabase
            .from("universities")
            .insert({ ...payload, region: university.region } as typeof payload & { region: Region })
            .select("id")
            .single();

        if (!attemptWithRegion.error && attemptWithRegion.data?.id) return attemptWithRegion.data.id;

        const attemptWithoutRegion = await supabase
            .from("universities")
            .insert(payload)
            .select("id")
            .single();

        if (!attemptWithoutRegion.error && attemptWithoutRegion.data?.id) return attemptWithoutRegion.data.id;

        const fallbackByName = await supabase
            .from("universities")
            .select("id")
            .eq("name", university.name)
            .eq("country", university.country)
            .limit(1)
            .maybeSingle();

        if (fallbackByName.data?.id) return fallbackByName.data.id;

        throw new Error(
            attemptWithoutRegion.error?.message
            || attemptWithRegion.error?.message
            || "Unable to resolve university id for add-to-list.",
        );
    }

    async function addToList(university: University) {
        if (collegeList.some((entry) => entry.university_id === university.id || entry.universities?.name === university.name)) return;

        const category: MatchCategory = university.acceptance_rate
            ? university.acceptance_rate < 15
                ? "reach"
                : university.acceptance_rate <= 25
                    ? "target"
                    : "safety"
            : "target";
        const score = university.acceptance_rate ? Math.max(1, Math.round(100 - university.acceptance_rate)) : 50;

        try {
            const resolvedUniversityId = await resolveUniversityId(university);

            const { data, error } = await supabase
                .from("college_list")
                .insert({
                    user_id: userId,
                    university_id: resolvedUniversityId,
                    match_category: category,
                    probability_score: score,
                    application_status: "not_started",
                })
                .select("*, universities(*)")
                .single();

            if (error) {
                if (error.code === "23505") {
                    const existing = await supabase
                        .from("college_list")
                        .select("*, universities(*)")
                        .eq("user_id", userId)
                        .eq("university_id", resolvedUniversityId)
                        .limit(1)
                        .maybeSingle();

                    if (existing.data) {
                        setCollegeList((prev) => prev.some((entry) => entry.id === existing.data.id) ? prev : [...prev, existing.data as CollegeListWithUniversity]);
                    }
                    return;
                }
                throw new Error(error.message);
            }

            if (data) {
                setCollegeList((prev) => [...prev, data as CollegeListWithUniversity]);
            }
        } catch (err) {
            console.error("Failed to add university to list:", err);
        }
    }

    async function removeFromList(id: string) {
        await supabase.from("college_list").delete().eq("id", id);
        setCollegeList((prev) => prev.filter((entry) => entry.id !== id));
    }

    async function updateApplicationStatus(id: string, status: CollegeListEntry["application_status"]) {
        setCollegeList((prev) => prev.map((entry) => (entry.id === id ? { ...entry, application_status: status } : entry)));
        await supabase.from("college_list").update({ application_status: status }).eq("id", id);
    }

    return (
        <div className="cmx-page">
            <section className="cmx-hero cmx-reveal">
                <div className="cmx-eyebrow">
                    <GraduationCap size={16} />
                    College Match Studio
                </div>
                <h1 className="cmx-title">Build a Strategic University List That Fits You</h1>
                <p className="cmx-subtitle">
                    Search across global universities, apply smart selectivity filters, and move schools into your shortlist in one clean workflow.
                </p>

                <div className="cmx-meta-grid">
                    <div className="cmx-meta-card">
                        <span className="cmx-meta-label">Active Region</span>
                        <span className="cmx-meta-value">{selectedRegion}</span>
                    </div>
                    <div className="cmx-meta-card">
                        <span className="cmx-meta-label">Available Matches</span>
                        <span className="cmx-meta-value">{filteredUniversities.length}</span>
                    </div>
                    {profileStats.map((item) => (
                        <div key={item.label} className="cmx-meta-card">
                            <span className="cmx-meta-label">{item.label}</span>
                            <span className="cmx-meta-value">{item.value}</span>
                        </div>
                    ))}
                </div>

                <div className="cmx-legend" aria-label="Selectivity legend">
                    <span className="cmx-legend-pill"><span className="cmx-dot cmx-dot-critical" />&lt;15% Highly Selective</span>
                    <span className="cmx-legend-pill"><span className="cmx-dot cmx-dot-balanced" />15%-25% Selective</span>
                    <span className="cmx-legend-pill"><span className="cmx-dot cmx-dot-open" />25%+ Accessible</span>
                </div>
            </section>

            <section className="cmx-controls cmx-reveal" data-index={1}>
                <div className="cmx-region-segment" role="tablist" aria-label="Region selector">
                    <span className="cmx-region-indicator" data-pos={activeRegionIndex} aria-hidden="true" />
                    {REGION_ORDER.map((region) => {
                        const isActive = region === selectedRegion;
                        const isSelected = isActive ? "true" : "false";
                        return (
                            <button
                                key={region}
                                type="button"
                                role="tab"
                                {...(isActive ? { "aria-selected": true } : { "aria-selected": false })}
                                onClick={() => {
                                    setSelectedRegion(region);
                                    setSearchTerm("");
                                }}
                                className={`cmx-region-tab ${isActive ? "is-active" : ""}`}
                            >
                                <span className="cmx-region-emoji">{regionMeta[region].emoji}</span>
                                <span className="cmx-region-text">
                                    <span className="cmx-region-name">{region}</span>
                                    <span className="cmx-region-count">{regionCounts[region]}</span>
                                </span>
                            </button>
                        );
                    })}
                </div>
                <p className="cmx-region-hint">{regionMeta[selectedRegion].subtitle}</p>

                <div className="cmx-search-row">
                    <label className="cmx-search-field">
                        <Search size={16} />
                        <input
                            id="cmx-search-input"
                            type="text"
                            value={searchTerm}
                            placeholder={`Search ${regionCounts[selectedRegion]} universities in ${selectedRegion}...`}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            aria-label={`Search universities in ${selectedRegion}`}
                        />
                    </label>

                    <button
                        type="button"
                        onClick={() => setFilterAid((prev) => !prev)}
                        className={`cmx-filter-btn ${filterAid ? "is-active" : ""}`}
                    >
                        <ShieldCheck size={16} />
                        Intl Aid
                    </button>

                    <div className="cmx-found-pill">
                        <Sparkles size={14} />
                        {filteredUniversities.length} open
                    </div>
                </div>
            </section>

            <div className="cmx-layout">
                <section className="cmx-panel cmx-discovery cmx-reveal" data-delay="140">
                    <div className="cmx-section-head">
                        <h2 className="cmx-section-title">Discover Universities</h2>
                        <p className="cmx-section-copy">Curated cards sorted by selectivity so you can shortlist in minutes.</p>
                    </div>

                    {filteredUniversities.length === 0 ? (
                        <div className="cmx-empty">
                            <GraduationCap size={22} />
                            No results in this filter set. Try a broader search or change region.
                        </div>
                    ) : (
                        <div className={`cmx-universities ${isFiltering ? "is-filtering" : "is-ready"}`}>
                            {filteredUniversities.map((uni, index) => {
                                const selectivity = getSelectivity(uni.acceptance_rate);
                                const tagPreview = uni.culture_tags?.slice(0, 3) || [];
                                const hasAcceptance = uni.acceptance_rate != null && uni.region !== "Europe";
                                const baseChipCount = (hasAcceptance ? 1 : 0) + (uni.avg_sat ? 1 : 0) + (uni.financial_aid_intl ? 1 : 0);
                                return (
                                    <article
                                        key={uni.id}
                                        className={`cmx-uni-card cmx-tone-${selectivity.tone}`}
                                        data-index={index}
                                    >
                                        <div className="cmx-uni-top">
                                            <div className="cmx-uni-main">
                                                <h3>{uni.name}</h3>
                                                <p>
                                                    <MapPin size={14} />
                                                    {uni.location}, {uni.country}
                                                </p>
                                            </div>
                                            {uni.need_blind_intl && <span className="cmx-pill cmx-pill-need">Need-Blind</span>}
                                        </div>

                                        <div className="cmx-chip-row">
                                            {hasAcceptance && (
                                                <span className="cmx-chip cmx-chip-enter" data-delay="30">
                                                    <span className={`cmx-dot cmx-dot-${selectivity.tone}`} />
                                                    {uni.acceptance_rate}% Acceptance
                                                </span>
                                            )}
                                            {uni.avg_sat && <span className="cmx-chip cmx-chip-enter" data-delay={hasAcceptance ? "72" : "30"}>SAT: {uni.avg_sat}</span>}
                                            {uni.financial_aid_intl && (
                                                <span
                                                    className="cmx-chip cmx-chip-aid cmx-chip-enter"
                                                    data-delay={hasAcceptance && uni.avg_sat ? "114" : hasAcceptance || uni.avg_sat ? "72" : "30"}
                                                >
                                                    Full Aid
                                                </span>
                                            )}
                                            {tagPreview.map((tag, tagIndex) => (
                                                <span key={tag} className="cmx-tag cmx-chip-enter" data-index={tagIndex}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="cmx-uni-bottom">
                                            <div className="cmx-selectivity">
                                                <span className={`cmx-selectivity-label cmx-text-${selectivity.tone}`}>{selectivity.label}</span>
                                                <span className="cmx-selectivity-helper">{selectivity.helper}</span>
                                            </div>
                                            <div className="cmx-uni-actions">
                                                {uni.website_url && (
                                                    <a href={uni.website_url} target="_blank" rel="noreferrer" className="cmx-link-btn">
                                                        Website
                                                        <ArrowUpRight size={13} />
                                                    </a>
                                                )}
                                                <button type="button" className="cmx-add-btn" onClick={() => addToList(uni)}>
                                                    <Plus size={15} />
                                                    Add to List
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>

                <aside className="cmx-panel cmx-list cmx-reveal" data-delay="210">
                    <div className="cmx-list-head">
                        <h2 className="cmx-section-title">My College List</h2>
                        <span className="cmx-badge">{collegeList.length}</span>
                    </div>
                    <p className="cmx-section-copy">Track application status and keep your shortlist actionable.</p>

                    {collegeList.length === 0 ? (
                        <div className="cmx-empty-list">Your shortlist is empty. Add schools from the discovery panel.</div>
                    ) : (
                        <div className="cmx-list-items">
                            {collegeList.map((entry) => {
                                const uni = entry.universities;
                                if (!uni) return null;
                                const selectivity = getSelectivity(uni.acceptance_rate);

                                return (
                                    <article key={entry.id} className={`cmx-list-card cmx-tone-${selectivity.tone}`}>
                                        <div className="cmx-list-row">
                                            <div className="cmx-list-main">
                                                <h3>{uni.name}</h3>
                                                <p>
                                                    <MapPin size={13} />
                                                    {uni.location}, {uni.country}
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                className="cmx-remove-btn"
                                                onClick={() => removeFromList(entry.id)}
                                                aria-label="Remove from list"
                                                title="Remove from list"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>

                                        <div className="cmx-chip-row">
                                            {uni.acceptance_rate != null && uni.region !== "Europe" && <span className="cmx-chip cmx-chip-enter" data-delay="20">{uni.acceptance_rate}% Acceptance</span>}
                                            {uni.avg_sat && <span className="cmx-chip cmx-chip-enter" data-delay="56">SAT: {uni.avg_sat}</span>}
                                            {uni.financial_aid_intl && <span className="cmx-chip cmx-chip-aid cmx-chip-enter" data-delay="92">Full Aid</span>}
                                        </div>

                                        <select
                                            value={entry.application_status}
                                            onChange={(event) => updateApplicationStatus(entry.id, event.target.value as CollegeListEntry["application_status"])}
                                            className="cmx-status"
                                            aria-label="Application status"
                                        >
                                            {statusOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
}
