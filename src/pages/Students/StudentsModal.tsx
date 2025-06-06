import Modal from "../../components/Modal"
import { useForm } from "react-hook-form"
import Input from "../../components/Input"
import type { StudentCreateData, StudentUpdateData } from "@/models/student"

type Props = {
    open: boolean;
    onSubmit: (data: StudentCreateData) => void;
    setOpen: (value: boolean) => void;
}

export default function StudentModal({ open, onSubmit, setOpen }: Props) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<StudentCreateData>();

    const innerHandleSubmit = (data: StudentCreateData) => {
        onSubmit(data);
        reset();
        setOpen(false);
    }


    return (
        <Modal open={open} setOpen={setOpen}>
            <div>
                <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center" >Criar novo aluno</h1>

                <form onSubmit={handleSubmit(innerHandleSubmit)} className="flex flex-col gap-2">
                    <Input name="name" label="Nome" registerProps={
                        register("name", {required: 'O nome é um campo obrigatório.'})}
                        error={errors.name?.message} />

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