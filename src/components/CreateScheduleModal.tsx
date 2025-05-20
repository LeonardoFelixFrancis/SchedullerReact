import { useForm } from 'react-hook-form';
import Modal from './Modal';
import { SelectObject } from './Select';
import Input from './Input';

type FormData = {
  title: string,
  time: string
}

type Props = {
  day: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  onSubmit: (data: FormData) => void;
}

export default function CreateScheduleModal({ day, open, setOpen, onSubmit }: Props) {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const submitForm = (data: FormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <Modal open={open} setOpen={setOpen}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center" >Criar aula para {day}</h2>
        <form onSubmit={handleSubmit(submitForm)} className='space-y-3'>
          <Input {...register('title', { required: true })}
            className='w-full border px-3 py-2 rounded'
            label='Nome da Turma'
          />

          <SelectObject placeholder='Professores' items={[{id: 1, description: 'teste'}]}></SelectObject>

          <div className='flex justify-end gap-2 pt-2'>
            <button type='button' onClick={() => setOpen(false)} className='text-gray-600 hover:underline hover:cursor-pointer'>
              Cancelar
            </button>
            <button type='submit' className='bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 hover:cursor-pointer'>
              Criar
            </button>
          </div>
        </form>
    </Modal>
  )

}