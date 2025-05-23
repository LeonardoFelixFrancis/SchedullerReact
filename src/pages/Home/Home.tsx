import { useState, useEffect, useMemo } from "react";
import DayColumn from "./DayColumn";
import { useDateStore } from "@/store/useDataStore";
import { formatDate, getAllDaysOfWeek, parseDate2 } from "@/utils/date_utils";
import type WeekDay from "@/models/date";
import type { LessonScheduleData } from "@/models/lessonSchedule";
import useLessonSchedule from "@/hooks/useLessonSchedule";

type Schedule = {
  title: string;
  time: string;
};

type ScheduleMap = {
  [day: string]: Schedule[];
};

export default function Home() {
  const { listLessonSchedule, lessonsSchedules } = useLessonSchedule();

  const [weekDays, setWeekDays] = useState<WeekDay[]>();
  const currDate = useDateStore((state) => state.selectedDate);

  useEffect(() => {
    setWeekDays(getAllDaysOfWeek(currDate));
    listLessonSchedule({});
  }, [currDate, listLessonSchedule]);

  const schedulesList = useMemo(() => {
    const schedule_map: ScheduleMap = {};

    lessonsSchedules?.forEach((lesson: LessonScheduleData) => {
      const date = parseDate2(lesson.date); // converte string para Date
      const date_str = formatDate(date); // ex: "2025-05-23"

      const schedule: Schedule = {
        title: 'teste',
        time: lesson.time,
      };

      if (!schedule_map[date_str]) {
        schedule_map[date_str] = [];
      }

      schedule_map[date_str].push(schedule);
    });

    return schedule_map;
  }, [lessonsSchedules]);

  return (
    <>
      <div className="flex flex-1 overflow-x-auto gap-4">
        {weekDays?.map((day) => (
          <DayColumn
            key={day.date}
            day={day}
            highlight={formatDate(currDate) == day.date}
            schedules={schedulesList[day.date]}
            onOpenModal={() => setCreateScheduleModalOpen(true)}
            onRemoveSchedule={(index) => console.log(index)
            }
          />
        ))}
      </div>
    </>
  );
}
