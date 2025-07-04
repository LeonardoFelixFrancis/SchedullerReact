import api from './api';
import type { StudentCreateData, StudentUpdateData, StudentFilter, StudentAttendance } from '@/models/student';

export const createStudentService = async (data: StudentCreateData) => {
    const response = await api.post('/students/', data);
    return response;
}

export const getStudentService = async (student_id: number) => {
    const response = await api.get(`/students/${student_id}`);
    return response;
}

export const listStudentService = async (filter: StudentFilter) => {
    const response = await api.get(`/students`, {params: {...filter}});
    return response;
}

export const updateStudentService = async (data: StudentUpdateData) => {
    const response = await api.put('/students', data);
    return response;
}

export const deleteStudentService = async (student_id: number) => {
    const response = await api.delete(`/students/${student_id}`);
    return response;
}

export const addUStudentToLessonService = async (student_id: number, lesson_id: number) => {
    const response = await api.post(`/students/add_student_to_lesson/${student_id}/${lesson_id}`);
    return response;
}

export const listStudentsByLessonService = async (lesson_id: number) => {
    const response = await api.get(`/students/get_lesson_students/${lesson_id}`);
    return response;
}

export const createStudentAttendanceService = async (data: StudentAttendance) => {
    const response = await api.post('/students/create_student_attendance', data);
    return response;
}

export const updateStudentAttendanceService = async (data: StudentAttendance) => {
    const response = await api.put('/students/update_student_attendance', data);
    return response;
}