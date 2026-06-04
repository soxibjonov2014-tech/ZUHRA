import { useState } from "react";
import { 
  BookOpen, 
  Volume2, 
  ChevronRight, 
  Sparkles, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  FolderOpen,
  ArrowRight,
  ChevronLeft
} from "lucide-react";
import { GrammarTopic, Word } from "../types";

// Oxford Discover 2 Poems types and data
interface PoemItem {
  id: string;
  unit: string;
  title: string;
  author: string;
  introductionUz: string;
  stanzas: {
    en: string[];
    uz: string[];
  }[];
  vocabulary: {
    en: string;
    uz: string;
    phonetic: string;
  }[];
  quickQuiz: {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  };
}

const OXFORD_DISCOVER_POEMS: PoemItem[] = [
  {
    id: "p1",
    unit: "Unit 2",
    title: "The Caterpillar",
    author: "Christina Rossetti",
    introductionUz: "Ushbu mashhur klassik she'r kichik kapalak qurtining tabiatdagi hayoti va uning kelajakda go'zal kapalak bo'lib uchib ketishi haqida bayon qiladi.",
    stanzas: [
      {
        en: [
          "Brown and furry,",
          "Caterpillar in a hurry,",
          "Take your walk",
          "To the shady leaf, or stalk,"
        ],
        uz: [
          "Jigarrang va sertukvoy,",
          "Shoshilgancha butun boy,",
          "Qilgin uzoq sayringni,",
          "Soya bargu novdalarda."
        ]
      },
      {
        en: [
          "Or what not,",
          "Which may be the chosen spot.",
          "No toad spy you,",
          "Hovering bird of prey pass by you;"
        ],
        uz: [
          "Yoki boshqa istalgan,",
          "Tanlangan biror joyda.",
          "Hech bir qurbaqa ko'rmasin,",
          "Yirtqich qushlar uzoqdan o'tsin;"
        ]
      },
      {
        en: [
          "Spin and die,",
          "To live again a butterfly."
        ],
        uz: [
          "Pilla o'ra, va uyu,",
          "Uchib ket so'ng kapalak bo'lib."
        ]
      }
    ],
    vocabulary: [
      { en: "Furry", uz: "Sertuk, junli", phonetic: "/ˈfɜː.ri/" },
      { en: "In a hurry", uz: "Shoshilishda", phonetic: "/ɪn ə ˈhʌr.i/" },
      { en: "Stalk", uz: "Poya, novda", phonetic: "/stɔːk/" },
      { en: "Toad", uz: "Qurbaqa", phonetic: "/təʊd/" },
      { en: "Butterfly", uz: "Kapalak", phonetic: "/ˈbʌt.ə.flaɪ/" }
    ],
    quickQuiz: {
      question: "Which word rhymes with 'hurry' in the poem?",
      options: ["furry", "walk", "spot", "die"],
      answer: "furry",
      explanation: "'Furry' and 'hurry' share the same ending sound, making them perfect rhyming words (rifmadosh so'zlar)!"
    }
  },
  {
    id: "p2",
    unit: "Unit 6",
    title: "My Shadow",
    author: "Robert Louis Stevenson",
    introductionUz: "Robert Louis Stevensonning ushbu klassik she'rida bolakay o'z soyasining turli holatlarini, u qanday qilib yotoqqa undan oldin sakrashini juda quvnoq tasvirlaydi.",
    stanzas: [
      {
        en: [
          "I have a little shadow that goes in and out with me,",
          "And what can be the use of him is more than I can see."
        ],
        uz: [
          "Mening kichik soyajonim bor, men bilan u kirib-chiqadi,",
          "Lekin undan nima foyda bor, aqlim sira yetmaydi."
        ]
      },
      {
        en: [
          "He is very, very like me from the heels up to the head;",
          "And I see him jump before me, when I jump into my bed."
        ],
        uz: [
          "U xuddi o'zimga o'xshar boshimdan to tovonimcha;",
          "Yotog'imga sakrasam, sakraydi u mendan oldincha."
        ]
      }
    ],
    vocabulary: [
      { en: "Shadow", uz: "Soya", phonetic: "/ˈʃæd.əʊ/" },
      { en: "Heels", uz: "Tovonlar", phonetic: "/hiːlz/" },
      { en: "Jump", uz: "Sakramoq", phonetic: "/dʒʌmp/" },
      { en: "Bed", uz: "Yotoq, karavot", phonetic: "/bed/" }
    ],
    quickQuiz: {
      question: "According to the poem, the shadow is very like the speaker from where?",
      options: ["Heels to the head", "Hand to hand", "Day to night", "Little to big"],
      answer: "Heels to the head",
      explanation: "She'rda 'from the heels up to the head' deb ta'riflangan, ya'ni tovonidan boshigacha soyasi unga o'xshaydi."
    }
  },
  {
    id: "p3",
    unit: "Unit 10",
    title: "The Wind",
    author: "Robert Louis Stevenson",
    introductionUz: "Ushbu she'r tabiat darsligining asosiy qismi bo'lib, shamolning ko'rinmas kuchi haqida o'quvchilarda tasavvur uyg'otadi. Yer va osmon havolarini tasvirlaydi.",
    stanzas: [
      {
        en: [
          "I saw you toss the kites on high",
          "And blow the birds about the sky;",
          "And all around I heard you pass,",
          "Like ladies' skirts across the grass—"
        ],
        uz: [
          "Ko'rdim yerda varraklarni baland uchirganing,",
          "Qushlarni ham ko'kda har yon haydab qochirganing;",
          "Atrofimda g'uvillab o'tganingni tinglayman,",
          "Yashil chimda ipak liboslar kabi quvlayman—"
        ]
      },
      {
        en: [
          "O wind, a-blowing all day long,",
          "O wind, that sings so loud a song!"
        ],
        uz: [
          "Ey shamol, kun bo'yi guvillab esgan shamol,",
          "Ey shamol, baland ovozda qo'shiq aytgan ey shamol!"
        ]
      }
    ],
    vocabulary: [
      { en: "Toss", uz: "Uchirish, tebratish", phonetic: "/tɒs/" },
      { en: "Kite", uz: "Varrak", phonetic: "/kaɪt/" },
      { en: "Blow", uz: "Esmoq, puflamoq", phonetic: "/bləʊ/" },
      { en: "Skirt", uz: "Etek, libos", phonetic: "/skɜːt/" }
    ],
    quickQuiz: {
      question: "What is compared to 'ladies' skirts across the grass'?",
      options: ["The wind passing", "The birds flying", "The kites on high", "The sky colors"],
      answer: "The wind passing",
      explanation: "Stevenson compares the sound of the wind sweeping through the grass to the gentle rustling of ladies' skirts ('Like ladies' skirts across the grass')."
    }
  },
  {
    id: "p4",
    unit: "Unit 14",
    title: "Who Has Seen the Wind?",
    author: "Christina Rossetti",
    introductionUz: "Shamolni hech kim ko'ra olmasada, uning daraxtlar shoxlarini tebratishidan borligini barchamiz bilamiz. Mashhur ingliz shoirasi bu sirni diltortar tarzda ifodalagan.",
    stanzas: [
      {
        en: [
          "Who has seen the wind?",
          "Neither I nor you:",
          "But when the leaves hang trembling,",
          "The wind is passing through."
        ],
        uz: [
          "Shamolni kim ko'ribdi axir?",
          "Na men ko'rdim, na sening ko'zing:",
          "Lekin qachonki barglar titrasa g'ira-shira,",
          "O'tib borayotgan bo'ladi shamol o'zi."
        ]
      },
      {
        en: [
          "Who has seen the wind?",
          "Neither you nor I:",
          "But when the trees bow down their heads,",
          "The wind is passing by."
        ],
        uz: [
          "Shamolni kim ko'ribdi axir?",
          "Na sen ko'rding, na men ko'zim bilan:",
          "Lekin qachonki daraxtlar egsa boshlarin,",
          "Ular yonidan shamol o'tyapti butun kuchi bilan."
        ]
      }
    ],
    vocabulary: [
      { en: "Neither", uz: "Na u, na bu", phonetic: "/ˈnaɪ.ðər/" },
      { en: "Trembling", uz: "Titrayotgan", phonetic: "/ˈtrem.blɪŋ/" },
      { en: "Bow down", uz: "Bosh egish, egilmoq", phonetic: "/baʊ daʊn/" },
      { en: "Pass by", uz: "Yaqindan o'tmoq", phonetic: "/pɑːs baɪ/" }
    ],
    quickQuiz: {
      question: "What do the trees do when the wind is passing by in the second stanza?",
      options: ["Bow down their heads", "Lose their leaves", "Grow larger and taller", "Sing sweet songs"],
      answer: "Bow down their heads",
      explanation: "Shoira she'rning ikkinchi qismida aytadiki: 'But when the trees bow down their heads, the wind is passing by' - ya'ni boshini egadi."
    }
  },
  {
    id: "p5",
    unit: "Unit 18",
    title: "The Swing",
    author: "Robert Louis Stevenson",
    introductionUz: "Arg'imchoq uchish - barcha bolalarning eng sevimli darslik ertagidir. She'r sizni arg'imchoqda yuqoriga uchib butun qishloq sarhadlarini ko'rgandek ajib hissiyot bag'ishlaydi.",
    stanzas: [
      {
        en: [
          "How do you like to go up in a swing,",
          "Up in the air so blue?",
          "Oh, I do think it the pleasantest thing",
          "Ever a child can do!"
        ],
        uz: [
          "Arg'imchoqda ko'kka uchish senga qanday yoqadi,",
          "Yom-yashil havo bag'rida, havorang ko'kda?",
          "Oh, menimcha bu dunyodagi eng ajoyib ish,",
          "Kichik bolakay qila oladigan hayotda!"
        ]
      },
      {
        en: [
          "Up in the air and over the wall,",
          "Till I can see so wide,",
          "Rivers and trees and cattle and all",
          "Over the countryside—"
        ],
        uz: [
          "Ko'kka uchib, devorlar ortidan hatlab,",
          "Butun dunyoni kengroq ko'rgunga qadar,",
          "Daryolar, daraxtlar va mollar hamma-hammasin,",
          "Qishloq bag'ridagi butun go'zal asarlar—"
        ]
      }
    ],
    vocabulary: [
      { en: "Swing", uz: "Arg'imchoq, uchmoq", phonetic: "/swɪŋ/" },
      { en: "Pleasantest", uz: "Eng yoqimli", phonetic: "/ˈplez.ənt.ɪst/" },
      { en: "Cattle", uz: "Qoramollar, podalar", phonetic: "/ˈkæt.əl/" },
      { en: "Countryside", uz: "Qishloq sarhadlari", phonetic: "/ˈkʌn.tri.saɪd/" }
    ],
    quickQuiz: {
      question: "Complete the rhyme: Blue rhymes with _____.",
      options: ["do", "wall", "wide", "swing"],
      answer: "do",
      explanation: "'Blue' and 'do' share the same vowel sound /uː/, making them perfect rhyming match-ups in poetry!"
    }
  }
];

// Standard curated high-quality static data for fast retrieval
const CURATED_VOCABULARIES: Word[] = [
  // Kundalik Hayot (Daily Life)
  { id: "v1", en: "Good morning", uz: "Xayrli tong", phonetic: "/ɡʊd ˈmɔː.nɪŋ/", category: "Kundalik", exampleEn: "Good morning, how did you sleep?", exampleUz: "Xayrli tong, qanday dam oldingiz?" },
  { id: "v2", en: "Thank you", uz: "Rahmat", phonetic: "/θæŋk juː/", category: "Kundalik", exampleEn: "Thank you so much for your help.", exampleUz: "Yordamingiz uchun juda katta rahmat." },
  { id: "v3", en: "Please", uz: "Iltimos", phonetic: "/pliːz/", category: "Kundalik", exampleEn: "Could you pass the salt, please?", exampleUz: "Iltimos, tuzni uzatib yubora olasizmi?" },
  { id: "v4", en: "Excuse me", uz: "Kechirasiz (e'tibor tortishda)", phonetic: "/ɪkˈskjuːz miː/", category: "Kundalik", exampleEn: "Excuse me, where is the library?", exampleUz: "Kechirasiz, kutubxona qayerda joylashgan?" },
  { id: "v5", en: "Have a nice day", uz: "Kuningiz xayrli o'tsin", phonetic: "/hæv ə naɪs deɪ/", category: "Kundalik", exampleEn: "Goodbye! Have a nice day!", exampleUz: "Xayr! Kuningiz xayrli o'tsin!" },

  // Sayohat (Travel)
  { id: "v6", en: "Airport", uz: "Aeroport", phonetic: "/ˈeə.pɔːt/", category: "Sayohat", exampleEn: "We need to go to the airport early.", exampleUz: "Biz aeroportga erta borishimiz kerak." },
  { id: "v7", en: "Passport", uz: "Pasport", phonetic: "/ˈpɑːs.pɔːt/", category: "Sayohat", exampleEn: "Keep your passport in a safe place.", exampleUz: "Pasportingizni xavfsiz joyda saqlang." },
  { id: "v8", en: "Ticket", uz: "Chipta", phonetic: "/ˈtɪk.ɪt/", category: "Sayohat", exampleEn: "Can I see your train ticket, please?", exampleUz: "Poezd chiptangizni ko'rsata olasizmi, iltimos?" },
  { id: "v9", en: "Hotel booking", uz: "Mehmonxona bandlovi", phonetic: "/həʊˈtel ˈbʊk.ɪŋ/", category: "Sayohat", exampleEn: "Under what name is the hotel booking?", exampleUz: "Mehmonxona bandlovi kimning nomiga olingan?" },
  { id: "v10", en: "Where is...", uz: "... qayerda?", phonetic: "/weər ɪz/", category: "Sayohat", exampleEn: "Where is the nearest subway station?", exampleUz: "Eng yaqin metro stansiyasi qayerda?" },

  // Biznes & Ta'lim (Business & Education)
  { id: "v11", en: "Goal", uz: "Maqsad", phonetic: "/ɡəʊl/", category: "Biznes", exampleEn: "Our team reached its monthly goal.", exampleUz: "Jamoamiz oylik maqsadga erishdi." },
  { id: "v12", en: "Knowledge", uz: "Bilim", phonetic: "/ˈnɒl.ɪdʒ/", category: "Biznes", exampleEn: "Knowledge is power.", exampleUz: "Bilim - bu kuch." },
  { id: "v13", en: "Opportunity", uz: "Imkoniyat", phonetic: "/ˌɒp.əˈtʃuː.nə.ti/", category: "Biznes", exampleEn: "This is a great opportunity for us.", exampleUz: "Bu biz uchun ajoyib imkoniyat." },
  { id: "v14", en: "Improve", uz: "Rivojlantirish / Yaxshilash", phonetic: "/ɪmˈpruːv/", category: "Biznes", exampleEn: "I want to improve my speaking skills.", exampleUz: "Men gapirish ko'nikmalarimni rivojlantirmoqchiman." },
  { id: "v15", en: "Agreement", uz: "Kelishuv / Shartnoma", phonetic: "/əˈɡriː.mənt/", category: "Biznes", exampleEn: "We signed a mutual agreement today.", exampleUz: "Biz bugun o'zaro kelishuv imzoladik." },

  // Taomlar & Restoran (Food & Dining)
  { id: "v16", en: "Delicious", uz: "Lazzatli / Shirin", phonetic: "/dɪˈlɪʃ.əs/", category: "Taomlar", exampleEn: "This chocolate cake is delicious.", exampleUz: "Bu shokoladli tort juda lazzatli." },
  { id: "v17", en: "Water", uz: "Suv", phonetic: "/ˈwɔː.tər/", category: "Taomlar", exampleEn: "Please give me a glass of water.", exampleUz: "Menga bir stakan suv bering." },
  { id: "v18", en: "Menu", uz: "Taomlar ro'yxati (Menyu)", phonetic: "/ˈmen.juː/", category: "Taomlar", exampleEn: "Can we have the menu, please?", exampleUz: "Iltimos, menyuni bersangiz." },
  { id: "v19", en: "Bill", uz: "Hisob (chek)", phonetic: "/bɪl/", category: "Taomlar", exampleEn: "Waitigator, could we get the bill?", exampleUz: "Ofitsiant, hisobni olib kelsangiz bo'ladimi?" },
  { id: "v20", en: "Breakfast", uz: "Nonushta", phonetic: "/ˈbrek.fəst/", category: "Taomlar", exampleEn: "What did you have for breakfast?", exampleUz: "Nonushtaga nima tanaffus qildingiz?" }
];

const CURATED_GRAMMAR: GrammarTopic[] = [
  {
    id: "g1",
    title: "Present Simple (Hozirgi oddiy zamon)",
    level: "Boshlang'ich",
    description: "Doimiy takrorlanadigan, odat tusiga kirgan ish-harakatlar yoki umumiy haqiqat-qoidalarni ifodalashda qo'llaniladi.",
    rules: [
      "I / We / You / They bilan fe'l o'ziga teng: 'I run'.",
      "He / She / It bilan fe'lga 's' yoki 'es' qo'shiladi: 'He runs'.",
      "Inkor shaklida 'don't' yoki 'doesn't' ishlatiladi. Fe'l o'z holiga qaytadi.",
      "So'roq gaplarda 'Do' va 'Does' yordamchi fe'llari gap boshiga o'tadi."
    ],
    examples: [
      { en: "The sun rises in the east.", uz: "Quyosh sharqdan chiqadi. (Umumiy haqiqat)" },
      { en: "She works at a bank.", uz: "U bankda ishlaydi. (Doimiy holat)" },
      { en: "They do not play soccer on Fridays.", uz: "Ular juma kunlari futbol o'ynashmaydi." }
    ],
    quickQuiz: [
      {
        question: "John _____ to school by bus every day.",
        options: ["go", "goes", "going", "gone"],
        answer: "goes",
        explanation: "Chunki John 'He' (u uchinchi shaxs) bo'lgani sababli Present Simple qoidasiga ko'ra fe'lga 'es' qo'shimchasi qo'shiladi."
      },
      {
        question: "We ______ drink coffee in the evening.",
        options: ["doesn't", "don't", "is not", "not"],
        answer: "don't",
        explanation: "We (biz) ko'plikda inkor shaklda 'don't' ishlatadi."
      }
    ]
  },
  {
    id: "g2",
    title: "Past Simple (O'tgan oddiy zamon)",
    level: "Boshlang'ich",
    description: "O'tmishda sodir bo'lgan va tugagan aniq ish-harakatlarni ifodalash uchun ishlatiladi.",
    rules: [
      "To'g'ri (Regular) fe'llarga '-ed' qo'shiladi: play -> played.",
      "Noto'g'ri (Irregular) fe'llarning 2-shakli ishlatiladi: go -> went, buy -> bought.",
      "Inkor va so'roq gaplarda hamma shaxslar uchun 'did' / 'didn't' ishlatiladi va fe'l 1-shakliga qaytadi."
    ],
    examples: [
      { en: "I watched a beautiful movie yesterday.", uz: "Kecha ajoyib kino ko'rdim." },
      { en: "He went to London in 2024.", uz: "U 2024-yilda Londonga bordi." },
      { en: "She did not receive my letter.", uz: "U mening xatimni olmadi." }
    ],
    quickQuiz: [
      {
        question: "She _____ a new smartphone last week.",
        options: ["buy", "bought", "buys", "buying"],
        answer: "bought",
        explanation: "'Last week' o'tgan zamon kalit so'zi bo'lgani uchin, 'buy' noto'g'ri fe'lining 2-shakli 'bought' tanlanadi."
      },
      {
        question: "They ______ did not ______ tennis last Saturday.",
        options: ["played", "play", "playing", "plays"],
        answer: "play",
        explanation: "Inkor gapda 'did not' ishlatilganda fe'lning asil (1-chi) shakli qo'llaniladi."
      }
    ]
  },
  {
    id: "g3",
    title: "Present Perfect (Hozirgi tugallangan zamon)",
    level: "O'rta",
    description: "O'tmishda sodir bo'lgan, ammo natijasi biz yashab turgan hozirgi zamon bilan chambarchas bog'liq ish-harakatlarni ifodalaydi.",
    rules: [
      "Formula: Have / Has + V3 (fe'lning 3-shakli yoki -ed qo'shilgani).",
      "He, She, It uchun 'has', qolganlar uchun 'have' ishlatiladi.",
      "Ko'pincha 'just' (hozirgina), 'already' (allaqachon), 'yet' (hali ham), 'ever' (hech) kalit so'zlari bilan keladi."
    ],
    examples: [
      { en: "I have lost my keys. (I cannot enter now)", uz: "Kalitlarimni yo'qotib qo'ydim. (Natija: hozir kira olmayapman)" },
      { en: "Have you ever been to New York?", uz: "Siz hech Nyu-Yorkda bo'lganmisiz?" },
      { en: "He has just finished his homework.", uz: "U hozirgina uy vazifasini tugatdi." }
    ],
    quickQuiz: [
      {
        question: "She _____ already _____ her lunch.",
        options: ["has / eaten", "have / eaten", "is / eating", "did / ate"],
        answer: "has / eaten",
        explanation: "She bitta shaxs bo'lgani uchin 'has' va fe'l 3-shakli 'eaten' (eat - ate - eaten) ishlatiladi."
      }
    ]
  }
];

export default function Lessons() {
  const [activeTab, setActiveTab] = useState<"vocab" | "grammar" | "poems">("vocab");
  
  // Vocabulary state
  const [selectedCategory, setSelectedCategory] = useState<string>("Barchasi");
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Grammar state
  const [selectedGrammar, setSelectedGrammar] = useState<GrammarTopic | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Poems state
  const [selectedPoem, setSelectedPoem] = useState<PoemItem>(OXFORD_DISCOVER_POEMS[0]);
  const [showPoemTranslation, setShowPoemTranslation] = useState<boolean>(true);
  const [poemQuizAnswer, setPoemQuizAnswer] = useState<string>("");
  const [poemQuizSubmitted, setPoemQuizSubmitted] = useState<boolean>(false);

  const categories = ["Barchasi", "Kundalik", "Sayohat", "Biznes", "Taomlar"];
  
  const filteredWords = selectedCategory === "Barchasi" 
    ? CURATED_VOCABULARIES 
    : CURATED_VOCABULARIES.filter(w => w.category === selectedCategory);

  const currentWord = filteredWords[flashcardIndex] || null;

  // Real-time Text-to-Speech trigger
  function speakEnglish(text: string) {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // cancel any active pronunciation
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.85; // slightly slower for language learners
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sizning brauzeringiz talaffuz tinglash xususiyatini qo'llab-quvvatlamaydi.");
    }
  }

  const selectNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setFlashcardIndex((prev) => (prev + 1) % filteredWords.length);
    }, 150);
  };

  const selectPrevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setFlashcardIndex((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
    }, 150);
  };

  const resetCategoryIndex = (cat: string) => {
    setSelectedCategory(cat);
    setFlashcardIndex(0);
    setIsFlipped(false);
  };

  const handleQuizSelect = (questionKey: string, option: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionKey]: option }));
  };

  const checkGrammarAnswer = (topicId: string, qIndex: number, correct: string, userAns: string) => {
    const key = `${topicId}-${qIndex}`;
    setQuizSubmitted(prev => ({ ...prev, [key]: true }));
  };

  return (
    <div id="lessons-view" className="w-full max-w-5xl mx-auto space-y-8 px-4 md:px-0">
      
      {/* Tab Switchers */}
      <div className="flex flex-wrap border-b border-slate-800 justify-center p-1 bg-slate-900/60 rounded-xl max-w-2xl mx-auto gap-1">
        <button
          id="btn-vocab-tab"
          onClick={() => setActiveTab("vocab")}
          className={`flex-1 py-2.5 px-3 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === "vocab"
              ? "bg-indigo-600 text-white shadow-lg"
              : "text-slate-400 hover:text-white hover:bg-slate-800/50"
          }`}
        >
          <FolderOpen size={15} />
          So'z Boyligi
        </button>
        <button
          id="btn-grammar-tab"
          onClick={() => setActiveTab("grammar")}
          className={`flex-1 py-2.5 px-3 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === "grammar"
              ? "bg-indigo-600 text-white shadow-lg"
              : "text-slate-400 hover:text-white hover:bg-slate-800/50"
          }`}
        >
          <BookOpen size={15} />
          Grammatika
        </button>
        <button
          id="btn-poems-tab"
          onClick={() => setActiveTab("poems")}
          className={`flex-1 py-2.5 px-3 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === "poems"
              ? "bg-indigo-600 text-white shadow-lg"
              : "text-slate-400 hover:text-white hover:bg-slate-800/50"
          }`}
        >
          <Sparkles size={15} className="text-yellow-400" />
          Oxford Discover 2 Sherlari
        </button>
      </div>

      {activeTab === "vocab" ? (
        <div id="vocab-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
          
          {/* Left: Category Navigation */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="font-semibold text-lg text-slate-100 flex items-center gap-2">
              <Sparkles className="text-indigo-400" size={18} />
              Mavzuni Tanlang
            </h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  id={`cat-btn-${cat}`}
                  key={cat}
                  onClick={() => resetCategoryIndex(cat)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all text-sm flex items-center justify-between ${
                    selectedCategory === cat
                      ? "bg-indigo-600/10 text-indigo-400 border border-indigo-600/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent"
                  }`}
                >
                  <span>{cat}</span>
                  <ChevronRight size={14} className={selectedCategory === cat ? "opacity-100" : "opacity-40"} />
                </button>
              ))}
            </div>
            
            <div className="border-t border-slate-800 pt-5 text-center text-xs text-slate-500 space-y-1">
              <p>Mavjud so'zlar soni: {filteredWords.length} ta</p>
              <p>Yordam: Kartani ag'darish uchun uni bosing, talaffuzini tinglash uchun karnay belgisini tanlang.</p>
            </div>
          </div>

          {/* Right: Active Card Deck */}
          <div className="lg:col-span-8 flex flex-col justify-center items-center space-y-6">
            {currentWord ? (
              <div className="w-full max-w-lg space-y-6">
                
                {/* Responsive Flip Animation Card */}
                <div 
                  id="vocab-flashcard-interactive"
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="relative h-72 md:h-80 w-full rounded-3xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 cursor-pointer shadow-2xl transition-all duration-300 transform preserve-3d"
                >
                  
                  {/* Card Front: English word */}
                  <div className={`absolute inset-0 w-full h-full flex flex-col justify-between p-8 rounded-3xl transition-opacity duration-350 ${
                    isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-full border border-indigo-600/30">
                        {currentWord.category} • {flashcardIndex + 1}/{filteredWords.length}
                      </span>
                      <button 
                        id={`btn-speech-${currentWord.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          speakEnglish(currentWord.en);
                        }}
                        className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-indigo-400 p-2.5 rounded-xl transition duration-200"
                        title="Talaffuz qilish"
                      >
                        <Volume2 size={18} />
                      </button>
                    </div>

                    <div className="text-center space-y-2">
                      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-sans">
                        {currentWord.en}
                      </h1>
                      <p className="text-sm font-mono text-indigo-400 opacity-80 select-none">
                        {currentWord.phonetic}
                      </p>
                    </div>

                    <div className="text-center text-xs text-slate-500 animate-pulse">
                      Kartani ag'darish uchun istalgan joyiga bosing
                    </div>
                  </div>

                  {/* Card Back: Uzbek translation */}
                  <div className={`absolute inset-0 w-full h-full flex flex-col justify-between p-8 bg-slate-900 border border-indigo-600/20 rounded-3xl transition-opacity duration-350 ${
                    isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}>
                    <div className="flex justify-start">
                      <span className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full">
                        O'zbekchasi
                      </span>
                    </div>

                    <div className="text-center space-y-6">
                      <div className="space-y-1">
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-400">
                          {currentWord.uz}
                        </h2>
                        <p className="text-xs text-slate-400 font-mono">"{currentWord.en}" so'zi tarjimasi</p>
                      </div>

                      {/* Example sentences */}
                      <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-left space-y-2 max-w-sm mx-auto">
                        <p className="text-xs text-white italic font-medium flex items-center gap-1.5 leading-relaxed">
                          <span className="text-emerald-400 font-bold font-mono">EN:</span>
                          {currentWord.exampleEn}
                        </p>
                        <p className="text-xs text-slate-400 leading-relaxed flex items-center gap-1.5">
                          <span className="text-indigo-400 font-bold font-mono">UZ:</span>
                          {currentWord.exampleUz}
                        </p>
                      </div>
                    </div>

                    <div className="text-center text-xs text-slate-500">
                      Bosh sahifaga qaytish uchun bosing
                    </div>
                  </div>

                </div>

                {/* Navigation and Play controls */}
                <div className="flex items-center justify-between">
                  <button 
                    id="btn-prev-card"
                    onClick={selectPrevCard}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 active:scale-95 px-5 py-3 rounded-2xl transition duration-200"
                  >
                    <ChevronLeft size={16} />
                    Oldingisi
                  </button>

                  <button 
                    id="btn-speak-example"
                    onClick={() => speakEnglish(currentWord.exampleEn)}
                    className="flex items-center gap-2 text-xs bg-slate-900/60 border border-slate-800/80 text-white hover:bg-slate-800 px-4 py-3 rounded-2xl transition duration-200"
                  >
                    <Volume2 size={14} className="text-indigo-400" />
                    Gapni eshitish
                  </button>

                  <button 
                    id="btn-next-card"
                    onClick={selectNextCard}
                    className="flex items-center gap-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 px-6 py-3 rounded-2xl transition duration-200 font-medium"
                  >
                    Keyingisi
                    <ChevronRight size={16} />
                  </button>
                </div>

              </div>
            ) : (
              <div className="text-slate-400 text-sm">Ushbu turkumda so'zlar topilmadi.</div>
            )}
          </div>

        </div>
      ) : activeTab === "grammar" ? (
        /* Grammatika segment - visual beautiful notes and fast dynamic quizzes */
        <div id="grammar-section" className="space-y-6 animate-fade-in text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left selector col */}
            <div className="md:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 h-fit">
              <h3 className="text-base font-semibold text-slate-200">Klaviaturali Mavzular</h3>
              <div className="space-y-2">
                {CURATED_GRAMMAR.map((tg) => (
                  <button
                    id={`grammar-item-${tg.id}`}
                    key={tg.id}
                    onClick={() => setSelectedGrammar(tg)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition duration-200 border text-xs flex flex-col gap-1 ${
                      selectedGrammar?.id === tg.id
                        ? "bg-indigo-600/10 text-indigo-400 border-indigo-600/30"
                        : "text-slate-400 hover:text-white bg-slate-950/40 border-slate-850 hover:bg-slate-900"
                    }`}
                  >
                    <span className="font-semibold">{tg.title}</span>
                    <span className="text-[10px] uppercase tracking-wide opacity-80 font-mono text-indigo-400">
                      {tg.level}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right main read and interactive workout segment */}
            <div className="md:col-span-2 space-y-6">
              {selectedGrammar ? (
                <div id="grammar-topic-card" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
                  
                  {/* Topic Title */}
                  <div className="border-b border-slate-800 pb-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-indigo-600/20 text-indigo-400 font-mono border border-indigo-600/35 px-2.5 py-1 rounded-md uppercase tracking-wide">
                        {selectedGrammar.level}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">{selectedGrammar.title}</h2>
                    <p className="text-slate-300 text-sm leading-relaxed">{selectedGrammar.description}</p>
                  </div>

                  {/* Rules of usage */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <BookOpen className="text-indigo-400" size={16} />
                      Asosiy Qoidalar
                    </h3>
                    <ul className="grid grid-cols-1 gap-2.5">
                      {selectedGrammar.rules.map((rule, idx) => (
                        <li key={idx} className="bg-slate-950 border border-slate-850 p-3 rounded-xl text-slate-300 text-xs flex items-start gap-3 leading-relaxed">
                          <span className="bg-indigo-600/15 text-indigo-400 px-2 py-0.5 rounded-md font-bold text-[10px] font-mono mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Curated Examples */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Volume2 className="text-emerald-400 hover:scale-110 cursor-pointer" size={16} />
                      Mavzuga oid gaplar
                    </h3>
                    <div className="grid grid-cols-1 gap-2.5">
                      {selectedGrammar.examples.map((ex, idx) => (
                        <div key={idx} className="bg-gradient-to-r from-slate-950 to-slate-900/40 border border-slate-850 p-4 rounded-xl flex items-center justify-between gap-4">
                          <div className="space-y-1">
                            <p className="text-white text-sm font-medium italic">{ex.en}</p>
                            <p className="text-xs text-slate-400 font-sans">{ex.uz}</p>
                          </div>
                          <button
                            id={`btn-speech-ex-${idx}`}
                            onClick={() => speakEnglish(ex.en)}
                            className="bg-slate-900 hover:bg-slate-800 hover:text-white text-slate-400 p-2 rounded-lg border border-slate-800 transition"
                            title="Tinglash"
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Dynamic Quiz inside target topic */}
                  <div className="border-t border-slate-850 pt-6 space-y-4">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <HelpCircle className="text-amber-400" size={16} />
                      Bilimingizni sinab ko'ring (Quick Practice)
                    </h3>

                    <div className="space-y-6">
                      {selectedGrammar.quickQuiz.map((quiz, qIdx) => {
                        const key = `${selectedGrammar.id}-${qIdx}`;
                        const isSubmitted = quizSubmitted[key];
                        const userAns = quizAnswers[key];
                        const isCorrect = userAns === quiz.answer;

                        return (
                          <div key={qIdx} className="bg-slate-950/50 border border-slate-850 p-5 rounded-2xl space-y-4">
                            <p className="text-white text-sm font-medium">
                              Q{qIdx + 1}. {quiz.question}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                              {quiz.options.map((opt) => {
                                const isSelected = userAns === opt;
                                return (
                                  <button
                                    id={`quiz-opt-${key}-${opt}`}
                                    disabled={isSubmitted}
                                    key={opt}
                                    onClick={() => handleQuizSelect(key, opt)}
                                    className={`text-left px-4 py-3 rounded-xl font-medium text-xs transition duration-200 border flex items-center justify-between ${
                                      isSelected
                                        ? "bg-indigo-600/10 text-indigo-400 border-indigo-600/50"
                                        : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800/80 hover:text-white"
                                    } ${isSubmitted ? "opacity-60 cursor-not-allowed" : ""}`}
                                  >
                                    <span>{opt}</span>
                                    {isSelected && <div className="w-2 h-2 rounded-full bg-indigo-500" />}
                                  </button>
                                );
                              })}
                            </div>

                            {!isSubmitted ? (
                              <button
                                id={`submit-quiz-${key}`}
                                disabled={!userAns}
                                onClick={() => checkGrammarAnswer(selectedGrammar.id, qIdx, quiz.answer, userAns)}
                                className={`w-full py-2.5 rounded-xl font-semibold text-xs transition duration-200 ${
                                  userAns
                                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                    : "bg-slate-900 text-slate-600 border border-slate-800/40 cursor-not-allowed"
                                }`}
                              >
                                Javobni tekshirish
                              </button>
                            ) : (
                              <div className="space-y-3 animate-fade-in text-xs leading-relaxed">
                                <div className={`flex items-start gap-2 p-3.5 rounded-xl border ${
                                  isCorrect 
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                    : "bg-red-500/10 text-red-400 border-red-500/20"
                                }`}>
                                  {isCorrect ? (
                                    <CheckCircle size={15} className="mt-0.5 shrink-0" />
                                  ) : (
                                    <XCircle size={15} className="mt-0.5 shrink-0" />
                                  )}
                                  <div>
                                    <h4 className="font-semibold">{isCorrect ? "To'g'ri topshirdingiz!" : "Xato javob!"}</h4>
                                    <p className="opacity-90">To'g'ri javob: <span className="font-mono font-bold">{quiz.answer}</span></p>
                                  </div>
                                </div>
                                <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-slate-300">
                                  <p className="font-semibold text-indigo-400 mb-1">Izoh (Explanation):</p>
                                  <p>{quiz.explanation}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                  </div>

                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 flex flex-col items-center justify-center text-center space-y-4">
                  <BookOpen size={48} className="text-slate-600" />
                  <div className="space-y-1">
                    <h3 className="text-white text-lg font-bold">Grammatika qo'llanmasi</h3>
                    <p className="text-slate-400 text-sm max-w-sm">
                      Darslarni o'rganish, qoidalarni ko'rib chiqish va testlarni bajarish uchun chap tarafdan mavzuni tanlang.
                    </p>
                  </div>
                  <button
                    id="btn-trigger-grammar-first"
                    onClick={() => setSelectedGrammar(CURATED_GRAMMAR[0])}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-5 py-3 rounded-xl transition"
                  >
                    Hozirgi oddiy zamondan boshlash
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      ) : (
        /* Oxford Discover 2 Poems Section */
        <div id="poems-view-container" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
          
          {/* Left Side: Poetry List Sidebar */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 text-left">
            <h3 className="font-semibold text-base text-slate-100 flex items-center gap-2">
              <Sparkles className="text-yellow-400" size={18} />
              Oxford Discover 2 She'riyati
            </h3>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Ushbu bo'limda Oxford Discover 2 (5-sinf darsligi mavzulari) dagi diltortar klassik she'rlarni tinglashingiz, tarjimasi bilan o'rganishingiz mumkin.
            </p>

            <div className="flex flex-col gap-2">
              {OXFORD_DISCOVER_POEMS.map((poem) => (
                <button
                  id={`poem-selector-${poem.id}`}
                  key={poem.id}
                  onClick={() => {
                    setSelectedPoem(poem);
                    setPoemQuizAnswer("");
                    setPoemQuizSubmitted(false);
                  }}
                  className={`w-full text-left px-4 py-3.5 rounded-xl font-medium transition-all text-xs flex flex-col gap-1.5 border ${
                    selectedPoem.id === poem.id
                      ? "bg-indigo-600/10 text-indigo-400 border-indigo-600/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] uppercase font-mono tracking-wider font-semibold bg-slate-950/70 border border-slate-800 text-slate-400 px-2 py-0.5 rounded-md">
                      {poem.unit}
                    </span>
                    <span className="text-[10px] text-slate-500 font-sans italic">{poem.author}</span>
                  </div>
                  <span className="text-sm font-bold block">{poem.title}</span>
                </button>
              ))}
            </div>

            <div className="border-t border-slate-800/60 pt-4 text-[10px] text-slate-500 space-y-1.5">
              <p className="font-semibold text-indigo-400 flex items-center gap-1">
                📌 O'rganish imkoniyatlari:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-1">
                <li>Ovoz belgisi (karnay) orqali to'g'ri talaffuzni eshiting.</li>
                <li>“O'zbekcha tarjima” tugmasi bilan mazmunini solishtiring.</li>
                <li>Pastki mashqda she'rdagi qofiyalarni (rhymes) toping.</li>
              </ul>
            </div>
          </div>

          {/* Right Side: Active Poem Playdesk */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-8">
              
              {/* Poem Title Segment */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-6 w-full">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-indigo-600/20 border border-indigo-600/30 text-indigo-400 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      {selectedPoem.unit} • Oxford Discover 2
                    </span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md font-medium border border-emerald-500/15">
                      Classroom Poetry
                    </span>
                  </div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-white font-sans">{selectedPoem.title}</h2>
                  <p className="text-xs text-slate-400 italic">By <span className="text-slate-300 font-semibold">{selectedPoem.author}</span></p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="btn-speak-full-poem"
                    onClick={() => {
                      const fullPoemText = `${selectedPoem.title} by ${selectedPoem.author}. ` + 
                        selectedPoem.stanzas.map(s => s.en.join(". ")).join(". ");
                      speakEnglish(fullPoemText);
                    }}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition duration-200"
                    title="Butun she'rni eshitish"
                  >
                    <Volume2 size={16} />
                    She'rni eshitish (TTS)
                  </button>
                  
                  <button
                    id="btn-toggle-poem-translation"
                    onClick={() => setShowPoemTranslation(!showPoemTranslation)}
                    className={`text-xs px-3.5 py-2.5 rounded-xl border font-semibold transition duration-200 ${
                      showPoemTranslation
                        ? "bg-slate-950 text-indigo-400 border-indigo-500/40"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800"
                    }`}
                  >
                    {showPoemTranslation ? "Tarjimani yopish" : "O'zbekchasi"}
                  </button>
                </div>
              </div>

              {/* Introduction in Uzbek */}
              <div className="bg-slate-950/40 border border-slate-850 p-4 rounded-xl leading-relaxed">
                <p className="text-slate-300 text-xs text-justify">
                  💡 <span className="font-semibold text-indigo-400">Tafsilot: </span> {selectedPoem.introductionUz}
                </p>
              </div>

              {/* Main Stanzas Render */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                
                {/* English Lines Card */}
                <div className="bg-slate-950 border border-slate-850/60 p-6 rounded-2xl space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      English Original
                    </span>
                    <span className="text-[10px] text-slate-500 font-sans">Level 2 Read</span>
                  </div>
                  
                  <div className="space-y-6">
                    {selectedPoem.stanzas.map((stanza, stIdx) => (
                      <div key={stIdx} className="relative group space-y-1 bg-slate-900/40 hover:bg-slate-900/90 duration-300 p-3 rounded-lg border border-transparent hover:border-slate-850">
                        {stanza.en.map((line, lnIdx) => (
                          <p key={lnIdx} className="text-white text-sm font-semibold tracking-wide italic leading-relaxed">
                            {line}
                          </p>
                        ))}
                        <button
                          id={`btn-speech-stanza-${stIdx}`}
                          onClick={() => speakEnglish(stanza.en.join(". "))}
                          className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 bg-slate-950 hover:bg-indigo-600 text-slate-400 hover:text-white p-1.5 rounded-md border border-slate-800 transition duration-200"
                          title="Tinglash"
                        >
                          <Volume2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Uzbek Prose Translation Card */}
                {showPoemTranslation ? (
                  <div className="bg-slate-950 border border-slate-850/60 p-6 rounded-2xl space-y-6 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                      <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-emerald-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Badiiy Tarjimasi
                      </span>
                      <span className="text-[10px] text-slate-500 font-sans">O'zbek tiliga translation</span>
                    </div>

                    <div className="space-y-6">
                      {selectedPoem.stanzas.map((stanza, stIdx) => (
                        <div key={stIdx} className="space-y-1 p-3 bg-slate-900/20 rounded-lg">
                          {stanza.uz.map((line, lnIdx) => (
                            <p key={lnIdx} className="text-slate-400 text-sm leading-relaxed">
                              {line}
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-950/40 border-2 border-dashed border-slate-850 p-8 rounded-2xl flex flex-col items-center justify-center text-center h-full space-y-2">
                    <Sparkles className="text-slate-600" size={32} />
                    <p className="text-slate-400 text-xs">Badiiy tarjimasi yashirilgan.</p>
                    <button
                      id="lnk-show-translations-now"
                      onClick={() => setShowPoemTranslation(true)}
                      className="text-indigo-400 hover:text-indigo-300 text-xs font-semibold underline"
                    >
                      Badiiy tarjimani ochish
                    </button>
                  </div>
                )}

              </div>

              {/* Poem Vocabulary Grid */}
              <div className="border-t border-slate-800/80 pt-6 space-y-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <FolderOpen className="text-indigo-400" size={16} />
                  Mavzuga doir yangi so'zlar (Poem Vocabulary)
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {selectedPoem.vocabulary.map((vocab, vIdx) => (
                    <div key={vIdx} className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl flex items-center justify-between gap-3 duration-200 hover:border-slate-800">
                      <div className="space-y-0.5 animate-fade-in text-left">
                        <span className="font-bold text-xs text-white block">{vocab.en}</span>
                        <span className="font-mono text-[10px] text-indigo-400 block">{vocab.phonetic}</span>
                        <span className="text-slate-400 text-[11px] block">{vocab.uz}</span>
                      </div>
                      <button
                        id={`btn-speech-poem-vocab-${vIdx}`}
                        onClick={() => speakEnglish(vocab.en)}
                        className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white p-1.5 rounded-lg border border-slate-800 transition"
                        title="Tinglash"
                      >
                        <Volume2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Rhyme Quiz */}
              <div className="border-t border-slate-800/80 pt-6 space-y-4">
                <div className="flex items-center gap-1 text-sm font-semibold text-white">
                  <HelpCircle className="text-amber-400" size={16} />
                  <span>Qofiya Topish Mashqi (Rhyming Challenge Quiz)</span>
                </div>
                
                <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4">
                  <p className="text-white text-xs sm:text-sm font-medium">
                    ❓ {selectedPoem.quickQuiz.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedPoem.quickQuiz.options.map((opt) => {
                      const isSelected = poemQuizAnswer === opt;
                      return (
                        <button
                          id={`poem-quiz-opt-${opt}`}
                          disabled={poemQuizSubmitted}
                          key={opt}
                          onClick={() => setPoemQuizAnswer(opt)}
                          className={`text-left px-4 py-3 rounded-xl font-medium text-xs transition duration-200 border flex items-center justify-between ${
                            isSelected
                              ? "bg-indigo-600/10 text-indigo-400 border-indigo-550/50"
                              : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white"
                          } ${poemQuizSubmitted ? "opacity-60 cursor-not-allowed" : ""}`}
                        >
                          <span>{opt}</span>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                        </button>
                      );
                    })}
                  </div>

                  {!poemQuizSubmitted ? (
                    <button
                      id="btn-submit-poem-quiz"
                      disabled={!poemQuizAnswer}
                      onClick={() => setPoemQuizSubmitted(true)}
                      className={`w-full py-2.5 rounded-xl font-semibold text-xs transition duration-200 ${
                        poemQuizAnswer
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : "bg-slate-900 text-slate-600 border border-slate-800/40 cursor-not-allowed"
                      }`}
                    >
                      Javobni tekshirish
                    </button>
                  ) : (
                    <div className="space-y-3 animate-fade-in text-xs leading-relaxed">
                      <div className={`flex items-start gap-2 p-3.5 rounded-xl border ${
                        poemQuizAnswer === selectedPoem.quickQuiz.answer
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}>
                        {poemQuizAnswer === selectedPoem.quickQuiz.answer ? (
                          <CheckCircle size={15} className="mt-0.5 shrink-0" />
                        ) : (
                          <XCircle size={15} className="mt-0.5 shrink-0" />
                        )}
                        <div>
                          <h4 className="font-semibold">
                            {poemQuizAnswer === selectedPoem.quickQuiz.answer ? "Ajoyib, qofiyani topdingiz!" : "Qayta urinib ko'ring!"}
                          </h4>
                          <p className="opacity-90">To'g'ri javob: <span className="font-mono font-bold text-yellow-500 uppercase">{selectedPoem.quickQuiz.answer}</span></p>
                        </div>
                      </div>
                      
                      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-slate-300">
                        <p className="font-semibold text-indigo-400 mb-1">Izoh (Poem Rhymes Guidance):</p>
                        <p>{selectedPoem.quickQuiz.explanation}</p>
                      </div>

                      <button
                        id="btn-reset-poem-quiz"
                        onClick={() => {
                          setPoemQuizAnswer("");
                          setPoemQuizSubmitted(false);
                        }}
                        className="bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 px-4 py-2.5 rounded-xl transition font-semibold"
                      >
                        Mashqni qaytadan boshlash
                      </button>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
