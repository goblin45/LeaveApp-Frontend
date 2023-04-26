import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useState,useEffect } from 'react'
import NavBarDashBoard from '../../NavBar/NavBarDashboard';
import { FormContainer } from '../../Forms/FormContainer';

import { FloatingLabel } from 'react-bootstrap';

import { useNavigate, useLocation } from 'react-router-dom'

const EditMail = () => {
    const [admins, setAdmins] = useState([])
    const [subject, setSubject] = useState('')
    const [days, setDays] = useState('')
    const [body, setBody] = useState('')
    const [receiverId, setReceiverId] = useState('')
    const [err, setErr] = useState(null)

    const location = useLocation()
    const navigate = useNavigate()

    const { senderId, senderName, mail_id } = location.state || {}

    useEffect(() => {
		axios.post("http://localhost:3500/students/sameschooladmins", { _id: senderId })
		.then(response => {
			const admins_received = response.data
			setAdmins(admins_received)
		})
		.catch(error => {
			console.log(error)
		})
	}, [senderId])

    useEffect(() => {
        axios.post('http://localhost:3500/mails/find', { _id: mail_id })
            .then(response => {
                const mail = response.data
                console.log(mail)
                setSubject(mail.subject)
                setDays(mail.days)
                setBody(mail.body)
                setReceiverId(mail.receiverId)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault()

        axios.patch('http://localhost:3500/mails', { _id: mail_id, subject, days, body, receiverId })

            .then(response => {
                console.log(response)
                navigate('/student', { state: { student_id: senderId, student_name: senderName }})
            })
            .catch(error => {
                console.log(error)
                setErr(error.response.data.message)
            })
    }

    const handleSelectAdmin = (e) => {
		setReceiverId(e.target.value)
	}

    return (
        <div>
            <NavBarDashBoard
                student_id={senderId}
                admin_id=''
            />
        <FormContainer>
            <h2>Edit your mail</h2>
            <hr className='mb-3'/>
            <Form>
                <Form.Group controlId='subject'></Form.Group>
                <Form.Label><h4>Subject</h4></Form.Label>
                <Form.Control 
                    type='text'
                    name='subject'
                    value={subject}
                    onChange={(e)=>setSubject(e.target.value)}
                />
                

                <Form.Group controlId='days'></Form.Group>
                <Form.Label><h4>Days</h4></Form.Label>
                <Form.Control 
                    type='digit'
                    name='days'
                    value={days}
                    onChange={(e)=>setDays(e.target.value)}
                />
                

                <Form.Group controlId='body'> </Form.Group>
                <Form.Label><h4>Mail Body</h4></Form.Label>

                <FloatingLabel controlId="Mail Body" label="MailBody">
                    <Form.Control
                        as="textarea" 
                        value={body} 
                        onChange={(e)=>setBody(e.target.value)}
                        placeholder="write your mail here"
                        style={{ height: '300px' }}
                    />
                </FloatingLabel>

                <Form.Label><h6 className='send_to'>Receiver</h6></Form.Label>
                    <Form.Select value={receiverId} onChange={handleSelectAdmin}>
                        {admins ? (
                            admins.map(admin=>(
        
                                <option className='admin_box' key={admin._id} value={admin._id} > {admin.name} </option>
                            ))
                            ) : <option disabled selected>No admin found for this school</option>
                        }
                    </Form.Select>

            </Form>

                { err ? <p>{err}</p> : <></> }

                <Button className='primary' onClick={handleUpdate}>Update Mail</Button>
            
        </FormContainer>
        
        </div>
    )
}

export default EditMail