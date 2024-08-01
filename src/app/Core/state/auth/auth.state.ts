// auth.state.ts
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';

// Define actions
export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { username: string; password: string }) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

// Define the state model
export interface AuthStateModel {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Define the default state
const defaults: AuthStateModel = {
  username: null,
  token: null,
  isAuthenticated: false,
};

@State<AuthStateModel>({
  name: 'auth',
  defaults,
})
@Injectable()
export class AuthState {
  // Selectors
  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return state.isAuthenticated;
  }

  @Selector()
  static username(state: AuthStateModel): string | null {
    return state.username;
  }

  // Actions
  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    const { username, password } = action.payload;

    // Mock authentication logic
    if (username === 'user' && password === 'pass') {
      ctx.patchState({
        username,
        token: 'fake-jwt-token',
        isAuthenticated: true,
      });
    }
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      username: null,
      token: null,
      isAuthenticated: false,
    });
  }
}
