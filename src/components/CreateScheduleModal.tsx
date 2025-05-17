import { useForm } from 'react-hook-form';

type FormData = {
  title: string,
  time: string
}

type Props = {
  day: string;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

export default function CreateScheduleModal({ day, onClose, onSubmit }: Props) {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const submitForm = (data: FormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className='fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded w-80 shadow-md'>
        <h2>Add Schedule to {day}</h2>
        <form onSubmit={handleSubmit(submitForm)} className='space-y-3'>
          <input {...register('title', { required: true })}
            placeholder='Class Name'
            className='w-full border px-3 py-2 rounded'
          />
          <input
            {...register('time', { required: true })}
            placeholder='Time (e.g, 08:00 - 09:00)'
            className="w-full border px-3 py-2 rounded"
          />

          <div className='flex justify-end gap-2 pt-2'>
            <button type='button' onClick={onClose} className='text-gray-600 hover:underline'>
              Cancel
            </button>
            <button type='submit' className='bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700'>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )

}