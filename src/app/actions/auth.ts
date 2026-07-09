"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export interface RegisterResult {
    success: boolean;
    error?: string;
}

export async function registerUser(username: string, password: string): Promise<RegisterResult> {
    const trimmedUsername = username.trim();

    if (trimmedUsername.length < 3) {
        return { success: false, error: "The username requires at least 3 characters." };
    }
    if (password.length < 6) {
        return { success: false, error: "The password requires at least 6 characters." };
    }

    const existing = await prisma.user.findUnique({ where: { username: trimmedUsername } });
    if (existing) {
        return { success: false, error: "The username is already taken. Please choose a different one." };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: { username: trimmedUsername, passwordHash },
    });

    return { success: true };
}