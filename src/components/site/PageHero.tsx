type PageHeroProps = {
  title: string;
  subtitle?: string;
  badge?: string;
  eyebrow?: string;
  image?: string;
};

export function PageHero({ title, subtitle, badge, eyebrow, image }: PageHeroProps) {
  const badgeText = eyebrow || badge;
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "linear-gradient(150deg, #F0F6FF 0%, #E0F2FE 45%, #DBEAFE 75%, #BFDBFE 100%)" }}
    >
      {/* Subtle ambient light blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl animate-float"
             style={{ background: "radial-gradient(circle, rgba(230,0,103,0.14) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full blur-3xl animate-float-reverse"
             style={{ background: "radial-gradient(circle, rgba(2,132,199,0.18) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-16 left-40% w-64 h-64 rounded-full blur-3xl animate-float-side"
             style={{ background: "radial-gradient(circle, rgba(12,35,112,0.12) 0%, transparent 70%)" }} />
      </div>

      {/* Top brand border */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, transparent, #f472b6, #0284C7, #1A05A2, transparent)" }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(12,35,112,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(12,35,112,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-page relative z-10 text-center">
        {badgeText && (
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5 animate-fade-up border shadow-sm"
            style={{
              background: "rgba(230,0,103,0.08)",
              borderColor: "rgba(12,35,112,0.2)",
              color: "#f472b6",
            }}
          >
            🌿 {badgeText}
          </div>
        )}

        <h1
          className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold animate-fade-up delay-100"
          style={{ color: "#1A05A2" }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className="mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed animate-fade-up delay-200 font-medium"
            style={{ color: "rgba(12,35,112,0.8)" }}
          >
            {subtitle}
          </p>
        )}

        {image && (
          <div className="mt-8 max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-slate-300 animate-fade-up delay-300">
            <img src={image} alt={title} className="w-full h-auto object-cover max-h-80" />
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mt-8 animate-fade-up delay-300">
          <div className="h-px flex-1 max-w-24" style={{ background: "linear-gradient(90deg, transparent, #f472b6)" }} />
          <div className="size-2 rounded-full" style={{ background: "#f472b6", boxShadow: "0 0 8px rgba(230,0,103,0.8)" }} />
          <div className="h-px flex-1 max-w-24" style={{ background: "linear-gradient(90deg, #f472b6, transparent)" }} />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #F0F6FF)" }}
      />
    </section>
  );
}