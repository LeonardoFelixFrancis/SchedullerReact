import { useState, useEffect } from "react";
import DayColumn from "../components/DayColumn";
import CreateScheduleModal from "../components/CreateScheduleModal";
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
    const [modalOpenForDay, setModalOpenForDay] = useState<string | null>(null);
    const [createScheduleModalOpen, setCreateScheduleModalOpen] = useState<boolean>(false);
    const [weekDays, setWeekDays] = useState<WeekDay[]>();
    const currDate = useDateStore(state => state.selectedDate);

    const openOrCloseScheduleCreateModal = (value: boolean) => {
        setCreateScheduleModalOpen(value);
    }

    useEffect(() => {
        setWeekDays(getAllDaysOfWeek(currDate));
    }, [currDate])

    const handleAddSchedule = (day: string, newSchedule: Schedule) => {
        setSchedules((prev) => ({
            ...prev,
            [day]: [...(prev[day] || []), newSchedule],
        }));
        setCreateScheduleModalOpen(true);
    };

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


            <CreateScheduleModal
                day={modalOpenForDay}
                open={createScheduleModalOpen}
                setOpen={openOrCloseScheduleCreateModal}
                onSubmit={(data) => handleAddSchedule(modalOpenForDay, data)}
            />

        </>
    );
}