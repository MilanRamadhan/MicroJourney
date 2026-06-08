import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'student' | 'teacher' | 'superadmin';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  className?: string;
  createdBy?: string;
}

interface AuthState {
  users: AppUser[];
  currentUser: AppUser | null;
  login: (email: string, password: string) => AppUser | null;
  logout: () => void;
  registerStudent: (input: { name: string; email: string; password: string; className: string; createdBy: string }) => AppUser;
  deleteStudent: (id: string) => void;
}

const DEFAULT_USERS: AppUser[] = [
  {
    id: 'teacher-001',
    name: 'Guru IPA 1',
    email: 'guru1@gmail.com',
    password: 'guruguru',
    role: 'teacher',
  },
  {
    id: 'superadmin-001',
    name: 'Super Admin',
    email: 'superadmin@gmail.com',
    password: 'superadmin',
    role: 'superadmin',
  },
];

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function mergeDefaultUsers(users: AppUser[]) {
  const byEmail = new Map(users.map(user => [normalizeEmail(user.email), user]));
  DEFAULT_USERS.forEach(user => {
    if (!byEmail.has(normalizeEmail(user.email))) byEmail.set(normalizeEmail(user.email), user);
  });
  return Array.from(byEmail.values());
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: DEFAULT_USERS,
      currentUser: null,

      login: (email, password) => {
        const users = mergeDefaultUsers(get().users);
        const user = users.find(item =>
          normalizeEmail(item.email) === normalizeEmail(email) &&
          item.password === password
        ) ?? null;
        set({ users, currentUser: user });
        return user;
      },

      logout: () => set({ currentUser: null }),

      registerStudent: ({ name, email, password, className, createdBy }) => {
        const users = mergeDefaultUsers(get().users);
        const normalized = normalizeEmail(email);
        const existing = users.find(user => normalizeEmail(user.email) === normalized);
        const student: AppUser = {
          id: existing?.id ?? `student-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          name: name.trim(),
          email: normalized,
          password,
          role: 'student',
          className: className.trim(),
          createdBy,
        };
        const nextUsers = existing
          ? users.map(user => user.id === existing.id ? student : user)
          : [...users, student];
        set({ users: nextUsers });
        return student;
      },

      deleteStudent: (id) => set(state => ({
        users: mergeDefaultUsers(state.users).filter(user => user.id !== id || user.role !== 'student'),
      })),
    }),
    {
      name: 'microjourney-auth',
      partialize: state => ({ users: state.users, currentUser: state.currentUser }),
      onRehydrateStorage: () => state => {
        if (state) state.users = mergeDefaultUsers(state.users);
      },
    }
  )
);
