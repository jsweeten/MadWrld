import { Navbar } from "reactstrap";
import { Link } from "react-router-dom";
// import auth from "../../modules/auth/firebase";
//import { logout } from "../../modules/auth/authManager";
//import logo from "../../assets/mad-wrld-logo_cropped.png";

const Header = () => {
    // const handleLogout =  async () => {
    //     try {
    //         await auth.signOut();
    //     } catch (error) {
    //         console.error('Error logging out:', error);
    //     }
    // };

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
                    
                { /*isLoggedIn ? (
                    userProfile?.userTypeId === 1 ? (
                    <Link to="/users">Users</Link>
                    ) : (
                    <Link to={`/users/${userProfile?.id}`}>Profile</Link>
                    )
                ) : (
                  <></>
                )}
                { /*isLoggedIn && <div onClick= {handleLogout}>Logout</div> */} 
            </Navbar>
        </>
    );
};

export default Header;