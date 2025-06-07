import Modal from "../../components/Modal";
import { useForm, Controller } from "react-hook-form";
import Input from "../../components/Input";
import type { LessonData } from "@/models/lesson";
import MultiSelect from "@/components/multiSelect";
import useStudent from "@/hooks/useStudent";
import { useEffect, useMemo } from "react";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  onSubmit: (data: LessonData) => void;
};

export default function LessonsModal({ open, setOpen, onSubmit }: Props) {
  const { students, listStudent } = useStudent();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const studentsOptions = useMemo(() => {
    return students?.map((student: any) => {
      return { value: student.id, description: student.name };
    });
  }, [students]);

  useEffect(() => {
    listStudent({});
  }, [listStudent]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LessonData>();

  const innerHandleSubmit = (data: LessonData) => {
    onSubmit(data);
    reset();
    setOpen(false);
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div>
        <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Criar nova turma
        </h1>

        <form
          onSubmit={handleSubmit(innerHandleSubmit)}
          className="flex flex-col gap-2"
        >
          <Input
            name="lesson_name"
            label="Nome da turma"
            registerProps={register("lesson_name", {
              required: "O nome é um campo obrigatório.",
            })}
            error={errors.lesson_name?.message}
          />

          <Input
            name="lesson_subject"
            label="Assunto"
            registerProps={register("lesson_subject", {
              required: "O Assunto é um campo obrigatório.",
            })}
            error={errors.lesson_subject?.message}
          />

          <Controller
            control={control}
            name="students"
            render={({ field }) => (
              <MultiSelect
                {...field}
                items={studentsOptions ? studentsOptions : []}
                name="students"
                placeholder="Adicione alunos"
                label="Alunos"
              />
            )}
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-gray-600 hover:underline hover:cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 hover:cursor-pointer"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
