import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface PageHeaderProps {
  image: string;
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  badge?: string;
  children?: ReactNode;
  eager?: boolean;
}

export const PageHeader = ({
  image,
  icon: Icon,
  title,
  subtitle,
  badge,
  children,
  eager = false,
}: PageHeaderProps) => {
  return (
    <header className="relative px-5 pt-10 pb-10 rounded-b-[2.5rem] overflow-hidden text-white shadow-warm">
      {/* Background image */}
      <img
        src={image}
        alt=""
        loading={eager ? "eager" : "lazy"}
        width={1536}
        height={896}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Gradients pour lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/75" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-transparent" />
      <div className="absolute inset-0 pattern-kente opacity-20 mix-blend-overlay" />

      <div className="relative">
        {badge && (
          <span className="inline-block text-[10px] font-bold tracking-[0.25em] text-secondary mb-2 px-2 py-0.5 bg-black/30 backdrop-blur-sm rounded-full">
            {badge}
          </span>
        )}
        {Icon && (
          <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-3 border border-white/20 shadow-lg">
            <Icon className="h-5 w-5 text-white" />
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/90 text-sm mt-1 drop-shadow-md max-w-md">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-5">{children}</div>}
      </div>
    </header>
  );
};
