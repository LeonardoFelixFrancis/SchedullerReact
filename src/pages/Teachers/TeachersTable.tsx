import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TrashIcon } from "lucide-react";
import type { UserResponse } from "@/models/user";

type Props = {
    teachers: UserResponse[]
    deleteTeacher: (id: number) => void;
}

export default function TeachersTable({teachers, deleteTeacher}: Props) {

    return (
        <Table className="border">
            <TableHeader className="bg-gray-400 ">
                <TableRow >
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
                    {teachers?.map((teacher, index) => (
                        <TableRow key={index}>
                            <TableCell>{teacher.name}</TableCell>
                            <TableCell>{teacher.email}</TableCell>
                            <TableCell align="center">
                                <TrashIcon className="h-5 w-5 text-red-600 hover:cursor-pointer" onClick={() => deleteTeacher(teacher.id)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
        </Table>
    )

}