import { Navbar } from "reactstrap";
import { Link } from "react-router-dom";
import { logout } from "../../modules/authManager";
import logo from "./mad-wrld-logo_cropped.png";

const Header = ({ isLoggedIn, userProfile }) => {

    return (
        <>
            <div className="logo-container">
                <img className="logo" alt="mad-wrld-logo" src={logo} />
            </div>
            <Navbar>
                <Link to="/">My Feed</Link>
                <Link to="/userposts">My MadLibs</Link>
                <Link to="/category">Create Your Own MadLib!</Link>
                { userProfile?.userType?.name === "Admin" && <Link to="/users">Users</Link> }
                { userProfile?.userType?.name !== "Admin" && <Link to={`/users/${userProfile?.id}`}>Profile</Link> }
                { isLoggedIn && <div onClick= {logout}>Logout</div> }
                
            </Navbar>
        </>
    )
}

export default Header;