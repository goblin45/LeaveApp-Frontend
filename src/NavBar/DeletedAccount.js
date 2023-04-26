import NavBar from "./NavBar"
import { useLocation } from 'react-router-dom'

const DeletedAccount = () => {

    const location = useLocation()
    const { name } = location.state || {}

    return (
        <div>
            <NavBar/>
            <p>
                <h3>{name}, your account has been successfully deleted.</h3>
            </p>
            <div>
              <a href='/home'>Go to Home Page</a>
            </div>
        </div>
    )
}

export default DeletedAccount