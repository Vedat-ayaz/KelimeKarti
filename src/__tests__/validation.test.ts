import { Word } from '../domain/entities/Word';
import { isDuplicateWord, validateWord } from '../utils/validation';
const word: Word = { id: '1', term: 'Apple', translation: 'Elma', isLearned: false, correctCount: 0, wrongCount: 0, createdAt: '2026-01-01T00:00:00.000Z' };
describe('word validation', () => {
  it('rejects an empty term', () => expect(validateWord(' ', 'Elma').valid).toBe(false));
  it('rejects an empty translation', () => expect(validateWord('Apple', ' ').valid).toBe(false));
  it('accepts valid content', () => expect(validateWord('Apple', 'Elma').valid).toBe(true));
  it('finds duplicates case-insensitively', () => expect(isDuplicateWord(' apple ', [word])).toBe(true));
});
