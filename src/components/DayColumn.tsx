import ScheduleCard from "./ScheduleCard";

type Props = {
  day: string;
  schedules: { title: string, time: string }[];
  onOpenModal: () => void;
  onRemoveSchedule: (index: number) => void;
}

export default function DayColumn({ day, schedules, onOpenModal, onRemoveSchedule }: Props) {
  return (
    <div className="relative flex-1 min-w-[200px] border border-gray-300 bg-secondary rounded p-3 flex flex-col">
      <h2 className="text-center font-bold text-sm mb-4">{day}</h2>

      <div className="flex-1 overflow-y-auto">
        {schedules.map((sched, i) => (
          <ScheduleCard
            key={i}
            time={sched.time}
            title={sched.title}
            onRemove={() => onRemoveSchedule(i)}
          />
        ))}
      </div>

      <button 
        onClick={onOpenModal}
        className="absolute bottom-3 right-3 bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-900 hover:cursor-pointer border hover:scale-110 transition"
        title={`Add Schedule to ${day}`}
      >
        +
      </button>

    </div>
  )
}