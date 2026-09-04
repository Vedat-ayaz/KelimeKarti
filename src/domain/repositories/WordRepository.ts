import { Word } from '../entities/Word';

export interface WordRepository {
  getAll(): Promise<Word[]>;
  saveAll(words: Word[]): Promise<void>;
  add(word: Word): Promise<void>;
  update(word: Word): Promise<void>;
  remove(id: string): Promise<void>;
}
