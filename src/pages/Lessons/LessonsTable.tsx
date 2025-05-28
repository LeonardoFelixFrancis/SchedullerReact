import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TrashIcon } from "lucide-react";
import type { LessonResponse } from "@/models/lesson";

type Props = {
    lessons: LessonResponse[];
    deleteLesson: (id: number) => void;
}

export default function LessonsTable({ lessons, deleteLesson }: Props) {

    return (
        <Table className="border">
            <TableHeader className="bg-gray-400 ">
                <TableRow >
                    <TableHead>Nome</TableHead>
                    <TableHead>Assunto</TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
                    {lessons.map((lesson, index) => (
                        <TableRow key={index}>
                            <TableCell>{lesson.lesson_name}</TableCell>
                            <TableCell>{lesson.lesson_subject}</TableCell>
                            <TableCell align="center">
                                <TrashIcon className="h-5 w-5 text-red-600 hover:cursor-pointer" onClick={() => deleteLesson(lesson.id)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
        </Table>
    )

}