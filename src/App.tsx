/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  BookOpen, 
  Gamepad2, 
  MessageSquare, 
  UserCheck, 
  GraduationCap, 
  Sparkles,
  Search,
  Settings,
  Mic
} from "lucide-react";
import Lessons from "./components/Lessons";
import Chat from "./components/Chat";
import Game from "./components/Game";
import Profile from "./components/Profile";
import Speaking from "./components/Speaking";

export default function App() {
  const [activeTab, setActiveTab] = useState<"lessons" | "game" | "chat" | "profile" | "speaking">("lessons");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Visual background lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[350px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
              <GraduationCap size={22} />
            </div>
            <div className="text-left">
              <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                Ingliz Tili Akademiyasi
                <span className="text-[10px] bg-indigo-600/20 text-indigo-400 font-bold border border-indigo-600/30 px-2 py-0.5 rounded-full">v1.2</span>
              </h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Xush kelibsiz • soxibjonov2014</p>
            </div>
          </div>

          {/* Quick Stats banner bar */}
          <div className="hidden md:flex items-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sinxronizatsiya faol</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-full px-3 py-1.5 flex items-center gap-1.5 font-mono text-[11px]">
              <span className="text-indigo-400">Kiruvchi:</span>
              <span className="text-white font-bold">soxibjonov2014@gmail.com</span>
            </div>
          </div>

        </div>
      </header>

      {/* Mobile-responsible Navigation Tabs */}
      <nav className="border-b border-slate-900 bg-slate-950/40 py-2.5 sticky top-[73px] sm:top-[72px] z-40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-1.5 sm:gap-3 justify-center">
            
            <button
              id="nav-btn-lessons"
              onClick={() => setActiveTab("lessons")}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition duration-200 outline-none ${
                activeTab === "lessons"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <BookOpen size={16} />
              <span>Darslar</span>
            </button>

            <button
              id="nav-btn-game"
              onClick={() => setActiveTab("game")}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition duration-200 outline-none ${
                activeTab === "game"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <Gamepad2 size={16} />
              <span>So'z O'yini</span>
            </button>

            <button
              id="nav-btn-chat"
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition duration-200 outline-none ${
                activeTab === "chat"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <MessageSquare size={16} />
              <span>AI O'qituvchi</span>
            </button>

            <button
              id="nav-btn-speaking"
              onClick={() => setActiveTab("speaking")}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition duration-200 outline-none ${
                activeTab === "speaking"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Mic size={16} />
              <span>Speaking</span>
            </button>

            <button
              id="nav-btn-profile"
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition duration-200 outline-none ${
                activeTab === "profile"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <UserCheck size={16} />
              <span>Kim Kirgan?</span>
            </button>

          </div>
        </div>
      </nav>

      {/* Main content Area with Tab switcher rendering */}
      <main className="flex-1 py-8 px-4 sm:px-6 max-w-6xl w-full mx-auto relative">
        {activeTab === "lessons" && <Lessons />}
        {activeTab === "game" && <Game />}
        {activeTab === "chat" && <Chat />}
        {activeTab === "speaking" && <Speaking />}
        {activeTab === "profile" && <Profile />}
      </main>

      {/* Humble Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/50 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Ingliz Tili Akademiyasi. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hover:text-slate-350 transition cursor-pointer">Maxfiylik kelishuvi</span>
            <span>•</span>
            <span className="hover:text-slate-350 transition cursor-pointer">Yordam bo'limi</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
