import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { UserData } from "@/models/user";

type Props = {
    teachers: UserData[]
}

export default function TeachersTable({teachers}: Props) {

    return (
        <Table className="border">
            <TableHeader className="bg-gray-400 ">
                <TableRow >
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
                    {teachers?.map((teacher, index) => (
                        <TableRow key={index}>
                            <TableCell>{teacher.name}</TableCell>
                            <TableCell>{teacher.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
        </Table>
    )

}