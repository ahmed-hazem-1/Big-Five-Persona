export type Trait = 'O' | 'C' | 'E' | 'A' | 'N';

export type Question = {
  id: number;
  trait: Trait;
  key: 1 | -1;
  code?: string;
  text: Record<string, string>;
};

import { questions as generatedQuestions } from './questions.generated';

export const questions: Question[] = generatedQuestions as unknown as Question[];
