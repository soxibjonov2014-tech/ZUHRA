import { useState, useEffect, FormEvent } from "react";
import { 
  User, 
  Mail, 
  Clock, 
  Settings, 
  ShieldCheck, 
  Database, 
  PlusCircle, 
  Check, 
  Sparkles,
  BarChart2,
  Bookmark
} from "lucide-react";

interface ProfileItem {
  email: string;
  name: string;
  role: string;
  joinedAt: string;
  isCurrent: boolean;
  xp: number;
}

export default function Profile() {
  const [profiles, setProfiles] = useState<ProfileItem[]>([
    {
      email: "soxibjonov2014@gmail.com",
      name: "Soxibjonov (Siz)",
      role: "Oltin Talaba / Master",
      joinedAt: "2026-06-04 06:23:08 UTC",
      isCurrent: true,
      xp: 450
    },
    {
      email: "mehmon@academy.uz",
      name: "Guest Learner",
      role: "Boshlang'ich O'rganuvchi",
      joinedAt: "2026-06-04 06:27:12 UTC",
      isCurrent: false,
      xp: 120
    }
  ]);

  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [activeProfile, setActiveProfile] = useState<ProfileItem | null>(null);

  useEffect(() => {
    const cur = profiles.find(p => p.isCurrent);
    if (cur) setActiveProfile(cur);
  }, [profiles]);

  const switchProfile = (email: string) => {
    setProfiles(prev => prev.map(p => ({
      ...p,
      isCurrent: p.email === email
    })));
  };

  const handleAddProfile = (e: FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newName) return;

    const newProf: ProfileItem = {
      email: newEmail,
      name: newName,
      role: "Boshlang'ich Talaba",
      joinedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + " UTC",
      isCurrent: false,
      xp: 0
    };

    setProfiles(prev => [...prev, newProf]);
    setNewEmail("");
    setNewName("");
  };

  return (
    <div id="profile-view" className="w-full max-w-4xl mx-auto space-y-6 px-4 md:px-0 text-left animate-fade-in">
      
      {/* Top Main Greeting Dashboard */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />

        <div className="flex items-center gap-4 md:gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/10 font-black text-2xl relative select-none">
            {activeProfile?.name ? activeProfile.name.charAt(0).toUpperCase() : "U"}
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-4 border-slate-900 flex items-center justify-center" title="Faol login" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono bg-indigo-600/20 text-indigo-400 border border-indigo-600/30 px-2.5 py-0.5 rounded-md font-semibold tracking-wider">
              Tizimga kirgan foydalanuvchi
            </span>
            <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">{activeProfile?.name}</h1>
            <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <Mail size={12} className="text-indigo-400" />
              {activeProfile?.email}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch self-stretch md:self-auto justify-center">
          <div className="bg-slate-950 border border-slate-850 px-4.5 py-3 rounded-2xl text-center space-y-0.5 min-w-[100px]">
            <span className="text-[9px] text-slate-500 uppercase font-mono tracking-wider">Mavqe</span>
            <p className="text-xs font-bold text-emerald-400">{activeProfile?.role}</p>
          </div>
          <div className="bg-slate-950 border border-slate-850 px-4.5 py-3 rounded-2xl text-center space-y-0.5 min-w-[100px]">
            <span className="text-[9px] text-slate-500 uppercase font-mono tracking-wider">O'rganish Ballari (XP)</span>
            <p className="text-xs font-bold text-indigo-400 font-mono">{activeProfile?.xp} XP</p>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Current active session tracking details */}
        <div className="md:col-span-7 space-y-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Clock className="text-indigo-400" size={16} />
              Faol Seans Tafsilotlari (Session Specs)
            </h2>
            
            <div className="grid grid-cols-1 gap-2.5">
              
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-850 flex items-center justify-between text-xs">
                <span className="text-slate-400">Hozirgi Server Vaqti:</span>
                <span className="text-white font-mono font-medium">2026-06-04 06:28:22 UTC</span>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-850 flex items-center justify-between text-xs">
                <span className="text-slate-400">Akkaunt Yaralgan Sana:</span>
                <span className="text-slate-300 font-mono">{activeProfile?.joinedAt}</span>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-850 flex items-center justify-between text-xs">
                <span className="text-slate-400">Ruxsat darajasi:</span>
                <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1.5">
                  <ShieldCheck size={14} />
                  Xavfsiz / Mualliflashgan
                </span>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-850 flex items-center justify-between text-xs">
                <span className="text-slate-400">Ma'lumotlar Saqlanishi:</span>
                <span className="text-indigo-400 font-mono flex items-center gap-1.5">
                  <Database size={13} />
                  Local System Storage
                </span>
              </div>

            </div>

            <div className="bg-slate-950 border border-slate-850/65 p-4 rounded-xl text-slate-400 text-xs leading-relaxed space-y-1">
              <p className="font-semibold text-white flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-400" />
                Interaktivlik haqida:
              </p>
              <p>Platformada siz tanlagan profil bo'yicha darslar, to'plangan so'z o'yinlari ballari va AI xabarlar yozishmalari shaxsiylashtiriladi!</p>
            </div>
          </div>

          {/* Connected profiles list */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-100">Ro'yxatdan o'tgan foydalanuvchilar (Seanslar)</h2>
            <p className="text-xs text-slate-400">Siz ushbu darslik platformasiga boshqa bir o'rganuvchi nomidan kirishingiz mumkin:</p>
            
            <div className="grid grid-cols-1 gap-2.5">
              {profiles.map((p) => (
                <div 
                  key={p.email}
                  className={`p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer ${
                    p.isCurrent 
                      ? "bg-indigo-600/10 border-indigo-600/40" 
                      : "bg-slate-950/60 border-slate-850 hover:bg-slate-900"
                  }`}
                  onClick={() => switchProfile(p.email)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                      p.isCurrent ? "bg-indigo-600 text-white" : "bg-slate-900 text-slate-400"
                    }`}>
                      {p.name.charAt(0)}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-white">{p.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">{p.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-slate-900 border border-slate-850 px-2 py-1 rounded-md text-indigo-400 font-mono">
                      {p.xp} XP
                    </span>
                    {p.isCurrent && (
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 font-sans">
                        <Check size={10} />
                        Faol
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Quick enrollment simulation */}
        <div className="md:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
            <PlusCircle className="text-indigo-400" size={16} />
            Yangi O'quvchi Qo'shish
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Agar sinfdoshingiz yoki do'stingiz ham bu saytdan o'qimoqchi bo'lsa, quyida profil qo'shing va seansni almashtiring.
          </p>

          <form onSubmit={handleAddProfile} className="space-y-3.5 pt-2">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider font-semibold font-mono text-slate-400">Ism-Familiya</label>
              <input
                id="add-profile-name"
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Masalan: Behruz Ali"
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-650 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider font-semibold font-mono text-slate-400">Elektron Pochta</label>
              <input
                id="add-profile-email"
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Masalan: behruz@gmail.com"
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-650 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <button
              id="submit-new-profile-btn"
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-bold text-xs transition active:scale-95 cursor-pointer"
            >
              O'quvchi Ro'yxatini Qo'shish
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
