export interface INewUser {
    firstName: string;
    lastName: string;
    email: string;
}
export interface IUserWithUUID extends INewUser {
    firebaseUUID: string;
}

export interface IUser extends IUserWithUUID {
    id: number;
    userTypeId: number;
}

export default IUser;