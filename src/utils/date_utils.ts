import type WeekDay from "@/models/date";

const weekDays = [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sabádo'
]

export function getWeekRange(date: Date = new Date()): { sunday: Date; saturday: Date} {
    const dayOfWeek = date.getDay();

    const diffToSunday = dayOfWeek === 0 ? 0 : -dayOfWeek;

    const diffToSaturday = dayOfWeek === 6 ? 0 : 6 - dayOfWeek;

    const sunday = new Date(date);
    sunday.setDate(date.getDate() + diffToSunday);

    const saturday = new Date(date);
    saturday.setDate(date.getDate() + diffToSaturday);
    
    sunday.setHours(0, 0, 0, 0);
    saturday.setHours(23, 59, 59, 999);

    return { sunday, saturday}
}

export function getAllDaysOfWeek(today: Date = new Date()): WeekDay[]{
    const { sunday, saturday } = getWeekRange(today);
    const days = [];
    const day = sunday;

    while (day <= saturday) {
        const dateString = formatDate(day)
        const dayNum = day.getDay();
        const weekDay = weekDays[dayNum];
        days.push({date: dateString, weekday: weekDay});
        day.setDate(day.getDate() + 1);
    }

    return days;
}

export function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2,'0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export function formatDate2(date: Date): string {
    const day = String(date.getDate()).padStart(2,'0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`
}

export function parseDate(dateStr: string, splitter = '-'): Date {
  const [day, month, year] = dateStr.split(splitter).map(Number);
  return new Date(year, month - 1, day);
}

export function parseDate2(dateStr: string): Date {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
}

export function getClassHours(start: string, end:string, interval: number): string[] {
    const result = [];
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    const startDate = new Date();
    startDate.setHours(startHour, startMinute, 0, 0);

    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0, 0);

    while (startDate <= endDate) {
        const hour = String(startDate.getHours()).padStart(2, "0");
        const minutes = String(startDate.getMinutes()).padStart(2, "0");
        result.push(`${hour}:${minutes}`);

        startDate.setMinutes(startDate.getMinutes() + interval);
    }

    return result;
}