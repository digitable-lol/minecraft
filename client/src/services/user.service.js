import axios from "axios"
import { URL } from "../App"

export const getUsers = async () => {
    const res = await axios.get(`${URL}/api/users`)
    return res
}

export const createUser = async (firstName, lastName) => {
    await axios.post(`${URL}/api/users/new?Firstname=${firstName}&Lastname=${lastName}`, {
        Firstname: firstName,
        Lastname: lastName 
    })
}

export const deleteUser = async (userId) => {
    await axios.delete(`${URL}/api/users/delete/${userId}`)
}