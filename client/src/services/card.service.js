import axios from "axios";
import { URL } from "../App"

export const updateProduct = async (idProduct, data) => {
    const formData = new FormData()

    const arrKeys = Object.keys(data)

    arrKeys.forEach(key => {
        formData.append(`${key}`, data[key])
    });

    await axios.put(`${URL}/api/things/update/${idProduct}`,
        formData,
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
        }
    )
}

export const postProduct = async (data) => {
    const formData = new FormData()

    const arrKeys = Object.keys(data)

    arrKeys.forEach(key => {
        formData.append(`${key}`, data[key])
    });

    await axios.post(`${URL}/api/things/new`, formData)
}