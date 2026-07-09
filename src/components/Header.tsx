"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav-items";

export function Header() {
    const pathname = usePathname();

    return (
        <header className="h-16 border-b border-zinc-900 px-8 flex items-center justify-between bg-[#0e1322]/30">
            <div className="flex gap-6 text-sm font-medium">
                {NAV_ITEMS.map(({ href, label }) => {
                    const isActiveRoute = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`h-16 px-2 flex items-center ${isActiveRoute ? "text-blue-400 border-b-2 border-blue-500" : "text-zinc-400 hover:text-zinc-200"
                                }`}
                        >
                            {label}
                        </Link>
                    );
                })}
            </div>
            <button className="text-zinc-400 hover:text-zinc-200 p-2 rounded-xl bg-[#0e1322] border border-zinc-900">
                <Sun className="w-4 h-4" />
            </button>
        </header>
    );
}