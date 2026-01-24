// // src/app/store/user.reducer.ts
// import { createReducer, on } from '@ngrx/store';
// import { loginSuccess, logout } from './actions';
// import { AppState, initialState } from './state';

// export const userReducer = createReducer(
//     initialState,
//     on(loginSuccess, (state, { user }) => {
//         localStorage.setItem('user', JSON.stringify(user)); // שמירה ב-LocalStorage
//         return { ...state, ...user };
//     }),
//     on(logout, (state) => {
//         localStorage.removeItem('user');
//         return { ...initialState };
//     })
// );
import { createReducer, on } from '@ngrx/store';
import { AuthState, initialState } from './state';
import { loginSuccess, logout } from './actions';

const safeSetToLocalStorage = (key: string, value: string): void => {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(key, value);
  } catch {
    // ignore
  }
};

const safeRemoveFromLocalStorage = (key: string): void => {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user, token }) => {
    safeSetToLocalStorage('user', JSON.stringify(user));
    safeSetToLocalStorage('token', token);
    return { ...state, user, token };
  }),
  on(logout, state => {
    safeRemoveFromLocalStorage('user');
    safeRemoveFromLocalStorage('token');
    return { user: null, token: null };
  })
);
