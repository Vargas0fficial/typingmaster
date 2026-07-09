"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { GameResult } from "@prisma/client";

export interface QuickStats {
    avgWpm: number;
    bestWpm: number;
    totalTests: number;
    avgAcc: number;
}

export interface GameRecord {
    id: string;
    wpm: number;
    accuracy: number;
    errors: number;
    createdAt: Date;
}

export async function saveGameResult(wpm: number, accuracy: number, errors: number) {
    const session = await getServerSession(authOptions);
    if (!session?.user) return;

    await prisma.gameResult.create({
        data: {
            wpm,
            accuracy,
            errors,
            userId: session.user.id,
        },
    });
}

export async function getQuickStats(): Promise<QuickStats> {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return { avgWpm: 0, bestWpm: 0, totalTests: 0, avgAcc: 100 };
    }

    const results: GameResult[] = await prisma.gameResult.findMany({
        where: { userId: session.user.id },
    });

    if (results.length === 0) {
        return { avgWpm: 0, bestWpm: 0, totalTests: 0, avgAcc: 100 };
    }

    const totalWpm = results.reduce((sum: number, r: GameResult) => sum + r.wpm, 0);
    const totalAcc = results.reduce((sum: number, r: GameResult) => sum + r.accuracy, 0);
    const bestWpm = Math.max(...results.map((r: GameResult) => r.wpm));

    return {
        avgWpm: Math.round(totalWpm / results.length),
        bestWpm,
        totalTests: results.length,
        avgAcc: Math.round(totalAcc / results.length),
    };
}

export async function getGameHistory(): Promise<GameRecord[]> {
    const session = await getServerSession(authOptions);
    if (!session?.user) return [];

    return prisma.gameResult.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
    });
}