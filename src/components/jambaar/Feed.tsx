import { useState } from "react";
import { Heart, MessageCircle, Share2, CheckCircle2, Sparkles, HandHeart, Megaphone, Send } from "lucide-react";
import { useFeed, Post } from "@/stores/feed";
import { useJambaar } from "@/stores/jambaar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const niveauStyle: Record<string, string> = {
  Talibé: "bg-muted text-foreground",
  Ndongo: "bg-secondary text-secondary-foreground",
  Jambaar: "bg-gradient-hero text-primary-foreground",
};

const typeMeta: Record<Post["type"], { label: string; icon: typeof HandHeart; color: string }> = {
  aide: { label: "Aide apportée", icon: HandHeart, color: "bg-deep-green/15 text-deep-green" },
  remerciement: { label: "Remerciement", icon: Sparkles, color: "bg-secondary/30 text-secondary-foreground" },
  communaute: { label: "Communauté", icon: Megaphone, color: "bg-primary/15 text-primary" },
};

const PostCard = ({ post }: { post: Post }) => {
  const { t } = useTranslation();
  const { toggleLike, addComment, confirmAide } = useFeed();
  const addPoints = useJambaar((s) => s.addPoints);
  const [showComments, setShowComments] = useState(false);
  const [draft, setDraft] = useState("");
  const meta = typeMeta[post.type];
  const Icon = meta.icon;

  const onConfirm = () => {
    const r = confirmAide(post.id);
    if (!r) return;
    if (post.auteur.startsWith("Toi")) addPoints(r.points);
    toast.success(`Aide confirmée — +${r.points} pts pour ${r.aidant} ✅`);
  };

  const onSendComment = () => {
    if (!draft.trim()) return;
    addComment(post.id, draft.trim());
    setDraft("");
  };

  const onShare = async () => {
    const text = `${post.auteur} sur Jambaar : ${post.texte}`;
    try {
      if (navigator.share) await navigator.share({ title: "Jambaar", text });
      else {
        await navigator.clipboard.writeText(text);
        toast.success("Lien copié 📋");
      }
    } catch {/* user cancelled */}
  };

  return (
    <article className="bg-card rounded-2xl shadow-soft border border-border/50 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4">
        <div className="w-11 h-11 rounded-full bg-gradient-sunset flex items-center justify-center text-base font-black text-primary-foreground shadow-warm shrink-0">
          {post.auteurInitiale}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-bold text-sm text-foreground truncate">{post.auteur}</p>
            <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider", niveauStyle[post.niveau])}>
              {post.niveau}
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">{post.createdAt}</p>
        </div>
        <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1", meta.color)}>
          <Icon className="h-3 w-3" />
          {meta.label}
        </span>
      </div>

      {/* Texte */}
      <p className="px-4 mt-3 text-sm text-foreground leading-relaxed whitespace-pre-line">{post.texte}</p>

      {/* Image */}
      {post.image && (
        <div className="mt-3 mx-4 rounded-xl overflow-hidden">
          <img src={post.image} alt="" className="w-full h-56 object-cover" loading="lazy" />
        </div>
      )}

      {/* Badge confirmation / points */}
      {post.type === "aide" && (
        <div className="mx-4 mt-3 flex flex-wrap items-center gap-2">
          {post.pointsGagnes && (
            <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-gradient-hero text-primary-foreground">
              +{post.pointsGagnes} pts Jambaar
            </span>
          )}
          {post.confirmee ? (
            <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-deep-green/15 text-deep-green flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Aide confirmée
            </span>
          ) : (
            <button
              onClick={onConfirm}
              className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors flex items-center gap-1"
            >
              <CheckCircle2 className="h-3 w-3" />
              {post.beneficiaire ? `Confirmer (${post.beneficiaire})` : "Confirmer l'aide"}
            </button>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 px-2 mt-3 border-t border-border/50 pt-1">
        <button
          onClick={() => toggleLike(post.id)}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg transition-colors text-xs font-semibold",
            post.likedByMe ? "text-primary" : "text-muted-foreground hover:bg-muted/50"
          )}
        >
          <Heart className={cn("h-4 w-4", post.likedByMe && "fill-primary")} />
          {post.likes}
        </button>
        <button
          onClick={() => setShowComments((v) => !v)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-muted-foreground hover:bg-muted/50 text-xs font-semibold transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          {post.comments.length}
        </button>
        <button
          onClick={onShare}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-muted-foreground hover:bg-muted/50 text-xs font-semibold transition-colors"
        >
          <Share2 className="h-4 w-4" />
          {t("jambaar.share")}
        </button>
      </div>

      {/* Commentaires */}
      {showComments && (
        <div className="px-4 pb-4 pt-2 border-t border-border/50 bg-muted/20 animate-fade-in">
          {post.comments.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-2">{t("jambaar.firstComment")} ✨</p>
          )}
          <div className="space-y-2">
            {post.comments.map((c) => (
              <div key={c.id} className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-foreground shrink-0">
                  {c.auteur.charAt(0)}
                </div>
                <div className="flex-1 bg-card rounded-2xl px-3 py-2 border border-border/50">
                  <p className="text-[11px] font-bold text-foreground">{c.auteur}</p>
                  <p className="text-xs text-foreground">{c.texte}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSendComment()}
              placeholder={t("jambaar.addComment")}
              className="flex-1 text-xs px-3 py-2 rounded-full bg-card border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              onClick={onSendComment}
              disabled={!draft.trim()}
              className="w-9 h-9 rounded-full bg-gradient-hero text-primary-foreground flex items-center justify-center disabled:opacity-40 transition-opacity"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export const Feed = () => {
  const { t } = useTranslation();
  const posts = useFeed((s) => s.posts);
  return (
    <section className="px-5 mt-6 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold">{t("jambaar.feedTitle")}</h2>
      </div>
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </section>
  );
};
