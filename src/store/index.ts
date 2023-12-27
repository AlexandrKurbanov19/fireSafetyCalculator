import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type formStateType = 'Home' | 'TableFirst' | 'TableFinal';

export interface StoreState {
  objectType: string;
  formState: formStateType;
  setObjectType: (value: string) => void;
  objectName: string;
  setObjectName: (value: string) => void;
  objectAddress: string;
  setObjectAddress: (value: string) => void;
  fullName: string;
  setFullName: (value: string) => void;
  userList: { id: string; fullName: string }[];
  addUser: (fullName: string) => void;
  deleteUser: (id: string) => void;
  changeFormState: (val: formStateType) => void;
  cleanStore: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      objectType: '',
      formState: 'Home',
      setObjectType: (value) => set({ objectType: value }),
      objectName: '',
      setObjectName: (value) => set({ objectName: value }),
      objectAddress: '',
      setObjectAddress: (value) => set({ objectAddress: value }),
      fullName: '',
      setFullName: (value) => set({ fullName: value }),
      userList: [],
      addUser: (fullName) => {
        set((state) => ({
          userList: [
            ...state.userList,
            { id: Math.random().toString(), fullName },
          ],
        }));
      },
      changeFormState: (val: formStateType) => {
        set({
          formState: val,
        });
      },
      deleteUser: (id) => {
        set((state) => ({
          userList: state.userList.filter((user) => user.id !== id),
        }));
      },
      cleanStore: () => {
        set({
          objectType: '',
          objectName: '',
          objectAddress: '',
          fullName: '',
          userList: [],
        });
      },
    }),
    {
      name: 'calculateStorage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
