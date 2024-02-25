import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, deleteUser, editUserInfo, getAllUserTypes } from "../../modules/auth/authManager";
import { Form, FormGroup, Input, Label } from "reactstrap"
import IUser from "../../interfaces/IUser";
import { useAuth } from "../../modules/auth/authContext";
        
const EditUser: React.FC = () => {
    const navigate = useNavigate();
    const { userProfile } = useAuth();
    const params = useParams<{ id: string }>();
    const [ user, setUser ] = useState<IUser>({ id: 0, firstName: '', lastName: '', email: '', userTypeId: 0});
    const [ userTypes, setUserTypes ] = useState<{id: number; name: string}[]>([]);
    const userId = params.id ? parseInt(params.id, 10) : 0;
    const [oldUser, setOldUser] = useState<IUser | null>(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const userData = await getUserById(userId);
                setUser(userData);
                setOldUser(userData);
            } catch (error) {console.error("Error fetching user data: ", error);}
        };

        const getUserTypes = async () => {
            try {
                const data = await getAllUserTypes();
                setUserTypes(data);
            } catch (error) {
                console.error("Error fetching user types: ", error);
            }
        };

        if (userId !== undefined) {
            getUser();
            getUserTypes();
        }
    }, [userId]);

    const submitChanges: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
          editUserInfo(user)
          .then(() => window.alert('Changes have been made!'))
          .then(() => {navigate(`/users/${user.id}`)})
          .catch(error => console.error("Error editing user info: ", error));
    };
    
    const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        if (oldUser && oldUser.id) {
            const confirmation = window.confirm("Are you sure you want to delete this user?");
            if (confirmation) {
                deleteUser(oldUser.id)
                .then(() => window.alert("User has been deleted!"))
                .then(() => userProfile?.userTypeId === 1 ? navigate("/users") : navigate("/"))
                .catch(error => console.error("Error deleting user: ", error));
            }
        }
    };

    if (!oldUser) {
        return <div>loading...</div>
    }
    
    return (
    <>
        <section className="input-container">
            <header className="text-black">{oldUser?.firstName} {oldUser?.lastName}</header>
        </section>
        <Form onSubmit={submitChanges}>
            <FormGroup>
                <Label >First Name</Label>
                <Input
                defaultValue={oldUser.firstName}
                type="text"
                onChange={(e) => {
                    let copy = {...user}
                    copy.firstName = e.target.value 
                    setUser(copy)}}
                />
                <Label>Last Name</Label>
                <Input
                defaultValue={oldUser.lastName}
                type="text"
                onChange={(e) => {
                    let copy = {...user}
                    copy.lastName = e.target.value 
                    setUser(copy)}}
                />
            </FormGroup>
            <FormGroup>
                <Label>Email</Label>
                <Input
                defaultValue={oldUser.email}
                type="text"
                onChange={(e) => {
                    let copy = {...user}
                    copy.email = e.target.value 
                    setUser(copy)}}
                />
            </FormGroup>
            <FormGroup>
                <Label>User Privileges</Label>
                {oldUser.userTypeId === 2 ? <p className="card-body">User Type: {oldUser.userTypeId}</p> :
                <>
                    <Input
                    defaultValue={oldUser.userTypeId}
                    type="select"
                    onChange={(e) => {
                        let copy = {...user}
                        copy.userTypeId = parseInt(e.target.value); 
                        setUser(copy)}}
                    >
                        {userTypes.map(ut => {
                        return (<option key={ut.id} value={ut.id}>{ut.name}</option>)
                        })}
                    </Input>
                </>}
            </FormGroup>
            <div className="edit-btn-container">
                <button type="submit" className="input-container" color="success">Save Changes</button>
                <button className="input-container bg-danger" onClick={handleDelete}>Delete User</button>
            </div>
        </Form>
    </>)
}

export default EditUser;