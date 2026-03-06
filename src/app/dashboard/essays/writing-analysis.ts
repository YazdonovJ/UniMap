/* ─────────────────────────────────────────────
   Writing Analysis — Pure JS (No AI)
   Readability, passive voice, fillers, clichés,
   word frequency analysis
   ───────────────────────────────────────────── */

/* ─── Syllable Counter (approximate) ─── */
export function countSyllables(word: string): number {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^leas])e$/, '');
    const matches = word.match(/[aeiouy]+/g);
    return matches ? Math.max(1, matches.length) : 1;
}

/* ─── Flesch-Kincaid Readability ─── */
export function computeReadability(text: string) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(w => w.length > 0);
    if (words.length === 0 || sentences.length === 0) {
        return { score: 0, grade: 0, level: 'N/A' };
    }
    const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
    const wps = words.length / sentences.length;
    const spw = syllables / words.length;

    const score = 206.835 - 1.015 * wps - 84.6 * spw;
    const grade = 0.39 * wps + 11.8 * spw - 15.59;

    let level: string;
    if (grade <= 6) level = 'Easy';
    else if (grade <= 8) level = 'Fairly Easy';
    else if (grade <= 10) level = 'Standard';
    else if (grade <= 12) level = 'Fairly Difficult';
    else if (grade <= 14) level = 'Difficult';
    else level = 'Very Difficult';

    return {
        score: Math.max(0, Math.min(100, Math.round(score))),
        grade: Math.max(0, Math.round(grade * 10) / 10),
        level,
    };
}

/* ─── Text Statistics ─── */
export function computeStats(text: string) {
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const characters = text.replace(/\s/g, '').length;
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
    const readingTime = Math.max(1, Math.ceil(words.length / 250));
    const avgSentenceLen = sentences.length > 0 ? Math.round(words.length / sentences.length) : 0;

    return {
        words: words.length,
        characters,
        sentences: sentences.length,
        paragraphs: Math.max(1, paragraphs.length),
        avgSentenceLen,
        readingTime,
    };
}

/* ─── Passive Voice Detection ─── */
const PASSIVE_RE = /\b(was|were|is|are|been|being|be|am)\s+([\w]+(?:ed|en|t|wn|ng))\b/gi;

export function findPassiveVoice(text: string): { match: string; context: string }[] {
    const results: { match: string; context: string }[] = [];
    let m;
    const regex = new RegExp(PASSIVE_RE.source, 'gi');
    while ((m = regex.exec(text)) !== null) {
        const start = Math.max(0, m.index - 25);
        const end = Math.min(text.length, m.index + m[0].length + 25);
        results.push({
            match: m[0],
            context: (start > 0 ? '…' : '') + text.slice(start, end).trim() + (end < text.length ? '…' : ''),
        });
    }
    return results;
}

/* ─── Filler Words ─── */
const FILLER_WORDS = [
    'just', 'actually', 'basically', 'literally', 'honestly',
    'really', 'very', 'quite', 'rather', 'somewhat',
    'perhaps', 'maybe', 'stuff', 'things', 'definitely',
    'absolutely', 'totally', 'completely', 'simply', 'merely',
];

export function findFillerWords(text: string): { word: string; count: number }[] {
    const words = text.toLowerCase().split(/\s+/).map(w => w.replace(/[^a-z']/g, ''));
    const freq = new Map<string, number>();
    for (const w of words) {
        if (FILLER_WORDS.includes(w)) freq.set(w, (freq.get(w) || 0) + 1);
    }
    return Array.from(freq.entries())
        .map(([word, count]) => ({ word, count }))
        .sort((a, b) => b.count - a.count);
}

/* ─── Cliché Detector ─── */
const CLICHES = [
    'at the end of the day', 'think outside the box', 'give 110',
    'passionate about', 'since i was young', 'ever since i can remember',
    'changed my life', 'opened my eyes', 'in conclusion',
    'i learned a valuable lesson', 'first and foremost',
    'each and every', 'last but not least', 'needless to say',
    'it goes without saying', 'when all is said and done',
    'give back to the community', 'diverse community',
    'prestigious university', 'unique perspective',
    'pushed me out of my comfort zone', 'made me who i am today',
    'follow my dreams', 'hard work pays off', 'blood sweat and tears',
    'once in a lifetime', 'at a young age', 'tip of the iceberg',
    'stepping stone', 'beacon of hope', 'a journey of',
    'the real world', 'trials and tribulations', 'turning point',
    'stand out from the crowd', 'broaden my horizons',
    'embark on a journey', 'shape who i am',
];

export function findCliches(text: string): string[] {
    const lower = text.toLowerCase();
    return CLICHES.filter(c => lower.includes(c));
}

/* ─── Word Frequency (for Repeated Word Cloud) ─── */
const STOP_WORDS = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'is', 'was', 'are', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'can', 'shall', 'it', 'its', 'this', 'that',
    'these', 'those', 'me', 'my', 'we', 'our', 'you', 'your', 'he',
    'she', 'they', 'them', 'his', 'her', 'their', 'not', 'no', 'if', 'so',
    'as', 'from', 'about', 'into', 'than', 'then', 'also', 'just', 'more',
    'most', 'very', 'all', 'any', 'each', 'every', 'such', 'much', 'many',
    'own', 'other', 'some', 'what', 'which', 'who', 'when', 'where', 'how',
    'out', 'up', 'down', 'over', 'after', 'before', 'between', 'under',
    'through', 'during', 'while', 'because', 'although', 'though', 'since',
    'like', 'get', 'got', 'make', 'made', 'know', 'think', 'see', 'come',
    'take', 'want', 'use', 'find', 'give', 'tell', 'say', 'said', 'one',
    'way', 'new', 'now', 'only', 'even', 'back', 'well', 'still', 'too',
]);

export function getWordFrequency(text: string): { word: string; count: number }[] {
    const words = text.toLowerCase().split(/\s+/).map(w => w.replace(/[^a-z']/g, ''));
    const freq = new Map<string, number>();
    for (const w of words) {
        if (w.length < 3 || STOP_WORDS.has(w)) continue;
        freq.set(w, (freq.get(w) || 0) + 1);
    }
    return Array.from(freq.entries())
        .map(([word, count]) => ({ word, count }))
        .filter(item => item.count >= 2)
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);
}
