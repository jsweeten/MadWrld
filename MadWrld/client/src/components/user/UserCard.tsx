import React from 'react';
import IUser from '../../interfaces/IUser';
import { useNavigate } from 'react-router-dom';

const UserCard:React.FC<{user: IUser}> = ({user}) => {
    const navigate = useNavigate();

    return (
        <div className="userprofile-container">
            <div className="px-2">
                <ul>
                    <li>Last Name: {user.lastName}</li>
                    <li>First Name: {user.firstName}</li>
                    <li>Email: {user.email}</li>
                </ul>
            </div>
            <div className="px-5">
                <button className="user-edit-btn"
                onClick={() => {navigate(`edit/${user.id}`)}}>
                Edit
                </button>
            </div>
        </div>
    )
}

export default UserCard;