import { useState, useRef, useEffect } from "react"
import ProfileOptions from "./ProfileOptions";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Calendar } from "./ui/calendar";
import { useOutsideClick } from "../hooks/useOutsideClick";

export default function NavBar() {

    const [name, setName ] = useState('Leonardo');
    const [date, setDate] = useState<Date>();
    const [profileOpen, setProfileOpen ] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement | null>(null);
    const calendarRef = useRef<HTMLDivElement | null>(null);

    useOutsideClick(menuRef, () => setProfileOpen(false));
    useOutsideClick(calendarRef, () => setCalendarOpen(false));

    
    

    const selectDate = (value: Date | undefined) => {
        setDate(value);
        console.log(date);
    }

    return (

        <div className="relative min-h-16 flex justify-end-safe items-center p-1 pr-3 pl-3 bg-secondary border border-gray-300 mb-1 gap-3">
            <div ref={calendarRef} className="mr-auto">
                <CalendarIcon className="h-10 w-10 hover:cursor-pointer hover:scale-110 transition" onClick={() => setCalendarOpen(!calendarOpen)} />
                { calendarOpen && (
                    <div className="absolute left-0 bottom-0 translate-y-[100%] mt-2 z-10 bg-white" >
                    <Calendar
                            mode="single"
                            selected={date}
                            onSelect={selectDate}
                            className="rounded-md border"
                        />
                    </div>)
                }
            </div>

            <div className="ml-auto flex gap-3 justify-center items-center">
                <span>Bem Vindo <b>{name}</b></span>
                <div  ref={menuRef}>
                    <img onClick={() => setProfileOpen(!profileOpen)} src="https://api.dicebear.com/9.x/avataaars-neutral/svg" className="w-10 h-10 rounded hover:cursor-pointer hover:scale-110 transition" alt="" />
                    {profileOpen && (
                        <div className="absolute right-0 bottom-0 translate-y-[100%] mt-2 z-10" >
                            <ProfileOptions onClose={() => setProfileOpen(false)} />
                        </div>
                        )}
                </div>
            </div>

        </div>
     
    )
}