import axios from 'axios'
import { FormContainer } from '../../Forms/FormContainer'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import NavBarDashBoard from '../../NavBar/NavBarDashboard'

const EditSchool = () => {

    const [admin_name, setAdmin_name] = useState('')
    const [instId, setInstId] = useState('')
    const [name, setName] = useState('')
    const [contact, setContact] = useState('')
    const [code, setCode] = useState('')
    const [err, setErr] = useState(null)

    const navigate = useNavigate()
    const location = useLocation()

    const { admin_id } = location.state || {}

    useEffect(() => {
        axios.post('https://leaveapp-api.onrender.com/admins/find', { _id: admin_id })
            .then(response => {
                const data = response.data
                setAdmin_name(data.name)
                setInstId(data.inst_id)
                setName(data.inst_name)
                setContact(data.contact)
                setCode(data.code)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
 
    const handleEdit = () => {

        axios.patch('https://leaveapp-api.onrender.com/schools', { _id: instId, name, contact, code })
            .then(response => {
                const reply = response.data.message
                console.log(reply)
                navigate('/admin', { state: { admin_id: admin_id, admin_name: admin_name } })
            })
            .catch(error => {
                setErr(error.response.data.message)
                console.log(error)
            })
    }

    return (
        <div>
        <NavBarDashBoard
            student_id=''
            admin_id={admin_id}
        />
        <div className='justify-content-center'>

            <FormContainer>
                <h2>Enter the details</h2>
                <hr className='md-3'/>
                <Form method='POST'>
                    <Form.Group controlId='Name'></Form.Group>
                    <Form.Label><h5>School/College Name</h5></Form.Label>  

                    <Form.Control
                    type='digit' placeholder='Institute Name' name='name' value={name}
                    onChange={e=>setName(e.target.value)}>
                    </Form.Control>

                    <Form.Group controlId='contact'></Form.Group>
                    <Form.Label><h5>Contact No</h5></Form.Label>        
                    
                    <Form.Control
                    type='text' placeholder='Contact No. of the Institute' name='contact' value={contact} onChange={e=>setContact(e.target.value)}>
                    </Form.Control>

                    <Form.Group controlId='code'></Form.Group>
                    <Form.Label><h5>Code</h5></Form.Label>

                    <Form.Control
                    type='text' placeholder='The code must be provided to all the admins' name='code' onChange={e=>setCode(e.target.value)} value={code}>
                    </Form.Control>
                    
                </Form>
                <hr className='md-3'/>

                {err?.length ? (<p>{err}</p>) : <></>}

                <Button variant='secondary' type='submit' onClick={handleEdit}>Update Details</Button>

            </FormContainer>
        </div>
    </div>

    )
}

export default EditSchool
