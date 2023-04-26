import axios from 'axios';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/esm/Table';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const PastMail = ({ senderId }) => {
    const [mails, setMails] = useState(null);
    const [reload, setReload] = useState(false)

    useEffect(() => {
        axios.post('http://localhost:3500/mails/students/nonpending', { _id: senderId })
        .then(response => {
            const mailsData = response.data;
            setMails(mailsData);
        })
        .catch(error => {
            console.log(error);
        });
    }, [reload]);

    const DeleteMailButton = ({ mail_id }) => {

        console.log(mail_id)
        const handleDelete = () => {
            console.log(mail_id, "from handleDelete")

            axios.delete('http://localhost:3500/mails', { data: { _id: mail_id } })
                .then(response => {
                    const reply = response.data.message
                    console.log(reply)
                    setReload(!reload)
                })
                .catch(error => {
                    console.log(error)
                })
        }

        return (
            <Button onClick={() => handleDelete()}><FontAwesomeIcon icon={ faTrash }/></Button>
        )
    }

    return (
        <div className='conatiner'>
        <h4>Your Past Applications</h4>
        
        <Table striped bordered hover >
            {mails?.length ? (
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Concerned Admin</th>
                        <th>Delete</th>
                    </tr>
                </thead>
            ) : <></>}
            
            {mails?.length ? (
                mails.map(mail => (
                    <tbody>
            
                        <tr key={mail._id}>
                            <td>{mail.subject}</td>
                            <td>{mail.status}</td>
                            <td>{mail.receiverName}</td>
                            <td><DeleteMailButton mail_id={mail._id}/></td>
                        </tr>

                    </tbody>
            )) 
            ) : <p>No mails to show.</p>}
            
        </Table>
                
            
        </div>
        
    );
};

export default PastMail;