/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import Modal from "../../components/Modal";
import { ObjectSelect } from "../../components/ObjectSelect";
import { Select } from "../../components/Select";
import { getClassHours, parseDate, formatDate2 } from "@/utils/date_utils";
import useUser from "@/hooks/useUser";
import useLesson from "@/hooks/useLesson";
import { useEffect, useMemo, useState } from "react";
import useStudent from "@/hooks/useStudent";

type Props = {
  lesson_id: number;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function AttendanceModal({ lesson_id, setOpen, open }: Props) {
  const [students, setStudents] = useState<any[]>();
  const { listStudentsByLesson } = useStudent();

  useEffect(() => {
    const getStudents = async () => {
      const students = await listStudentsByLesson(lesson_id);
      setStudents(students);
    };
    getStudents();
  }, []);

  return (
    <Modal open={open} setOpen={setOpen}>
      {students?.map((student, index) => (
        <p key={index}>{student.name}</p>
      ))}
    </Modal>
  );
}
