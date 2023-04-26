import Navbar from '../NavBar/NavBar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormContainer } from './FormContainer';
import { useState} from 'react';
import { Link } from 'react-router-dom';
import axios from  'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {  

	const [id,setId]=useState('');
	const [password,setPassword]=useState(''); 
	const [err, setErr] = useState(null);
	const navigate=useNavigate();
	// const[response,setResponse]=useState(null)


	const handleSubmit=async(e)=>{
		e.preventDefault();
		
		axios.post("http://localhost:3500/login/students", { id, password })
			.then (response => {
				const data = response.data
				console.log(data.name)
				navigate('/student', { state: { student_id: data.id, student_name: data.name } })
			})
			.catch (error => {
				setErr(error.response.data.message)
				console.log(error)
			})
	}

	return (
		<div>
			<Navbar/>
		<div className='justify-content-center'>
		<FormContainer>
			<h2>Login With Us</h2>
			<h4>Don't have an account?<Link to='/signup'>Signup</Link></h4>
			
			<h5>If you are an admin, <Link to='/login/admin'>Click Here</Link></h5> 

			<hr className='md-3'/>
			<Form method='POST'>
				<Form.Group controlId='id'></Form.Group>
				<Form.Label autoFocus><h5>Enrollment Number</h5></Form.Label>        
				<Form.Control
				type='digit' placeholder='enrollment number' name='id' value={id}
				onChange={e=>setId(e.target.value)}>
				</Form.Control>
			
				<Form.Group controlId='pwd'></Form.Group>
				<Form.Label><h5>Password</h5></Form.Label>        
				<Form.Control
				type='password' placeholder='must be 8-20 letter long' value={password} onChange={e=>setPassword(e.target.value)}>
				</Form.Control>
				
			</Form>
			<hr className='md-3'/>

			{err?.length ? (<p>{err}</p>) : <></>}

			<Button variant='secondary' onClick={handleSubmit}>Login</Button>
		</FormContainer>

		</div>
		</div>
	)
}

export default Login