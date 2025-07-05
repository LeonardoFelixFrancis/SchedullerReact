import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import useStudent from "@/hooks/useStudent";

type Props = {
  lesson_id: number;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function AttendanceModal({ lesson_id, setOpen, open }: Props) {
  const [students, setStudents] = useState<any[]>([]);
  const { listStudentsByLesson, updateStudentAttendance } = useStudent();

  useEffect(() => {
    const getStudents = async () => {
      const students = await listStudentsByLesson(lesson_id);
      setStudents(students);
    };
    getStudents();
  }, [lesson_id]);

  const handleAttendanceToggle = async (student_id: number, attended: boolean) => {
    try {
      await updateStudentAttendance({
        schedule_id: lesson_id,
        student_id,
        attended
      });

      setStudents(prev =>
        prev.map(student =>
          student.id === student_id ? { ...student, attended } : student
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar presença:", error);
    }
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div style={{ padding: "16px", maxWidth: "500px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Chamada da Aula</h2>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          borderBottom: "1px solid #ccc",
          paddingBottom: "8px",
          marginBottom: "12px"
        }}>
          <span>Nome do Aluno</span>
          <span>Presença</span>
        </div>

        {students?.map((student) => (
          <div
            key={student.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 0",
              borderBottom: "1px solid #eee"
            }}
          >
            <span>{student.name}</span>
            <input
              type="checkbox"
              checked={student.attended}
              onChange={(e) => handleAttendanceToggle(student.id, e.target.checked)}
            />
          </div>
        ))}
      </div>
    </Modal>
  );
}
