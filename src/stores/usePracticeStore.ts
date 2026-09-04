import { create } from 'zustand';
import { Word } from '../domain/entities/Word';
import { shuffle } from '../utils/shuffle';

export type PracticeSummary = { shown: number; known: number; unknown: number };
type State = {
  queue: string[]; index: number; answerShown: boolean; lastAnswer?: boolean; requeuedIds: string[]; summary: PracticeSummary;
  start(words: Word[], includeLearned: boolean): void; answer(id: string, known: boolean): void; next(): void; reset(): void;
};
const initial = { queue: [] as string[], index: 0, answerShown: false, lastAnswer: undefined, requeuedIds: [] as string[], summary: { shown: 0, known: 0, unknown: 0 } };
export const usePracticeStore = create<State>((set) => ({
  ...initial,
  start: (words, includeLearned) => set({ ...initial, queue: shuffle(words.filter((word) => includeLearned || !word.isLearned).map((word) => word.id)) }),
  answer: (id, known) => set((state) => {
    if (state.answerShown) return state;
    const shouldRequeue = !known && !state.requeuedIds.includes(id);
    return { answerShown: true, lastAnswer: known, queue: shouldRequeue ? [...state.queue, id] : state.queue, requeuedIds: shouldRequeue ? [...state.requeuedIds, id] : state.requeuedIds, summary: { shown: state.summary.shown + 1, known: state.summary.known + (known ? 1 : 0), unknown: state.summary.unknown + (known ? 0 : 1) } };
  }),
  next: () => set((state) => ({ index: state.index + 1, answerShown: false, lastAnswer: undefined })),
  reset: () => set(initial),
}));
