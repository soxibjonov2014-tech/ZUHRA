import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini SDK with User-Agent telemetry
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY top-level environment variable is missing.");
    }
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return ai;
}

// 1. AI Assistant & English Tutor Chat Endpoint
app.post("/api/chat", async (req: express.Request, res: express.Response) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Xabarlar tarixi talab qilinadi." });
    }

    const client = getGeminiClient();

    // Map conversation history
    const systemInstruction = `Siz nihoyatda tajribali, muloyim va interaktiv "Ingliz tili o'qituvchisi" (AI English Tutor) rolidasiz. 
Sizning vazifangiz o'zbek tilida gapiradigan talabalarga ingliz tilini o'rganishda yordam berishdir.
Quyidagi qoidalarga amal qiling:
1. Foydalanuvchi inglizcha yozsa, grammatika xatolarini tekshiring, xatosini ko'rsatib, to'g'ri shaklini tushuntiring.
2. Suhbatni jonli va qiziqarli qilib olib boring, dars berish uslubingiz qulay va tushunarli bo'lsin.
3. Kerak bo'lganda so'zlar yoki iboralarning o'zbekcha tarjimasini, talaffuzini (fonetika yozib) yoki matnli namunasini bering.
4. Javoblaringiz chiroyli, tushunarli tartiblangan, markdown formatida va juda uzoq bo'lmagan bo'lsin.`;

    const formattedContents = messages.map((m: any) => {
      return {
        role: m.role === "assistant" ? "model" as const : "user" as const,
        parts: [{ text: m.content }]
      };
    });

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("AI Chat xatoligi:", error);
    res.status(500).json({ 
      error: "Sun'iy intellekt xizmati ishlamayapti.", 
      message: error.message || String(error) 
    });
  }
});

// 2. AI Word Game Generator Endpoint
// Generates random scrambled word challenge, riddle, or fill-in-the-blanks with metadata
app.post("/api/generate-word-game", async (req: express.Request, res: express.Response) => {
  try {
    const { level } = req.body; // 'easy', 'medium', 'hard'
    const gameLevel = level || "easy";
    
    const client = getGeminiClient();

    const prompt = `Ingliz tili darsi uchun bitta inglizcha so'z asosida qiziqarli o'yin savolini va unga qo'shimcha ma'lumotlarni JSON formatida ber. 
So'z darajasi: ${gameLevel}. 
JSON formati quyidagicha bo'lishi shart va boshqa hech qanday tekst yozma:
{
  "word": "APPLE", // Katta harflarda to'g'ri yozilgan inglizcha so'z
  "hintUz": "Kuzda pishadigan, shirin, qizil yoki yashil dumaloq meva", // O'zbekcha osonroq maslahat/tarjima
  "scrambled": "EPPAL", // Harflari aralashtirilgan ko'rinishi
  "sentenceExample": "I eat an ____ every morning.", // Foydalanishga namuna (so'zning o'rni chiziqcha bilan yopilgan bo'lsin)
  "translation": "Olma", // Haqiqiy tarjimasi
  "phonetic": "/ˈæp.əl/", // Talaffuz transkripsiyasi
  "funFactUz": "Olma suvda cho'kmaydi, chunki ularning 25 foizi havodan iborat!" // O'zbek tilida bu so'z haqida qiziqarli fakt yoki qisqa izoh
}`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            word: { type: Type.STRING },
            hintUz: { type: Type.STRING },
            scrambled: { type: Type.STRING },
            sentenceExample: { type: Type.STRING },
            translation: { type: Type.STRING },
            phonetic: { type: Type.STRING },
            funFactUz: { type: Type.STRING },
          },
          required: ["word", "hintUz", "scrambled", "sentenceExample", "translation", "phonetic", "funFactUz"]
        }
      }
    });

    const parsedData = JSON.parse(response.text?.trim() || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("AI Game Generator xatoligi:", error);
    // Fallback static word list if Gemini fails or is not configured
    const fallbacks: Record<string, any[]> = {
      easy: [
        { word: "HELLO", hintUz: "Keltirilganda aytiladigan salomlashish so'zi", scrambled: "OLLEH", sentenceExample: "____! Nice to meet you.", translation: "Salom", phonetic: "/həˈləʊ/", funFactUz: "'Hello' so'zi daryochilar orqali tarqalgan qadimiy chorlovdan paydo bo'lgan." },
        { word: "FAMILY", hintUz: "Ota-ona va farzandlardan tashkil topgan eng kichik jamiyat", scrambled: "MYLAFI", sentenceExample: "I love my ____ very much.", translation: "Oila", phonetic: "/ˈfæm.əl.i/", funFactUz: "Ingliz tilida 'Family' so'zi 'Father And Mother I Love You' degan gap asosida yasalgan degan rivoyat bor." },
        { word: "SCHOOL", hintUz: "Bolalar dars oladigan, bilim o'rganadigan bino", scrambled: "OLOSHC", sentenceExample: "Children go to ____ on Monday.", translation: "Maktab", phonetic: "/skuːl/", funFactUz: "'School' so'zi grekcha 'free time' (bo'sh vaqt) degan ma'noni anglatgan qadimgi so'zdan olingan." }
      ],
      medium: [
        { word: "JOURNEY", hintUz: "Bir joydan ikkinchi joyga qilingan uzoq safar, sayohat", scrambled: "EYRUNOJ", sentenceExample: "It was a long and tired ____.", translation: "Safar / Sayohat", phonetic: "/ˈdʒɜː.ni/", funFactUz: "Fransuz tilida ushbu so'z 'bir kunlik sayohat yoki ish' ma'nosini beradi." },
        { word: "FREEDOM", hintUz: "Hech kimga tobe bo'lmaslik, erkin yashash huquqi", scrambled: "MDEREOF", sentenceExample: "Every bird loves its ____.", translation: "Ozodlik / Erkinlik", phonetic: "/ˈfriː.dəm/", funFactUz: "Ozodlik ingliz tili shegariyasidagi eng ko'p qo'shiq yozilgan mavzulardan biridir." }
      ],
      hard: [
        { word: "AMBIGUOUS", hintUz: "Bir nechta ma'noni anglatuvchi, chalkash, noaniq", scrambled: "SUOUGBIMA", sentenceExample: "His answer was too ____ to understand.", translation: "Noaniq / Chalkash", phonetic: "/æmˈbɪɡ.ju.əs/", funFactUz: "Lotin tilidagi 'ambi' (ikki tarafga) va 'agere' (haydash) so'zlarining birlashishidan tashkil topgan." }
      ]
    };

    const requestedLevel = req.body.level || "easy";
    const bank = fallbacks[requestedLevel] || fallbacks.easy;
    const item = bank[Math.floor(Math.random() * bank.length)];
    res.json(item);
  }
});

// Start integration with Vite or Server Static Files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware loaded connected to Port 3000.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Ingliz Tili Akademiyasi server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
