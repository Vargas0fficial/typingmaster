"use client";

import { useRef, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { Upload, Trash2 } from "lucide-react";
import { updateAvatar, updateAvatarPhoto } from "@/app/actions/profile";
import { AVATAR_OPTIONS, getAvatarIcon } from "@/lib/avatarIcons";

interface Props {
    initialUsername: string;
    initialAvatar: string;
    initialAvatarImage: string | null;
}

export function ProfileHeader({ initialUsername, initialAvatar, initialAvatarImage }: Props) {
    const { update } = useSession();
    const [avatar, setAvatar] = useState(initialAvatar);
    const [avatarImage, setAvatarImage] = useState<string | null>(initialAvatarImage);
    const [showAvatarPicker, setShowAvatarPicker] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [isPending, startTransition] = useTransition();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const AvatarIcon = getAvatarIcon(avatar);

    const handleSelectAvatar = (iconId: string) => {
        setAvatar(iconId);
        setAvatarImage(null);
        setShowAvatarPicker(false);
        startTransition(async () => {
            await updateAvatar(iconId);
            await update({ avatar: iconId, avatarImage: null });
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadError("");

        if (!file.type.startsWith("image/")) {
            setUploadError("Just choose an image file (jpg, png, etc.).");
            return;
        }
        if (file.size > 1_000_000) {
            setUploadError("The image is too large. Choose a smaller file (under 1MB)..");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result as string;
            setAvatarImage(base64);
            setShowAvatarPicker(false);

            startTransition(async () => {
                try {
                    await updateAvatarPhoto(base64);
                    await update({ avatarImage: base64 });
                } catch {
                    setUploadError("Hindi na-save ang larawan. Subukan mo ulit.");
                }
            });
        };
        reader.readAsDataURL(file);
    };

    const handleRemovePhoto = () => {
        setAvatarImage(null);
        startTransition(async () => {
            await updateAvatar(avatar);
            await update({ avatar, avatarImage: null });
        });
    };

    return (
        <div className="bg-[#0e1322] border border-zinc-900 rounded-xl p-8 flex items-center gap-6">
            <div className="relative">
                <button
                    onClick={() => setShowAvatarPicker((v) => !v)}
                    className="w-20 h-20 rounded-full bg-blue-600/10 flex items-center justify-center hover:bg-blue-600/20 transition-colors overflow-hidden"
                >
                    {avatarImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={avatarImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <AvatarIcon className="w-9 h-9 text-blue-400" />
                    )}
                </button>

                {showAvatarPicker && (
                    <div className="absolute top-full mt-2 left-0 bg-[#0b0f19] border border-zinc-800 rounded-xl p-3 z-10 shadow-xl w-64 space-y-3">
                        <div className="grid grid-cols-5 gap-2">
                            {AVATAR_OPTIONS.map(({ id, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => handleSelectAvatar(id)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${!avatarImage && avatar === id ? "bg-blue-600/20 text-blue-400" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                </button>
                            ))}
                        </div>

                        <div className="border-t border-zinc-800 pt-3 space-y-2">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full flex items-center justify-center gap-2 text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 rounded-lg py-2 transition-colors"
                            >
                                <Upload className="w-3.5 h-3.5" /> Upload Photo
                            </button>
                            {avatarImage && (
                                <button
                                    onClick={handleRemovePhoto}
                                    className="w-full flex items-center justify-center gap-2 text-xs font-medium text-red-400 bg-red-950/20 hover:bg-red-950/40 rounded-lg py-2 transition-colors"
                                >
                                    <Trash2 className="w-3.5 h-3.5" /> Remove Photo
                                </button>
                            )}
                            {uploadError && <p className="text-[11px] text-red-400">{uploadError}</p>}
                        </div>
                    </div>
                )}

                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>

            <div className="flex-1">
                <h1 className="text-2xl font-bold text-zinc-100">{initialUsername}</h1>
                <p className="text-sm text-zinc-500 mt-1">TypingMaster user{isPending ? " · saving..." : ""}</p>
            </div>
        </div>
    );
}