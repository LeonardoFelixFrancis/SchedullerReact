
type Props = {
    children: React.ReactNode;
    action: () => void;
}

export default function ProfileRow({ children, action }: Props){

    return (
        <div onClick={action} className="hover:bg-gray-300 hover:cursor-pointer p-2">
            {children}
        </div>
    )
}