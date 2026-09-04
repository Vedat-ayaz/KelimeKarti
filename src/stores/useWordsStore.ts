import { create } from 'zustand';
import { wordRepository } from '../data/repositories/AsyncStorageWordRepository';
import { Word, WordDraft } from '../domain/entities/Word';
import { createId } from '../utils/id';
import { nowIso } from '../utils/date';

export type WordFilter = 'all' | 'unlearned' | 'learned';
type State = {
  words: Word[]; isLoading: boolean; error?: string; searchQuery: string; filter: WordFilter; includeLearned: boolean;
  loadWords(): Promise<void>; addWord(draft: WordDraft): Promise<void>; updateWord(id: string, draft: WordDraft): Promise<void>;
  deleteWord(id: string): Promise<void>; recordAnswer(id: string, known: boolean): Promise<void>; toggleLearned(id: string): Promise<void>;
  setSearchQuery(value: string): void; setFilter(value: WordFilter): void; setIncludeLearned(value: boolean): void;
};

const clean = (draft: WordDraft): WordDraft => ({ term: draft.term.trim(), translation: draft.translation.trim(), exampleSentence: draft.exampleSentence?.trim() || undefined, note: draft.note?.trim() || undefined });
export const useWordsStore = create<State>((set, get) => ({
  words: [], isLoading: false, searchQuery: '', filter: 'all', includeLearned: false,
  loadWords: async () => { set({ isLoading: true, error: undefined }); try { set({ words: await wordRepository.getAll(), isLoading: false }); } catch { set({ words: [], isLoading: false, error: 'Kelimeler yüklenemedi.' }); } },
  addWord: async (draft) => { const word: Word = { id: createId(), ...clean(draft), isLearned: false, correctCount: 0, wrongCount: 0, createdAt: nowIso() }; const words = [...get().words, word]; await wordRepository.saveAll(words); set({ words }); },
  updateWord: async (id, draft) => { const words = get().words.map((word) => word.id === id ? { ...word, ...clean(draft) } : word); await wordRepository.saveAll(words); set({ words }); },
  deleteWord: async (id) => { const words = get().words.filter((word) => word.id !== id); await wordRepository.saveAll(words); set({ words }); },
  recordAnswer: async (id, known) => { const words = get().words.map((word) => word.id === id ? { ...word, isLearned: known, correctCount: word.correctCount + (known ? 1 : 0), wrongCount: word.wrongCount + (known ? 0 : 1), lastPracticedAt: nowIso() } : word); await wordRepository.saveAll(words); set({ words }); },
  toggleLearned: async (id) => { const target = get().words.find((word) => word.id === id); if (!target) return; const words = get().words.map((word) => word.id === id ? { ...word, isLearned: !word.isLearned } : word); await wordRepository.saveAll(words); set({ words }); },
  setSearchQuery: (searchQuery) => set({ searchQuery }), setFilter: (filter) => set({ filter }), setIncludeLearned: (includeLearned) => set({ includeLearned }),
}));
