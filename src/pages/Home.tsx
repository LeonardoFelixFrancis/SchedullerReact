import { useState } from "react";
import DayColumn from "../components/DayColumn";
import CreateScheduleModal from "../components/CreateScheduleModal";
import NavBar from "../components/Navbar";

const WeekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday', 'Sunday'];

type Schedule = {
    title: string;
    time: string;
}

type ScheduleMap = {
    [day: string]: Schedule[]
}

export default function Home() {
    const [schedules, setSchedules] = useState<ScheduleMap>({});
    const [modalOpenForDay, setModalOpenForDay] = useState<string | null>(null);

    const handleAddSchedule = (day: string, newSchedule: Schedule) => {
        setSchedules((prev) => ({
            ...prev,
            [day]: [...(prev[day] || []), newSchedule],
        }));
        setModalOpenForDay(null);
    };

    const handleRemoveSchedule = (day: string, index: number) => {
        setSchedules((prev) => {
            const updated = [...(prev[day] || [])];
            updated.splice(index, 1);
            return { ...prev, [day]: updated };
        })
    };

    return (
        <div className="min-h-screen p-1 bg-gray-100 flex flex-col">
            <NavBar />

            <div className="flex flex-1 overflow-x-auto gap-4">
                {WeekDays.map((day => (
                    <DayColumn
                        key={day}
                        day={day}
                        schedules={schedules[day] || []}
                        onOpenModal={() => setModalOpenForDay(day)}
                        onRemoveSchedule={(index) => handleRemoveSchedule(day, index)}
                    />
                )))}
            </div>

            {modalOpenForDay && (
                <CreateScheduleModal
                    day={modalOpenForDay}
                    onClose={() => setModalOpenForDay(null)}
                    onSubmit={(data) => handleAddSchedule(modalOpenForDay, data)}
                />
            )}

        </div>
    );
}