import { useForm, Controller  } from 'react-hook-form';
import Modal from '../../components/Modal';
import { ObjectSelect } from '../../components/ObjectSelect';
import { Select } from '../../components/Select';
import Input from '../../components/Input';
import { getClassHours } from '@/utils/date_utils';

type FormData = {
  title: string,
  teacher_id: number,
  hour: string,
  students: string,
}

type Props = {
  day: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  onSubmit: (data: FormData) => void;
}

export default function CreateScheduleModal({ day, open, setOpen, onSubmit }: Props) {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<FormData>();

  const submitForm = (data: FormData) => {
    console.log('data', data);

  };



  return (
    <Modal open={open} setOpen={setOpen}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center" >Criar aula para {day}</h2>
        <form onSubmit={handleSubmit(submitForm)} className='space-y-3'>
          <Input registerProps={register('title', { required: 'Informe o nome da turma.' })}
            className='w-full border px-3 py-2 rounded'
            label='Nome da Turma'
            placeholder='Informe o nome da turma'
            error={errors.title?.message}
            name='title'
          />

           <Controller
              control={control}
              name="teacher_id"
              rules={{ required: "Selecione um professor" }}
              render={({ field }) => (
                <ObjectSelect
                  {...field}
                  label="Professor"
                  placeholder="Selecione um professor"
                  items={[{value:1, description:'teste'}, {value:2, description:'teste'}]}
                  error={errors?.teacher_id?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="hour"
              rules={{ required: "Selecione um horário" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Horário"
                  placeholder="Selecione um Horário"
                  items={getClassHours('08:00', '21:00', 60)}
                  error={errors?.teacher_id?.message}
                />
              )}
            />

            <Input name='students' registerProps={register('students')}  className='w-full border px-3 py-2 rounded'
            label='Alunos' placeholder='Informe os alunos da turma'/>

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