import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAdminStore, uploadImageToFirebase, uploadVideoToFirebase, useResolvedVideoUrl, resetFirebaseDatabase, setStoredData, STORAGE_KEYS, SangliPlaceOverride } from "@/lib/admin-store";
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
  Save,
  Film,
  Video
} from "lucide-react";
import { HighlightText } from "@/components/HighlightText";

type TabKey =
  | "home"
  | "halls"
  | "about"
  | "gallery"
  | "brochure"
  | "inquiries"
  | "sports_home"
  | "sports_facilities"
  | "sports_gallery"
  | "sports_brochure"
  | "sports_inquiries";

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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
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
      setIsUploading(true);
      Promise.resolve(onFileSelected(files[0])).finally(() => setIsUploading(false));
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
    <div
      onClick={() => inputRef.current?.click()}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl transition-all cursor-pointer select-none ${isDragging
          ? "border-pink-600 bg-pink-100 scale-[1.02] shadow-xl ring-4 ring-pink-300"
          : "border-rose-300 hover:border-pink-600 bg-rose-50/50 hover:bg-rose-50/90"
        } ${compact ? "p-3" : "p-5"}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.png,.jpg,.jpeg,.webp"
        className="hidden"
        onChange={handleFileChange}
      />
      {isUploading ? (
        <div className="flex items-center gap-2 text-xs font-black text-pink-600 animate-pulse py-3">
          <span className="size-4 rounded-full border-2 border-pink-600 border-t-transparent animate-spin" />
          <span>फोटो अपलोड होत आहे (Uploading Photo)...</span>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center space-y-1 py-1 pointer-events-none">
          <div className="size-12 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-[#1A05A2] flex items-center justify-center text-white shadow-md shadow-pink-500/20">
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
    </div>
  );
}

function AdminVideoThumbnail({ embedUrl, thumbnail, title }: { embedUrl: string; thumbnail?: string; title: string }) {
  const resolvedUrl = useResolvedVideoUrl(embedUrl);
  const isDirect =
    resolvedUrl.startsWith("data:") ||
    resolvedUrl.startsWith("blob:") ||
    resolvedUrl.startsWith("idb:") ||
    resolvedUrl.endsWith(".mp4") ||
    resolvedUrl.endsWith(".webm") ||
    resolvedUrl.endsWith(".mov") ||
    resolvedUrl.includes("firebasestorage.googleapis.com");

  if (isDirect && resolvedUrl) {
    return (
      <video
        src={resolvedUrl}
        className="w-full h-full object-cover"
        muted
        preload="metadata"
      />
    );
  }

  return (
    <img
      src={thumbnail && !thumbnail.includes("Screenshot") ? thumbnail : "/images/gallery imgage1.JPG"}
      alt={title}
      className="w-full h-full object-cover"
      onError={(e) => {
        (e.target as HTMLImageElement).src = "/images/gallery imgage1.JPG";
      }}
    />
  );
}

// REUSABLE DRAG & DROP VIDEO UPLOAD ZONE COMPONENT
function VideoDropzone({
  onFileSelected,
  label = "Drag & drop video file here or click to browse",
  compact = false,
}: {
  onFileSelected: (file: File) => void;
  label?: string;
  compact?: boolean;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
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
      setIsUploading(true);
      Promise.resolve(onFileSelected(file)).finally(() => setIsUploading(false));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setIsUploading(true);
      Promise.resolve(onFileSelected(file)).finally(() => setIsUploading(false));
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl transition-all cursor-pointer select-none ${isDragging
          ? "border-pink-600 bg-pink-100 scale-[1.02] shadow-xl ring-4 ring-pink-300"
          : "border-purple-300 hover:border-pink-600 bg-purple-50/50 hover:bg-pink-50/80"
        } ${compact ? "p-3" : "p-4"}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="video/*,.mp4,.webm,.mov,.avi,.mkv,.m4v,.wmv,.3gp"
        className="hidden"
        onChange={handleFileChange}
      />
      {isUploading ? (
        <div className="flex items-center gap-2 text-xs font-black text-pink-600 animate-pulse py-3">
          <span className="size-4 rounded-full border-2 border-pink-600 border-t-transparent animate-spin" />
          <span>व्हिडिओ अपलोड होत आहे (Uploading Video)...</span>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center space-y-1 py-1 pointer-events-none">
          <div className="size-11 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-[#1A05A2] flex items-center justify-center text-white shadow-md shadow-pink-500/20">
            <Film size={22} />
          </div>
          <p className="text-xs font-black text-[#1A05A2] mt-1">
            🎥 इथे व्हिडिओ फाईल Drag & Drop करा (Drag & Drop Video Here)
          </p>
          <p className="text-[10px] font-extrabold text-slate-500">
            संगणकावरून व्हिडिओ फाईल ड्रॅग करा किंवा निवडण्यासाठी क्लिक करा (MP4, WEBM, MOV)
          </p>
        </div>
      )}
    </div>
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
    try { localStorage.setItem(HALL_DESCS_KEY, JSON.stringify(updated)); } catch (_) { }
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
  const [isSyncingCloud, setIsSyncingCloud] = useState(false);
  const [activeModule, setActiveModule] = useState<"anandshala" | "sports">("anandshala");

  // Gallery Form State
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [newGalleryCaption, setNewGalleryCaption] = useState("");
  const [newGalleryCategory, setNewGalleryCategory] = useState("ज्येष्ठ नागरिक आनंदशाळा");
  const [galleryFilter, setGalleryFilter] = useState("सर्व");

  // Video Gallery Form State
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoCategory, setNewVideoCategory] = useState("विशेष मनोगत");
  const [newVideoEmbedUrl, setNewVideoEmbedUrl] = useState("");
  const [newVideoThumb, setNewVideoThumb] = useState("");
  const [newVideoDesc, setNewVideoDesc] = useState("");

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
      showToast("⚠️ फोटो अपलोड करताना त्रुटी आली.");
    }
  };

  const handleVideoUpload = async (file: File, onSuccess: (url: string) => void) => {
    try {
      const url = await uploadVideoToFirebase(file, "admin_videos");
      if (url) {
        onSuccess(url);
        showToast("✅ व्हिडिओ यशस्वीरित्या अपलोड झाला!");
      }
    } catch (err) {
      showToast("⚠️ व्हिडिओ अपलोड करताना त्रुटी आली.");
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

  // Sidebar Menu Items filtered by selected module
  const anandshalaMenuItems = [
    {
      id: "home" as TabKey,
      label: "Home Page Photos",
      subLabel: "Poster & Sliders",
      icon: Home,
    },
    {
      id: "halls" as TabKey,
      label: "Activity Halls Photos",
      subLabel: "17 Activity Halls Images",
      icon: Building2,
    },
    {
      id: "about" as TabKey,
      label: "About Us Photos",
      subLabel: "Building & Event Photos",
      icon: BookOpen,
    },
    {
      id: "gallery" as TabKey,
      label: "Photo Gallery",
      subLabel: "Anandshala Gallery Photos",
      icon: ImageIcon,
    },
    {
      id: "brochure" as TabKey,
      label: "Brochure Scans",
      subLabel: "Brochure Page Scans",
      icon: FileText,
    },
    {
      id: "inquiries" as TabKey,
      label: "Inquiries Messages",
      subLabel: "Customer Inquiries",
      icon: Mail,
      count: store.anandshalaInquiries.filter((i) => !i.read).length,
    },
  ];

  const sportsMenuItems = [
    {
      id: "sports_home" as TabKey,
      label: "Sports Home Card",
      subLabel: "Main Section Photo",
      icon: Dumbbell,
    },
    {
      id: "sports_facilities" as TabKey,
      label: "Sports Facilities",
      subLabel: "Gym, Pool & Courts",
      icon: Dumbbell,
    },
    {
      id: "sports_gallery" as TabKey,
      label: "Sports Gallery",
      subLabel: "Sports Club Photos",
      icon: ImageIcon,
    },
    {
      id: "sports_brochure" as TabKey,
      label: "Sports Brochure",
      subLabel: "Club Brochure Scan",
      icon: FileText,
    },
    {
      id: "sports_inquiries" as TabKey,
      label: "Sports Inquiries",
      subLabel: "Sports Club Messages",
      icon: Mail,
      count: store.sportsInquiries.filter((i) => !i.read).length,
    },
  ];

  const menuItems = activeModule === "anandshala" ? anandshalaMenuItems : sportsMenuItems;

  return (
    <div className="h-screen bg-gradient-to-br from-[#f8fafc] via-[#fff8fb] to-[#f0f4ff] text-slate-800 font-sans flex flex-col lg:flex-row relative overflow-hidden">



      {/* EDIT MODAL OVERLAY */}
      {editingModal && (
        <div className="fixed inset-0 z-[999999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border-2 border-rose-200 rounded-3xl p-5 max-w-sm w-full shadow-2xl max-h-[92vh] overflow-y-auto">

            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-rose-100 pb-3 mb-4">
              <h3 className="font-black text-sm text-[#1A05A2] flex items-center gap-2">
                <Edit className="size-4 text-[#db2777]" />
                <span>{editingModal?.type === "video" ? "व्हिडिओ Edit करा" : "आयटम Edit करा"}</span>
              </h3>
              <button
                onClick={() => setEditingModal(null)}
                className="size-8 rounded-full bg-rose-50 text-[#db2777] flex items-center justify-center font-bold hover:bg-rose-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {editingModal?.type === "video" ? (
                <div>
                  <label className="block text-[11px] font-black text-slate-500 mb-1">🎥 व्हिडिओ फाईल बदला (Drag & Drop Video File)</label>
                  <VideoDropzone
                    compact
                    onFileSelected={(file) =>
                      handleVideoUpload(file, (url) => setModalSubtitle(url))
                    }
                  />
                  {modalSubtitle && (
                    <div className="mt-1 flex items-center gap-1.5 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700 truncate">
                      <CheckCircle size={13} className="shrink-0 text-emerald-600" />
                      <span className="truncate">व्हिडिओ अपलोड झाला! (Video Uploaded)</span>
                    </div>
                  )}
                </div>
              ) : (
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
              )}

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
                <label className="block text-[11px] font-black text-slate-500 mb-1">🏷️ नाव / शीर्षक (Title)</label>
                <input
                  type="text"
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  placeholder="नाव लिहा..."
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-800 font-bold focus:border-[#db2777] focus:outline-none"
                />
              </div>

              {/* SUBTITLE / DISTANCE INPUT FOR SANGLI ATTRACTION */}
              {editingModal?.type === "sangliAttraction" && (
                <div>
                  <label className="block text-[11px] font-black text-slate-500 mb-1">📍 अंतर व वेळ (Distance, e.g. ३ किमी (१० मिनिटे))</label>
                  <input
                    type="text"
                    value={modalSubtitle}
                    onChange={(e) => setModalSubtitle(e.target.value)}
                    placeholder="उदा. ३ किमी (१० मिनिटे)"
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-800 font-bold focus:border-[#db2777] focus:outline-none"
                  />
                </div>
              )}

              {/* DESCRIPTION TEXTAREA */}
              {(editingModal?.type === "hall" || editingModal?.type === "video" || editingModal?.type === "sangliAttraction" || (modalDesc && modalDesc.length > 0)) && (
                <div>
                  <label className="block text-[11px] font-black text-slate-500 mb-1">📝 माहिती / Description</label>
                  <textarea
                    value={modalDesc}
                    onChange={(e) => setModalDesc(e.target.value)}
                    placeholder="माहिती लिहा..."
                    rows={3}
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-800 font-medium focus:border-[#db2777] focus:outline-none resize-none"
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
                onClick={async () => {
                  editingModal.onSave(modalTitle, modalImageUrl, modalSubtitle, undefined, modalDesc);
                  setEditingModal(null);
                  showToast("✅ फोटो सेव्ह होऊन फायरबेसवर क्लाउडवर अपडेट झाला!");
                  try {
                    await store.syncAllToFirebaseCloud();
                  } catch (e) {
                    console.warn("Auto-sync background warning:", e);
                  }
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
              {activeModule === "anandshala" ? "🌸 आनंदशाळा पेजेस" : "🏋️‍♂️ स्पोर्ट्स क्लब पेजेस"}
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

        {/* TOP PRIMARY MODULE SWITCHER BUTTONS BAR */}
        <div className="bg-white border-2 border-rose-100/90 rounded-3xl p-4 mb-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-gradient-to-r from-[#db2777] to-[#1A05A2] flex items-center justify-center text-white text-lg font-black shadow-md shrink-0">
              {activeModule === "anandshala" ? "🌸" : "🏋️‍♂️"}
            </div>
            <div>
              <h2 className="text-sm font-black text-[#1A05A2] tracking-tight">
                {activeModule === "anandshala" ? "🌸 प्रीतम आनंदशाळा ॲडमिन फोटो पॅनेल" : "🏋️‍♂️ प्रीतम स्पोर्ट्स अँड फिटनेस क्लब"}
              </h2>
              <p className="text-[11px] text-slate-500 font-extrabold">
                {activeModule === "anandshala" ? "आनंदशाळेचे फोटो बदलण्यासाठी सेक्‍शन निवडा" : "स्पोर्ट्स क्लबचे फोटो बदलण्यासाठी सेक्‍शन निवडा"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                setActiveModule("anandshala");
                setActiveTab("home");
              }}
              className={`flex-1 sm:flex-initial px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${activeModule === "anandshala"
                ? "bg-gradient-to-r from-[#db2777] to-[#1A05A2] text-white ring-4 ring-rose-200 scale-102"
                : "bg-rose-50 text-slate-700 hover:bg-rose-100 border-2 border-rose-200"
                }`}
            >
              <span>🌸</span>
              <span>प्रीतम आनंदशाळा</span>
            </button>

            <button
              onClick={() => {
                setActiveModule("sports");
                setActiveTab("sports_home");
              }}
              className={`flex-1 sm:flex-initial px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${activeModule === "sports"
                ? "bg-gradient-to-r from-[#db2777] to-[#1A05A2] text-white ring-4 ring-rose-200 scale-102"
                : "bg-rose-50 text-slate-700 hover:bg-rose-100 border-2 border-rose-200"
                }`}
            >
              <span>🏋️‍♂️</span>
              <span>प्रीतम स्पोर्ट्स अँड फिटनेस क्लब</span>
            </button>
          </div>
        </div>

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

                  <div className="relative group rounded-3xl overflow-hidden border-2 border-rose-200 shadow-md h-52 sm:h-60 bg-slate-900">
                    <img
                      src={encodeURI(siteForm.aanandshalaImages?.[0] || "/images/aandshala sahal 1.jpeg")}
                      alt="Anandshala Card"
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/images/aandshala%20sahal%201.jpeg"; }}
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
                      <p className="font-black text-xs text-white drop-shadow-md truncate">
                        <HighlightText text={siteForm.aanandshalaTitle || "प्रीतम ज्येष्ठ नागरिक आनंदशाळा व निवारा"} />
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

                  <div className="relative group rounded-3xl overflow-hidden border-2 border-rose-200 shadow-md h-52 sm:h-60 bg-slate-900">
                    <img
                      src={encodeURI(siteForm.sportsImages?.[0] || "/images/sports%20img.png")}
                      alt="Sports Club Card"
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/images/sports%20img.png"; }}
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
                                const updatedHalls = (store.siteData.activityHalls || []).map((h, i) =>
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
                          <p className="font-black text-xs text-white drop-shadow-md truncate"><HighlightText text={hall.title} /></p>
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
        {/* TAB 3: ABOUT US PAGE COMPLETE MANAGEMENT                           */}
        {/* ================================================================== */}
        {activeTab === "about" && (
          <div className="space-y-8 animate-fade-up">
            <div className="flex items-center justify-between border-b border-rose-200 pb-4">
              <div>
                <h1 className="text-2xl font-black text-[#1A05A2] flex items-center gap-2">
                  <BookOpen className="text-[#db2777]" />
                  <span>About Us Page Manager (माहिती व फोटो नियंत्रण)</span>
                </h1>
                <p className="text-xs text-slate-500 mt-1 font-semibold">
                  Manage About Us intro story, building photos, and Sangli attractions with Edit & Delete buttons.
                </p>
              </div>
            </div>

            {/* SECTION 1: ABOUT US HERO INTRO STORY & CEREMONY PHOTO */}
            <div className="bg-white border-2 border-rose-100 rounded-3xl p-5 sm:p-6 space-y-5 shadow-sm">
              <h2 className="text-base font-black text-[#810B38] flex items-center gap-2 border-b border-rose-100 pb-3">
                <span>📖</span>
                <span>१. आनंदशाळा : एक परिचय व संकल्पना (Main Story & Photo)</span>
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Ceremony Main Image */}
                <div className="lg:col-span-5 space-y-2">
                  <label className="block text-xs font-black text-slate-700">📸 मुख्य सोहळा / इमारत फोटो (Main Ceremony Photo)</label>
                  <div className="relative group rounded-3xl overflow-hidden border-2 border-rose-200 shadow-md">
                    <img
                      src={aboutForm.storyMainImage || "/images/imgever.JPG"}
                      alt="Story Ceremony Photo"
                      className="w-full h-64 object-cover"
                    />

                    <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
                      <button
                        onClick={() =>
                          openEditModal({
                            type: "storyPhoto",
                            title: "आनंदशाळा मुख्य सोहळा फोटो",
                            imageUrl: aboutForm.storyMainImage || "/images/imgever.JPG",
                            onSave: (_t, newUrl) => {
                              const updatedAbout = { ...aboutForm, storyMainImage: newUrl };
                              setAboutForm(updatedAbout);
                              store.updateAboutData(updatedAbout);
                              showToast("✅ मुख्य सोहळा फोटो अपडेट झाला!");
                            },
                          })
                        }
                        className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-black text-[#1A05A2] shadow-lg hover:bg-rose-50 flex items-center gap-1.5 border border-rose-200 cursor-pointer"
                      >
                        <Edit size={13} className="text-[#db2777]" />
                        <span>Edit Photo</span>
                      </button>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white">
                      <p className="font-black text-xs drop-shadow-md">आनंदशाळा सोहळा फोटो</p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Title & Text Inputs */}
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">🏷️ मुख्य शीर्षक (Title - Marathi)</label>
                    <input
                      type="text"
                      value={aboutForm.storyTitleMr || "प्रीतम आनंदशाळा : एक परिचय व संकल्पना"}
                      onChange={(e) => setAboutForm({ ...aboutForm, storyTitleMr: e.target.value })}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-800 font-bold focus:border-[#db2777] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">📝 परिचय माहिती (Description - Marathi)</label>
                    <textarea
                      rows={4}
                      value={aboutForm.storyDescMr || "“प्रीतम सीनियर सिटिझन आनंदशाळा” ही सांगली, महाराष्ट्र, भारत येथे स्थित एक विशेष ज्येष्ठ नागरिक सेवा सुविधा आणि मनोरंजन केंद्र आहे. उद्योजक श्री. अभिनय जगन्नाथ कामाजी यांनी प्रीतम बिझनेस ग्रुपच्या अंतर्गत याची स्थापना केली आहे. ज्येष्ठ नागरिकांसाठी समर्पित केअरटेकर सेवा, सहवास आणि आरोग्यविषयक सहाय्य उपलब्ध करून देणारे एक प्रीमियम केंद्र म्हणून याची ओळख निर्माण झाली आहे."}
                      onChange={(e) => setAboutForm({ ...aboutForm, storyDescMr: e.target.value })}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-800 font-medium focus:border-[#db2777] focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={() => {
                      store.updateAboutData(aboutForm);
                      showToast("✅ About Us माहिती सेव्ह झाली!");
                    }}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#db2777] to-[#1A05A2] text-xs font-black text-white shadow-md hover:scale-105 transition-transform cursor-pointer flex items-center gap-2"
                  >
                    <Save size={14} />
                    <span>Save About Us Details</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION 2: SANGLI & NEARBY ATTRACTIONS MANAGEMENT (14 PLACES) */}
            <div className="bg-white border-2 border-rose-100 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
              <h2 className="text-base font-black text-[#810B38] flex items-center justify-between border-b border-rose-100 pb-3">
                <span className="flex items-center gap-2">
                  <span>🗺️</span>
                  <span>२. सांगली परिसरातील १४ प्रमुख पर्यटन व तीर्थक्षेत्रे (Sangli 14 Attractions)</span>
                </span>
                <span className="text-xs font-bold text-slate-500">14 Places</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { id: "sangli-ganpati", title: "१. सांगली गणपती मंदिर (राजवाडा)", dist: "३ किमी (१० मिनिटे)", desc: " १८४३ मध्ये बांधलेले काळ्या पाषाणातील ऐतिहासिक राजवाडा मंदिर...", img: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=1200&auto=format&fit=crop" },
                  { id: "sangli-fort-rajwada", title: "२. सांगली किल्ला व राजवाडा परिसर", dist: "३.५ किमी (१२ मिनिटे)", desc: "पटवर्धन संस्थानाचा ऐतिहासिक राजवाडा, कारंजे, पुरातत्व वास्तू...", img: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?q=80&w=1200&auto=format&fit=crop" },
                  { id: "sangmeshwar-haripur", title: "३. संगमेश्वर मंदिर (हरिपूर संगम)", dist: "५ किमी (१५ मिनिटे)", desc: "कृष्णा आणि वारणा नद्यांच्या पवित्र संगमावर वसलेले शिवमंदिर...", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop" },
                  { id: "krishna-irwin-bridge", title: "४. कृष्णा नदीकाठ व आयर्विन पूल", dist: "४ किमी (१० मिनिटे)", desc: "१९२९ मधील ब्रिटिशकालीन ऐतिहासिक लाल दगडाचा पूल...", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop" },
                  { id: "miraj-dargah", title: "५. मिरज - ख्वाजा मीरासाहेब दर्गाह", dist: "१० किमी (२० मिनिटे)", desc: "हिंदू-मुस्लिम सलोख्याचे ऐतिहासिक दर्गाह व मिरज सतार-तंबोरा केंद्र...", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop" },
                  { id: "audumbar-temple", title: "६. औदुंबर - श्री दत्त क्षेत्र (दत्त मंदिर)", dist: "२५ किमी (४० मिनिटे)", desc: "कृष्णा नदीच्या काठावर औदुंबराच्या दाट सावलीत वसलेले दत्त मंदिर...", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" },
                  { id: "dandoba-hills", title: "७. दंडोबा टेकडी व गुहा शिवमंदिर", dist: "२५ किमी (३० मिनिटे)", desc: "राखीव वनक्षेत्र, टेकडी, प्राचीन गुहेतील शिवमंदिर...", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop" },
                  { id: "sagareshwar-sanctuary", title: "८. सागरेश्वर वन्यजीव अभयारण्य", dist: "३० किमी (४५ मिनिटे)", desc: "१,०००+ हरणे, काळवीट, मोर व प्राचीन दगडी शिवमंदिर समूह...", img: "https://images.unsplash.com/photo-1484406566174-9da000fda645?q=80&w=1200&auto=format&fit=crop" },
                  { id: "bahubali-kumbhojgiri", title: "९. बाहुबली कुंभोजगिरी (जैन तीर्थक्षेत्र)", dist: "३५ किमी (५० मिनिटे)", desc: "२८ फुटांची भव्य बाहुबली मूर्ती असलेले टेकडीवरील जैन तीर्थक्षेत्र...", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop" },
                  { id: "ramling-island-bahe", title: "१०. रामलिंग बेट व राममंदिर (बहे)", dist: "३८ किमी (५० मिनिटे)", desc: "कृष्णा नदीच्या पात्रातील निसर्गरम्य बेट, राममंदिर...", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop" },
                  { id: "chandoli-national-park", title: "११. चांदोली राष्ट्रीय उद्यान व धरण", dist: "६५ किमी (१.५ तास)", desc: "सह्याद्री व्याघ्र प्रकल्प, विशाल धरण व जंगल परिसर...", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop" },
                  { id: "gokak-waterfall", title: "१२. गोकाक भव्य धबधबा", dist: "७५ किमी (१.५ तास)", desc: "१७७ फूट उंचीवरून कोसळणारा धबधबा व लटकता पूल...", img: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1200&auto=format&fit=crop" },
                  { id: "machhindragad-fort", title: "१३. मच्छिंद्रगड किल्ला व मंदिर", dist: "४५ किमी (१ तास)", desc: "छत्रपती शिवाजी महाराजांनी १६७६ मध्ये बांधलेला किल्ला...", img: "https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=1200&auto=format&fit=crop" },
                  { id: "kolhapur-excursion", title: "१४. कोल्हापूर - श्री महालक्ष्मी मंदिर & न्यू पॅलेस", dist: "५० किमी (१ तास)", desc: "श्री अंबाबाई महालक्ष्मी मंदिर, न्यू पॅलेस राजवाडा व रंकाळा...", img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop" },
                ].map((attraction) => {
                  const ov: SangliPlaceOverride = (store.aboutData?.sangliPlacesOverrides?.[attraction.id] || {}) as SangliPlaceOverride;
                  const currentImage = ov.image || attraction.img;
                  const currentTitle = ov.titleMr || attraction.title;
                  const currentDist = ov.distanceMr || attraction.dist;
                  const currentDesc = ov.shortDescMr || attraction.desc;

                  return (
                    <div key={attraction.id} className="bg-white border-2 border-rose-100 rounded-3xl p-3 space-y-2 shadow-sm relative group">
                      <div className="relative rounded-2xl overflow-hidden bg-slate-50 border h-48">
                        <img src={currentImage} alt={currentTitle} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black text-[#810B38] border border-rose-200 shadow-xs">
                          {currentDist}
                        </span>

                        <button
                          onClick={() =>
                            openEditModal({
                              type: "sangliAttraction",
                              title: currentTitle,
                              imageUrl: currentImage,
                              subtitle: currentDist,
                              desc: currentDesc,
                              onSave: (newTitle, newUrl, newDist, _cat, newDesc) => {
                                const currentOverrides = store.aboutData?.sangliPlacesOverrides || {};
                                const updatedOverrides = {
                                  ...currentOverrides,
                                  [attraction.id]: {
                                    id: attraction.id,
                                    image: newUrl,
                                    titleMr: newTitle,
                                    distanceMr: newDist || currentDist,
                                    shortDescMr: newDesc || currentDesc,
                                  },
                                };
                                const updatedAbout = { ...aboutForm, sangliPlacesOverrides: updatedOverrides };
                                setAboutForm(updatedAbout);
                                store.updateAboutData(updatedAbout);
                                showToast(`✅ ${newTitle} saved!`);
                              },
                            })
                          }
                          className="absolute top-2 right-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-black text-[#1A05A2] shadow-md hover:bg-rose-50 flex items-center gap-1.5 cursor-pointer border border-rose-200 z-20"
                        >
                          <Edit size={13} className="text-[#db2777]" />
                          <span>Edit</span>
                        </button>

                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 text-white">
                          <p className="font-black text-xs drop-shadow-md truncate">{currentTitle}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
                      if (!newGalleryUrl) return showToast("⚠️ कृपया फोटो निवडा!");
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

            {/* ============================================================ */}
            {/* VIDEO GALLERY MANAGER                                        */}
            {/* ============================================================ */}
            <div className="bg-white border-2 border-rose-200 rounded-3xl p-5 sm:p-6 space-y-5 shadow-sm mt-8">
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <h2 className="text-base font-black text-[#810B38] flex items-center gap-2">
                  <span>🎥</span>
                  <span>व्हिडिओ गॅलरी मॅनेजर (Video Gallery Manager)</span>
                </h2>
                <span className="text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
                  एकूण {store.videos.length} व्हिडिओ
                </span>
              </div>

              {/* ADD NEW VIDEO FORM */}
              <div className="bg-rose-50/50 border border-rose-200 p-4 sm:p-5 rounded-2xl space-y-4">
                <h3 className="text-xs font-black text-[#1A05A2] flex items-center gap-1.5">
                  <Plus size={16} /> <span>नवीन व्हिडिओ जोडा (+ Add New Video)</span>
                </h3>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">व्हिडिओ शीर्षक (Title)</label>
                  <input
                    type="text"
                    placeholder="उदा. डॉ. गिरीश ओक मनोगत"
                    value={newVideoTitle}
                    onChange={(e) => setNewVideoTitle(e.target.value)}
                    className="w-full rounded-xl bg-white border border-slate-200 p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                {/* DRAG & DROP VIDEO FILE */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-700">
                    🎥 व्हिडिओ फाईल ड्रॅग & ड्रॉप करा (Drag & Drop Video File)
                  </label>
                  <VideoDropzone
                    compact
                    onFileSelected={(file) => {
                      if (!newVideoTitle.trim()) {
                        const cleanTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[_]/g, " ");
                        setNewVideoTitle(cleanTitle);
                      }
                      handleVideoUpload(file, (url) => setNewVideoEmbedUrl(url));
                    }}
                  />
                  {newVideoEmbedUrl ? (
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 truncate">
                      <CheckCircle size={14} className="shrink-0 text-emerald-600" />
                      <span className="truncate">व्हिडिओ फाईल तयार आहे! (Video Uploaded Successfully)</span>
                    </div>
                  ) : (
                    <div className="pt-1">
                      <input
                        type="text"
                        placeholder="किंवा YouTube Link / URL प्रविष्ट करा..."
                        value={newVideoEmbedUrl}
                        onChange={(e) => setNewVideoEmbedUrl(e.target.value)}
                        className="w-full rounded-xl bg-white border border-slate-200 p-2 text-[11px] text-slate-700 font-medium placeholder:text-slate-400"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">व्हिडिओ माहिती (Description)</label>
                  <input
                    type="text"
                    placeholder="व्हिडिओबद्दल संक्षिप्त माहिती..."
                    value={newVideoDesc}
                    onChange={(e) => setNewVideoDesc(e.target.value)}
                    className="w-full rounded-xl bg-white border border-slate-200 p-2.5 text-xs text-slate-800 font-medium"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => {
                      if (!newVideoEmbedUrl.trim()) {
                        showToast("⚠️ कृपया आधी व्हिडिओ फाईल ड्रॅग & ड्रॉप करा!");
                        return;
                      }
                      const finalTitle = newVideoTitle.trim() || "आनंदशाळा विशेष व्हिडिओ";
                      let finalEmbed = newVideoEmbedUrl.trim();
                      if (finalEmbed.includes("watch?v=")) {
                        finalEmbed = finalEmbed.replace("watch?v=", "embed/");
                      }
                      store.addVideoItem({
                        title: finalTitle,
                        category: "विशेष मनोगत",
                        embedUrl: finalEmbed,
                        thumbnail: newVideoThumb.trim() || "/images/Screenshot 2026-07-31 103107.png",
                        desc: newVideoDesc.trim() || "",
                        duration: "०३:०० मिनिटे",
                        date: "२०२६",
                      });
                      store.syncAllToFirebaseCloud();
                      setNewVideoTitle("");
                      setNewVideoEmbedUrl("");
                      setNewVideoThumb("");
                      setNewVideoDesc("");
                      showToast("✅ नवीन व्हिडिओ सेव्ह झाला!");
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-black text-xs shadow-md hover:scale-105 transition cursor-pointer"
                  >
                    + व्हिडिओ सेव्ह करा
                  </button>
                </div>
              </div>

              {/* EXISTING VIDEOS LIST WITH EDIT & DELETE BUTTONS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {store.videos.map((item) => (
                  <div key={item.id} className="relative group rounded-2xl overflow-hidden bg-white border-2 border-rose-100 p-3 space-y-2 shadow-xs">
                    <div className="relative rounded-xl overflow-hidden bg-slate-900 h-44">
                      <AdminVideoThumbnail embedUrl={item.embedUrl} thumbnail={item.thumbnail} title={item.title} />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="size-10 rounded-full bg-pink-600/95 text-white flex items-center justify-center border border-white shadow-md">
                          ▶
                        </div>
                      </div>

                      {/* EDIT & DELETE BUTTONS DIRECTLY ON VIDEO IMAGE */}
                      <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20">
                        <button
                          onClick={() =>
                            openEditModal({
                              type: "video",
                              id: item.id,
                              title: item.title,
                              imageUrl: item.thumbnail,
                              desc: item.desc || "",
                              subtitle: item.embedUrl,
                              onSave: (newTitle, newThumb, newEmbed, _cat, newDesc) => {
                                let finalUrl = newEmbed || item.embedUrl;
                                if (finalUrl.includes("watch?v=")) {
                                  finalUrl = finalUrl.replace("watch?v=", "embed/");
                                }
                                store.updateVideoItem(item.id, {
                                  title: newTitle,
                                  thumbnail: newThumb,
                                  embedUrl: finalUrl,
                                  desc: newDesc,
                                });
                                store.syncAllToFirebaseCloud();
                                showToast("✅ व्हिडिओ अपडेट झाला!");
                              },
                            })
                          }
                          className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-black text-[#1A05A2] shadow-md hover:bg-rose-50 flex items-center gap-1 cursor-pointer border border-rose-200"
                        >
                          <Edit size={12} className="text-[#db2777]" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => {
                            store.deleteVideoItem(item.id);
                            store.syncAllToFirebaseCloud();
                            showToast("🗑️ व्हिडिओ हटवला!");
                          }}
                          className="px-3 py-1 rounded-full bg-rose-600/95 backdrop-blur-md text-[11px] font-black text-white shadow-md hover:bg-rose-700 flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 size={12} />
                          <span>Delete</span>
                        </button>
                      </div>

                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-pink-600 text-white text-[9px] font-black shadow-xs">
                        {item.category}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="text-xs font-black text-[#1A05A2] truncate">
                        <HighlightText text={item.title} />
                      </h4>
                      <p className="text-[10px] text-slate-500 truncate">{item.desc || item.embedUrl}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* SPORTS TAB 1: SPORTS HOME CARD                                      */}
        {/* ================================================================== */}
        {activeTab === "sports_home" && (
          <div className="space-y-6 animate-fade-up">
            <div className="flex items-center justify-between border-b border-rose-200 pb-4">
              <div>
                <h1 className="text-2xl font-black text-[#1A05A2] flex items-center gap-2">
                  <Dumbbell className="text-[#db2777]" />
                  <span>Sports Club Main Section Photo</span>
                </h1>
                <p className="text-xs text-slate-500 mt-1 font-semibold">
                  Manage homepage sports club main section image.
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-rose-100 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm max-w-xl">
              <h2 className="text-base font-black text-[#810B38] flex items-center gap-2">
                <span>🏋️‍♂️</span>
                <span>Sports Club Main Card Photo</span>
              </h2>

              <div className="relative group rounded-3xl overflow-hidden border-2 border-rose-200 shadow-md">
                <img
                  src={siteForm.sportsImages?.[0] || "/images/sports img.png"}
                  alt="Sports Club Card"
                  className="w-full h-64 object-cover"
                />

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
        )}

        {/* ================================================================== */}
        {/* SPORTS TAB 2: SPORTS FACILITIES                                     */}
        {/* ================================================================== */}
        {activeTab === "sports_facilities" && (
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
        {/* SPORTS TAB 3: SPORTS GALLERY                                        */}
        {/* ================================================================== */}
        {activeTab === "sports_gallery" && (
          <div className="space-y-6 animate-fade-up">
            <div className="flex items-center justify-between border-b border-rose-200 pb-4">
              <div>
                <h1 className="text-2xl font-black text-[#1A05A2] flex items-center gap-2">
                  <ImageIcon className="text-[#db2777]" />
                  <span>Sports Club Photo Gallery</span>
                </h1>
                <p className="text-xs text-slate-500 mt-1 font-semibold">
                  Manage sports club gallery photos with Edit and Delete options.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(siteForm.sportsGallery || []).map((url, idx) => (
                <div key={idx} className="relative group rounded-2xl overflow-hidden bg-white border border-slate-200 p-2 shadow-xs">
                  <div className="relative rounded-xl overflow-hidden bg-slate-50 border h-48">
                    <img src={url} alt={`Sports Gallery ${idx + 1}`} className="w-full h-full object-cover" />

                    <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20">
                      <button
                        onClick={() =>
                          openEditModal({
                            type: "sportsGallery",
                            title: `Sports Photo #${idx + 1}`,
                            imageUrl: url,
                            onSave: (_newTitle, newUrl) => {
                              const currentGal = [...(siteForm.sportsGallery || [])];
                              currentGal[idx] = newUrl;
                              const newForm = { ...siteForm, sportsGallery: currentGal };
                              setSiteForm(newForm);
                              store.updateSiteData(newForm);
                              showToast(`✅ Sports Photo updated!`);
                            },
                          })
                        }
                        className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-black text-[#1A05A2] shadow-md hover:bg-rose-50 flex items-center gap-1 cursor-pointer border border-rose-200"
                      >
                        <Edit size={12} className="text-[#db2777]" />
                        <span>Edit</span>
                      </button>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 text-white">
                      <p className="font-black text-xs drop-shadow-md truncate">Sports Photo #{idx + 1}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* SPORTS TAB 4: SPORTS BROCHURE                                      */}
        {/* ================================================================== */}
        {activeTab === "sports_brochure" && (
          <div className="space-y-6 animate-fade-up">
            <div className="flex items-center justify-between border-b border-rose-200 pb-4">
              <div>
                <h1 className="text-2xl font-black text-[#1A05A2] flex items-center gap-2">
                  <FileText className="text-[#db2777]" />
                  <span>Sports Club Brochure Scan</span>
                </h1>
                <p className="text-xs text-slate-500 mt-1 font-semibold">
                  Manage sports club official brochure scan photo.
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-rose-100 rounded-3xl p-5 space-y-4 shadow-sm max-w-md">
              <div className="relative rounded-2xl overflow-hidden bg-slate-50 border h-64">
                <img
                  src={siteForm.sportsBrochureUrl || "/images/Screenshot 2026-07-31 103659.png"}
                  alt="Sports Brochure"
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20">
                  <button
                    onClick={() =>
                      openEditModal({
                        type: "sportsBrochure",
                        title: "Sports Club Brochure",
                        imageUrl: siteForm.sportsBrochureUrl || "/images/Screenshot 2026-07-31 103659.png",
                        onSave: (_newTitle, newUrl) => {
                          const newForm = { ...siteForm, sportsBrochureUrl: newUrl };
                          setSiteForm(newForm);
                          store.updateSiteData(newForm);
                          showToast("✅ Sports Brochure saved!");
                        },
                      })
                    }
                    className="px-3.5 py-1.5 rounded-full bg-white/95 text-xs font-black text-[#1A05A2] shadow-md hover:bg-rose-50 flex items-center gap-1.5 border border-rose-200 cursor-pointer"
                  >
                    <Edit size={13} className="text-[#db2777]" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* SPORTS TAB 5: SPORTS INQUIRIES                                     */}
        {/* ================================================================== */}
        {activeTab === "sports_inquiries" && (
          <div className="space-y-6 animate-fade-up">
            <div className="flex items-center justify-between border-b border-rose-200 pb-4">
              <div>
                <h1 className="text-2xl font-black text-[#1A05A2] flex items-center gap-2">
                  <Mail className="text-[#db2777]" />
                  <span>Sports Club Inquiries Messages</span>
                </h1>
                <p className="text-xs text-slate-500 mt-1 font-semibold">
                  Messages received from website for sports club memberships & queries.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {store.sportsInquiries.map((inq) => (
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
