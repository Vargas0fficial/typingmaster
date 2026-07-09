import { Target, Rocket, Zap, Flame, Star, Gamepad2, Bot, Brain, Code2, Palette, LucideIcon } from "lucide-react";

export interface AvatarOption {
    id: string;
    icon: LucideIcon;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
    { id: "target", icon: Target },
    { id: "rocket", icon: Rocket },
    { id: "zap", icon: Zap },
    { id: "flame", icon: Flame },
    { id: "star", icon: Star },
    { id: "gamepad", icon: Gamepad2 },
    { id: "bot", icon: Bot },
    { id: "brain", icon: Brain },
    { id: "code", icon: Code2 },
    { id: "palette", icon: Palette },
];

export function getAvatarIcon(id: string): LucideIcon {
    return AVATAR_OPTIONS.find((a) => a.id === id)?.icon ?? Target;
}