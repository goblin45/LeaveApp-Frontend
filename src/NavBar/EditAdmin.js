import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormContainer } from "../Forms/FormContainer";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import NavBarDashBoard from "./NavBarDashboard";

const EditAdmin = () => {
    
    const [id, setId]=useState("")
    const [name, setName]=useState("")
    const [password, setPassword]=useState("")
    const [inst_name, setInst_Name]=useState("")
    const [code, setCode]=useState("")
    const [err, setErr] = useState(null)

    const navigate=useNavigate()
    const location = useLocation()

    const { _id } = location.state || {}

    useEffect(() => {
        axios.post('http://localhost:3500/admins/find', { _id })
            .then(response => {
                const admin = response.data
                console.log(admin)
                setId(admin.id)
                setName(admin.name)
                setInst_Name(admin.inst_name)
                setCode(admin.code)
            })
            .catch (error => {
                console.log(error)
            })
    }, [])

    const handleUpdate=(e)=>{
        e.preventDefault()

        axios.patch('http://localhost:3500/admins', { _id, id, name, password, inst_name, code })
            .then(response => {
                const data = response.data
                console.log(data)
                setName(data.name)
                navigate('/admin', { state: { admin_id: _id, admin_name: data.name } })
            })
            .catch (error => {
                setErr(error.response.data.message)
                console.log(error)
            })
    }

    return (
        <div>
            <NavBarDashBoard
                student_id={''}
                admin_id = {_id}
            />
            <FormContainer>
                <h2>Edit Profile</h2>
                <Form.Group controlId="id">
                    <Form.Label><h4>Admin Id</h4></Form.Label>
                    <Form.Control
                        type='text'
                        name="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="name">
                    <Form.Label><h4>Name</h4></Form.Label>
                    <Form.Control
                        type='text'
                        name="name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label><h4>Password</h4></Form.Label>
                    <Form.Control
                        type='password'
                        placeholder="password"
                        name="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="inst_name">
                    <Form.Label><h4>Institution Name</h4></Form.Label>
                    <Form.Control
                        type='text'
                        name="inst_name"
                        value={inst_name}
                        onChange={(e)=>setInst_Name(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="code">
                    <Form.Label><h4>Institute Code</h4></Form.Label>
                    <Form.Control
                        type='text'
                        name="code"
                        value={code}
                        onChange={(e)=>setCode(e.target.value)}
                    />
                </Form.Group>

                {err?.length ? (<p>{err}</p>) : <></>}	

                <Button onClick={handleUpdate}>Update Details</Button>

            </FormContainer>
        </div>
    )
}

export default EditAdmin