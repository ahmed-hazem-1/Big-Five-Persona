import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { questions } from '../data/questions';

export interface Answer {
  questionId: number;
  value: number; // 1 to 5
}

interface AssessmentState {
  hasStarted: boolean;
  currentQuestionIndex: number;
  answers: Record<number, number>;
  isComplete: boolean;
  startAssessment: () => void;
  setAnswer: (questionId: number, value: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  completeAssessment: () => void;
  resetAssessment: () => void;
}

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set, get) => ({
      hasStarted: false,
      currentQuestionIndex: 0,
      answers: {},
      isComplete: false,

      startAssessment: () => set({ hasStarted: true, isComplete: false, currentQuestionIndex: 0, answers: {} }),
      
      setAnswer: (questionId, value) => 
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: value
          }
        })),

      nextQuestion: () => 
        set((state) => ({
          currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, questions.length - 1)
        })),

      prevQuestion: () => 
        set((state) => ({
          currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1)
        })),

      completeAssessment: () => set({ isComplete: true }),

      resetAssessment: () => set({
        hasStarted: false,
        currentQuestionIndex: 0,
        answers: {},
        isComplete: false
      })
    }),
    {
      name: 'ocean-assessment-storage',
    }
  )
);
