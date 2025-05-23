import { useState } from "react";
import type { LessonScheduleData, LessonScheduleFilter } from "@/models/lessonSchedule";
import { createLessonScheduleService, getLessonScheduleService, listLessonScheduleService, updateLessonScheduleService, deleteLessonScheduleService } from "@/services/lessonSchedule";

export default function useLessonSchedule () {
    const [lessonsSchedules, setLessonSchedules ] = useState<LessonScheduleData[] | null>(null);

    const createLessonSchedule = async (data: LessonScheduleData) => {
        await createLessonScheduleService(data);
    }

    const getLessonSchedule = async (lesson_schedule_id: number): Promise<LessonScheduleData | null> => {
        const response = await getLessonScheduleService(lesson_schedule_id);

        if (response.status === 200){
            return response.data;
        }

        return null;
    }

    const listLessonSchedule = async (filter: LessonScheduleFilter) => {
        const response = await listLessonScheduleService(filter);

        if (response.status === 200){
            setLessonSchedules(response.data);
        }
    }

    const deleteLessonSchedule = async (lesson_schedule_id: number) => {
        await deleteLessonScheduleService(lesson_schedule_id);
    }

    const updateLessonSchedule = async (data: LessonScheduleData) => {
        await updateLessonScheduleService(data);
    }

    return {createLessonSchedule, getLessonSchedule, listLessonSchedule, updateLessonSchedule, deleteLessonSchedule, lessonsSchedules}
}