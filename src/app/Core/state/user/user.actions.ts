import { Record } from 'pocketbase'

export namespace User {
	export class AppLoaded {
		static readonly type = '[User] App Loaded'
	}

	export namespace Update {
		export class Avatar {
			static readonly type = '[Update] Avatar'
			constructor(public payload: { url: string | null }) {}
		}

		export class User {
			static readonly type = '[Update] User'
			constructor(
				public payload: {
					id: string
					avatar: string
					username: string
					email: string
				}
			) {}
		}

		export class Sidebar {
			static readonly type = '[Update] Sidebar State'
		}
	}

	export namespace Login {
		export class Login {
			static readonly type = '[Login] Login'
			constructor(public payload: { record: Record }) {}
		}

		export class Logout {
			static readonly type = '[Login] Logout'
		}
	}
}
