interface IUser {
    id: number;
    firebaseUUID: string;
    firstName: string;
    lastName: string;
    email: string;
    userTypeId: number;
    userType: IUserType;
}

interface IUserType {
    id: number;
    name: string;
}

export default IUser;