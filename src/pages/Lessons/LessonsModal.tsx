/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "../../components/Modal";
import { useForm, Controller } from "react-hook-form";
import Input from "../../components/Input";
import type { LessonData } from "@/models/lesson";
import MultiSelect from "@/components/multiSelect";
import useStudent from "@/hooks/useStudent";
import { useEffect, useMemo, useCallback } from "react";
import useLesson from "@/hooks/useLesson";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  onSubmit: (data: LessonData) => void;
  id?: number | null;
};

export default function LessonsModal({
  open,
  setOpen,
  onSubmit,
  id = null,
}: Props) {
  const { students, listStudent } = useStudent();
  const { getLesson } = useLesson();

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
  } = useForm<LessonData>({
  defaultValues: {
    lesson_name: "",
    lesson_subject: "",
    students: [],
  }
});

  const innerHandleSubmit = (data: LessonData) => {
    onSubmit(data);
    reset();
    setOpen(false);
  };

  const initFormValues = useCallback(async () => {
    if (id != null) {
      const lesson = await getLesson(id);

      if (lesson){
        console.log('running reset', lesson);
        reset({
          id: id,
          lesson_name: lesson.lesson_name,
          lesson_subject: lesson.lesson_subject,
          students: lesson?.students?.map((student: any) => {
            return {
              value: student.id,
              description: student.name
            }
          })

        })
      }
    }
  }, [getLesson, id, reset]);

  useEffect(() => {
    initFormValues();
}, [id, initFormValues]);

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
