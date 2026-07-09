import { Terminal } from "lucide-react";
import { getGameHistory, getQuickStats } from "@/app/actions/score";

export default async function HistoryPage() {
  const [history, stats] = await Promise.all([getGameHistory(), getQuickStats()]);

  return (
    <div className="p-8 flex-1 max-w-[1000px] w-full mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-500" /> type_log
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Your typing test history will be displayed here.</p>
        </div>
        <span className="text-xs font-mono text-zinc-600">
          {history.length} {history.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {history.length === 0 ? (
        <div className="bg-[#0e1322] border border-zinc-900 border-dashed rounded-xl p-12 text-center">
          <Terminal className="w-8 h-8 text-zinc-700 mx-auto mb-3" />
          <p className="text-sm text-zinc-400 font-medium">Your log is still empty</p>
          <p className="text-xs text-zinc-600 mt-1">Complete your first typing test for it to appear here.</p>
        </div>
      ) : (
        <div className="bg-[#0e1322] border border-zinc-900 rounded-xl overflow-hidden">
          <div className="grid grid-cols-[80px_1fr_80px_90px_70px] gap-4 px-5 py-3 border-b border-zinc-900 text-[10px] uppercase tracking-wider text-zinc-600 font-bold">
            <span>Hash</span>
            <span>Timestamp</span>
            <span className="text-right">WPM</span>
            <span className="text-right">Accuracy</span>
            <span className="text-right">Errors</span>
          </div>
          <div className="divide-y divide-zinc-900/80 font-mono text-xs">
            {history.map((r) => {
              const isPB = r.wpm === stats.bestWpm && stats.bestWpm > 0;
              const wpmColor = r.wpm >= stats.avgWpm ? "text-emerald-400" : "text-rose-400";

              return (
                <div
                  key={r.id}
                  className="grid grid-cols-[80px_1fr_80px_90px_70px] gap-4 px-5 py-3 items-center hover:bg-[#0b0f19]/60 transition-colors"
                >
                  <span className="text-blue-500/70">#{r.id.slice(0, 6)}</span>
                  <span className="text-zinc-500">
                    {new Date(r.createdAt).toLocaleString("en-PH", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className={`text-right font-semibold ${wpmColor}`}>
                    {r.wpm}
                    {isPB && <span className="ml-1 text-amber-400">★</span>}
                  </span>
                  <span className="text-right text-zinc-300">{r.accuracy}%</span>
                  <span className="text-right text-rose-500/80">{r.errors}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}