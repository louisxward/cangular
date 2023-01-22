export namespace User {

  export class AppLoaded {
    static readonly type = "[Login] App Loaded";
  }

  export namespace Login {
    export class LoginFlowInitiated {
      static readonly type = "[Login] Login Flow Initiated"
      constructor(public payload: { username: string, password: string }) {}
    }

    export class UpdateUser {
      static readonly type = "[Login] Update User Initiated"
      constructor(public payload: { id: string }) {}
    }

    export class LogoutFlowInitiated {
      static readonly type = "[Login] Logout Flow Initiated";
    }
    
  }

}