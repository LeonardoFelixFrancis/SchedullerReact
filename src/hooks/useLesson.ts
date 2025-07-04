import type { LessonData, LessonFilter, LessonResponse } from "@/models/lesson";
import { createLessonService, getLessonService, listLessonsService, updateLessonService, deleteLessonService } from "@/services/lessons";
import { useState, useCallback } from "react";
import { toast } from "react-toastify";

export default function useLesson() {
    
    const [lessons, setLessons] = useState<LessonResponse[]>([]);

    const createLesson = async (data: LessonData) => {

        const students = data.students; 
        const treatedStudents = students.map((student) => student.value);
        data.students = treatedStudents; 

        await createLessonService(data);
        toast.success('Aula criada com sucesso.')
    }

    const getLesson = useCallback(async (lesson_id: number) => {
        const response = await getLessonService(lesson_id);
        
        if (response.status === 200){
            return response.data;
        }
        
        return {};
    }, [])

    const listLesson = useCallback(async (filter: LessonFilter) => {
        const response = await listLessonsService(filter);

        if (response.status === 200) {
            setLessons(response.data);
        }

        return [];
    }, [])

    const updateLesson = async (data: LessonData) => {
        const students = data.students; 
        const treatedStudents = students.map((student) => student.value);
        data.students = treatedStudents; 

        await updateLessonService(data);
    }

    const deleteLesson = async (lesson_id: number) => {
        await deleteLessonService(lesson_id);
        toast.success('Aula deletada com successo.')
    }

    return {createLesson, getLesson, listLesson, updateLesson, deleteLesson, lessons}
}