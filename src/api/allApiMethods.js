import axios, { all } from 'axios'

const allApiMethods = axios.create({
    baseURL: "http://localhost:3500"
})

export const getAllStudents = async() => {
    const response = await allApiMethods.get("/students")
    return response.data
}

export const createNewStudent = async({student}) => {
    return await allApiMethods.post("/students", student)
}

export const updateStudent = async({student}) => {
    return await allApiMethods.patch("/students", student)
}

export const deleteStudent = async({_id}) => {
    return await allApiMethods.delete("/students", _id)
}

export const getSameSchoolAdmins = async({_id}) => {
    const response = await allApiMethods.post("/students/sameschooladmins", _id)
    return response.data
}

export default allApiMethods