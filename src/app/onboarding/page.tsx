"use client";

import { useState, type CSSProperties } from "react";
import { saveAcademicProfile } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UnimapLogo } from "@/components/brand/unimap-logo";
import { ChevronRight, ChevronLeft, Award, BookOpen, Target } from "lucide-react";

const gradingScales = [
    { value: "4.0", label: "4.0 Scale (US)" },
    { value: "5.0", label: "5.0 Scale" },
    { value: "10.0", label: "10.0 Scale" },
    { value: "100", label: "100-Point Scale" },
    { value: "percentage", label: "Percentage" },
];

const popularMajors = [
    "Computer Science", "Economics", "Political Science", "Business Administration",
    "Engineering", "Mathematics", "Biology", "Psychology", "International Relations",
    "Physics", "Chemistry", "Journalism", "Architecture", "Medicine", "Law",
    "Data Science", "Finance", "Marketing", "Philosophy", "Environmental Science",
];

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
    const [gradingScale, setGradingScale] = useState("4.0");

    function toggleMajor(major: string) {
        setSelectedMajors((prev) =>
            prev.includes(major) ? prev.filter((m) => m !== major) : [...prev, major]
        );
    }

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError("");
        formData.set("intendedMajors", selectedMajors.join(","));
        formData.set("gradingScale", gradingScale);
        const result = await saveAcademicProfile(formData);
        if (result?.error) {
            setError(result.error);
            setLoading(false);
        }
    }

    const totalSteps = 3;
    const progress = (step / totalSteps) * 100;

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-600/6 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl" />

            <div className="w-full max-w-lg animate-fade-in relative">
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="w-11 h-11 flex items-center justify-center">
                        <UnimapLogo className="h-full w-full" />
                    </div>
                    <span className="text-2xl font-bold gradient-text">Unimap</span>
                </div>

                {/* Progress bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2 text-xs text-gray-400">
                        <span>Step {step} of {totalSteps}</span>
                        <span>{Math.round(progress)}% complete</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-50 overflow-hidden">
                        <div
                            className="ob-progress-fill"
                            data-progress={Math.round(progress)}
                        />
                    </div>
                </div>

                <form action={handleSubmit}>
                    {/* Step 1: Test Scores */}
                    {step === 1 && (
                        <Card className="animate-slide-in-right">
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center">
                                        <Award className="w-5 h-5 text-[#A91D2E]" />
                                    </div>
                                    <div>
                                        <CardTitle>Standardized Tests</CardTitle>
                                        <CardDescription>Enter your test scores (leave blank if not taken)</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-400 mb-1.5 block">SAT Score</label>
                                        <Input name="satScore" type="number" placeholder="1600" min={400} max={1600} />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 mb-1.5 block">ACT Score</label>
                                        <Input name="actScore" type="number" placeholder="36" min={1} max={36} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-400 mb-1.5 block">IELTS Score</label>
                                        <Input name="ieltsScore" type="number" placeholder="9.0" min={0} max={9} step={0.5} />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 mb-1.5 block">TOEFL Score</label>
                                        <Input name="toeflScore" type="number" placeholder="120" min={0} max={120} />
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button type="button" onClick={() => setStep(2)} size="lg">
                                        Next <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 2: GPA & Academic Scale */}
                    {step === 2 && (
                        <Card className="animate-slide-in-right">
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                        <BookOpen className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <CardTitle>Academic Record</CardTitle>
                                        <CardDescription>Your GPA and grading system</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-400 mb-1.5 block">Grading Scale</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {gradingScales.map((scale) => (
                                            <button
                                                key={scale.value}
                                                type="button"
                                                onClick={() => setGradingScale(scale.value)}
                                                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${gradingScale === scale.value
                                                    ? "bg-indigo-500/15 border-indigo-500/30 text-[#d4344a]"
                                                    : "bg-gray-50 border-white/8 text-gray-500 hover:bg-gray-50"
                                                    }`}
                                            >
                                                {scale.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 mb-1.5 block">Your GPA</label>
                                    <Input
                                        name="gpa"
                                        type="number"
                                        placeholder={`Enter GPA on ${gradingScale} scale`}
                                        step={0.01}
                                        required
                                    />
                                </div>
                                <div className="flex justify-between pt-4">
                                    <Button type="button" variant="ghost" onClick={() => setStep(1)}>
                                        <ChevronLeft className="w-4 h-4" /> Back
                                    </Button>
                                    <Button type="button" onClick={() => setStep(3)} size="lg">
                                        Next <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 3: Intended Majors */}
                    {step === 3 && (
                        <Card className="animate-slide-in-right">
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-red-50 border border-violet-500/20 flex items-center justify-center">
                                        <Target className="w-5 h-5 text-[#A91D2E]" />
                                    </div>
                                    <div>
                                        <CardTitle>Intended Majors</CardTitle>
                                        <CardDescription>Select your areas of interest (up to 3)</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {error && (
                                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                        {error}
                                    </div>
                                )}
                                <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto pr-2">
                                    {popularMajors.map((major) => (
                                        <button
                                            key={major}
                                            type="button"
                                            onClick={() => {
                                                if (selectedMajors.length < 3 || selectedMajors.includes(major)) {
                                                    toggleMajor(major);
                                                }
                                            }}
                                            className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${selectedMajors.includes(major)
                                                ? "bg-indigo-500/15 border-indigo-500/30 text-[#d4344a] shadow-lg shadow-indigo-500/10"
                                                : "bg-gray-50 border-white/8 text-gray-500 hover:bg-gray-50 hover:text-gray-600"
                                                }`}
                                        >
                                            {major}
                                        </button>
                                    ))}
                                </div>
                                {selectedMajors.length > 0 && (
                                    <p className="text-xs text-gray-400">
                                        Selected: {selectedMajors.join(", ")}
                                    </p>
                                )}
                                <div className="flex justify-between pt-4">
                                    <Button type="button" variant="ghost" onClick={() => setStep(2)}>
                                        <ChevronLeft className="w-4 h-4" /> Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        isLoading={loading}
                                        disabled={selectedMajors.length === 0}
                                    >
                                        Complete Setup
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </form>
            </div>
        </div>
    );
}
