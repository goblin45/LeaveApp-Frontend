import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import DeletedAccount from './DeletedAccount';

function NavBarDashBoard({ student_id, admin_id }) {

	const navigate = useNavigate()

	const EditPath = ({admin_id, student_id}) => {
		return student_id?.length ? (
			<NavDropdown.Item onClick={() => { navigate('/student/edit', { state: { _id: student_id } }) }}>Edit Profile</NavDropdown.Item>
		) : (
			<NavDropdown.Item onClick={() => { navigate('/admin/edit', { state: { _id: admin_id } }) }}>Edit Profile</NavDropdown.Item>
		)
	}

	const DeletePath = ({admin_id, student_id}) => {
		return student_id?.length ? (
			<NavDropdown.Item onClick={() => { navigate('/student/delete', { state: { _id: student_id }}) }}>Delete Account</NavDropdown.Item>
		) : (
			<NavDropdown.Item onClick={() => { navigate('/admin/delete', { state: { _id: admin_id }}) }}>Delete Account</NavDropdown.Item>
		)
	}

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
				<NavDropdown title="User Options" id="basic-nav-dropdown">
				<EditPath 
					admin_id={admin_id}
					student_id={student_id}
				/>
				{admin_id?.length ? (
					<NavDropdown.Item onClick={() => { navigate('/school/edit', { state: { admin_id: admin_id }}) }}>Edit Institute</NavDropdown.Item>
					
				) : <></>}
				<DeletePath 
					admin_id={admin_id}
					student_id={student_id}
				/>
				<NavDropdown.Item href="/home">Logout</NavDropdown.Item>
				<NavDropdown.Divider />
				</NavDropdown>
			</Nav>
			</Navbar.Collapse>
		</Container>
		</Navbar>
	);
}
export default NavBarDashBoard