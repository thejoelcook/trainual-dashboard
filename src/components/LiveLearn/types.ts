export type ChatMessage = {
  question: string;
  answer: string;
  videoUrl?: string;
  videoTitle?: string;
  timestamp: number;
};

export type MockResponse = {
  keywords: string[];
  answer: string;
  videoUrl?: string;
  videoTitle?: string;
};
