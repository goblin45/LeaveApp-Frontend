import NavBarDashBoard from '../../NavBar/NavBarDashboard';
import 'bootstrap/dist/css/bootstrap.min.css'
import ReceivedMail from './ReceivedMail';

// import './style.css'
import { useLocation, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
      
	const navigate = useNavigate() 
    const location = useLocation()

	const { admin_id, admin_name } = location.state || {}

	if (!admin_id?.length || !admin_name?.length) {
		navigate('/manual')
	}

	return (
		<div>
			<NavBarDashBoard
				admin_id = {admin_id}
				student_id = ''
			/> 
			<div className='head'>
				<h3 className='welcome'>Welcome {admin_name}</h3>	
			</div>
			<div className='container'>
				<h5>Here is your pending mails to check</h5>

				<ReceivedMail 
					adminId = {admin_id}
				/>
				
			</div>

		</div>
	)
}

export default AdminDashboard