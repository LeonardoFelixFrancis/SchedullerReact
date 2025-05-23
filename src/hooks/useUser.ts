import type { UserData } from "@/models/user";
import type { UserFilter } from "@/models/user";
import {
  userCreateService,
  userGetService,
  userListService,
} from "@/services/users";
import { useState, useCallback } from "react";

export default function useUser() {
    const [users, setUsers] = useState<UserData[] | null>();


  const userCreate = async (data: UserData) => {
    await userCreateService(data);
    await userList({});
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

  return {userCreate, userGet, userList, users}
}
