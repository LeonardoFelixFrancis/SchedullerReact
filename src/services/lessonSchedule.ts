import api from "./api";
import type { LessonScheduleData, LessonScheduleFilter } from "@/models/lessonSchedule";

export const createLessonScheduleService = async (data: LessonScheduleData) => {
    const response = await api.post('/lesson_schedule', data);
    return response;
}

export const listLessonScheduleService = async (filter: LessonScheduleFilter) => {
    const response = await api.get('/lesson_schedule', {params: {...filter}});
    return response;
}

export const getLessonScheduleService = async (lesson_schedule_id: number) => {
    const response = await api.get(`/lesson_schedule/${lesson_schedule_id}`);
    return response;
}

export const updateLessonScheduleService = async (data: LessonScheduleData) => {
    const response = await api.put('/lesson_schedule', data);
    return response;
}

export const deleteLessonScheduleService = async (lesson_schedule_id: number) => {
    const response = await api.delete(`/lesson_schedule/${lesson_schedule_id}`);
    return response
}