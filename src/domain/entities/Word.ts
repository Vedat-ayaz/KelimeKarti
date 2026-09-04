export type Word = {
  id: string;
  term: string;
  translation: string;
  exampleSentence?: string;
  note?: string;
  isLearned: boolean;
  correctCount: number;
  wrongCount: number;
  createdAt: string;
  lastPracticedAt?: string;
};

export type WordDraft = Pick<Word, 'term' | 'translation' | 'exampleSentence' | 'note'>;
