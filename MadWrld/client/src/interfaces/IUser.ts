export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    firebaseUUID?: string;
    id?: number;
    userTypeId?: number;
}

export default IUser;