export type WordMode = "english" | "tagalog" | "mixed";

export const ENGLISH_WORDS = [
    "const", "let", "function", "return", "import", "export", "component", "state",
    "effect", "props", "time", "people", "about", "world", "school", "house",
    "friend", "family", "day", "hand", "part", "place", "work", "small", "great",
    "different", "string", "number", "boolean", "object", "array", "window",
    "document", "console", "log", "value", "code", "type", "class", "method",
];

export const TAGALOG_WORDS = [
    "araw", "tao", "bahay", "kami", "gusto", "maganda", "ibang", "maliit",
    "pagtulong", "pamilya", "laruan", "guro", "paligid", "buhay", "salamat",
    "trabaho", "pangarap", "kaibigan", "tulong", "kasama", "araw-araw",
    "bukas", "kahapon", "ngayon", "sabik", "tagumpay", "pagmamahal", "buo",
];

const WORD_POOLS: Record<WordMode, string[]> = {
    english: ENGLISH_WORDS,
    tagalog: TAGALOG_WORDS,
    mixed: [...ENGLISH_WORDS, ...TAGALOG_WORDS],
};

export const MODE_LABELS: Record<WordMode, string> = {
    mixed: "English & Tagalog Words",
    english: "English Words",
    tagalog: "Tagalog Words",
};

export const generateRandomParagraph = (mode: WordMode, wordCount = 30): string => {
    const pool = WORD_POOLS[mode];
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, wordCount).join(" ");
};