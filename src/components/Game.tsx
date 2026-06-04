import { useState, useEffect } from "react";
import { 
  Trophy, 
  Flame, 
  HelpCircle, 
  Volume2, 
  RefreshCw, 
  Key, 
  Sparkles, 
  Lightbulb,
  CheckCircle2,
  XCircle,
  Play,
  ArrowRight
} from "lucide-react";
import { GameState } from "../types";

export default function Game() {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    streak: 0,
    currentWord: null,
    loading: false,
    userInput: "",
    feedback: "idle",
    feedbackMessage: "",
    level: "easy"
  });

  const [hintUsed, setHintUsed] = useState(false);
  const [funFactRevealed, setFunFactRevealed] = useState(false);

  // Play pleasant sound using Web Audio API (No files required!)
  function playSound(type: "correct" | "incorrect" | "click") {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = new AudioCtx();
      
      if (type === "correct") {
        // High pitched success chime
        const now = ctx.currentTime;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(523.25, now); // C5
        osc1.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc1.frequency.setValueAtTime(783.99, now + 0.16); // G5
        osc1.frequency.setValueAtTime(1046.50, now + 0.24); // C6
        
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.55);
        
        osc1.connect(gain);
        gain.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.6);
      } else if (type === "incorrect") {
        // Low buzzy sound
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.linearRampToValueAtTime(90, now + 0.35);
        
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      } else {
        // Subtle click
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      }
    } catch (e) {
      console.log("Audio failed to load:", e);
    }
  }

  // Fetch puzzle from the "/api/generate-word-game" endpoint
  const loadNewChallenge = async (customLevel?: "easy" | "medium" | "hard") => {
    const selectedLevel = customLevel || gameState.level;
    setGameState(prev => ({ ...prev, loading: true, feedback: "idle", feedbackMessage: "", userInput: "" }));
    setHintUsed(false);
    setFunFactRevealed(false);

    try {
      const res = await fetch("/api/generate-word-game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level: selectedLevel })
      });
      
      if (!res.ok) throw new Error("API call failed");
      const data = await res.json();
      
      setGameState(prev => ({
        ...prev,
        currentWord: data,
        level: selectedLevel,
        loading: false
      }));
    } catch (error) {
      console.error("Game challenge load failed:", error);
      // fallback
      const fallbacks = [
        { word: "HELLO", hintUz: "Keltirilganda aytiladigan salomlashish so'zi", scrambled: "OLLEH", sentenceExample: "____! Nice to meet you.", translation: "Salom", phonetic: "/həˈləʊ/", funFactUz: "'Hello' so'zi qadimiy chorlovdan paydo bo'lgan oson so'zdir." }
      ];
      setGameState(prev => ({
        ...prev,
        currentWord: fallbacks[0],
        loading: false
      }));
    }
  };

  useEffect(() => {
    loadNewChallenge("easy");
  }, []);

  const handleVerify = () => {
    if (!gameState.currentWord) return;
    
    const correctW = gameState.currentWord.word.trim().toUpperCase();
    const userW = gameState.userInput.trim().toUpperCase();

    if (userW === correctW) {
      playSound("correct");
      // Speech pronounce the word automatically
      speakEnglish(gameState.currentWord.word);
      
      const streakBonus = Math.min(gameState.streak + 1, 5) * 10;
      setGameState(prev => ({
        ...prev,
        score: prev.score + 50 + streakBonus,
        streak: prev.streak + 1,
        feedback: "correct",
        feedbackMessage: `To'g'ri! +${50 + streakBonus} ball yutdingiz! 🌟`
      }));
      setFunFactRevealed(true);
    } else {
      playSound("incorrect");
      setGameState(prev => ({
        ...prev,
        streak: 0,
        feedback: "incorrect",
        feedbackMessage: "Kechirasiz, noto'g'ri! Qaytadan urinib ko'ring yoki maslahat oling 🤔"
      }));
    }
  };

  function speakEnglish(text: string) {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  }

  const handleHintClick = () => {
    playSound("click");
    setHintUsed(true);
  };

  return (
    <div id="game-view-container" className="max-w-4xl mx-auto space-y-6 px-4 md:px-0">
      
      {/* Quiz Top Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Total Points */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div className="space-y-1 text-left">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Jamg'arilgan Ball</span>
            <h2 className="text-2xl font-black text-amber-400 font-mono tracking-tight">{gameState.score}</h2>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Trophy size={20} />
          </div>
        </div>

        {/* Level Choice selector buttons */}
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex flex-col justify-center space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 text-center">O'yin Qiyinliyi</span>
          <div className="flex border border-slate-800 p-1 rounded-xl bg-slate-950/80">
            {(["easy", "medium", "hard"] as const).map((lvl) => {
              const labels = { easy: "Oson", medium: "O'rtacha", hard: "Qiyin" };
              return (
                <button
                  id={`btn-game-lvl-${lvl}`}
                  key={lvl}
                  onClick={() => {
                    playSound("click");
                    loadNewChallenge(lvl);
                  }}
                  className={`flex-1 py-1 px-2 text-[11px] font-bold rounded-lg transition-all ${
                    gameState.level === lvl
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {labels[lvl]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Highest Active Streak Counter */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div className="space-y-1 text-left">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Uzaygan Streak</span>
            <h2 className="text-2xl font-black text-orange-500 font-mono tracking-tight">x{gameState.streak}</h2>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
            <Flame size={20} className={gameState.streak > 0 ? "animate-pulse" : ""} />
          </div>
        </div>

      </div>

      {/* Main Game Interface Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-8 shadow-2xl relative overflow-hidden text-left">
        
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl" />

        <div className="border-b border-slate-800 pb-5 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="text-indigo-400" size={18} />
              Aralashtirilgan So'z O'yini (Scrambled Words)
            </h1>
            <p className="text-xs text-slate-400">Harflarni to'g'ri tartibda yozing va so'zning asl tarjimasini toping.</p>
          </div>
          <button
            id="reload-game-btn"
            onClick={() => {
              playSound("click");
              loadNewChallenge();
            }}
            disabled={gameState.loading}
            className="p-2 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition hover:rotate-45"
            title="Yangi so'z"
          >
            <RefreshCw size={16} className={gameState.loading ? "animate-spin" : ""} />
          </button>
        </div>

        {gameState.currentWord && !gameState.loading ? (
          <div className="space-y-6">
            
            {/* Scrambled word boxes */}
            <div className="flex flex-wrap gap-2.5 justify-center py-6 border-b border-slate-850">
              {gameState.currentWord.scrambled.split("").map((letter, index) => (
                <div 
                  key={index} 
                  className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-tr from-slate-950 to-slate-900 border border-slate-800/80 flex items-center justify-center font-black md:text-xl text-indigo-400 uppercase shadow-inner select-none font-mono"
                >
                  {letter}
                </div>
              ))}
            </div>

            {/* Hint Box (Dynamic Reveal) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Left: Interactive prompts / Hints */}
              <div className="space-y-3.5">
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/60 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                    <Lightbulb size={13} className="text-amber-400" />
                    O'zbekcha Maslahat:
                  </div>
                  <p className="text-xs text-white leading-relaxed font-medium">
                    {gameState.currentWord.hintUz}
                  </p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/60 space-y-2 leading-relaxed">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                    <Volume2 size={13} className="text-emerald-400" />
                    Gapda ishlatilishi:
                  </div>
                  <p className="text-xs text-slate-300 italic">
                    "{gameState.currentWord.sentenceExample}"
                  </p>
                </div>
              </div>

              {/* Right: Pronunciation, reveal options */}
              <div className="bg-slate-950/40 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-100 flex items-center gap-1.5 mb-2.5">
                    <Key size={13} className="text-indigo-400" />
                    Maslahat yordamchilari
                  </h3>
                  
                  {!hintUsed ? (
                    <button
                      id="use-hint-btn"
                      onClick={handleHintClick}
                      className="text-xs bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 hover:bg-indigo-600/20 hover:text-white px-4 py-2.5 rounded-xl transition"
                    >
                      Tarjimani va transkripsiyani ko'rish
                    </button>
                  ) : (
                    <div className="space-y-2 animate-fade-in text-xs leading-relaxed">
                      <p className="text-slate-400">Tarjimasi: <strong className="text-emerald-400 font-bold">{gameState.currentWord.translation}</strong></p>
                      <p className="text-slate-400 font-mono">Talaffuzi: <span className="text-indigo-400">{gameState.currentWord.phonetic}</span></p>
                    </div>
                  )}
                </div>

                {gameState.currentWord.word && (
                  <button
                    id="listen-word-accent-btn"
                    onClick={() => speakEnglish(gameState.currentWord!.word)}
                    className="flex items-center justify-center gap-2 text-xs bg-slate-900 border border-slate-800 hover:bg-slate-800 px-4 py-3 rounded-xl text-white transition mt-4"
                  >
                    <Volume2 size={14} className="text-indigo-400" />
                    Talaffuzni eshitish
                  </button>
                )}
              </div>

            </div>

            {/* Input guess zone */}
            <div className="space-y-4 pt-4 border-t border-slate-850">
              
              <div className="flex gap-2.5">
                <input
                  id="game-guess-input"
                  type="text"
                  value={gameState.userInput}
                  onChange={(e) => setGameState(prev => ({ ...prev, userInput: e.target.value }))}
                  disabled={gameState.feedback === "correct"}
                  placeholder="Katta harflarda to'g'ri inglizcha so'zni yozing..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-sm md:text-base text-white tracking-widest uppercase font-mono placeholder:tracking-normal focus:outline-none focus:border-indigo-500 transition-all text-center placeholder:text-slate-600"
                  onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                />
                
                {gameState.feedback !== "correct" ? (
                  <button
                    id="game-verify-btn"
                    onClick={handleVerify}
                    disabled={!gameState.userInput}
                    className={`px-6 py-3.5 rounded-2xl font-semibold text-xs transition flex items-center justify-center gap-1.5 shrink-0 ${
                      gameState.userInput
                        ? "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
                        : "bg-slate-950 text-slate-700 border border-slate-850 cursor-not-allowed"
                    }`}
                  >
                    Tekshirish
                  </button>
                ) : (
                  <button
                    id="game-next-btn"
                    onClick={() => loadNewChallenge()}
                    className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-semibold text-xs transition flex items-center justify-center gap-1.5 shrink-0"
                  >
                    Keyingi so'z
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>

              {/* Feedback Alert box */}
              {gameState.feedback !== "idle" && (
                <div className={`p-4 rounded-2xl border text-xs flex items-center gap-3 animate-fade-in ${
                  gameState.feedback === "correct"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-red-500/10 text-red-100 border-red-500/20"
                }`}>
                  {gameState.feedback === "correct" ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                  <span>{gameState.feedbackMessage}</span>
                </div>
              )}

            </div>

            {/* Fun Fact Section (Revealed on correct) */}
            {funFactRevealed && (
              <div className="bg-slate-950/80 p-5 rounded-3xl border border-indigo-500/20 space-y-2 animate-fade-in text-left">
                <h3 className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 uppercase font-mono tracking-wider">
                  <Sparkles size={12} />
                  Bilasizmi? (Fun Fact)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {gameState.currentWord.funFactUz}
                </p>
              </div>
            )}

          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <RefreshCw size={40} className="text-indigo-400 animate-spin" />
            <p className="text-xs text-slate-400">Sun'iy intellekt yangi o'yin savolini tayyorlamoqda...</p>
          </div>
        )}

      </div>

    </div>
  );
}
