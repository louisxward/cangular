import { Record } from "pocketbase";

export namespace User {

  export class AppLoaded {
    static readonly type = "[Login] App Loaded";
  }

  export namespace Login {
    export class LoginFlowInitiated {
      static readonly type = "[Login] Login Flow Initiated"
      constructor(public payload: { record: Record}) {}
    }

    export class UpdateUser {
      static readonly type = "[Login] Update User Initiated"
      constructor(public payload: { id: string, avatar: string, username: string, email: string }) {}
    }

    export class LogoutFlowInitiated {
      static readonly type = "[Login] Logout Flow Initiated";
    }
    
  }
}