"use client";

import React, { useEffect, useState } from "react";
import { BarChart2, ArrowLeft, Trophy, Percent, History, Calendar } from "lucide-react";
import Link from "next/link";
import { getGameHistory, getQuickStats } from "@/app/actions/score";

interface GameRecord {
  id: string;
  wpm: number;
  accuracy: number;
  errors: number;
  createdAt: Date;
}

export default function StatsPage() {
  const [history, setHistory] = useState<GameRecord[]>([]);
  const [summary, setSummary] = useState({ avgWpm: 0, bestWpm: 0, totalTests: 0, avgAcc: 100 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalyticsData() {
      const fullHistory = await getGameHistory();
      const quickStats = await getQuickStats();

      const formattedHistory = fullHistory.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt)
      }));

      setHistory(formattedHistory);
      setSummary(quickStats);
      setLoading(false);
    }
    loadAnalyticsData();
  }, []);

  return (
    <div className="p-8 max-w-[1200px] mx-auto space-y-8 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Performance Analytics</h1>
          <p className="text-xs text-zinc-400 mt-1">View your typing performance metrics and insights</p>
        </div>
        <Link href="/" className="flex items-center gap-2 text-xs bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-4 py-2 rounded-xl text-zinc-300 font-medium transition-all">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Practice
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-20 text-zinc-500 text-sm animate-pulse">Loading engine metrics...</div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#0e1322] border border-zinc-900 p-5 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Best WPM</div>
                <div className="text-2xl font-extrabold text-blue-400 mt-0.5">{summary.bestWpm}</div>
              </div>
            </div>

            <div className="bg-[#0e1322] border border-zinc-900 p-5 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                <BarChart2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Average WPM</div>
                <div className="text-2xl font-extrabold text-emerald-400 mt-0.5">{summary.avgWpm}</div>
              </div>
            </div>

            <div className="bg-[#0e1322] border border-zinc-900 p-5 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400">
                <Percent className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Avg Accuracy</div>
                <div className="text-2xl font-extrabold text-amber-400 mt-0.5">{summary.avgAcc}%</div>
              </div>
            </div>

            <div className="bg-[#0e1322] border border-zinc-900 p-5 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
                <History className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Total Runs</div>
                <div className="text-2xl font-extrabold text-purple-400 mt-0.5">{summary.totalTests}</div>
              </div>
            </div>
          </div>

          <div className="bg-[#0e1322] border border-zinc-900 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-zinc-900">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Recent Typing Matches</h3>
            </div>

            {history.length === 0 ? (
                <div className="p-12 text-center text-xs text-zinc-500">You haven't finished a single game yet, Head to the practice area first!</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-zinc-300">
                  <thead className="bg-[#0b0f19]/50 text-[11px] uppercase tracking-wider text-zinc-500 font-bold border-b border-zinc-900">
                    <tr>
                      <th className="p-4">Date & Time</th>
                      <th className="p-4">Speed (WPM)</th>
                      <th className="p-4">Accuracy</th>
                      <th className="p-4">Errors Count</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 font-mono">
                    {history.map((record) => (
                      <tr key={record.id} className="hover:bg-zinc-900/30 transition-colors">
                        <td className="p-4 flex items-center gap-2 text-xs font-sans text-zinc-400">
                          <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                          {record.createdAt.toLocaleDateString()} | {record.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="p-4 font-bold text-blue-400">{record.wpm} WPM</td>
                        <td className="p-4 text-emerald-400">{record.accuracy}%</td>
                        <td className="p-4 text-rose-500">{record.errors}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}