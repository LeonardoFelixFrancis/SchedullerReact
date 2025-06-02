import { useNavigate } from "react-router-dom";
import ProfileRow from "./ProfileRow";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import useAuth from "@/hooks/useAuth";

export default function ProfileOptions() {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <div className="bg-white border border-gray-200 rounded shadow-md min-w-[120px] w-fit text-sm box-content flex flex-col gap-2">
            <ProfileRow action={() => {}} ><b>{user.name}</b></ProfileRow>
            <ProfileRow action={handleLogout} >
                
                <div className="flex">
                    Sair
                    <ArrowRightStartOnRectangleIcon className="h-5 w-5 ml-auto" />
                </div>
            
            </ProfileRow>
        </div>
    )

}