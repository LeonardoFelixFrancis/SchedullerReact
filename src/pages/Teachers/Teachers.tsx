import TeachersTable from "@/pages/Teachers/TeachersTable";
import { useForm } from "react-hook-form";
import TeachersModal from "@/pages/Teachers/TeachersModal";
import { useState, useEffect } from "react";
import useUser from "@/hooks/useUser";
import type { UserData, UserFilter } from "@/models/user";

type TeacherFilterFormData = {
  name: string;
  email: string;
};

export default function Teachers() {
  const [open, setOpen] = useState(false);
  const { users, userList, userCreate, userDelete } = useUser();

  useEffect(() => {
    userList({});
  }, [userList]);

  const openOrCloseTeachersModal = (value: boolean) => {
    setOpen(value);
  };

  const handleCreateTeacher = (data: UserData) => {
    userCreate({ email: data.email, name: data.name, username: data.name });
    userList({});
  };

  const handleDeleteTeacher = (teacher_id: number) => {
    userDelete(teacher_id);
    userList({});
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherFilterFormData>();

  const handleFilter = (data: UserFilter) => {
    userList(data);
  };

  return (
    <div className="flex-1 flex flex-col gap-3 ">
      <div className="flex flex-col">
        <div className="flex p-3 justify-end items-end">
          <button
            onClick={() => setOpen(true)}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white py-2 px-4 rounded"
          >
            Criar novo professor
          </button>
          <TeachersModal
            open={open}
            setOpen={openOrCloseTeachersModal}
            onSubmit={handleCreateTeacher}
          />
        </div>
        <div className="flex p-3 bg-white rounded">
          <form
            className="w-full flex flex-col sm:flex-row items-end gap-3"
            onSubmit={handleSubmit(handleFilter)}
          >
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                className="mt-1 block w-full px-4 py-2 border rounded"
                {...register("name")}
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                className="mt-1 block w-full px-4 py-2 border rounded"
                {...register("email")}
              />
            </div>

            <button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white py-2 px-4 rounded">
              Filtrar
            </button>
          </form>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-0 box-border rounded">
        <TeachersTable teachers={users ? users : []} deleteTeacher={handleDeleteTeacher}></TeachersTable>
      </div>
    </div>
  );
}
