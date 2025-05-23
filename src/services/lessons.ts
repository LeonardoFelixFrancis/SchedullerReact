import api from "./api";
import type {LessonData, LessonFilter} from "@/models/lesson";

export const createLessonService = async (data: LessonData) => {
    const response = await api.post('/lesson', data)
    return response;
}

export const listLessonsService = async (filters: LessonFilter) => {
    const response = await api.get('/lesson', {params: {...filters}})
    return response;
}

export const getLessonService = async (lesson_id: number) => {
    const response = await api.get(`/lesson/${lesson_id}`);
    return response;
}

export const deleteLessonService = async (lesson_id: number) => {
    const response = await api.delete(`/lesson/${lesson_id}`);
    return response;
}

export const updateLessonService = async (data: LessonData) => {
    const response = await api.put('/lessno', data);
    return response;
}