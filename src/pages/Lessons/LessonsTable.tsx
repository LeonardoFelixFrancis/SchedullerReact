import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { LessonData } from "@/models/lesson";

type Props = {
    lessons: LessonData[];
}

export default function LessonsTable({ lessons }: Props) {

    return (
        <Table className="border">
            <TableHeader className="bg-gray-400 ">
                <TableRow >
                    <TableHead>Nome</TableHead>
                    <TableHead>Assunto</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
                    {lessons.map((lesson, index) => (
                        <TableRow key={index}>
                            <TableCell>{lesson.lesson_name}</TableCell>
                            <TableCell>{lesson.lesson_subject}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
        </Table>
    )

}