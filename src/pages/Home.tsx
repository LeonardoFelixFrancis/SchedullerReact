import { useState, useEffect } from "react";
import DayColumn from "./Home/DayColumn";
import { useDateStore } from "@/store/useDataStore";
import { formatDate, getAllDaysOfWeek } from "@/utils/date_utils";
import type WeekDay from "@/models/date";

type Schedule = {
    title: string;
    time: string;
}

type ScheduleMap = {
    [day: string]: Schedule[]
}

export default function Home() {
    const [schedules, setSchedules] = useState<ScheduleMap>({});
    const [weekDays, setWeekDays] = useState<WeekDay[]>();
    const currDate = useDateStore(state => state.selectedDate);

    useEffect(() => {
        setWeekDays(getAllDaysOfWeek(currDate));
    }, [currDate])

    const handleRemoveSchedule = (day: string, index: number) => {
        setSchedules((prev) => {
            const updated = [...(prev[day] || [])];
            updated.splice(index, 1);
            return { ...prev, [day]: updated };
        })
    };

    return (
        <>
            <div className="flex flex-1 overflow-x-auto gap-4">
                {weekDays?.map((day => (
                    <DayColumn
                        key={day.date}
                        day={day}
                        highlight={formatDate(currDate) == day.date}
                        schedules={schedules[day.weekday] || []}
                        onOpenModal={() => setCreateScheduleModalOpen(true)}
                        onRemoveSchedule={(index) => handleRemoveSchedule(day.weekday, index)}
                    />
                )))}
            </div>

        </>
    );
}