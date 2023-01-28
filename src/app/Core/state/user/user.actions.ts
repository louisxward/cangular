import { Record } from "pocketbase";

export namespace User {

  export class AppLoaded {
    static readonly type = "[Login] App Loaded";
  }

  export class UpdateAvatar {
    static readonly type = "[Update] Update Avatar"
    constructor(public payload: { id: string, fileName: string }) {}
  }

  export class UpdateUser {
    static readonly type = "[Update] Update User"
    constructor(public payload: { id: string, avatar: string, username: string, email: string }) {}
  }

  export namespace Login {
    export class LoginFlowInitiated {
      static readonly type = "[Login] Login"
      constructor(public payload: { record: Record}) {}
    }

    export class LogoutFlowInitiated {
      static readonly type = "[Login] Logout";
    }
    
  }
}