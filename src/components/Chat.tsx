import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Bot, 
  User, 
  Volume2, 
  Sparkles, 
  ChevronRight,
  ShieldAlert,
  Loader2
} from "lucide-react";
import { ChatMessage } from "../types";

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      role: "assistant",
      content: "Hello! My name is **Sophia**, your personal AI English Tutor. How can I help you today? \n\nSiz bilan ingliz tilida gaplashishimiz, xatolaringizni to'g'irlashimiz yoki yangi grammatika qoidalarini o'rganishimiz mumkin! Menga istalgan savolingizni bering.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Package conversation history for endpoint
      const payload = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });

      if (!res.ok) {
        throw new Error("Tizim javob bermadi.");
      }

      const data = await res.json();
      
      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        content: data.text || "Kechirasiz, javob olishda xatolik yuz berdi.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        content: "⚠️ **Xatolik yuz berdi:** Sun'iy intellekt xizmati bilan aloqa o'rnatib bo'lmadi. Iltimos, server ishlayotganini yoki internet aloqangizni tekshiring.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      // Clean markdown tags from speech for cleaner rendering
      const cleaned = text.replace(/[*#_`~]/g, "").replace(/\n/g, " ");
      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sizning brauzeringiz talaffuz xizmatini qo'llab-quvvatlamaydi.");
    }
  };

  const suggestions = [
    { label: "Grammatikamni tekshirib bering", text: "Can you check if this sentence is grammatically correct and explain: 'I have went to the bank yesterday'?" },
    { label: "Suhbatlashish (Chatting)", text: "Let's have a simple conversation about hobbies and free time. You start first!" },
    { label: "Yangi iboralar o'rgatish", text: "Menga kundalik hayotda eng ko'p ishlatiladigan 5 ta idiom (ibora) va ularning tarjimasini o'rgating." }
  ];

  return (
    <div id="ai-chat-component" className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch h-[calc(100vh-230px)] min-h-[500px] px-4 md:px-0">
      
      {/* Suggestions Column (Left on large screen) */}
      <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between py-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
            <Sparkles size={16} />
            <h2>Tezkor Savollar</h2>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Sophia bilan ingliz tilida o'rganishni osonlashtirish uchun tayyor shablonlardan foydalanishingiz mumkin:
          </p>

          <div className="flex flex-col gap-2.5 pt-2">
            {suggestions.map((s, idx) => (
              <button
                id={`suggest-btn-${idx}`}
                key={idx}
                onClick={() => handleSend(s.text)}
                disabled={loading}
                className="w-full text-left bg-slate-950 border border-slate-850 hover:border-indigo-500/40 p-3.5 rounded-xl text-xs text-slate-300 font-medium hover:text-white transition duration-200 flex items-start gap-2.5 leading-relaxed group"
              >
                <ChevronRight size={14} className="mt-0.5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-850 pt-4 text-[11px] text-slate-500 space-y-2">
          <div className="flex items-center gap-1.5">
            <Bot size={13} className="text-emerald-400" />
            <span className="font-semibold text-slate-400">Gemini 3.5-Flash</span>
          </div>
          <p>Ushbu o'qituvchi xatolarini tekshiradi va tarjimasini ko'rsatadi.</p>
        </div>
      </div>

      {/* Main Chat Workspace (Right) */}
      <div className="lg:col-span-8 flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Chat Header */}
        <div className="bg-slate-950/80 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 font-bold text-sm">
              S
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                Sophia (AI English Tutor)
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </h3>
              <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wide">Faol aloqada</p>
            </div>
          </div>
          
          <button 
            id="clear-chat-btn"
            onClick={() => setMessages([messages[0]])}
            className="text-xs text-slate-400 hover:text-white hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-800 transition"
          >
            Tozalash
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((m) => {
            const isBot = m.role === "assistant";
            return (
              <div 
                key={m.id} 
                className={`flex items-start gap-3 max-w-[85%] ${isBot ? "mr-auto text-left" : "ml-auto flex-row-reverse text-right"}`}
              >
                {/* Profile Icon */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isBot ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" : "bg-emerald-600/10 text-emerald-400 border border-emerald-500/20"
                }`}>
                  {isBot ? <Bot size={16} /> : <User size={16} />}
                </div>

                {/* Message Box */}
                <div className="space-y-1.5 text-left">
                  <div className={`p-4 rounded-2xl text-xs md:text-[13px] leading-relaxed relative ${
                    isBot 
                      ? "bg-slate-950 border border-slate-850 text-slate-200 rounded-tl-none whitespace-pre-wrap" 
                      : "bg-indigo-600 text-white rounded-tr-none"
                  }`}>
                    {/* Render helper text parsed simple markdowns */}
                    {m.content.split("\n").map((line, lIdx) => {
                      // basic support for bold tags **text**
                      let content = line;
                      const boldRegex = /\*\*(.*?)\*\*/g;
                      const parts = [];
                      let lastIndex = 0;
                      let match;

                      while ((match = boldRegex.exec(line)) !== null) {
                        if (match.index > lastIndex) {
                          parts.push(line.substring(lastIndex, match.index));
                        }
                        parts.push(<strong key={match.index} className="text-indigo-400 font-bold">{match[1]}</strong>);
                        lastIndex = boldRegex.lastIndex;
                      }
                      if (lastIndex < line.length) {
                        parts.push(line.substring(lastIndex));
                      }

                      return (
                        <p key={lIdx} className={lIdx > 0 ? "mt-1.5" : ""}>
                          {parts.length > 0 ? parts : content}
                        </p>
                      );
                    })}

                    {/* Speech button on chatbot */}
                    {isBot && (
                      <button
                        id={`btn-tts-msg-${m.id}`}
                        onClick={() => handleSpeech(m.content)}
                        className="absolute bottom-1 right-2 p-1.5 text-slate-500 hover:text-white transition rounded-md"
                        title="Tinglash"
                      >
                        <Volume2 size={13} />
                      </button>
                    )}
                  </div>
                  
                  {/* Timestamp */}
                  <div className={`text-[9px] text-slate-500 px-1 ${!isBot ? "text-right" : "text-left"}`}>
                    {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

              </div>
            );
          })}
          
          {loading && (
            <div className="flex items-start gap-3 max-w-[85%] mr-auto text-left">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
                <Bot size={16} />
              </div>
              <div className="bg-slate-950 border border-slate-850 text-slate-400 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2 text-xs">
                <Loader2 size={13} className="animate-spin text-indigo-400" />
                Sophia yozmoqda...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="bg-slate-950 p-4 border-t border-slate-800 flex gap-2.5"
        >
          <input
            id="chat-input-field"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Inglizcha savol bering yoki javob qaytaring..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
          <button
            id="chat-send-btn"
            type="submit"
            disabled={!input.trim() || loading}
            className={`px-5 py-3 rounded-xl transition font-semibold text-xs flex items-center justify-center gap-1.5 shrink-0 ${
              input.trim() && !loading
                ? "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
                : "bg-slate-900 text-slate-600 cursor-not-allowed"
            }`}
          >
            <span>Yuborish</span>
            <Send size={13} />
          </button>
        </form>

      </div>

    </div>
  );
}
