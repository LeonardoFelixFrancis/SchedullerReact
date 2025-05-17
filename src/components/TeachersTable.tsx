import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function TeachersTable() {
    const teachers = [
    { name: "Leonardo Felix", email: "leo@email.com" },
    { name: "Maria Benincasa", email: "maria@email.com" },
    ];

    return (
        <Table className="border">
            <TableHeader className="bg-gray-400 ">
                <TableRow >
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
                    {teachers.map((teacher, index) => (
                        <TableRow key={index}>
                            <TableCell>{teacher.name}</TableCell>
                            <TableCell>{teacher.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
        </Table>
    )

}