import { Link } from "react-router-dom";
import { navLinks, site } from "@/lib/site-info";
import { useLanguage } from "@/lib/use-language";

export function SiteFooter() {
  const { isEn } = useLanguage();

  return (
    <footer className="relative mt-0 overflow-hidden text-slate-800 bg-linear-to-b from-[#fff5f8] via-[#fdf2f5] to-[#fbcfe8]/40 border-t border-rose-200 font-sans">
      {/* TOP ACCENT LINE */}
      <div
        className="h-1.5 w-full"
        style={{ background: "linear-gradient(90deg, #810B38, #f472b6, #db2777, #810B38)" }}
      />

      {/* BACKGROUND BLOBS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-125 h-125 rounded-full blur-[100px] animate-float opacity-30"
          style={{ background: "radial-gradient(circle, #f472b6 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 right-0 w-100 h-100 rounded-full blur-[100px] animate-float-reverse opacity-20"
          style={{ background: "radial-gradient(circle, #f43f5e 0%, transparent 70%)" }}
        />
      </div>

      {/* MAIN FOOTER BODY */}
      <div className="relative z-10">
        <div className="container-page grid gap-12 py-16 md:grid-cols-3">
          {/* BRAND COLUMN */}
          <div className="space-y-6">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-4 cursor-pointer transition-all duration-300 hover:opacity-90"
            >
              <div
                className="grid size-12 place-items-center rounded-2xl font-display font-black text-white text-lg shadow-md group-hover:scale-105 transition-transform duration-300"
                style={{
                  background: "linear-gradient(135deg, #810B38 0%, #db2777 100%)",
                }}
              >
                {isEn ? "P" : "प्री"}
              </div>
              <div>
                <h3 className="font-display text-xl font-black text-[#810B38] tracking-wide group-hover:text-[#db2777] transition-colors">
                  {isEn ? (
                    <>
                      Preetam Senior Citizen <span className="text-[#db2777]">Anandshala</span>
                    </>
                  ) : (
                    <>
                      प्रीतम ज्येष्ठ नागरिक <span className="text-[#db2777]">आनंदशाळा</span>
                    </>
                  )}
                </h3>
                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-[#810B38]/70 mt-0.5">
                  Sangli · Maharashtra
                </p>
              </div>
            </Link>

            <p className="text-sm font-extrabold leading-relaxed max-w-sm text-slate-700">
              {isEn ? site.taglineEn : site.taglineMr}
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black border border-rose-200 text-[#810B38] bg-white/80 backdrop-blur-sm shadow-xs">
              <span className="text-[#db2777]">🌿</span> {isEn ? site.launchEn : site.launchMr}
            </div>
          </div>

          {/* NAV LINKS */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] font-black text-[#810B38] mb-6 flex items-center gap-3">
              <span className="w-8 h-0.75 bg-[#db2777] rounded-full"></span>
              {isEn ? "Quick Links" : "महत्त्वाची पृष्ठे"}
            </h4>
            <ul className="space-y-3.5">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group flex items-center gap-3 text-sm font-extrabold text-slate-700 transition-all duration-300 hover:text-[#db2777]"
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-300 group-hover:bg-[#db2777] transition-colors duration-300" />
                    <span>{isEn ? l.en : l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT COLUMN */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] font-black text-[#810B38] mb-6 flex items-center gap-3">
              <span className="w-8 h-0.75 bg-[#db2777] rounded-full"></span>
              {isEn ? "Contact Us" : "संपर्क"}
            </h4>
            <ul className="space-y-4 text-sm font-extrabold text-slate-700">
              {site.phones.map((p) => (
                <li key={p}>
                  <a
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="group flex items-center gap-3 text-slate-700 transition-all duration-300 hover:text-[#db2777]"
                  >
                    <div className="grid size-8 place-items-center rounded-xl bg-white border border-rose-200 text-[#810B38] group-hover:bg-[#db2777] group-hover:text-white transition-all duration-300 shadow-xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <span>{p}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-3 text-slate-700 transition-all duration-300 hover:text-[#db2777]"
                >
                  <div className="grid size-8 place-items-center rounded-xl bg-white border border-rose-200 text-[#810B38] group-hover:bg-[#db2777] group-hover:text-white transition-all duration-300 shadow-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <span className="break-all">{site.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 pt-1 leading-relaxed text-slate-700">
                <div className="grid size-8 place-items-center rounded-xl bg-white border border-rose-200 text-[#810B38] shrink-0 shadow-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span>{isEn ? site.addressEn : site.addressMr}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
