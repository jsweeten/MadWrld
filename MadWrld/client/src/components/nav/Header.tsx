import React from "react";
import { Navbar } from "reactstrap";
import { Link } from "react-router-dom";
import { logout } from "../../modules/auth/authManager";
import { useAuth } from "../../modules/auth/authContext";
// import logo from "../../assets/mad-wrld-logo_cropped.png";

const Header:React.FC = () => {
    const { userProfile } = useAuth();
    return (
        <>
            <div className="logo-container">
                {/*<img className="logo" alt="mad-wrld-logo" src={logo} />*/}
            </div>
            <Navbar>
                <Link to="/">My Feed</Link>
                <Link to="/userposts">My MadLibs</Link>
                <Link to="/category">Create Your Own MadLib!</Link>
                
                {/* Logged in admins see Users link,
                    Logged in users see Profile link
                    Unauthenticated users see nothing */}

                { userProfile?.userTypeId === 1 ? <Link to="/users">Users</Link> :
                <Link to={`/users/`}>Profile</Link>}
                <div onClick= {logout}>Logout</div>
            </Navbar>
        </>
    );
};

export default Header;