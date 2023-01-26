import { RecordAuthResponse, Record } from "pocketbase";

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

    // want to send whole record instead of just specified fields
    // export class UpdateUser2 {
    //   static readonly type = "[Login] Update User Initiated2"
    //   constructor(public payload: {record: Record<"", any>}) {}
    // }
    
  }
}