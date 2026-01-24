// import { createAction, props } from '@ngrx/store';
// import { AppState } from './state';

// export const loginSuccess = createAction(
//     '[User] Login Success',
//     props<{ user: AppState }>()
// );

// export const logout = createAction('[User] Logout');
import { createAction, props } from '@ngrx/store';
import { User } from './state';

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User; token: string }>()
);

export const logout = createAction('[Auth] Logout');
