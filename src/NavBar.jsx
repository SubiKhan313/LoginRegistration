import { Link, useNavigate } from "react-router-dom";
import { logoutSuccess } from "./Features/slice/authSlice";
import { useDispatch } from "react-redux";
import { useSignOutMutation } from "./Features/api/authApi";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signOut] = useSignOutMutation();

  const isLogin = localStorage.getItem("api_token");

  const handleClick = async () => {
    try {
      const response = await signOut();
      console.log(response);
      dispatch(logoutSuccess());
      localStorage.removeItem("PhoneNo");
      localStorage.removeItem("api_token");
      localStorage.removeItem("user_id");
      navigate("/");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <>
      <div className="navBar" style={{ margin: "5px" }}>
        {/* <Link style={{margin: '5px'}} to='/'>Home</Link>
        <Link style={{margin: '5px'}} to='/checkpn'>Login</Link> */}
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">SubiKhan</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link>
                  <Link to="/">Home</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/designhome">Home Design</Link>
                </Nav.Link>
                {isLogin ? (
                  <Nav.Link style={{ display: "flex", textDecoration: "none" }}>
                    <Link onClick={handleClick} to="/">
                      Logout
                    </Link>
                  </Nav.Link>
                ) : (
                  <Nav.Link>
                    <Link to="/checkpn">Login</Link>
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default NavBar;
