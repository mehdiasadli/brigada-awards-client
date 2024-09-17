import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TUser } from '../types/models';

export const AUTH_STORAGE_KEY = 'br-awards-auth-data';

export interface AuthStoreState extends Partial<TUser> {
  token: string | null;
}

interface AuthStoreActions {
  setUser(data: Partial<AuthStoreState>): void;
  resetUser(): void;
}

export const useAuth = create<AuthStoreActions & AuthStoreState>()(
  persist(
    (set) => ({
      token: null,

      setUser(data) {
        set(data);
      },
      resetUser() {
        set({ token: null });
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
    }
  )
);
