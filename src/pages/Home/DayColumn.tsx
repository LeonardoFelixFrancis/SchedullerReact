import ScheduleCard from "./ScheduleCard";
import type WeekDay from "@/models/date";
import CreateScheduleModal from "./CreateScheduleModal";
import { useState } from "react";

type Props = {
  day: WeekDay;
  highlight: boolean;
  schedules: { id: number, title: string, time: string, teacher_name: string }[];
  onRemoveSchedule: (index: number) => void;
}

export default function DayColumn({ day, highlight, schedules, onRemoveSchedule }: Props) {

  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

  return (
    <div className={`relative flex-1 min-w-[200px]  rounded p-3 flex flex-col ${ highlight ? 'border-gray-600 border-4 bg-gray-200' : 'border-gray-300  border bg-secondary' }`}>
      <div className="text-center font-bold text-sm mb-4 flex flex-col gap-1"> 
        <span className="text-[1.2rem]" >{day.date}</span> 
        <span className="text-[0.7rem] text-gray-700">{day.weekday}</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {schedules?.map((sched, i) => (
          <ScheduleCard
            id={sched.id}
            key={i}
            teacher_name={sched.teacher_name}
            time={sched.time}
            title={sched.title}
          />
        ))}
      </div>

      <button 
        onClick={() => setCreateModalOpen(true)}
        className="absolute bottom-3 right-3 bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-900 hover:cursor-pointer border hover:scale-110 transition"
        title={`Add Schedule to ${day.date}`}
      >
        +
      </button>

      
      {createModalOpen && (<CreateScheduleModal
            day={day.date}
            open={createModalOpen}
            setOpen={setCreateModalOpen}
        />)}

    </div>
  )
}