/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import type { LessonData, LessonResponse } from "@/models/lesson";
import LessonsModal from "./LessonsModal";
import { useMemo, useState } from "react";

type Props = {
  lessons: LessonResponse[];
  deleteLesson: (id: number) => void;
  editLesson: (data: LessonData) => void;
};

export default function LessonsTable({ lessons, deleteLesson, editLesson }: Props) {

  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>();

  const handleEdit = (lesson: any) => {
    console.log('lesson', lesson)
    setSelectedId(lesson.id);
    setEditModalOpen(true);
  }

  const innerLessons = useMemo(
    () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const return_value: any[] = [];
        lessons.forEach((lesson: LessonResponse) => {
            const students_string = lesson.students?.map((student) => student.name).join(', ');
            const students_string_limit = 100;

            let final_string = students_string;
            if (final_string.length > students_string_limit){
                final_string = students_string.substring(0, students_string_limit);
                final_string = final_string.endsWith(',') ? final_string.substring(0, final_string.length - 1) : final_string;
                final_string = final_string.endsWith(', ') ? final_string.substring(0, final_string.length - 2) : final_string;
                final_string += '...';
            }

            return_value.push(
                {
                    id: lesson.id,
                    lesson_name: lesson.lesson_name,
                    lesson_subject: lesson.lesson_subject,
                    students: final_string,
                    full_students: students_string
                }
            )
        })
        return return_value;
    }, [lessons]
  )


  return (
    <>
    <Table className="border">
      <TableHeader className="bg-gray-400 ">
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Assunto</TableHead>
          <TableHead>Alunos</TableHead>
          <TableHead className="text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white">
        {innerLessons.map((lesson, index) => (
          <TableRow key={index}>
            <TableCell>{lesson.lesson_name}</TableCell>
            <TableCell>{lesson.lesson_subject}</TableCell>

            <TableCell title={lesson.full_students}>
              {lesson.students.length > 0 &&
                lesson.students}
            </TableCell>

            <TableCell align="center" className="flex justify-center">
              <TrashIcon
                className="h-5 w-5 text-red-600 hover:cursor-pointer"
                onClick={() => deleteLesson(lesson.id)}
              />

              <PencilSquareIcon
                className="h-5 w-5 text-blue-600 hover:cursor-pointer"
                onClick={() => handleEdit(lesson)}
                />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    {
     (selectedId && editModalOpen) && (
        <LessonsModal open={editModalOpen} setOpen={setEditModalOpen} id={selectedId} onSubmit={editLesson}/>
     )
    }

    </>
  );
}
