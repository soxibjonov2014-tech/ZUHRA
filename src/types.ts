// Typescript Definitions for Ingliz Tili Akademiyasi Application

export interface Word {
  id: string;
  en: string;
  uz: string;
  phonetic: string;
  category: string;
  exampleEn: string;
  exampleUz: string;
}

export interface GrammarTopic {
  id: string;
  title: string;
  level: "Boshlang'ich" | "O'rta" | "Murakkab";
  description: string;
  rules: string[];
  examples: {
    en: string;
    uz: string;
  }[];
  quickQuiz: {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  }[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface GameState {
  score: number;
  streak: number;
  currentWord: {
    word: string;
    hintUz: string;
    scrambled: string;
    sentenceExample: string;
    translation: string;
    phonetic: string;
    funFactUz: string;
  } | null;
  loading: boolean;
  userInput: string;
  feedback: "correct" | "incorrect" | "idle";
  feedbackMessage: string;
  level: "easy" | "medium" | "hard";
}
