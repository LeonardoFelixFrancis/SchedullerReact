import { useForm, Controller } from "react-hook-form";
import Modal from "../../components/Modal";
import { ObjectSelect } from "../../components/ObjectSelect";
import { Select } from "../../components/Select";
import { getClassHours, parseDate, formatDate2 } from "@/utils/date_utils";
import useUser from "@/hooks/useUser";
import useLesson from "@/hooks/useLesson";
import { useEffect, useMemo, useState } from "react";
import type { UserData } from "@/models/user";
import type { LessonData } from "@/models/lesson";
import type { LessonScheduleData } from "@/models/lessonSchedule";
import { useLessonScheduleStore } from "@/store/lessonScheduleStore";
import { useSearchParams } from "react-router-dom";

type Props = {
  day?: string | null;
  open: boolean;
  setOpen: (value: boolean) => void;
  id: number;
};

export default function CreateScheduleModal({
  day,
  open,
  setOpen,
  id,
}: Props) {
  const { users, userList } = useUser();
  const { lessons, listLesson } = useLesson();
  const [ modalDate, setModalDate ] = useState<string>('');
  const {createLessonSchedule, getLessonSchedule, updateLessonSchedule } = useLessonScheduleStore();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LessonScheduleData>();

  const submitForm = (data: LessonScheduleData) => {
    if (id){
      updateLessonSchedule({...data, date: modalDate});
    } 
    
    if (day){
      const modal_date = parseDate(day, '/');
      data.date = formatDate2(modal_date); 
      createLessonSchedule(data);
    }
    
    reset();
    setOpen(false);
  };

  const initFormValues = async () => {
    console.log('id', id);
    if (id){
      const lessonSchedule = await getLessonSchedule(id);
      
      if (lessonSchedule) {
        setModalDate(lessonSchedule.date);
        reset({
          id,
          lesson_id: lessonSchedule.lesson_id,
          teacher_id: lessonSchedule.teacher_id,
          time: lessonSchedule.time,
        })
      }
    }
  }

  useEffect(() => {
    userList({});
    listLesson({});
    initFormValues()
  }, [userList, listLesson]);

  const teachersList = useMemo(() => {
    return users?.map((user: UserData) => {
      if (user.id && user.name) {
        return { value: user.id, description: user.name };
      }
    }).filter(Boolean) as { value: number; description: string }[];
  }, [users]);

  const lessonsList = useMemo(() => {
    return lessons?.map((lesson: LessonData) => {
      if(lesson.id && lesson.lesson_name) {
        return { value: lesson.id, description: lesson.lesson_name}
      }
    }).filter(Boolean) as { value: number; description: string}[];
  }, [lessons])

  return (
    <Modal open={open} setOpen={setOpen}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Criar aula para {day}
      </h2>
      <form onSubmit={handleSubmit(submitForm)} className="space-y-3">
          <Controller
          control={control}
          name="lesson_id"
          rules={{ required: "Seleciona uma turma" }}
          render={({ field }) => (
            <ObjectSelect
              {...field}
              label="Turma"
              placeholder="Seleciona uma turma"
              items={lessonsList}
              error={errors?.lesson_id?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="teacher_id"
          rules={{ required: "Selecione um professor" }}
          render={({ field }) => (
            <ObjectSelect
              {...field}
              label="Professor"
              placeholder="Selecione um professor"
              items={teachersList}
              error={errors?.teacher_id?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="time"
          rules={{ required: "Selecione um horário" }}
          render={({ field }) => (
            <Select
              {...field}
              label="Horário"
              placeholder="Selecione um Horário"
              items={getClassHours("08:00", "21:00", 60)}
              error={errors?.time?.message}
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
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
}
