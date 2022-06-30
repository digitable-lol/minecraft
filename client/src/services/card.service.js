import axios from "axios";
import { API } from "../module/urlConsts";

export const getProductsWithFilters = async (pageNum, searchString, filter) => {
    const res = await axios.get(`${API.Product.Get}?PageNumber=${pageNum}&PageSize=6&searchstr=${searchString ?? ""}&quantity=${filter.quantity}&priceLow=${filter.priceLow}&priceHigh=${filter.priceHigh}&photoBill=${filter.photoBill}&minDate=${filter.minDate}&maxDate=${filter.maxDate}&userid=${filter.userId}`)
    return res.data
}

export const getProductsFromSearch = async (pageNum, searchString) => {
    const res = await axios.get(`${API.Product.Get}?PageNumber=${pageNum}&PageSize=6&searchstr=${searchString}`)
    return res.data
}

export const getAllProducts = async (pageNum) => {
    const res = await axios.get(`${API.Product.Get}?PageNumber=${pageNum}&PageSize=6`)
    return res.data
}

export const updateProduct = async (idProduct, data) => {
    const formData = new FormData()

    const arrKeys = Object.keys(data)

    arrKeys.forEach(key => {
        formData.append(`${key}`, data[key])
    });

    await axios.put(`${API.Product.Update}${idProduct}`,
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

    await axios.post(API.Product.Post, formData)
}

export const deleteProduct = async (idProduct) => {
    const res = await axios.delete(`${API.Product.DeleteOne}${idProduct}`)
    return res
}

export const deleteAllProduct = async () => {
    const res = await axios.delete(API.Product.DeleteAll)
    return res
}