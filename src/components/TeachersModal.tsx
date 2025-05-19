import Modal from "./Modal"
import { useForm } from "react-hook-form"
import Input from "./Input"
import Button from "./Button"

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
}

type TeacherCreateFormData = {
    username: string;
    name: string;
    email: string;
    password: string;
}

export default function TeachersModal({ open, setOpen }: Props) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TeacherCreateFormData>();

    const onSubmit = (data: TeacherCreateFormData) => {
        console.log(data);
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
                    
                    <Button type="submit">Criar</Button>

                </form>


            </div>
        </Modal>
    )
}