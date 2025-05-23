import Modal from "../../components/Modal"
import { useForm } from "react-hook-form"
import Input from "../../components/Input"
import useUser from "@/hooks/useUser"

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
}

type TeacherCreateFormData = {
    name: string;
    email: string;
}

export default function TeachersModal({ open, setOpen }: Props) {

    const { userCreate } = useUser();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TeacherCreateFormData>();

    const onSubmit = (data: TeacherCreateFormData) => {
        userCreate({email: data.email, name: data.name, username: data.name});
        reset();
        setOpen(false);
    }

    return (
        <Modal open={open} setOpen={setOpen}>
            <div>
                <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center" >Criar novo professor</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <Input name="name" label="Nome" registerProps={
                        register("name", {required: 'O nome é um campo obrigatório.'})}
                        error={errors.name?.message} />

                    <Input name="email" label="E-mail" registerProps={
                        register("email", {required: 'O E-mail é um campo obrigatório',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Endereço de e-mail inválido."
                            }
                        }
                        )
                    } 
                    error={errors.email?.message}
                    />
                    
                    <div className='flex justify-end gap-2 pt-2'>
                        <button type='button' onClick={() => setOpen(false)} className='text-gray-600 hover:underline hover:cursor-pointer'>
                        Cancelar
                        </button>
                        <button type='submit' className='bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 hover:cursor-pointer'>
                        Criar
                        </button>
                    </div>

                </form>


            </div>
        </Modal>
    )
}