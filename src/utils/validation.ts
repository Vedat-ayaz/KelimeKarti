import { Word } from '../domain/entities/Word';

export type ValidationResult = { valid: true } | { valid: false; message: string };
export const normalizeTerm = (value: string) => value.trim().toLocaleLowerCase('tr-TR');
export const validateWord = (term: string, translation: string): ValidationResult =>
  term.trim() && translation.trim() ? { valid: true } : { valid: false, message: 'Kelime ve Türkçe karşılık zorunludur.' };
export const isDuplicateWord = (term: string, words: Word[], ignoredId?: string): boolean =>
  words.some((word) => word.id !== ignoredId && normalizeTerm(word.term) === normalizeTerm(term));
