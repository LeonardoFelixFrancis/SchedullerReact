import { createStudentService, 
         listStudentService, 
         getStudentService, 
         updateStudentService,
         createStudentAttendanceService,
         updateStudentAttendanceService, 
         addUStudentToLessonService, 
         deleteStudentService,
        listStudentsByLessonService
     } from "@/services/students";
import { toast } from "react-toastify";
import type { StudentCreateData, StudentFilter, StudentUpdateData, StudentResponseData, StudentAttendance } from "@/models/student";
import { useCallback, useState } from "react";

export default function useStudent () {
    const [students, setStudents] = useState<StudentResponseData[]>();

    const createStudent = async (data: StudentCreateData) => {
        const response = await createStudentService(data);
        
        if (response.status === 200) {
            toast.success('Estudante cadastrado com sucesso.')
        } else {
            toast.error('Ocorreu um erro ao cadastrar o estudante.')
        }

        return response;
    }

    const getStudent = async (student_id: number): Promise<StudentResponseData> => {
        const response = await getStudentService(student_id);
        return response.data
    }

    const listStudent = useCallback(async (filter: StudentFilter) => {
        const response = await listStudentService(filter);
        const data = response.data;

        if (data){
            setStudents(data);
        }
    }, []);

    const deleteStudent = async (student_id: number) => {
        const response = await deleteStudentService(student_id);
        return response.data;
    }

    const updateStudent = async (data: StudentUpdateData) => {
        const response = await updateStudentService(data);
        return response.data;
    }

    const listStudentsByLesson = async (lesson_id: number) => {
        const response = await listStudentsByLessonService(lesson_id);
        return response.data;
    }

    const createStudentAttendance = async (data: StudentAttendance) => {
        const response = await createStudentAttendanceService(data);
        return response.data;
    }

    const updateStudentAttendance = async (data: StudentAttendance) => {
        const response = await updateStudentAttendanceService(data);
        return response.data;
    }

    return {createStudent, getStudent, listStudent, deleteStudent, updateStudent, listStudentsByLesson, createStudentAttendance, updateStudentAttendance, students}
}