import { useState, useRef } from "react"
import ProfileOptions from "./ProfileOptions";
import { CalendarIcon, UserIcon, HomeIcon, BookOpenIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import { Calendar } from "./ui/calendar";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useNavigate, useLocation } from "react-router-dom";
import { useDateStore } from "@/store/useDataStore";

type Props = {
    changeCurrDate: (date: Date) => void, 
}

export default function NavBar({ changeCurrDate }: Props) {

    const [name, setName ] = useState('Leonardo');
    const [date, setDate] = useState<Date>();
    const [profileOpen, setProfileOpen ] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const setSelecteDate = useDateStore(state => state.setSelectedDate);
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const menuRef = useRef<HTMLDivElement | null>(null);
    const calendarRef = useRef<HTMLDivElement | null>(null);

    useOutsideClick(menuRef, () => setProfileOpen(false));
    useOutsideClick(calendarRef, () => setCalendarOpen(false));

    const navigate = useNavigate();
    const location = useLocation();

    
    

    const selectDate = (value: Date | undefined) => {
        if (value){
            setDate(value);
            console.log(value);
            setSelecteDate(value);
        }
    }

    return (

        <div className="relative min-h-16 flex justify-end-safe items-center p-1 pr-3 pl-3 bg-secondary border border-gray-300 mb-1 gap-3">
            <div  className="mr-auto flex gap-5 justify-items-center items-center">
                
                <div>
                    <HomeIcon onClick={() => navigate('/home')} title="Gerenciar professores" className="h-10 w-10 hover:cursor-pointer hover:scale-110 transition" />
                </div>

                {user?.is_adm && ( <>
                <div>
                    <UserIcon onClick={() => navigate('/teachers')} title="Gerenciar professores" className="h-10 w-10 hover:cursor-pointer hover:scale-110 transition" />
                </div>

                <div>
                    <BookOpenIcon onClick={() => navigate('/lessons')} title="Gerenciar professores" className="h-10 w-10 hover:cursor-pointer hover:scale-110 transition" />
                </div> 
                
                <div>
                    <AcademicCapIcon onClick={() => navigate('/students')} title="Gerenciar professores" className="h-10 w-10 hover:cursor-pointer hover:scale-110 transition" />
                </div> 
                
                </>)}



                { '/home' == location.pathname &&
                    <div ref={calendarRef}>
                        <CalendarIcon title="Selecione uma data"  className="h-10 w-10 hover:cursor-pointer hover:scale-110 transition" onClick={() => setCalendarOpen(!calendarOpen)} />
                    
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
                    </div>}

            </div>

            <div className="ml-auto flex gap-3 justify-center items-center">
                <span className="xsm:block hidden">Bem Vindo <b>{user?.name}</b></span>
                <div  ref={menuRef}>
                    <img onClick={() => setProfileOpen(!profileOpen)} src={`https://avatar.iran.liara.run/username?username=${user?.name.split(' ').join('+')}`} className="w-10 h-10 rounded hover:cursor-pointer hover:scale-110 transition" alt="" />
                    {profileOpen && (
                        <div className="absolute right-0 bottom-0 translate-y-[100%] mt-2 z-10" >
                            <ProfileOptions />
                        </div>
                        )}
                </div>
            </div>

        </div>
     
    )
}