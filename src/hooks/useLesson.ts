import type { LessonData } from "@/models/lesson";
import type { LessonFilter } from "@/models/lesson";
import { createLessonService, getLessonService, listLessonsService, updateLessonService, deleteLessonService } from "@/services/lessons";
import { useState, useCallback } from "react";

export default function useLesson() {
    
    const [lessons, setLessons] = useState<LessonData[]>([]);

    const createLesson = async (data: LessonData) => {
        await createLessonService(data);
    }

    const getLesson = async (lesson_id: number) => {
        const response = await getLessonService(lesson_id);
        
        if (response.status === 200){
            return response.data;
        }
        
        return {};
    }

    const listLesson = useCallback(async (filter: LessonFilter) => {
        const response = await listLessonsService(filter);

        if (response.status === 200) {
            setLessons(response.data);
        }

        return [];
    }, [])

    const updateLesson = async (data: LessonData) => {
        await updateLessonService(data);
    }

    const deleteLesson = async (lesson_id: number) => {
        await deleteLessonService(lesson_id);
    }

    return {createLesson, getLesson, listLesson, updateLesson, deleteLesson, lessons}
}