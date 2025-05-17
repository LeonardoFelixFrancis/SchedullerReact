import { useNavigate } from "react-router-dom";
import ProfileRow from "./ProfileRow";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

type Props = {
    onClose: () => void;
}

export default function ProfileOptions({ onClose }: Props) {

    const navigate = useNavigate();

    return (
        <div className="bg-white border border-gray-200 rounded shadow-md w-40 text-sm box-content flex flex-col gap-2">
            <ProfileRow action={() => {}} ><b>Leonardo</b></ProfileRow>
            <ProfileRow action={() => {navigate('/')}} >
                
                <div className="flex">
                    Sair
                    <ArrowRightStartOnRectangleIcon className="h-5 w-5 ml-auto" />
                </div>
            
            </ProfileRow>
        </div>
    )

}