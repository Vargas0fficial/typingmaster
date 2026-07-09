import { redirect } from "next/navigation";
import { getProfile } from "@/app/actions/profile";
import { getQuickStats } from "@/app/actions/score";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileStatsCards } from "@/components/profile/ProfileStatsCards";
import { AchievementBadges } from "@/components/profile/AchievementBadges";

export default async function ProfilePage() {
    const [profile, stats] = await Promise.all([getProfile(), getQuickStats()]);

    if (!profile) {
        redirect("/login");
    }

    return (
        <div className="p-8 max-w-[1000px] w-full mx-auto space-y-6">
            <ProfileHeader
                initialUsername={profile.username}
                initialAvatar={profile.avatar}
                initialAvatarImage={profile.avatarImage}
            />
            <ProfileStatsCards stats={stats} />
            <AchievementBadges stats={stats} />
        </div>
    );
}