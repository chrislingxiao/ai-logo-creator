import { createContext } from 'react';

export interface UserDetailContextType {
  userDetail: { name: string; credits: number; email: string } | null;
  setUserDetail: (
    detail: { name: string; credits: number; email: string } | null
  ) => void;
}

export const UserDetailContext = createContext<UserDetailContextType>({
  userDetail: null,
  setUserDetail: () => {},
});
