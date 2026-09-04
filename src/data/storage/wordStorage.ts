import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../constants/storageKeys';
import { Word } from '../../domain/entities/Word';

const isWord = (value: unknown): value is Word => {
  if (!value || typeof value !== 'object') return false;
  const word = value as Record<string, unknown>;
  return typeof word.id === 'string' && typeof word.term === 'string' && typeof word.translation === 'string' &&
    typeof word.isLearned === 'boolean' && typeof word.correctCount === 'number' && typeof word.wrongCount === 'number' && typeof word.createdAt === 'string';
};

export const wordStorage = {
  async read(): Promise<Word[]> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.words);
      if (!raw) return [];
      const value: unknown = JSON.parse(raw);
      return Array.isArray(value) && value.every(isWord) ? value : [];
    } catch { return []; }
  },
  async write(words: Word[]): Promise<void> { await AsyncStorage.setItem(STORAGE_KEYS.words, JSON.stringify(words)); },
};
