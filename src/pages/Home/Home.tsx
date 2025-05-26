import { useState, useEffect, useMemo } from "react";
import DayColumn from "./DayColumn";
import { useDateStore } from "@/store/useDataStore";
import { formatDate, getAllDaysOfWeek, parseDate2, getDateOneWeekBeforeOrAfter } from "@/utils/date_utils";
import type WeekDay from "@/models/date";
import type { LessonScheduleResponse } from "@/models/lessonSchedule";
import { useLessonScheduleStore } from "@/store/lessonScheduleStore";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";

type Schedule = {
  id: number;
  title: string;
  time: string;
  teacher_name: string;
};

type ScheduleMap = {
  [day: string]: Schedule[];
};

export default function Home() {
  const { listLessonSchedule, lessonSchedules } = useLessonScheduleStore();

  const [weekDays, setWeekDays] = useState<WeekDay[]>();
  const currDate = useDateStore((state) => state.selectedDate);
  const setDate = useDateStore((state) => state.setSelectedDate);

  useEffect(() => {
    setWeekDays(getAllDaysOfWeek(currDate));
    const dates = getAllDaysOfWeek(currDate, true);
    const start = dates[0].date.split('T')[0]
    const end = dates[dates.length - 1].date.split('T')[0]
    listLessonSchedule({date_start: start, date_end: end });
  }, [currDate, listLessonSchedule]);

  const schedulesList = useMemo(() => {
    const schedule_map: ScheduleMap = {};

    lessonSchedules?.forEach((lesson: LessonScheduleResponse) => {
      const date = parseDate2(lesson.date); // converte string para Date
      const date_str = formatDate(date); // ex: "2025-05-23"

      const schedule: Schedule = {
        id: lesson.id!,
        title: lesson.lesson_name,
        time: lesson.time,
        teacher_name: lesson.teacher_name
      };

      if (!schedule_map[date_str]) {
        schedule_map[date_str] = [];
      }

      schedule_map[date_str].push(schedule);
    });

    return schedule_map;
  }, [lessonSchedules]);

  return (
    <>
      <ArrowLeftCircleIcon className="fixed left-5 top-1/2 transform -translate-y-1/2 w-10 h-10 z-50 opacity-30 
                                      hover:opacity-100 hover:cursor-pointer hover:scale-120 transition"
                            onClick={() => {setDate(getDateOneWeekBeforeOrAfter(currDate, true))}}/>

      <ArrowRightCircleIcon className="fixed right-5 top-1/2 transform -translate-y-1/2 w-10 h-10 z-50 opacity-30 
                                      hover:opacity-100 hover:cursor-pointer hover:scale-120 transition"
                            onClick={() => {setDate(getDateOneWeekBeforeOrAfter(currDate, false))}}/>  
        
      <div className="flex flex-1 overflow-x-auto gap-4">
        {weekDays?.map((day) => (
          <DayColumn
            key={day.date}
            day={day}
            highlight={formatDate(currDate) == day.date}
            schedules={schedulesList[day.date]}
            onRemoveSchedule={(index) => console.log(index)
            }
          />
        ))}
      </div>
    </>
  );
}
