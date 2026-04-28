import { useNavigate } from "react-router-dom";
import { useFeed } from "@/stores/feed";
import { Heart, MessageCircle, ChevronRight } from "lucide-react";

export const RecentActivity = () => {
  const allPosts = useFeed((s) => s.posts);
  const posts = allPosts.slice(0, 3);
  const navigate = useNavigate();
  return (
    <section className="px-5 mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">Activité récente</h2>
        <button onClick={() => navigate("/jambaar")} className="text-xs font-semibold text-primary flex items-center gap-0.5">
          Voir tout <ChevronRight className="h-3 w-3" />
        </button>
      </div>
      <div className="space-y-2">
        {posts.map((p) => (
          <button
            key={p.id}
            onClick={() => navigate("/jambaar")}
            className="w-full bg-card rounded-2xl p-3 shadow-soft border border-border/50 hover:shadow-warm transition-all flex gap-3 items-center text-left"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-sunset flex items-center justify-center text-sm font-black text-primary-foreground shrink-0">
              {p.auteurInitiale}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-foreground truncate">{p.auteur}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{p.texte}</p>
              <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{p.likes}</span>
                <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" />{p.comments.length}</span>
                <span>• {p.createdAt}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
