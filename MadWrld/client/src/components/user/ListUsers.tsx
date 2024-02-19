import React, { useState, useEffect } from "react";
import { getUsersList } from "../../modules/auth/authManager";
import UserCard from "./UserCard";

export default function ListUsers({userProfile}) {
    
    const [ admins, setAdmins ] = useState([]);
    const [ authors, setAuthors ] = useState([]);
    
    const getAllUsers = () => {
        getUsersList().then(userData => userData.map(user =>
        {
            if (user?.userType?.name === "Admin") {
                return setAdmins(previousState => [...previousState, user])}
            else {
                return setAuthors(previousState => [...previousState, user])
            }
        }))
    }

    useEffect(() => {
        getAllUsers()
    }, []);
    
    return (
        <section>
            <div>
                <h1 className="m-4">Welcome to the user management page, {userProfile.firstName}</h1>
            </div>
            <div>
                <h2>Here is a list of all registered users:</h2>
            </div>
            <div>
                <header>Administrators</header>
            </div>
            <article className="px-5">
                {admins.map((admin) => {
                return (
                    < UserCard user={admin} key={`admin--${admin.id}`}/>
                )
        })}
            </article>
            <div>
                <header>Authors</header>
            </div>
            <article className="px-5">
                {authors.map((author) => {
                return (
                    < UserCard user={author} key={`author--${author.id}`}/>
                )
        })}
            </article>
            <div>
                <h2 className="m-5">End of registered users</h2>
            </div>
        </section>
    )
}