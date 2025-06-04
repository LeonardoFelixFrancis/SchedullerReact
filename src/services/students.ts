import api from './api';
import type { StudentCreateData, StudentUpdateData, StudentFilter } from '@/models/student';

export const createStudentService = async (data: StudentCreateData) => {
    const response = await api.post('/api/students/', data);
    return response;
}

export const getStudentService = async (student_id: number) => {
    const response = await api.get(`/api/students/${student_id}`);
    return response;
}

export const listStudentService = async (filter: StudentFilter) => {
    const response = await api.get(`/api/students`, {params: {...filter}});
    return response;
}

export const updateStudentService = async (data: StudentUpdateData) => {
    const response = await api.put('/api/students', data);
    return response;
}

export const deleteStudentService = async (student_id: number) => {
    const response = await api.delete(`/api/students/${student_id}`);
    return response;
}

export const addUStudentToLessonService = async (student_id: number, lesson_id: number) => {
    const response = await api.post(`/api/students/add_student_to_lesson/${student_id}/${lesson_id}`);
    return response;
}