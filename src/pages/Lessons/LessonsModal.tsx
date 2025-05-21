import Modal from "../../components/Modal"
import { useForm , Controller} from "react-hook-form"
import Input from "../../components/Input"
import { ObjectSelect } from "@/components/ObjectSelect"

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
}

type TeacherCreateFormData = {
    subject: string;
    name: string;
}

export default function LessonsModal({ open, setOpen }: Props) {

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<TeacherCreateFormData>();

    const onSubmit = (data: TeacherCreateFormData) => {
        console.log(data);
        reset();
        setOpen(false);
    }

    return (
        <Modal open={open} setOpen={setOpen}>
            <div>
                <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center" >Criar novo professor</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <Input name="name" label="Nome da turma" registerProps={
                        register("name", {required: 'O nome é um campo obrigatório.'})}
                        error={errors.name?.message} />

                    <Input name="subject" label="Assunto" registerProps={
                        register("subject", {required: 'O Assunto é um campo obrigatório.',
                        }
                        )
                    } 
                    error={errors.subject?.message}
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