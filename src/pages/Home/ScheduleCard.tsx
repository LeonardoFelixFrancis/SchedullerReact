import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useLessonScheduleStore } from '@/store/lessonScheduleStore';
import CreateScheduleModal from './CreateScheduleModal';
import { useState } from 'react';

type Props = {
  title: string;
  time: string;
  id: number;
  teacher_name: string;
}

export default function ScheduleCard({ title, teacher_name, time, id}: Props) {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const { deleteLessonSchedule } = useLessonScheduleStore();

  return (
    <div className="relative w-[95%] ml-auto mr-auto group bg-white shadow p-3 rounded border border-gray-200 mb-3 hover:scale-105 transition hover:cursor-pointer hover:bg-gray-300">
      <h3 className='font-semibold text-sm'>{title}</h3>
      <p className='text-xs text-gray-500'>{teacher_name}</p>
      <p className='text-xs text-gray-500'>{time}</p>

      <button 
        onClick={() => deleteLessonSchedule(id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-600 hover:cursor-pointer opacity-0 group-hover:opacity-100 transition">
        <TrashIcon className="w-5 h-5" />
      </button>
      
      <button
        onClick={() => setEditModalOpen(true)}
        className='absolute top-2 right-8 text-gray-400 hover: hover:text-blue-600 hover:cursor-pointer opacity-0 group-hover:opacity-100 transition'>
        <PencilSquareIcon className='w-5 h-5' />
      </button>

      {editModalOpen && <CreateScheduleModal open={editModalOpen} setOpen={setEditModalOpen} id={id} />}
    </div>
  )
}