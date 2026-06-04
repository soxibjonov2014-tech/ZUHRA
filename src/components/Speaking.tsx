import { useState, useEffect, useRef } from "react";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  Award, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  Play,
  Heart
} from "lucide-react";

interface PracticePhrase {
  id: string;
  en: string;
  uz: string;
  pronunciationHint: string;
  level: "Starter" | "Intermediate" | "Advanced";
}

const PRACTICE_PHRASES: PracticePhrase[] = [
  // Starter
  { id: "sp1", en: "Nice to meet you", uz: "Siz bilan tanishganimdan xursandman", pronunciationHint: "/nays tu miːt yuː/", level: "Starter" },
  { id: "sp2", en: "How is it going", uz: "Ishlar qalay ketmoqda?", pronunciationHint: "/hav iz it ˈɡəʊɪŋ/", level: "Starter" },
  { id: "sp3", en: "I am learning English online", uz: "Men ingliz tilini onlayn o'rganyapman", pronunciationHint: "/ay em ˈlɜːnɪŋ ˈɪŋɡlɪʃ ˈɒnˌlaɪn/", level: "Starter" },
  { id: "sp4", en: "Where is the nearest cafe", uz: "Eng yaqin qahvaxona qayerda?", pronunciationHint: "/weər iz ðə ˈnɪərɪst ˈkæfeɪ/", level: "Starter" },

  // Intermediate
  { id: "sp5", en: "Could you please repeat that slowly", uz: "Iltimos, buni sekinroq qaytara olasizmi?", pronunciationHint: "/kʊd yuː pliːz rɪˈpiːt ðæt ˈsləʊli/", level: "Intermediate" },
  { id: "sp6", en: "Practice makes perfect", uz: "Mashq qilish mukammallikka yetaklaydi", pronunciationHint: "/ˈpræktɪs meyks ˈpɜːfɪkt/", level: "Intermediate" },
  { id: "sp7", en: "I would like to improve my speaking skills", uz: "Men gapirish ko'nikmalarimni rivojlantirmoqchiman", pronunciationHint: "/ay wʊd layk tu ɪmˈpruːv may ˈspiːkɪŋ skɪlz/", level: "Intermediate" },

  // Advanced
  { id: "sp8", en: "Actions speak louder than words", uz: "Amal gapdan ko'ra kuchliroq gapiradi", pronunciationHint: "/ˈækʃənz spiːk ˈlaʊdə ðæn wɜːdz/", level: "Advanced" },
  { id: "sp9", en: "Learning a new language opens new horizons", uz: "Yangi til o'rganish yangi ufqlar ochadi", pronunciationHint: "/ˈlɜːnɪŋ ə njuː ˈlæŋɡwɪdʒ ˈəʊpənz njuː həˈraɪzənz/", level: "Advanced" }
];

export default function Speaking() {
  const [level, setLevel] = useState<"Starter" | "Intermediate" | "Advanced">("Starter");
  const [activePhrase, setActivePhrase] = useState<PracticePhrase>(PRACTICE_PHRASES[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [wordFeedback, setWordFeedback] = useState<{ word: string; isCorrect: boolean }[]>([]);
  const [unsupported, setUnsupported] = useState(false);
  const [speechCount, setSpeechCount] = useState(0);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize standard or vendor speech recognition
    const SpeedRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeedRecognition) {
      setUnsupported(true);
    } else {
      const rec = new SpeedRecognition();
      rec.continuous = false;
      rec.lang = "en-US";
      rec.interimResults = false;
      rec.maxAlternatives = 1;

      rec.onstart = () => {
        setIsRecording(true);
        setTranscript("");
        setScore(null);
        setWordFeedback([]);
      };

      rec.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setTranscript(text);
        calculateAccuracy(text);
      };

      rec.onerror = (e: any) => {
        console.error("Speech Recognition Error", e);
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
    }
  }, [activePhrase]);

  const speakNative = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (unsupported || !recognitionRef.current) {
      // Simulate speaking for unsupported browsers
      simulateSpeaking();
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.log("Error starting recognition:", err);
      }
    }
  };

  // Safe fallback simulation if microphone / speech recognition is not supported in the sandbox iframe
  const simulateSpeaking = () => {
    setIsRecording(true);
    setTranscript("Eshitilmoqda...");
    setTimeout(() => {
      setIsRecording(false);
      // Let's create a partial text based on user simulated speech
      const phrases = [activePhrase.en, activePhrase.en.replace("learning", "lear"), activePhrase.en + " daily"];
      const randomText = phrases[Math.floor(Math.random() * phrases.length)];
      setTranscript(randomText);
      calculateAccuracy(randomText);
      setSpeechCount(prev => prev + 1);
    }, 2500);
  };

  const calculateAccuracy = (userText: string) => {
    // Clean strings to compare words
    const cleanWord = (w: string) => w.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
    
    const targetWords = activePhrase.en.split(" ").map(cleanWord);
    const userWords = userText.split(" ").map(cleanWord);

    let matchCount = 0;
    const feedbackList = activePhrase.en.split(" ").map((originalWord) => {
      const cleaned = cleanWord(originalWord);
      // Check if user spoke this word
      const foundIdx = userWords.indexOf(cleaned);
      if (foundIdx !== -1) {
        matchCount++;
        // avoid matching duplicate words too loosely
        userWords.splice(foundIdx, 1);
        return { word: originalWord, isCorrect: true };
      }
      return { word: originalWord, isCorrect: false };
    });

    setWordFeedback(feedbackList);
    
    // Percent calculation
    const percent = Math.round((matchCount / targetWords.length) * 100);
    setScore(percent);
  };

  const filteredPhrases = PRACTICE_PHRASES.filter(p => p.level === level);

  return (
    <div id="speaking-playground-view" className="w-full max-w-5xl mx-auto space-y-8 px-4 md:px-0 text-left animate-fade-in">
      
      {/* Intro section */}
      <div className="bg-slate-900 border border-slate-805 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Sparkles className="text-indigo-400" size={20} />
            Speaking & Pronunciation (Talaffuz Mashqlari)
          </h1>
          <p className="text-xs text-slate-400">
            Inglizcha gapni eshiting, so'ngra mikrofonni bosib uni qaytarib ayting. Tizim sizning talaffuz aniqligingizni tekshiradi.
          </p>
        </div>
        
        {unsupported && (
          <div className="bg-amber-500/10 text-amber-500 border border-amber-500/15 px-3 py-2 rounded-xl text-[11px] font-medium max-w-sm flex items-start gap-1.5 leading-relaxed">
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            <span>Sizning brauzeringizda mikrofondan taniy olish tizimi qo'llab-quvvatlanmadi. Avtomatik audio simulyatori yoqildi!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Phrases library switcher */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Qiyinchilik Darajasi</h3>
            <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1 rounded-xl">
              {(["Starter", "Intermediate", "Advanced"] as const).map((lvl) => (
                <button
                  id={`btn-sp-lvl-${lvl}`}
                  key={lvl}
                  onClick={() => {
                    setLevel(lvl);
                    const list = PRACTICE_PHRASES.filter(p => p.level === lvl);
                    if (list.length > 0) setActivePhrase(list[0]);
                    setTranscript("");
                    setScore(null);
                    setWordFeedback([]);
                  }}
                  className={`py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                    level === lvl
                      ? "bg-indigo-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Mashq Iboralari</h3>
            <div className="flex flex-col gap-2">
              {filteredPhrases.map((p) => (
                <button
                  id={`btn-sp-phrase-${p.id}`}
                  key={p.id}
                  onClick={() => {
                    setActivePhrase(p);
                    setTranscript("");
                    setScore(null);
                    setWordFeedback([]);
                  }}
                  className={`text-left px-3.5 py-3 rounded-xl transition border text-xs flex flex-col gap-1 ${
                    activePhrase.id === p.id
                      ? "bg-indigo-600/10 text-indigo-400 border-indigo-600/30"
                      : "text-slate-400 hover:text-white bg-slate-950/40 border-slate-850 hover:bg-slate-900"
                  }`}
                >
                  <span className="font-semibold">{p.en}</span>
                  <span className="text-[10px] text-slate-500 italic truncate">{p.uz}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right column: Mic workspace and results visualizers */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-8 shadow-2xl relative overflow-hidden">
            
            {/* Native playback & target block */}
            <div className="bg-slate-950/80 border border-slate-850 p-6 rounded-2xl space-y-4">
              <span className="text-[10px] font-semibold bg-indigo-600/20 text-indigo-400 px-2.5 py-1 rounded-full font-mono uppercase tracking-wider">
                Target Expression (Aytiladigan Gap)
              </span>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-white tracking-tight">{activePhrase.en}</h2>
                  <p className="text-xs text-indigo-400 font-mono select-none">Fonetika: {activePhrase.pronunciationHint}</p>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans mt-1">Tarjimasi: <span className="font-medium text-slate-350">{activePhrase.uz}</span></p>
                </div>

                <button
                  id="speak-active-phrase-btn"
                  onClick={() => speakNative(activePhrase.en)}
                  className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white p-3 rounded-xl transition shrink-0 flex items-center gap-1.5 text-xs font-semibold shadow-lg shadow-indigo-600/15"
                >
                  <Volume2 size={16} />
                  Native Voice
                </button>
              </div>
            </div>

            {/* Mic Button & waveform animation trigger */}
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              
              <button
                id="mic-listening-trigger-btn"
                onClick={startListening}
                className={`w-20 h-20 rounded-full flex items-center justify-center border-4 transition-all duration-300 relative ${
                  isRecording 
                    ? "bg-red-600 hover:bg-red-700 border-red-500/30 scale-110 shadow-xl shadow-red-500/25" 
                    : "bg-indigo-600 hover:bg-indigo-700 border-indigo-500/20 shadow-xl shadow-indigo-600/20 active:scale-95"
                } cursor-pointer`}
              >
                {isRecording ? (
                  <MicOff size={28} className="text-white animate-pulse" />
                ) : (
                  <Mic size={28} className="text-white" />
                )}

                {isRecording && (
                  <div className="absolute inset-0 w-full h-full rounded-full border border-red-500 animate-ping opacity-60 pointer-events-none" />
                )}
              </button>

              <div className="text-center">
                <h4 className="text-xs font-bold text-slate-200">
                  {isRecording ? "Sizni eshityapman... Gapiring!" : "Mikrofonni bosing va gapirishni boshlang"}
                </h4>
                <p className="text-[10px] text-slate-500 mt-1">Gapirgandan so'ng qayta tekshirishni bosing yoki audio kuting.</p>
              </div>

            </div>

            {/* User transcript & score statistics visually pleasing feedback cards */}
            {(transcript || score !== null) && (
              <div className="border-t border-slate-850 pt-6 space-y-6">
                
                {/* Visual alignment of matches */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Talaffuz Natijangiz</h4>
                  
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-wrap gap-2 text-sm leading-relaxed">
                    {wordFeedback.length > 0 ? (
                      wordFeedback.map((item, idx) => (
                        <span 
                          key={idx} 
                          className={`px-2 py-0.5 rounded-md font-bold text-sm tracking-tight ${
                            item.isCorrect 
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                              : "bg-slate-900 text-slate-500 line-through"
                          }`}
                        >
                          {item.word}
                        </span>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">User: "{transcript}"</p>
                    )}
                  </div>
                </div>

                {/* Accuracy percentage score progress */}
                {score !== null && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Accuracy Percentage */}
                    <div className="bg-slate-950/40 border border-slate-850 p-4 rounded-2xl flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Aniq Talaffuz %</span>
                        <h3 className={`text-2xl font-black font-mono leading-none ${
                          score >= 80 ? "text-emerald-400" : score >= 50 ? "text-amber-400" : "text-red-400"
                        }`}>
                          {score}% acc
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Award size={18} />
                      </div>
                    </div>

                    {/* Result guidance based on progress */}
                    <div className="bg-slate-950/40 border border-slate-850 p-4 rounded-2xl flex items-center gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-white">
                          {score >= 80 
                            ? "Ajoyib talaffuz! 🌟" 
                            : score >= 50 
                            ? "Yaxshi natija! Ko'proq takrorlang 👍" 
                            : "Yana bir bor urinib ko'ring 🤨"}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                          {score >= 80 
                            ? "Siz bu gapning barcha kalit so'zlarini ingliz tili qonuniga mos ravishda to'g'ri aytdingiz!" 
                            : "Urg'u va tovushli harflarni to'g'ri bog'lashga harakat qiling."}
                        </p>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
