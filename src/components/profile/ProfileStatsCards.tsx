interface ProfileStatsCardsProps {
    stats: { avgWpm: number; bestWpm: number; totalTests: number; avgAcc: number };
}

export function ProfileStatsCards({ stats }: ProfileStatsCardsProps) {
    const cards = [
        { label: "Average WPM", value: stats.avgWpm, color: "text-blue-400" },
        { label: "Best WPM", value: stats.bestWpm, color: "text-emerald-400" },
        { label: "Total Tests", value: `${stats.totalTests} Runs`, color: "text-purple-400" },
        { label: "Avg Accuracy", value: `${stats.avgAcc}%`, color: "text-amber-400" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cards.map((c) => (
                <div key={c.label} className="bg-[#0e1322] border border-zinc-900 rounded-xl p-5">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold block mb-2">
                        {c.label}
                    </span>
                    <span className={`text-2xl font-bold ${c.color}`}>{c.value}</span>
                </div>
            ))}
        </div>
    );
}