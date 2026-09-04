import { usePracticeStore } from '../stores/usePracticeStore';
import { useWordsStore } from '../stores/useWordsStore';
import { Word } from '../domain/entities/Word';
const makeWord = (): Word => ({ id: '1', term: 'Apple', translation: 'Elma', isLearned: false, correctCount: 0, wrongCount: 0, createdAt: '2026-01-01T00:00:00.000Z' });
describe('practice logic', () => {
  beforeEach(() => { usePracticeStore.getState().reset(); useWordsStore.setState({ words: [makeWord()] }); });
  it('marks known answers learned', async () => { await useWordsStore.getState().recordAnswer('1', true); expect(useWordsStore.getState().words[0]?.isLearned).toBe(true); });
  it('marks unknown answers unlearned', async () => { useWordsStore.setState({ words: [{ ...makeWord(), isLearned: true }] }); await useWordsStore.getState().recordAnswer('1', false); expect(useWordsStore.getState().words[0]?.isLearned).toBe(false); });
  it('requeues an unknown card once', () => { usePracticeStore.getState().start([makeWord()], true); usePracticeStore.getState().answer('1', false); expect(usePracticeStore.getState().queue).toEqual(['1', '1']); });
  it('does not requeue the same card twice', () => { usePracticeStore.getState().start([makeWord()], true); usePracticeStore.getState().answer('1', false); usePracticeStore.getState().next(); usePracticeStore.getState().answer('1', false); expect(usePracticeStore.getState().queue).toEqual(['1', '1']); });
});
