import { create } from 'zustand';
import type { LessonScheduleData, LessonScheduleFilter, LessonScheduleResponse } from "@/models/lessonSchedule";
import {
  createLessonScheduleService,
  getLessonScheduleService,
  listLessonScheduleService,
  updateLessonScheduleService,
  deleteLessonScheduleService
} from "@/services/lessonSchedule";
import { toast } from 'react-toastify';

type LessonScheduleStore = {
  lessonSchedules: LessonScheduleResponse[] | null;
  createLessonSchedule: (data: LessonScheduleData) => Promise<void>;
  getLessonSchedule: (id: number) => Promise<LessonScheduleData | null>;
  listLessonSchedule: (filter: LessonScheduleFilter) => Promise<void>;
  updateLessonSchedule: (data: LessonScheduleData) => Promise<void>;
  deleteLessonSchedule: (id: number) => Promise<void>;
};

export const useLessonScheduleStore = create<LessonScheduleStore>((set, get) => ({
  lessonSchedules: null,

  createLessonSchedule: async (data) => {
    await createLessonScheduleService(data);
    await get().listLessonSchedule({});
    toast.success("Aula agendada com sucesso.")
  },

  getLessonSchedule: async (id) => {
    const response = await getLessonScheduleService(id);
    if (response.status === 200) return response.data;
    return null;
  },

  listLessonSchedule: async (filter) => {
    const response = await listLessonScheduleService(filter);
    if (response.status === 200) {
      set({ lessonSchedules: response.data });
    }
  },

  updateLessonSchedule: async (data) => {
    await updateLessonScheduleService(data);
    await get().listLessonSchedule({});
    toast.success('Aula atualizada com sucesso.')
  },

  deleteLessonSchedule: async (id) => {
    await deleteLessonScheduleService(id);
    await get().listLessonSchedule({});
    toast.success('Agendamento de aula deletado com sucesso.')
  }
}));
