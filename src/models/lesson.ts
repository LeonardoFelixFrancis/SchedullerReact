export interface LessonData {
    id?: number | null;
    lesson_name: string;
    lesson_subject: string;
    students: string[]; 
}

export interface LessonResponse {
    id: number;
    lesson_name: string;
    lesson_subject: string;
    students: string[]; 
}

export interface LessonFilter {
    id?: number | null;
    lesson_name?: string | null;
    lesson_subject?: string | null;
    students?: string[] | null;
    company_id?: number | null; 
}