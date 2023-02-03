import { Button, Navbar } from "reactstrap";
import { Link } from "react-router-dom";
import { logout } from "../../modules/authManager";
import "./Header.css";
import logo from "./mad-wrld-logo_cropped.png";

const Header = ({ isLoggedIn }) => {



    return (
        <>
            <div className="logo-container">
                <img className="logo" alt="mad-wrld-logo" src={logo} />
            </div>
            <Navbar>
                <Link to="/">My Feed</Link>
                <Link to="/mymadlibs">My MadLibs</Link>
                <Link to="/templates">Templates</Link>
                
                <Button onClick= {logout()}>Logout</Button>
                
            </Navbar>
        </>
    )
}

export default Header;