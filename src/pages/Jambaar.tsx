import { useAuth } from "@/contexts/AuthContext";
import { JambaarLocked } from "@/components/jambaar/JambaarLocked";
import { Trophy } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import headerImg from "@/assets/headers/jambaar.jpg";
import { ProfileCard } from "@/components/jambaar/ProfileCard";
import { ImpactSocial } from "@/components/jambaar/ImpactSocial";
import { MissionsJour } from "@/components/jambaar/MissionsJour";
import { MatchIntelligent } from "@/components/jambaar/MatchIntelligent";
import { BadgesGrid } from "@/components/jambaar/BadgesGrid";
import { AskHelpDialog } from "@/components/jambaar/AskHelpDialog";
import { HelpListSheet } from "@/components/jambaar/HelpListSheet";
import { Leaderboard } from "@/components/jambaar/Leaderboard";
import { Feed } from "@/components/jambaar/Feed";
import { PostComposer } from "@/components/jambaar/PostComposer";
import { useTranslation } from "react-i18next";

const Jambaar = () => {
  const { session, loading } = useAuth();
  const { t } = useTranslation();

  if (loading) {
    return <div className="p-10 text-center text-sm text-muted-foreground">{t("jambaar.loading")}</div>;
  }

  if (!session) {
    return <JambaarLocked />;
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        image={headerImg}
        icon={Trophy}
        title="Jambaar"
        subtitle={t("jambaar.subtitle")}
        badge={t("jambaar.badge")}
      />

      <ProfileCard />
      <ImpactSocial />

      <section className="px-5 mt-6">
        <PostComposer />
      </section>

      <Feed />

      <MissionsJour />
      <MatchIntelligent />

      <section className="px-5 mt-6 grid grid-cols-2 gap-3">
        <AskHelpDialog />
        <HelpListSheet />
      </section>

      <BadgesGrid />
      <Leaderboard />
      <div className="h-6" />
    </div>
  );
};

export default Jambaar;
