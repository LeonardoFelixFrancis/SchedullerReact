import { create } from 'zustand';
import type { UserData } from '@/models/user';

interface UserStore {
    user: UserData | null;
    setUser: (userData: UserData | null) => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (userData: UserData | null) => set({user: userData }),
}))

export default useUserStore;