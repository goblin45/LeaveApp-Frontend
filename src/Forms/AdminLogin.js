import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import NavBar from '../NavBar/NavBar'

import Form from 'react-bootstrap/Form'

import { FormContainer } from './FormContainer'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const AdminLogin = () => {
		
	const [id, setId] = useState('')
	const [password, setPassword] = useState('')
	const [err, setErr] = useState(null)

	const navigate = useNavigate()
	const handleSubmit = async(e) => {
		e.preventDefault()
	
		axios.post("http://localhost:3500/login/admins", { id, password })
			.then (response => {
				const data = response.data
				console.log(data.name)
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
				<h2>Login with us</h2>
				<h4>Don't have an account?<Link to='/signup/admin'>Signup</Link></h4>
				<h5>Are you a student?<Link to='/login'>go back</Link></h5>
				
				<hr className='md-3'/>
				<Form method='POST'>
					<Form.Group controlId = 'id'></Form.Group>
					<Form.Label><h5>Admin Id</h5></Form.Label>        
					<Form.Control
					type='text' placeholder='college/school id' name = 'id' value = {id}
					onChange = {e => setId(e.target.value)}>
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

export default AdminLogin