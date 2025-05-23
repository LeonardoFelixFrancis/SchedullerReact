export interface LessonScheduleData {
    id?: number | null;
    lesson_id: number;
    date: string;
    time: string;
    teacher_id: number;
}

export interface LessonScheduleFilter {
    id?: number | null;
    lesson_id?: number;
    date?: string;
    time?: string;
    teacher_id?: number;
    company_id?: number; 
}