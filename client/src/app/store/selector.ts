// // src/app/store/user.selectors.ts
// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { AppState } from './state';

// export const selectUserState = createFeatureSelector<AppState>('user');

// export const selectUserName = createSelector(
//     selectUserState,
//     (state: AppState) => state.name
// );

// export const selectUserEmail = createSelector(
//     selectUserState,
//     (state: AppState) => state.email
// );

// export const selectUserRole = createSelector(
//     selectUserState,
//     (state: AppState) => state.role
// );

// selector.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './state';

// 1️⃣ בוחרים את ה־feature state (AuthState)
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// 2️⃣ selector ל־user
export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

// 3️⃣ selector ל־token
export const selectToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);

// 4️⃣ selector לבדיקה אם המשתמש מחובר
export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state: AuthState) => !!state.user && !!state.token
);

// 5️⃣ אפשר גם selectors ספציפיים לשדות המשתמש
export const selectUserName = createSelector(
  selectAuthState,
  (state: AuthState) => state.user?.name
);

export const selectUserEmail = createSelector(
  selectAuthState,
  (state: AuthState) => state.user?.email
);
