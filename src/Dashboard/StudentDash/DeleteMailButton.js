import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { Button } from "react-bootstrap"

import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const DeleteMailButton = ({ mail_id }) => {

    console.log(mail_id)

    const handleDelete = () => {

        axios.delete('http://localhost:3500/mails', { data: { _id: mail_id } })
            .then(response => {
                const reply = response.data.message
                console.log(reply)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <Button onClick={() => handleDelete()}><FontAwesomeIcon icon={ faTrash }/></Button>
    )
}

export default DeleteMailButton