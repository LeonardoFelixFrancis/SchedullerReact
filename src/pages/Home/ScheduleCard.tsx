import { TrashIcon, PencilSquareIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { useLessonScheduleStore } from '@/store/lessonScheduleStore';
import CreateScheduleModal from './CreateScheduleModal';
import AttendanceModal from './AttendanceModal';
import { useState } from 'react';

type Props = {
  title: string;
  time: string;
  id: number;
  teacher_name: string;
  teacher_active: boolean,
  lesson_active: boolean,
}

export default function ScheduleCard({ title, teacher_name, time, id, teacher_active, lesson_active}: Props) {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState<boolean>(false);
  const { deleteLessonSchedule } = useLessonScheduleStore();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div className="relative w-[95%] ml-auto mr-auto group bg-white shadow p-3 rounded border border-gray-200 mb-3 hover:scale-105 transition hover:cursor-pointer hover:bg-gray-300">
      <h3 className={`font-semibold text-sm  ${lesson_active ? '' : 'line-through'}`}>{title}</h3>
      <p className={`text-xs text-gray-500 ${teacher_active ? '' : 'line-through'}`}>{teacher_name}</p>
      <p className='text-xs text-gray-500'>{time}</p>

        <button
          onClick={() => setAttendanceModalOpen(true)}
          className={`absolute top-2 ${user.is_adm ? 'right-14' : 'right-2'} text-gray-400 hover: hover:text-blue-600 hover:cursor-pointer opacity-0 group-hover:opacity-100 transition`}>
          <ClipboardIcon className='w-5 h-5' />
        </button>

      {user?.is_adm && (<>
        <button 
          onClick={() => deleteLessonSchedule(id)}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-600 hover:cursor-pointer opacity-0 group-hover:opacity-100 transition">
          <TrashIcon className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => setEditModalOpen(true)}
          className='absolute top-2 right-8 text-gray-400 hover: hover:text-blue-600 hover:cursor-pointer opacity-0 group-hover:opacity-100 transition'>
          <PencilSquareIcon className='w-5 h-5' />
        </button> </>)}

      

      {editModalOpen && <CreateScheduleModal open={editModalOpen} setOpen={setEditModalOpen} id={id} />}
      {attendanceModalOpen && <AttendanceModal open={attendanceModalOpen} setOpen={setAttendanceModalOpen} lesson_id={id} />}
    </div>
  )
}