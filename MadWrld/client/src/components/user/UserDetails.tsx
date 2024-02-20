import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../../modules/auth/authManager";
import IUser from "../../interfaces/IUser";

const UserDetails: React.FC<{userProfile: IUser | null}> = ({userProfile}) => {
    const navigate = useNavigate();
    const [ user, setUser ] = useState<IUser | undefined>();
    const params = useParams<{ id: string | undefined }>();
    const userId = params.id ? parseInt(params.id, 10) : undefined;

    if (userId !== undefined && userProfile?.userTypeId === 1) {
        const getUser = () => {
        getUserById(userId).then(userData => setUser(userData));
        };
        
        useEffect(() => {
            getUser()
        }, []);
    
    return (
        <>
            <div className="userprofile-container">
                <div className="px-2">
                    <ul>
                        <li>Last Name: {user?.lastName}</li>
                        <li>First Name: {user?.firstName}</li>
                        <li>Email: {user?.email}</li>
                    </ul>
                </div>
                <div className="px-5">
                    <button className="user-edit-btn"
                    onClick={() => {navigate(`/users/edit/${user?.id}`)}}>
                    Edit
                    </button>
                </div>
            </div>
        </>)
    } else return <h2>User Not Found</h2>;
}

export default UserDetails;