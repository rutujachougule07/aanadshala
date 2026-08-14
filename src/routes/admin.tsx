import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAdminStore, uploadImageToFirebase, resetFirebaseDatabase, setStoredData, STORAGE_KEYS } from "@/lib/admin-store";
import { auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "@/firebase";
import {
  Home,
  BookOpen,
  Image as ImageIcon,
  Dumbbell,
  FileText,
  Mail,
  LogOut,
  UploadCloud,
  Trash2,
  Edit,
  Plus,
  CheckCircle,
  Lock,
  Eye,
  EyeOff,
  Menu,
  X,
  Building2,
  Save
} from "lucide-react";

type TabKey =
  | "home"
  | "halls"
  | "about"
  | "gallery"
  | "sports"
  | "brochure"
  | "inquiries";

type EditModalData = {
  id?: string;
  type: string;
  title: string;
  imageUrl: string;
  subtitle?: string;
  desc?: string;
  category?: string;
  onSave: (newTitle: string, newUrl: string, newSubtitle?: string, newCategory?: string, newDesc?: string) => void;
};

const galleryCategoriesList = [
  "सर्व",
  "ज्येष्ठ नागरिक आनंदशाळा",
  "आनंद मेळावा",
  "भूमिपूजन",
  "बांधकाम",
  "सामाजिक कार्य",
  "वार्षिक स्नेहसंमेलन",
  "मान्यवर भेट",
  "विशेष कार्यक्रम",
];

// REUSABLE DRAG & DROP IMAGE UPLOAD ZONE COMPONENT
function ImageDropzone({
  onFileSelected,
  label = "Drag & drop image here or click to browse",
  compact = false,
}: {
  onFileSelected: (file: File) => void;
  label?: string;
  compact?: boolean;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setIsUploading(true);
        Promise.resolve(onFileSelected(file)).finally(() => setIsUploading(false));
      } else {
        alert("Please select a valid image file (JPG, PNG, WEBP).");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setIsUploading(true);
      Promise.resolve(onFileSelected(files[0])).finally(() => setIsUploading(false));
    }
  };

  return (
    <label
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl transition-all cursor-pointer select-none ${isDragging
        ? "border-[#db2777] bg-pink-100/90 scale-[1.01] shadow-lg shadow-pink-500/20"
        : "border-rose-300 hover:border-[#db2777] bg-rose-50/50 hover:bg-rose-50/90"
        } ${compact ? "p-3" : "p-5"}`}
    >
      <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      {isUploading ? (
        <div className="flex items-center gap-2 text-xs font-black text-[#db2777] animate-pulse py-3">
          <span className="size-4 rounded-full border-2 border-[#db2777] border-t-transparent animate-spin" />
          <span>फोटो अपलोड होत आहे (Uploading Photo)...</span>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center space-y-1 py-1">
          <div className="size-12 rounded-2xl bg-gradient-to-r from-[#db2777] via-purple-600 to-[#1A05A2] flex items-center justify-center text-white shadow-md shadow-pink-500/20">
            <UploadCloud size={24} />
          </div>
          <p className="text-xs sm:text-sm font-black text-[#1A05A2] mt-1.5">
            📸 इथे फोटो Drag & Drop करा (Drag & Drop Photo Here)
          </p>
          <p className="text-[10px] font-extrabold text-slate-500">
            संगणकावरून फोटो ड्रॅग करा किंवा निवडण्यासाठी क्लिक करा (PNG, JPG, WEBP)
          </p>
        </div>
      )}
    </label>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("preetam_admin_auth") === "true";
  });
  const [userInput, setUserInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // EDIT MODAL STATE
  const [editingModal, setEditingModal] = useState<EditModalData | null>(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [modalSubtitle, setModalSubtitle] = useState("");
  const [modalDesc, setModalDesc] = useState("");

  // HALL DESCRIPTIONS — stored in separate localStorage key, completely isolated from Firebase sync
  const HALL_DESCS_KEY = "anandshala_hall_descs_v1";
  const [hallDescOverrides, setHallDescOverrides] = useState<Record<string, string>>(() => {
    try { return JSON.parse(localStorage.getItem("anandshala_hall_descs_v1") || "{}"); } catch { return {}; }
  });
  const saveHallDesc = (hallId: string, desc: string) => {
    const updated = { ...hallDescOverrides, [hallId]: desc };
    setHallDescOverrides(updated);
    try { localStorage.setItem(HALL_DESCS_KEY, JSON.stringify(updated)); } catch (_) {}
  };
  const getHallDesc = (hallId: string, fallback = "") => hallDescOverrides[hallId] ?? fallback;

  // Live Firebase Auth Listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        localStorage.setItem("preetam_admin_auth", "true");
      }
    });
    return () => unsub();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = userInput.trim().toLowerCase().replace(/\s+/g, "");
    const cleanPass = passInput.trim();

    if (
      (cleanUser === "admin123@gmail.com" || cleanUser === "admin123" || cleanUser === "admin") &&
      cleanPass === "admin123"
    ) {
      setIsLoggedIn(true);
      setLoginError("");
      localStorage.setItem("preetam_admin_auth", "true");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, userInput.trim(), cleanPass);
      setIsLoggedIn(true);
      setLoginError("");
      localStorage.setItem("preetam_admin_auth", "true");
    } catch (err: any) {
      setLoginError("❌ Invalid username (admin123@gmail.com) or password (admin123)!");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) { }
    setIsLoggedIn(false);
    localStorage.removeItem("preetam_admin_auth");
  };

  const store = useAdminStore();
  const [siteForm, setSiteForm] = useState(store.siteData);
  const [aboutForm, setAboutForm] = useState(store.aboutData);

  useEffect(() => {
    setSiteForm(store.siteData);
  }, [store.siteData]);

  useEffect(() => {
    setAboutForm(store.aboutData);
  }, [store.aboutData]);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  // Gallery Form State
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [newGalleryCaption, setNewGalleryCaption] = useState("");
  const [newGalleryCategory, setNewGalleryCategory] = useState("ज्येष्ठ नागरिक आनंदशाळा");
  const [galleryFilter, setGalleryFilter] = useState("सर्व");

  const showToast = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(""), 3500);
  };

  const handleFileUpload = async (file: File, onSuccess: (url: string) => void) => {
    try {
      const url = await uploadImageToFirebase(file, "admin_page_images");
      if (url && !url.startsWith("blob:")) {
        onSuccess(url);
        showToast("✅ फोटो यशस्वीरित्या अपडेट झाला!");
      }
    } catch (err) {
      alert("फोटो अपलोड करताना त्रुटी आली.");
    }
  };

  const openEditModal = (item: EditModalData) => {
    setEditingModal(item);
    setModalTitle(item.title || "");
    setModalImageUrl(item.imageUrl || "");
    setModalSubtitle(item.subtitle || "");
    // Read desc from dedicated localStorage first (never overwritten by Firebase)
    const storedDesc = item.id ? (hallDescOverrides[item.id] ?? item.desc ?? "") : (item.desc || "");
    setModalDesc(storedDesc);
  };

  // --------------------------------------------------------------------------
  // LIGHT ELEGANT LOGIN SCREEN
  // --------------------------------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fff5f8] via-[#f8fafc] to-[#f0f4ff] flex items-center justify-center p-4 font-sans relative overflow-hidden">
        {/* LIGHT AMBIENT ORBS */}
        <div className="pointer-events-none absolute top-10 left-10 size-[450px] rounded-full bg-pink-300/30 blur-[130px]" />
        <div className="pointer-events-none absolute bottom-10 right-10 size-[450px] rounded-full bg-indigo-300/30 blur-[130px]" />

        <div className="w-full max-w-md bg-white/95 backdrop-blur-2xl border-2 border-rose-200 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(219,39,119,0.12)] text-slate-800 relative z-10">
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[#db2777] via-purple-600 to-[#1A05A2] shadow-lg shadow-pink-500/25">
              <Lock className="size-8 text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-[#1A05A2]">
              Preetam <span className="text-[#db2777]">Anandshala</span> Admin
            </h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Sangli • Maharashtra • Photo Management
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">
                Username / Email ID
              </label>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="admin123@gmail.com"
                required
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#db2777] focus:bg-white focus:outline-none transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passInput}
                  onChange={(e) => setPassInput(e.target.value)}
                  placeholder="admin123"
                  required
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#db2777] focus:bg-white focus:outline-none transition-all pr-10 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-600 font-bold text-center">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[#db2777] via-purple-600 to-[#1A05A2] py-3.5 text-sm font-black text-white shadow-xl shadow-pink-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Login →
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <Link to="/" className="text-xs text-[#db2777] hover:text-[#1A05A2] hover:underline font-black">
              ← Go to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Sidebar Menu Items
  const menuItems = [
    {
      id: "home" as TabKey,
      label: "Home Page",
      subLabel: "Welcome Poster Image",
      icon: Home,
      count: 1,
    },
    {
      id: "halls" as TabKey,
      label: "Activity Halls",
      subLabel: "12 Halls Images",
      icon: Building2,
      count: 12,
    },
    {
      id: "about" as TabKey,
      label: "About Us",
      subLabel: "About Page Images",
      icon: BookOpen,
      count: (aboutForm.photos?.length || 0) + 3,
    },
    {
      id: "gallery" as TabKey,
      label: "Photo Gallery",
      subLabel: "9 Categories Gallery",
      icon: ImageIcon,
      count: store.gallery.length,
    },
    {
      id: "sports" as TabKey,
      label: "Sports Club",
      subLabel: "Facilities Images",
      icon: Dumbbell,
      count: (siteForm.sportsFacilities?.length || 0) + (siteForm.sportsGallery?.length || 0),
    },
    {
      id: "brochure" as TabKey,
      label: "Brochure Scans",
      subLabel: "Brochure Page Scans",
      icon: FileText,
      count: store.brochures.length,
    },
    {
      id: "inquiries" as TabKey,
      label: "Inquiries",
      subLabel: "Customer Messages",
      icon: Mail,
      count: store.inquiries.filter((i) => !i.read).length,
    },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-[#f8fafc] via-[#fff8fb] to-[#f0f4ff] text-slate-800 font-sans flex flex-col lg:flex-row relative overflow-hidden">

      {/* TOAST NOTIFICATION */}
      {saveSuccessMsg && (
        <div className="fixed top-5 right-5 z-[99999] flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-sm font-black text-white shadow-2xl animate-bounce border border-white/30">
          <CheckCircle className="size-5" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* EDIT MODAL OVERLAY */}
      {editingModal && (
        <div className="fixed inset-0 z-[999999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border-2 border-rose-200 rounded-3xl p-5 max-w-sm w-full shadow-2xl max-h-[92vh] overflow-y-auto">

            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-rose-100 pb-3 mb-4">
              <h3 className="font-black text-sm text-[#1A05A2] flex items-center gap-2">
                <Edit className="size-4 text-[#db2777]" />
                <span>Hall Edit करा</span>
              </h3>
              <button
                onClick={() => setEditingModal(null)}
                className="size-8 rounded-full bg-rose-50 text-[#db2777] flex items-center justify-center font-bold hover:bg-rose-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {/* COMPACT UPLOAD ZONE */}
              <div>
                <label className="block text-[11px] font-black text-slate-500 mb-1">📸 फोटो बदला</label>
                <ImageDropzone
                  compact
                  label="Drag & Drop Photo Here"
                  onFileSelected={(file) =>
                    handleFileUpload(file, (url) => setModalImageUrl(url))
                  }
                />
              </div>

              {/* PREVIEW after upload */}
              {modalImageUrl && (
                <div className="relative rounded-xl overflow-hidden h-24 border-2 border-emerald-200">
                  <img src={modalImageUrl} alt="Preview" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black flex items-center gap-1">
                    <CheckCircle size={9} /> Ready!
                  </span>
                </div>
              )}

              {/* TITLE INPUT */}
              <div>
                <label className="block text-[11px] font-black text-slate-500 mb-1">🏷️ Hall चे नाव</label>
                <input
                  type="text"
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  placeholder="Hall चे नाव लिहा..."
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-800 font-bold focus:border-[#db2777] focus:outline-none"
                />
              </div>

              {/* DESCRIPTION TEXTAREA */}
              {editingModal?.type === "hall" && (
                <div>
                  <label className="block text-[11px] font-black text-slate-500 mb-1">📝 माहिती / Description</label>
                  <textarea
                    value={modalDesc}
                    onChange={(e) => setModalDesc(e.target.value)}
                    placeholder="Hall ची माहिती लिहा..."
                    rows={2}
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-800 font-bold focus:border-[#db2777] focus:outline-none resize-none"
                  />
                </div>
              )}
            </div>

            {/* SAVE / CANCEL */}
            <div className="flex items-center justify-end gap-3 border-t border-rose-100 pt-3 mt-4">
              <button
                onClick={() => setEditingModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-600 hover:bg-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  editingModal.onSave(modalTitle, modalImageUrl, modalSubtitle, undefined, modalDesc);
                  setEditingModal(null);
                  showToast("✅ Saved!");
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#db2777] to-[#1A05A2] text-xs font-black text-white shadow-md cursor-pointer hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Save size={13} />
                <span>Save</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MOBILE HEADER */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-rose-100 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="size-9 rounded-xl bg-gradient-to-r from-[#db2777] to-[#1A05A2] flex items-center justify-center font-black text-white text-xs">
            P
          </div>
          <span className="font-black text-sm text-[#1A05A2]">
            Preetam <span className="text-[#db2777]">Anandshala</span>
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl bg-rose-50 text-[#db2777] border border-rose-200 cursor-pointer"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* LIGHT ELEGANT SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-rose-200/80 p-5 flex flex-col justify-between transition-transform duration-300 shadow-lg lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 overflow-y-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div>
          {/* SIDEBAR HEADER */}
          <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-rose-100">
            <div className="size-11 rounded-2xl bg-gradient-to-r from-[#db2777] via-purple-600 to-[#1A05A2] flex items-center justify-center shadow-md shadow-pink-500/20 font-black text-white text-lg border border-white">
              ✨
            </div>
            <div>
              <h2 className="font-black text-sm text-[#1A05A2] tracking-tight">
                Preetam <span className="text-[#db2777]">Anandshala</span>
              </h2>
              <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">
                Admin Photo Panel
              </p>
            </div>
          </div>

          {/* SIDEBAR TABS */}
          <div className="space-y-2">
            <p className="text-xs font-black text-[#810B38] uppercase tracking-widest px-3 py-1">
              Image Pages
            </p>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-black transition-all cursor-pointer group ${isActive
                    ? "bg-gradient-to-r from-[#db2777] via-purple-600 to-[#1A05A2] text-white shadow-md shadow-pink-500/20"
                    : "text-slate-700 hover:bg-rose-50/80 hover:text-[#db2777]"
                    }`}
                >
                  <Icon className={`size-5 shrink-0 ${isActive ? "text-white" : "text-[#1A05A2] group-hover:text-[#db2777]"}`} />
                  <div className="text-left">
                    <div className="text-sm leading-tight">{item.label}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SIDEBAR FOOTER */}
        <div className="pt-6 border-t border-rose-100 space-y-2.5">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 text-xs font-black text-[#1A05A2] border border-rose-200 transition-all shadow-xs"
          >
            <span>🌐</span>
            <span>View Main Site</span>
          </Link>
          <button
            onClick={async () => {
              if (window.confirm("तुम्हाला फायरबेसमधील सर्व जुने फोटो व डेटा पूर्णपणे हटवून नवीन क्लीन सेट करायचा आहे का?")) {
                await resetFirebaseDatabase();
                showToast("✅ जुना डेटा पूर्णपणे हटवून फायबेस रीसेट झाला!");
                setTimeout(() => window.location.reload(), 1000);
              }
            }}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-xs font-black text-amber-700 border border-amber-200 transition-all cursor-pointer"
          >
            <span>🧹</span>
            <span>Clear & Reset Old Firebase</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-xs font-black text-rose-600 border border-rose-200 transition-all cursor-pointer"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto overflow-y-auto h-screen w-full">

        {/* ================================================================== */}
        {/* TAB 1: HOME PAGE IMAGES                                           */}
        {/* ================================================================== */}
        {activeTab === "home" && (
          <div className="space-y-6 animate-fade-up">
            <div className="flex items-center justify-between border-b border-rose-200 pb-4">
              <div>
                <h1 className="text-2xl font-black text-[#1A05A2] flex items-center gap-2">
                  <Home className="text-[#db2777]" />
                  <span>Home Page (Welcome Poster)</span>
                </h1>
                <p className="text-xs text-slate-500 mt-1 font-semibold">
                  Manage welcome poster photo using Edit and Delete buttons on the image.
                </p>
              </div>
            </div>

            {/* WELCOME POPUP POSTER CARD WITH CLEAN ON-IMAGE BUTTONS */}
            <div className="bg-white border-2 border-rose-100 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
              <h2 className="text-base font-black text-[#810B38] flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span>🖼️</span>
                  <span>Welcome Poster Image</span>
                </span>
              </h2>

              <div className="flex items-center justify-start">
                {siteForm.welcomePosterUrl ? (
                  <div className="relative group rounded-3xl overflow-hidden border-2 border-rose-200 shadow-lg max-w-md w-full">
                    <img
                      src={siteForm.welcomePosterUrl}
                      alt="Welcome Poster"
                      className="w-full h-80 object-cover"
                    />

                    {/* CLEAN SINGLE ICON ON-IMAGE FLOATING BUTTONS */}
                    <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
                      <button
                        onClick={() =>
                          openEditModal({
                            type: "welcomePoster",
                            title: siteForm.welcomePosterTitle || "Welcome to Preetam Senior Citizen Anandshala & Preetam Sports and Fitness Club",
                            imageUrl: siteForm.welcomePosterUrl || "",
                            onSave: (newTitle, newUrl) => {
                              const newForm = { ...siteForm, welcomePosterUrl: newUrl, welcomePosterTitle: newTitle };
                              setSiteForm(newForm);
                              store.updateSiteData(newForm);
                            },
                          })
                        }
                        className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-black text-[#1A05A2] shadow-lg hover:bg-rose-50 hover:scale-105 transition-all flex items-center gap-1.5 border border-rose-200 cursor-pointer"
                      >
                        <Edit size={13} className="text-[#db2777]" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          const newForm = { ...siteForm, welcomePosterUrl: "" };
                          setSiteForm(newForm);
                          store.updateSiteData(newForm);
                          showToast("Poster deleted!");
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-rose-600/95 backdrop-blur-md text-xs font-black text-white shadow-lg hover:bg-rose-700 hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer border border-white/20"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white">
                      <p className="font-black text-xs drop-shadow-md truncate">{siteForm.welcomePosterTitle || "Welcome to Preetam Senior Citizen Anandshala & Preetam Sports and Fitness Club"}</p>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      openEditModal({
                        type: "welcomePoster",
                        title: siteForm.welcomePosterTitle || "Welcome to Preetam Senior Citizen Anandshala & Preetam Sports and Fitness Club",
                        imageUrl: "/images/welcome-building.jpg",
                        onSave: (newTitle, newUrl) => {
                          const newForm = { ...siteForm, welcomePosterUrl: newUrl, welcomePosterTitle: newTitle };
                          setSiteForm(newForm);
                          store.updateSiteData(newForm);
                        },
                      })
                    }
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#db2777] to-[#1A05A2] text-xs font-black text-white shadow-md hover:scale-105 transition-transform cursor-pointer"
                  >
                    + Add New Welcome Poster
                  </button>
                )}
              </div>
            </div>

            {/* 2 MAIN SECTIONS OF THE HOME PAGE (ANANDSHALA & SPORTS CLUB) */}
            <div className="bg-white border-2 border-rose-100 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
              <h2 className="text-base font-black text-[#810B38] flex items-center justify-between border-b border-rose-100 pb-3">
                <span className="flex items-center gap-2">
                  <span>🏛️</span>
                  <span>होमपेज मुख्य २ सेक्शन्स फोटो (Main 2 Home Page Section Cards)</span>
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* SECTION 1: ANANDSHALA MAIN CARD */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#1A05A2] flex items-center gap-1">
                      <span>🌸</span> १. आनंदशाळा मुख्य सेक्‍शन कार्ड (Section 1: Anandshala)
                    </span>
                  </div>

                  <div className="relative group rounded-3xl overflow-hidden border-2 border-rose-200 shadow-md">
                    <img
                      src={siteForm.aanandshalaImages?.[0] || "/images/slider4.JPG"}
                      alt="Anandshala Card"
                      className="w-full h-64 object-cover"
                    />

                    {/* FLOATING BUTTONS DIRECTLY ON IMAGE */}
                    <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
                      <button
                        onClick={() =>
                          openEditModal({
                            type: "aanandshalaCard",
                            title: siteForm.aanandshalaTitle || "प्रीतम ज्येष्ठ नागरिक आनंदशाळा व निवारा",
                            imageUrl: siteForm.aanandshalaImages?.[0] || "/images/slider4.JPG",
                            onSave: (newTitle, newUrl) => {
                              const updatedImages = [newUrl, ...(siteForm.aanandshalaImages?.slice(1) || [])];
                              const newForm = {
                                ...siteForm,
                                aanandshalaTitle: newTitle,
                                aanandshalaImages: updatedImages,
                              };
                              setSiteForm(newForm);
                              store.updateSiteData(newForm);
                            },
                          })
                        }
                        className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-black text-[#1A05A2] shadow-lg hover:bg-rose-50 hover:scale-105 transition-all flex items-center gap-1.5 border border-rose-200 cursor-pointer"
                      >
                        <Edit size={13} className="text-[#db2777]" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          const updatedImages = siteForm.aanandshalaImages?.slice(1) || [];
                          const newForm = { ...siteForm, aanandshalaImages: updatedImages };
                          setSiteForm(newForm);
                          store.updateSiteData(newForm);
                          showToast("फोटो हटवला गेला!");
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-rose-600/95 backdrop-blur-md text-xs font-black text-white shadow-lg hover:bg-rose-700 hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer border border-white/20"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white">
                      <p className="font-black text-xs drop-shadow-md truncate">
                        {siteForm.aanandshalaTitle || "प्रीतम ज्येष्ठ नागरिक आनंदशाळा व निवारा"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: SPORTS CLUB MAIN CARD */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#1A05A2] flex items-center gap-1">
                      <span>🏋️‍♂️</span> २. क्रीडा संकुल मुख्य सेक्‍शन कार्ड (Section 2: Sports Club)
                    </span>
                  </div>

                  <div className="relative group rounded-3xl overflow-hidden border-2 border-rose-200 shadow-md">
                    <img
                      src={siteForm.sportsImages?.[0] || "/images/sports img.png"}
                      alt="Sports Club Card"
                      className="w-full h-64 object-cover"
                    />

                    {/* FLOATING BUTTONS DIRECTLY ON IMAGE */}
                    <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
                      <button
                        onClick={() =>
                          openEditModal({
                            type: "sportsCard",
                            title: siteForm.sportsTitle || "प्रीतम स्पोर्ट्स अँड फिटनेस क्लब",
                            imageUrl: siteForm.sportsImages?.[0] || "/images/sports img.png",
                            onSave: (newTitle, newUrl) => {
                              const updatedImages = [newUrl, ...(siteForm.sportsImages?.slice(1) || [])];
                              const newForm = {
                                ...siteForm,
                                sportsTitle: newTitle,
                                sportsImages: updatedImages,
                              };
                              setSiteForm(newForm);
                              store.updateSiteData(newForm);
                            },
                          })
                        }
                        className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-black text-[#1A05A2] shadow-lg hover:bg-rose-50 hover:scale-105 transition-all flex items-center gap-1.5 border border-rose-200 cursor-pointer"
                      >
                        <Edit size={13} className="text-[#db2777]" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          const updatedImages = siteForm.sportsImages?.slice(1) || [];
                          const newForm = { ...siteForm, sportsImages: updatedImages };
                          setSiteForm(newForm);
                          store.updateSiteData(newForm);
                          showToast("फोटो हटवला गेला!");
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-rose-600/95 backdrop-blur-md text-xs font-black text-white shadow-lg hover:bg-rose-700 hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer border border-white/20"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white">
                      <p className="font-black text-xs drop-shadow-md truncate">
                        {siteForm.sportsTitle || "प्रीतम स्पोर्ट्स अँड फिटनेस क्लब"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 2: ACTIVITY HALLS IMAGES                                      */}
        {/* ================================================================== */}
        {activeTab === "halls" && (
          <div className="space-y-6 animate-fade-up">
            <div className="flex items-center justify-between border-b border-rose-200 pb-4">
              <div>
                <h1 className="text-2xl font-black text-[#1A05A2] flex items-center gap-2">
                  <Building2 className="text-[#db2777]" />
                  <span>Activity Halls (17 Halls Images)</span>
                </h1>
                <p className="text-xs text-slate-500 mt-1 font-semibold">
                  Click Edit button directly on any hall photo to replace image or title.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
              {(() => {
                // Default images per hall index (same as website fallback)
                const defaultImages = [
                  "/images/subimg/baithe khel.png",
                  "/images/subimg/aart hall.png",
                  "/images/subimg/sangit hall.png",
                  "/images/subimg/mahiti tantradyan hall.png",
                  "/images/subimg/karmnuk hall.png",
                  "/images/subimg/swimming hall.png",
                  "/images/subimg/sanskar sampraday hall.png",
                  "/images/subimg/tebal tenis.png",
                  "/images/subimg/tebal tenis.png",
                  "/images/subimg/tebal tenis.png",
                  "/images/subimg/tebal tenis.png",
                  "/images/subimg/vyayam hall.png",
                  "/images/subimg/vyayam hall.png",
                  "/images/subimg/vyayam hall.png",
                  "/images/subimg/pakruti hall.png",
                  "/images/subimg/vishranti hall.png",
                  "/images/subimg/karmnuk hall.png",
                ];

                const currentHalls = (store.siteData.activityHalls && store.siteData.activityHalls.length > 0)
                  ? store.siteData.activityHalls
                  : [];

                return currentHalls.map((hall, idx) => {
                  const hallId = hall.id || `hall-${idx + 1}`;
                  const displayImage = hall.imageUrl || defaultImages[idx] || "/images/slider1.JPG";
                  // Read desc from dedicated localStorage (never overwritten by Firebase)
                  const currentDesc = getHallDesc(hallId, hall.desc || "");

                  return (
                    <div key={hallId} className="bg-white border-2 border-rose-100 rounded-3xl p-3 space-y-2 shadow-sm hover:border-rose-300 transition-colors relative group">
                      <div className="relative rounded-2xl overflow-hidden bg-slate-50 border h-64">
                        <img
                          src={displayImage}
                          alt={hall.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = defaultImages[idx] || "/images/slider1.JPG";
                          }}
                        />
                        <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black text-[#810B38] border border-rose-200 shadow-xs">
                          Hall #{idx + 1}
                        </span>

                        {/* EDIT BUTTON */}
                        <button
                          onClick={() =>
                            openEditModal({
                              id: hallId,
                              type: "hall",
                              title: hall.title,
                              imageUrl: displayImage,
                              desc: currentDesc,
                              onSave: (newTitle, newUrl, _sub, _cat, newDesc) => {
                                // Save desc to dedicated localStorage (Firebase-proof)
                                saveHallDesc(hallId, newDesc || "");
                                // Also update the store (title + imageUrl)
                                const updatedHalls = store.siteData.activityHalls.map((h, i) =>
                                  i === idx
                                    ? { ...h, title: newTitle, imageUrl: newUrl, desc: newDesc || h.desc || "" }
                                    : h
                                );
                                const newForm = { ...store.siteData, activityHalls: updatedHalls };
                                setSiteForm(newForm);
                                store.updateSiteData(newForm);
                                showToast(`✅ ${newTitle} saved!`);
                              },
                            })
                          }
                          className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-black text-[#1A05A2] shadow-lg hover:bg-rose-50 hover:scale-105 transition-all flex items-center gap-1.5 border border-rose-200 cursor-pointer absolute top-2 right-2 z-20"
                        >
                          <Edit size={13} className="text-[#db2777]" />
                          <span>Edit</span>
                        </button>

                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 text-white">
                          <p className="font-black text-xs drop-shadow-md truncate">{hall.title}</p>
                          <p className="text-[10px] text-rose-200 opacity-90 truncate">{hall.category}</p>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 3: ABOUT US PAGE IMAGES                                       */}
        {/* ================================================================== */}
        {activeTab === "about" && (
          <div className="space-y-6 animate-fade-up">
            <div className="flex items-center justify-between border-b border-rose-200 pb-4">
              <div>
                <h1 className="text-2xl font-black text-[#1A05A2] flex items-center gap-2">
                  <BookOpen className="text-[#db2777]" />
                  <span>About Us Page Images</span>
                </h1>
                <p className="text-xs text-slate-500 mt-1 font-semibold">
                  Click Edit button directly on any about image to replace photo or text.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: "आनंदशाळा मुख्य इमारत", src: aboutForm.photos?.[0] || "/images/aandshala_img.png", tag: "History & Foundation", idx: 0 },
                { title: "आनंद सहल उपक्रम फोटो", src: aboutForm.photos?.[1] || "/images/aandshala sahal 1.jpeg", tag: "Culture & Care", idx: 1 },
                { title: "ज्येष्ठ नागरिक आनंद मेळावा", src: aboutForm.photos?.[2] || "/images/aandmelav 10.jpeg", tag: "Community Gathering", idx: 2 },
              ].map((item, i) => (
                <div key={i} className="bg-white border-2 border-rose-100 rounded-3xl p-3 space-y-2 shadow-sm relative group">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 border h-48">
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black text-[#810B38] border border-rose-200 shadow-xs">
                      {item.tag}
                    </span>

                    {/* CLEAN SINGLE ICON EDIT BUTTON ON IMAGE */}
                    <button
                      onClick={() =>
                        openEditModal({
                          type: "about",
                          title: item.title,
                          imageUrl: item.src,
                          onSave: (newTitle, newUrl) => {
                            const defaultPhotos = ["/images/aandshala_img.png", "/images/aandshala sahal 1.jpeg", "/images/aandmelav 10.jpeg"];
                            const currentPhotos = [...(aboutForm.photos && aboutForm.photos.length > 0 ? aboutForm.photos : defaultPhotos)];
                            currentPhotos[item.idx] = newUrl;
                            const updatedAbout = { ...aboutForm, photos: currentPhotos };
                            setAboutForm(updatedAbout);
                            store.updateAboutData(updatedAbout);
                            showToast(`✅ ${newTitle} photo saved!`);
                          },
                        })
                      }
                      className="absolute top-2 right-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-black text-[#1A05A2] shadow-md hover:bg-rose-50 flex items-center gap-1.5 cursor-pointer border border-rose-200 z-20"
                    >
                      <Edit size={13} className="text-[#db2777]" />
                      <span>Edit</span>
                    </button>

                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 text-white">
                      <p className="font-black text-xs drop-shadow-md truncate">{item.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 4: PHOTO GALLERY WITH CLEAN ON-IMAGE BUTTONS                   */}
        {/* ================================================================== */}
        {activeTab === "gallery" && (
          <div className="space-y-6 animate-fade-up">
            <div className="flex items-center justify-between border-b border-rose-200 pb-4">
              <div>
                <h1 className="text-2xl font-black text-[#1A05A2] flex items-center gap-2">
                  <ImageIcon className="text-[#db2777]" />
                  <span>Photo Gallery (9 Categories)</span>
                </h1>
                <p className="text-xs text-slate-500 mt-1 font-semibold">
                  Clean Edit and Delete buttons on top of every gallery photo.
                </p>
              </div>
            </div>

            {/* ADD NEW GALLERY FORM */}
            <div className="bg-white border-2 border-rose-100 rounded-3xl p-5 space-y-4 shadow-sm">
              <h2 className="text-sm font-black text-[#810B38] flex items-center gap-2">
                <Plus size={18} /> <span>Add New Photo</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Select Category</label>
                    <select
                      value={newGalleryCategory}
                      onChange={(e) => setNewGalleryCategory(e.target.value)}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-800 font-medium"
                    >
                      {galleryCategoriesList.filter((c) => c !== "सर्व").map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Photo Caption / Title</label>
                    <input
                      type="text"
                      value={newGalleryCaption}
                      onChange={(e) => setNewGalleryCaption(e.target.value)}
                      placeholder="e.g. Anand Melava Event Photo"
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-800 placeholder-slate-400 font-medium"
                    />
                  </div>

                  <button
                    onClick={() => {
                      if (!newGalleryUrl) return alert("Please select or drop a photo.");
                      store.addGalleryItem({
                        url: newGalleryUrl,
                        caption: newGalleryCaption || "Preetam Anandshala Photo",
                        category: [newGalleryCategory],
                      });
                      setNewGalleryUrl("");
                      setNewGalleryCaption("");
                      showToast("✅ Photo added to gallery!");
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#db2777] via-purple-600 to-[#1A05A2] text-xs font-black text-white shadow-md cursor-pointer hover:scale-[1.02] transition-transform"
                  >
                    + Add Photo to Gallery
                  </button>
                </div>

                {/* DRAG AND DROP */}
                <div className="flex flex-col justify-center">
                  <ImageDropzone
                    compact
                    label="Drag & drop photo here"
                    onFileSelected={(file) =>
                      handleFileUpload(file, (url) => {
                        setNewGalleryUrl(url);
                      })
                    }
                  />
                  {newGalleryUrl && (
                    <div className="mt-2 flex items-center gap-2 p-2 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-[#db2777]">
                      <CheckCircle size={16} />
                      <span className="truncate">Photo ready!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* FILTER CATEGORY TABS */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {galleryCategoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer ${galleryFilter === cat
                    ? "bg-gradient-to-r from-[#db2777] to-[#1A05A2] text-white shadow-sm"
                    : "bg-white text-slate-600 hover:text-[#db2777] border border-rose-100 shadow-xs"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* GALLERY ITEMS GRID WITH CLEAN SINGLE ICON BUTTONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {store.gallery
                .filter((item) => galleryFilter === "सर्व" || item.category?.includes(galleryFilter))
                .map((item) => (
                  <div key={item.id} className="relative group rounded-2xl overflow-hidden bg-white border border-slate-200 p-2 shadow-xs">
                    <div className="relative rounded-xl overflow-hidden bg-slate-50 border h-48">
                      <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />

                      {/* CLEAN FLOATING BUTTONS DIRECTLY ON IMAGE */}
                      <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20">
                        <button
                          onClick={() =>
                            openEditModal({
                              type: "gallery",
                              id: item.id,
                              title: item.caption,
                              imageUrl: item.url,
                              onSave: (newTitle, newUrl) => {
                                const updated = store.gallery.map((g) =>
                                  g.id === item.id ? { ...g, caption: newTitle, url: newUrl } : g
                                );
                                setStoredData(STORAGE_KEYS.gallery, updated);
                                showToast(`✅ Photo updated!`);
                              },
                            })
                          }
                          className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-black text-[#1A05A2] shadow-md hover:bg-rose-50 flex items-center gap-1 cursor-pointer border border-rose-200"
                        >
                          <Edit size={12} className="text-[#db2777]" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            store.deleteGalleryItem(item.id);
                            showToast("Photo deleted!");
                          }}
                          className="px-3 py-1.5 rounded-full bg-rose-600/95 backdrop-blur-md text-[11px] font-black text-white shadow-md hover:bg-rose-700 flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 size={12} />
                          <span>Delete</span>
                        </button>
                      </div>

                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 text-white">
                        <p className="font-black text-xs drop-shadow-md truncate">{item.caption}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 5: SPORTS CLUB PAGE IMAGES                                     */}
        {/* ================================================================== */}
        {activeTab === "sports" && (
          <div className="space-y-6 animate-fade-up">
            <div className="flex items-center justify-between border-b border-rose-200 pb-4">
              <div>
                <h1 className="text-2xl font-black text-[#1A05A2] flex items-center gap-2">
                  <Dumbbell className="text-[#db2777]" />
                  <span>Sports Club Facilities Images</span>
                </h1>
                <p className="text-xs text-slate-500 mt-1 font-semibold">
                  Click Edit button directly on any sports facility photo to update.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(siteForm.sportsFacilities || []).map((fac) => (
                <div key={fac.id} className="bg-white border-2 border-rose-100 rounded-3xl p-3 space-y-2 shadow-sm relative group">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 border h-48">
                    <img src={fac.imageUrl || "/images/sports img.png"} alt={fac.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-white/90 text-base border border-rose-200 shadow-xs">
                      {fac.icon}
                    </span>

                    {/* CLEAN SINGLE ICON EDIT BUTTON ON IMAGE */}
                    <button
                      onClick={() =>
                        openEditModal({
                          type: "sports",
                          id: fac.id,
                          title: fac.title,
                          imageUrl: fac.imageUrl || "/images/sports img.png",
                          onSave: (newTitle, newUrl) => {
                            const updated = (siteForm.sportsFacilities || []).map((f) =>
                              f.id === fac.id ? { ...f, title: newTitle, imageUrl: newUrl } : f
                            );
                            const newForm = { ...siteForm, sportsFacilities: updated };
                            setSiteForm(newForm);
                            store.updateSiteData(newForm);
                          },
                        })
                      }
                      className="absolute top-2 right-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-black text-[#1A05A2] shadow-md hover:bg-rose-50 flex items-center gap-1.5 cursor-pointer border border-rose-200 z-20"
                    >
                      <Edit size={13} className="text-[#db2777]" />
                      <span>Edit</span>
                    </button>

                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 text-white">
                      <p className="font-black text-xs drop-shadow-md truncate">{fac.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 6: BROCHURE PAGE IMAGES                                       */}
        {/* ================================================================== */}
        {activeTab === "brochure" && (
          <div className="space-y-6 animate-fade-up">
            <div className="flex items-center justify-between border-b border-rose-200 pb-4">
              <div>
                <h1 className="text-2xl font-black text-[#1A05A2] flex items-center gap-2">
                  <FileText className="text-[#db2777]" />
                  <span>Brochure Page Scans</span>
                </h1>
                <p className="text-xs text-slate-500 mt-1 font-semibold">
                  Click Edit button directly on any brochure page photo to replace.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {store.brochures.map((item, idx) => (
                <div key={item.id} className="bg-white border-2 border-rose-100 rounded-3xl p-3 space-y-2 shadow-sm relative group">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 border h-52">
                    <img src={item.fileUrl} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black text-[#810B38] border border-rose-200 shadow-xs">
                      Page #{idx + 1}
                    </span>

                    {/* CLEAN SINGLE ICON EDIT BUTTON ON IMAGE */}
                    <button
                      onClick={() =>
                        openEditModal({
                          type: "brochure",
                          id: item.id,
                          title: item.title,
                          imageUrl: item.fileUrl,
                          onSave: (newTitle, newUrl) => {
                            const updated = store.brochures.map((b) =>
                              b.id === item.id ? { ...b, title: newTitle, fileUrl: newUrl } : b
                            );
                            setStoredData(STORAGE_KEYS.brochures, updated);
                            showToast(`✅ ${newTitle} updated!`);
                          },
                        })
                      }
                      className="absolute top-2 right-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-black text-[#1A05A2] shadow-md hover:bg-rose-50 flex items-center gap-1.5 cursor-pointer border border-rose-200 z-20"
                    >
                      <Edit size={13} className="text-[#db2777]" />
                      <span>Edit</span>
                    </button>

                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 text-white">
                      <p className="font-black text-xs drop-shadow-md truncate">{item.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 7: INQUIRIES & MESSAGES                                        */}
        {/* ================================================================== */}
        {activeTab === "inquiries" && (
          <div className="space-y-6 animate-fade-up">
            <div className="flex items-center justify-between border-b border-rose-200 pb-4">
              <div>
                <h1 className="text-2xl font-black text-[#1A05A2] flex items-center gap-2">
                  <Mail className="text-[#db2777]" />
                  <span>Customer Inquiries</span>
                </h1>
                <p className="text-xs text-slate-500 mt-1 font-semibold">
                  Messages received from website contact and inquiry forms.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {store.inquiries.map((inq) => (
                <div key={inq.id} className="bg-white border-2 border-rose-100 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-slate-900">{inq.name}</span>
                      <span className="text-xs font-black text-[#db2777]">📞 {inq.phone}</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{inq.message}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{inq.date}</span>
                  </div>
                  <button
                    onClick={() => {
                      store.deleteInquiry(inq.id);
                      showToast("Message deleted!");
                    }}
                    className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
