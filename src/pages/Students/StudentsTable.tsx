import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TrashIcon } from "lucide-react";
import type { StudentResponseData } from "@/models/student";

type Props = {
    students: StudentResponseData[]
    deleteStudent: (id: number) => void;
}

export default function StudentsTable({students, deleteStudent}: Props) {

    return (
        <Table className="border">
            <TableHeader className="bg-gray-400 ">
                <TableRow >
                    <TableHead>Nome</TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
                    {students?.map((teacher, index) => (
                        <TableRow key={index}>
                            <TableCell>{teacher.name}</TableCell>
                            <TableCell align="center">
                                <TrashIcon className="h-5 w-5 text-red-600 hover:cursor-pointer" onClick={() => deleteStudent(teacher.id)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
        </Table>
    )

}