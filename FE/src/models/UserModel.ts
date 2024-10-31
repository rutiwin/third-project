export class UserModel {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;

    constructor(userId: number, firstName: string, lastName: string, email: string, isAdmin: boolean){
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.isAdmin = isAdmin;
    }
}