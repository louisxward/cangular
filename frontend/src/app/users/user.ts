export interface User {
    id?: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}



export function create(): User {
    return{
        username: '',
        email: '',
        firstName: '',
        lastName: '',
    }
}