import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../../modules/authManager";

export default function UserDetails({userProfile}) {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [ user, setUser ] = useState();

    const getUser = () => {
        (getUserById(userId)).then(userData => setUser(userData))
    }

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
                    onClick={() => {navigate(`/users/edit/${user.id}`)}}>
                    Edit
                    </button>
                </div>
            </div>
        </>
    )
}