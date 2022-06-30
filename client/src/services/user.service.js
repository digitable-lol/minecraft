import axios from "axios"
import { API } from "../module/urlConsts"

export const getUsers = async () => {
    const res = await axios.get(API.User.Get)
    return res
}

export const updateUser = async (id, firstName, lastName) => {
    const formData = new FormData()

    formData.append('Firstname', firstName)
    formData.append('Lastname', lastName)
    formData.append('id', id)
    
    const res = await axios.put(`${API.User.Change}${Number(id)}`, formData, 
    {   
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        } 
    })
    return res
}

export const createUser = async (firstName, lastName) => {
    await axios.post(`${API.User.Create}?Firstname=${firstName}&Lastname=${lastName}`, {
        Firstname: firstName,
        Lastname: lastName 
    })
}

export const deleteUser = async (userId) => {
    await axios.delete(`${API.User.Delete}${userId}`)
}