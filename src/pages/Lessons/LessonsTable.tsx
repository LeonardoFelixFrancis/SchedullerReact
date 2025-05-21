import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function LessonsTable() {
    const lessons = [
    { name: "Bananinha", subject: "Física I" },
    { name: "Bananinha 2", subject: "Matemática I"},
    ];

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
                            <TableCell>{lesson.name}</TableCell>
                            <TableCell>{lesson.subject}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
        </Table>
    )

}