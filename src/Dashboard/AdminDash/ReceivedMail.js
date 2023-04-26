import axios from "axios"
import { useState,useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const ReceivedMail = ({ adminId }) => {

    const [mails, setMails] = useState(null)
    const [reload, setReload] = useState(false)
    let _id = adminId
   
    useEffect(() => {
        axios.post("http://localhost:3500/mails/admins", { _id })
            .then(response => {
                const received_mails = response.data
                setMails(received_mails)
                console.log(received_mails)
            })
            .catch(error=>{
                console.log(error)
            })
    }, [reload])

    const onAcceptClicked = (mail_id) => {
        
        const status = 'Granted'
        let _id = mail_id
        
        axios.patch("http://localhost:3500/mails/admins", { _id, status })
            .then(response => {
                console.log(_id, status)
                let data = response.data
                console.log(data.message)

                let received = [mails]
                setMails(received)
                setReload(!reload)
            })
            .catch(error => {
                console.log(error)
            });
    }  

    const onRejectClicked = (mail_id) => {
        let received = [mails]
        const status = 'Denied'
        let _id = mail_id
        
        setMails(received)

        axios.patch("http://localhost:3500/mails/admins", { _id, status })
            .then(response => { 
                let data = response.data
                console.log(data.message)
                setReload(!reload)
        })
            .catch(error => {
                console.log(error)
        });
           
    }    

    return (
        <div className='received'>
        
        {mails?.length ?(
            mails.map(mail=>(
            <div className='box'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Days</th>
                            <th>Sender</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={mail._id}>
                            <td>{mail.subject}</td>
                            <td>{mail.days}</td>
                            <td>{mail.senderName}</td>
                        </tr>
                    </tbody>
                </Table>
                <div key={mail._id} className='row'>
                <p>{mail.body}</p>
                        <div className='buttons'>
                            <Button className='grant' variant='success' onClick={()=>onAcceptClicked(mail._id)}>Grant</Button>
                            <Button className='deny' variant='danger' onClick={()=>onRejectClicked(mail._id)}>Deny</Button>
                        </div>
                </div>

                </div>
                
            ))

        ):<p> No mails Found </p>}
    
       
        
        {/* <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Days</th>
                    <th>Sender</th>            
                </tr>
            </thead>
            
            {
                mails?.length ?(
                    mails.map(mail=>(
                        <tbody>
                            <tr key={mail._id}>
                                <td>{mail.subject}</td>
                                <td>{mail.days}</td>
                                <td>{mail.sender}</td>
                            </tr>
                        </tbody>
                    )
                )):<p>No pending mails for now.</p>
            }
        </Table> */}

       
        </div>
     

    )
        
    
}

export default ReceivedMail