import './App.css'
import { Routes, Route } from 'react-router-dom'

import Home from './NavBar/Home'
import About from './NavBar/About'
import Manual from './NavBar/Manual'

import AdminDashboard from './Dashboard/AdminDash/AdminDashboard'
import StudentDashboard from './Dashboard/StudentDash/StudentDashboard'
import Compose from './Dashboard/StudentDash/Compose'

import SignUp from './Forms/SignUp'
import AdminSignUp from './Forms/AdminSignUp'
import Login from './Forms/Login'
import AdminLogin from './Forms/AdminLogin'

import EditStudent from './NavBar/EditStudent'
import EditAdmin from './NavBar/EditAdmin'
import DeleteStudent from './NavBar/DeleteStudent'
import DeleteAdmin from './NavBar/DeleteAdmin'

import DeletedAccount from './NavBar/DeletedAccount'
import EditMail from './Dashboard/StudentDash/EditMail'

import CreateSchool from './Dashboard/SchoolDash/CreateSchool'
import EditSchool from './Dashboard/SchoolDash/EditSchool'
import AssureSchool from './Dashboard/SchoolDash/AssureSchool'

function App() {
	return (
		<div className="App">
		
			<Routes>
			
				<Route path="/" element={<Home/>}/>
				<Route path="home" element={<Home/>}/>
				<Route path="about" element={<About/>}/>
				<Route path="manual" element={<Manual/>}/>

				<Route path="signup" >
					<Route index element={<SignUp/>}/> 
					<Route path="admin" element={<AdminSignUp/>}/> 
				</Route> 

				<Route path="login" > 
					<Route index element={<Login/>}/> 
					<Route path="admin" element={<AdminLogin/>}/>
				</Route>
				
			</Routes>
				
			<Routes>

				<Route path="student" >
					<Route index element={<StudentDashboard/>}/>
					<Route path='edit' element={<EditStudent/>}/>
					<Route path='delete' element={<DeleteStudent/>}/>
					<Route path='compose' element={<Compose/>}/>
					<Route path='editmail' element={<EditMail/>}/>
				</Route>

				<Route path="admin">
					<Route index element={<AdminDashboard/>}/>
					<Route path="edit" element={<EditAdmin/>}/>
					<Route path="delete" element={<DeleteAdmin/>}/>
				</Route>
				
				<Route path="deleted">
					<Route index element={<DeletedAccount/>}/>
				</Route>

				<Route path="school">
					<Route index element={<CreateSchool/>}/>
					<Route path="edit" element={<EditSchool/>}/>
					<Route path="assure" element={<AssureSchool/>}/>
				</Route>

			</Routes>
			
		</div>
	)
}

export default App