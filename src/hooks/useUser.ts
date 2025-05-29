import type { UserData, UserResponse } from "@/models/user";
import type { UserFilter } from "@/models/user";
import ResetPassword from "@/pages/Resetpassword";
import {
  userCreateService,
  userGetService,
  userListService,
  userDeleteService,
} from "@/services/users";
import { useState, useCallback } from "react";
import { toast } from "react-toastify";

export default function useUser() {
    const [users, setUsers] = useState<UserResponse[] | null>();


  const userCreate = async (data: UserData) => {
    await userCreateService(data);
    await userList({});
    toast.success('Usuário criado com sucesso.')
  };

  const userGet = async (user_id: number): Promise<UserData | null> => {
    const response = await userGetService(user_id);

    if (response.status === 200) {
      return response.data;
    }

    return null;
  };

  const userList = useCallback(async (filter: UserFilter): Promise<UserData[]> => {
    const response = await userListService(filter);

    if (response.status === 200) {
        setUsers(response.data);
    }

    return [];
  },[]);

  const userDelete = async (teacher_id: number): Promise<void> => {
    const response = await userDeleteService(teacher_id);
    if (response.status === 200){
      toast.success('Professor deletado com sucesso.')
    }
  }

  return {userCreate, userGet, userList, userDelete, ResetPassword, users}
}
