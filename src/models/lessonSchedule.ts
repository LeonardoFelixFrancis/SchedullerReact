export interface LessonScheduleData {
    id?: number | null;
    lesson_id: number;
    date: string;
    time: string;
    teacher_id: number;
    teacher_name?: string;
}

export interface LessonScheduleResponse {
    id: number;
    lesson_id: number;
    date: string;
    time: string;
    teacher_id: number;
    teacher_name: string;
    teacher_active: boolean;
    lesson_name: string;
    lesson_active: boolean;
}

export interface LessonScheduleFilter {
    id?: number | null;
    lesson_id?: number;
    date?: string;
    time?: string;
    teacher_id?: number;
    company_id?: number;
    date_start?: string;
    date_end?: string;
}