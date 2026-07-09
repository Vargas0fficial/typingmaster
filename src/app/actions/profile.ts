"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export interface ProfileData {
    username: string;
    avatar: string;
    avatarImage: string | null;
}

export async function getProfile(): Promise<ProfileData | null> {
    const session = await getServerSession(authOptions);
    if (!session?.user) return null;

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) return null;

    return { username: user.username, avatar: user.avatar, avatarImage: user.avatarImage };
}

export async function updateAvatar(avatar: string): Promise<ProfileData | null> {
    const session = await getServerSession(authOptions);
    if (!session?.user) return null;

    const user = await prisma.user.update({
        where: { id: session.user.id },
        data: { avatar, avatarImage: null },
    });

    return { username: user.username, avatar: user.avatar, avatarImage: user.avatarImage };
}

export async function updateAvatarPhoto(base64Image: string): Promise<ProfileData | null> {
    const session = await getServerSession(authOptions);
    if (!session?.user) return null;

    // Simpleng size check - ~1.5MB max sa base64 (mas malaki dahil base64 encoding overhead)
    if (base64Image.length > 2_000_000) {
        throw new Error("The image is too large. Choose a smaller file (under 1MB).");
    }

    const user = await prisma.user.update({
        where: { id: session.user.id },
        data: { avatarImage: base64Image },
    });

    return { username: user.username, avatar: user.avatar, avatarImage: user.avatarImage };
}