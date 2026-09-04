import { Word } from '../../domain/entities/Word';
import { WordRepository } from '../../domain/repositories/WordRepository';
import { wordStorage } from '../storage/wordStorage';

export class AsyncStorageWordRepository implements WordRepository {
  getAll() { return wordStorage.read(); }
  saveAll(words: Word[]) { return wordStorage.write(words); }
  async add(word: Word) { const words = await this.getAll(); await this.saveAll([...words, word]); }
  async update(word: Word) { const words = await this.getAll(); await this.saveAll(words.map((item) => item.id === word.id ? word : item)); }
  async remove(id: string) { const words = await this.getAll(); await this.saveAll(words.filter((item) => item.id !== id)); }
}

export const wordRepository = new AsyncStorageWordRepository();
