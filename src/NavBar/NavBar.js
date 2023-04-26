import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand >LeaveApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home"><u>Home</u></Nav.Link>
            <Nav.Link href="/about"><u>About</u></Nav.Link>
            <Nav.Link href="/manual"><u>How to use</u></Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/school"><u>Create An Institute</u></Nav.Link>
            <Nav.Item>|</Nav.Item>
            <Nav.Link href="/signup"><u>SignUp</u></Nav.Link>
            <Nav.Item>|</Nav.Item>
            <Nav.Link href="/login"><u>Login</u></Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;