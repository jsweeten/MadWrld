import { Button, Navbar } from "reactstrap";
import { Link } from "react-router-dom";
import { logout } from "../../modules/authManager";

const Header = () => {



    return (
        <Navbar>
            <Link to="/">My Feed</Link>
            <Link to="/mymadlibs">My MadLibs</Link>
            <Link to="/templates">Templates</Link>
            <Button onClick= {logout()}>Logout</Button>
        </Navbar>
    )
}

export default Header;