"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Code2, Settings, User, LogOut } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav-items";
import { useStatsStore } from "@/store/statsStore";
import { getAvatarIcon } from "@/lib/avatarIcons";
import { getProfile } from "@/app/actions/profile";

const ALL_NAV = [
    ...NAV_ITEMS,
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const dbStats = useStatsStore((s) => s.dbStats);
    const refreshStats = useStatsStore((s) => s.refreshStats);
    const [avatarImage, setAvatarImage] = useState<string | null>(null);

    useEffect(() => {
        if (session) {
            refreshStats();
            getProfile().then((p) => setAvatarImage(p?.avatarImage ?? null));
        }
    }, [refreshStats, session]);

    const AvatarIcon = getAvatarIcon(session?.user?.avatar || "target");

    return (
        <aside className="w-64 bg-[#0e1322] border-r border-zinc-900 p-6 flex flex-col justify-between">
            <div className="space-y-8">
                <motion.div
                    className="flex items-center gap-3 text-xl font-bold tracking-tight text-blue-500"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <motion.div whileHover={{ rotate: 12, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Code2 className="w-6 h-6" />
                    </motion.div>
                    <span>TypingMaster</span>
                </motion.div>

                {session?.user && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-3 bg-[#0b0f19]/60 p-3 rounded-xl border border-zinc-900"
                    >
                        <div className="w-9 h-9 rounded-full bg-blue-600/10 flex items-center justify-center shrink-0 overflow-hidden">
                            {avatarImage ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={avatarImage} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <AvatarIcon className="w-4.5 h-4.5 text-blue-400" />
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-zinc-200 truncate">{session.user.name}</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.15, rotate: -8 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            title="Log out"
                            className="p-1.5 text-zinc-500 hover:text-red-400 rounded-lg transition-colors shrink-0"
                        >
                            <LogOut className="w-4 h-4" />
                        </motion.button>
                    </motion.div>
                )}

                <div className="space-y-6">
                    <div>
                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold block mb-3">Menu</span>
                        <nav className="space-y-1 relative">
                            {ALL_NAV.map(({ href, label, icon: Icon }, i) => {
                                const isActiveRoute = pathname === href;
                                return (
                                    <Link key={href} href={href} className="block relative">
                                        <motion.div
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            whileHover={{ x: 3 }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl font-medium relative z-10 transition-colors ${isActiveRoute ? "text-blue-400" : "text-zinc-400 hover:text-zinc-200"
                                                }`}
                                        >
                                            {isActiveRoute && (
                                                <motion.div
                                                    layoutId="active-nav-pill"
                                                    className="absolute inset-0 bg-blue-600/10 rounded-xl -z-10"
                                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                                />
                                            )}
                                            <Icon className="w-4 h-4" /> {label}
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="pt-4 border-t border-zinc-900">
                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold block mb-3">
                            Quick Stats (DB Live)
                        </span>
                        <div className="space-y-3 bg-[#0b0f19]/60 p-4 rounded-xl border border-zinc-900 text-xs">
                            <div className="flex justify-between">
                                <span className="text-zinc-500">Average WPM</span>
                                <span className="font-semibold text-blue-400">{dbStats.avgWpm}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500">Best WPM</span>
                                <span className="font-semibold text-emerald-400">{dbStats.bestWpm}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500">Total Tests</span>
                                <span className="font-semibold text-purple-400">{dbStats.totalTests} Runs</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500">Avg Accuracy</span>
                                <span className="font-semibold text-amber-400">{dbStats.avgAcc}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-[11px] text-zinc-600 text-center">
                💡 Shortcut: Press <kbd className="bg-zinc-800 px-1 rounded text-[10px]">Esc</kbd> to restart
            </div>
        </aside>
    );
}