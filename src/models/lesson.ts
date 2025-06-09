/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StudentResponseData } from "./student";
export interface LessonData {
    id?: number | null;
    lesson_name: string;
    lesson_subject: string;
    students: any[]; 
}

export interface LessonResponse {
    id: number;
    lesson_name: string;
    lesson_subject: string;
    students: StudentResponseData[]; 
}

export interface LessonFilter {
    id?: number | null;
    lesson_name?: string | null;
    lesson_subject?: string | null;
    students?: string[] | null;
    company_id?: number | null; 
}