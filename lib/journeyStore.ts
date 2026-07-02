import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LkpdAnswers {
  lkpd1: string;   // Tahap 2: proses pelapukan
  lkpd2: string;   // Tahap 3: kontaminasi pangan
  lkpd3q1: string; // Tahap 4: mengapa lambung gagal
  lkpd3q2: string; // Tahap 4: organ paling berbahaya
  lkpd4: string;   // Tahap 5: HOTS synthesis
  commitment: string;
}

export interface SelectedFood {
  id: string;
  name: string;
  particles: number;
}

interface JourneyState {
  studentName: string;
  studentClass: string;
  sessionId: string;
  completedStages: number[];
  selectedFoods: SelectedFood[];
  totalParticles: number;
  lkpdAnswers: LkpdAnswers;
  mostDangerousOrgan: string;
  organInteractions: string[]; // ids of organs clicked

  setStudent: (name: string, cls: string) => void;
  completeStage: (stageId: number) => void;
  addFood: (food: SelectedFood) => void;
  setTotalParticles: (n: number) => void;
  setLkpdAnswer: (key: keyof LkpdAnswers, value: string) => void;
  setMostDangerousOrgan: (organ: string) => void;
  addOrganInteraction: (id: string) => void;
  reset: () => void;
}

const INITIAL_LKPD: LkpdAnswers = {
  lkpd1: '', lkpd2: '', lkpd3q1: '', lkpd3q2: '', lkpd4: '', commitment: '',
};

export const useJourneyStore = create<JourneyState>()(
  persist(
    (set) => ({
      studentName: '',
      studentClass: '',
      sessionId: '',
      completedStages: [],
      selectedFoods: [],
      totalParticles: 0,
      lkpdAnswers: INITIAL_LKPD,
      mostDangerousOrgan: '',
      organInteractions: [],

      setStudent: (name, cls) => set({
        studentName: name,
        studentClass: cls,
        sessionId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      }),

      completeStage: (id) => set(s => ({
        completedStages: s.completedStages.includes(id)
          ? s.completedStages
          : [...s.completedStages, id].sort((a, b) => a - b),
      })),

      addFood: (food) => set(s => ({
        selectedFoods: s.selectedFoods.some(f => f.id === food.id)
          ? s.selectedFoods
          : [...s.selectedFoods, food],
        totalParticles: s.totalParticles + food.particles,
      })),

      setTotalParticles: (n) => set({ totalParticles: n }),

      setLkpdAnswer: (key, value) => set(s => ({
        lkpdAnswers: { ...s.lkpdAnswers, [key]: value },
      })),

      setMostDangerousOrgan: (organ) => set({ mostDangerousOrgan: organ }),

      addOrganInteraction: (id) => set(s => ({
        organInteractions: s.organInteractions.includes(id)
          ? s.organInteractions
          : [...s.organInteractions, id],
      })),

      reset: () => set({
        studentName: '', studentClass: '', sessionId: '',
        completedStages: [], selectedFoods: [], totalParticles: 0,
        lkpdAnswers: INITIAL_LKPD, mostDangerousOrgan: '', organInteractions: [],
      }),
    }),
    { name: 'microjourney-state' }
  )
);
