export interface StudentCreateData {
    name: string;
}

export interface StudentUpdateData {
    id: number;
    name: string;
}

export interface StudentResponseData {
    id: number;
    name: string;
    company_id: string;
}

export interface StudentFilter {
    name?: string;
    company_id?: number;
}

export interface StudentAttendance {
    schedule_id: number;
    student_id: number;
    attended: boolean;
}