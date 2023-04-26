import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { FormContainer } from './FormContainer';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar'

const AdminSignUp = () => {
	const [id, setId] = useState('')
	const [name, setName] = useState('')
	const [inst_name, setInst_Name] = useState('')
	const [password, setPassword] = useState('')
	const [code, setCode] = useState('')
	const [err, setErr] = useState(null)

	const navigate = useNavigate()

	const handleSubmit=async(e)=>{
		e.preventDefault()

		axios.post("http://localhost:3500/admins", {
			id,
			name,
			password,
			inst_name,
			code
		})
			.then(response => {
				const data = response.data
				console.log(data)
				navigate('/admin', { state: { admin_id: data.id, admin_name: data.name } })
		})
			.catch (error => {
				setErr(error.response.data.message)
				console.log(error)
		})
	} 
   	
	return (
		<div>
		<NavBar/>
		<div className='justify-content-center'>
		<FormContainer>
		<h2>SignUp with Us</h2>
		<h4>Already have an account?<Link to='/login/admin'>Login</Link></h4>
		
		<hr className='md-3'/>
		<Form method='POST'>
			<Form.Group controlId='id'></Form.Group>
			<Form.Label><h5>Admin Id</h5></Form.Label>        
			<Form.Control
			type='text' placeholder='Admin Id' name='id' value={id}
			onChange={e=>setId(e.target.value)}>
			
			</Form.Control>
			<Form.Group controlId='name'></Form.Group>
			<Form.Label><h5>Name</h5></Form.Label>        
			<Form.Control
			type='text' placeholder='name' value={name} onChange={e=>setName(e.target.value)}>
			</Form.Control>
			<Form.Group controlId='c_id'></Form.Group>
			<Form.Label><h5>College Name</h5></Form.Label>        
			<Form.Control
			type='text' placeholder='e.g.: University of Engineering & Management - Kolkata' value={inst_name} onChange={(e)=>setInst_Name(e.target.value)}>
			</Form.Control>
			
			<Form.Group controlId='pwd'></Form.Group>
			<Form.Label><h5>Password</h5></Form.Label>        
			<Form.Control
			type='password' placeholder='must be 8-20 letter long' value={password} onChange={e=>setPassword(e.target.value)}>
			</Form.Control>

			<Form.Group controlId='code'></Form.Group>
			<Form.Label><h5>Institution Code</h5></Form.Label>        
			<Form.Control
			type='text' placeholder='School/College Special Code' value={code} onChange={e=>setCode(e.target.value)}>
			</Form.Control>
			
		</Form>
		<hr className='md-3'/>

		{err?.length ? (<p>{err}</p>) : <></>}	

		<Button variant='secondary' onClick={handleSubmit}>SignUp</Button>


		</FormContainer>
		</div>
		</div>
		
	)
}

export default AdminSignUp