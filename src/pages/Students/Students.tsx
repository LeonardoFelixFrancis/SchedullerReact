import StudentsTable from "./StudentsTable";
import { useForm } from "react-hook-form";
import StudentModal from "./StudentsModal";
import { useState, useEffect } from "react";
import useStudent from "@/hooks/useStudent";
import type { StudentCreateData, StudentResponseData, StudentFilter, StudentUpdateData } from "@/models/student";

type StudentFilterFormData = {
  name: string;
};

export default function Students() {
  const [open, setOpen] = useState(false);
  const {listStudent, createStudent, deleteStudent, students } = useStudent();
 
  useEffect(() => {
    listStudent({});
  }, [listStudent]);

  const openOrCloseStudentModal = (value: boolean) => {
    setOpen(value);
  };

  const handleCreateStudent = (data: StudentCreateData) => {
    createStudent({name: data.name});
    listStudent({});
  };

  const handleDeleteStudent = (stduent_id: number) => {
    deleteStudent(stduent_id);
    listStudent({});
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFilterFormData>();

  const handleFilter = (data: StudentFilter) => {
    listStudent(data);
  };

  return (
    <div className="flex-1 flex flex-col gap-3 ">
      <div className="flex flex-col">
        <div className="flex p-3 justify-end items-end">
          <button
            onClick={() => setOpen(true)}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white py-2 px-4 rounded"
          >
            Criar novo estudante
          </button>
          <StudentModal
            open={open}
            setOpen={openOrCloseStudentModal}
            onSubmit={handleCreateStudent}
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

            <button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white py-2 px-4 rounded">
              Filtrar
            </button>
          </form>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-0 box-border rounded">
        <StudentsTable students={students ? students : []} deleteStudent={handleDeleteStudent}></StudentsTable>
      </div>
    </div>
  );
}
