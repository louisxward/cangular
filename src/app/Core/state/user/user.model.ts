import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pocketbase.io');

const authData = await pb.collection('users').authWithPassword('louis', '12345');

// after the above you can also access the auth data from the authStore
console.log(pb.authStore.isValid);
console.log(pb.authStore.token);
console.log(pb.authStore.model?.id);

// "logout" the last authenticated model
pb.authStore.clear();


export interface UserStateModel {
    id: string | null
    username: string | null
    email: string | null
    avavatar: string | null
}