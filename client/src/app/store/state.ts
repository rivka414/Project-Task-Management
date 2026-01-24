export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

const safeGetFromLocalStorage = (key: string): string | null => {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const initialState: AuthState = {
  user: safeGetFromLocalStorage('user') ? JSON.parse(safeGetFromLocalStorage('user')!) : null,
  token: safeGetFromLocalStorage('token')
};
