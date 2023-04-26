import NavBar from "../../NavBar/NavBar"
import { useLocation } from "react-router-dom"

const AssureSchool = () => {

    const location = useLocation()

    const { schoolName } = location.state || {}

    return (
        <>
            <NavBar/>
            <h2>New Institute {schoolName} is successfully created!</h2>
            <p><a href="/home">Go Back to Home Page</a></p>
            <p><a href="/signup/admin">Signup As An Admin</a></p>
        </>
    )
}

export default AssureSchool