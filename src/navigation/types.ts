import { PracticeSummary } from '../stores/usePracticeStore';

export type RootStackParamList = {
  Home: undefined;
  AddEditWord: { wordId?: string } | undefined;
  Practice: undefined;
  PracticeSummary: PracticeSummary;
};
