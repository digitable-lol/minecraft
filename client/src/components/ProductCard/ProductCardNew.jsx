import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import './index-new.scss'

export default function ProductCardNew({ data, getCards, isPost = false, setShow, isDeleting}) {

    const { id, name, userid, user, date, price, comment, photosrc, quantity, photoBillsrc } = data
    const [showButtons, setShowButtons] = useState(false)
    const [canEdit, setCanEdit] = useState(isPost)
    const [nameState, setNameState] = useState(name)
    const [useridState, setUseridState] = useState(userid ?? 1)
    const [dateState, setDateState] = useState(date)
    const [priceState, setPriceState] = useState(price)
    const [commentState, setCommentState] = useState(comment)
    const [quantityState, setQuantityState] = useState(quantity)
    const [fileState, setFileState] = useState()
    const [photoBillState, setPhotoBillState] = useState()
    const [usersList, setUsersList] = useState([])

    const formData = new FormData()

    const fileInput = useRef()
    const fileCheckInput = useRef()


    const updateProduct = (idProduct) => {

        formData.append("name", nameState)
        formData.append("date", dateState)
        formData.append("price", priceState)
        formData.append("disc", commentState)
        formData.append("photo", fileState)
        formData.append("photoBill", photoBillState)
        formData.append("userid", useridState)
        formData.append("quantity", quantityState)
        formData.append("userid", useridState)
        formData.append("photosrc", photosrc)

        axios.put(`${URL}/api/things/${idProduct}`,
            data,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                }}
        ).then(()=> setCanEdit(false))
    }

    const postProduct = () => {
        formData.append("name", nameState)
        formData.append("date", dateState)
        formData.append("price", priceState)
        formData.append("disc", commentState)
        formData.append("photo", fileState)
        formData.append("photoBill", photoBillState)
        formData.append("quantity", quantityState)
        formData.append("userid", useridState)

        axios.post(`${URL}/api/things/new`, formData)
                    .then(()=>(setShow(false), getCards()))
    }


    useEffect(() => {
        axios.get(`${URL}/api/users`).then((res)=> {setUsersList(res.data)})
      }, [])


    const deleteProduct = (idProduct)=>{
        axios.delete(`${URL}/api/things/${idProduct}`).then(()=>getCards())
    }


    const fileChange = () =>{
        formData.append("photo", fileInput.current.files[0])
        setFileState(formData.get("photo"))
    }

    const fileCheckChange = () =>{
        formData.append("photoBillsrc", fileCheckInput.current.files[0])
        setPhotoBillState(formData.get("photoBillsrc"))
    }


  return (
    <div class="card-new">
    <div class="photo">
      <img src="https://s-media-cache-ak0.pinimg.com/236x/3b/36/ca/3b36ca3afe0fa0fd4984b9eee2e154bb.jpg" />
    </div>
    <div class="description">
      <h2>Classic Peace Lily</h2>
      <h4>Popular House Plant</h4>
      <h1>$18</h1>
      <p>Classic Peace Lily is a spathiphyllum floor plant arranged in a bamboo planter with a blue & red ribbom and butterfly pick.</p>
      <button>Add to Cart</button>
      <button>Wishlist</button>
    </div>
    <nav>
    </nav>
  </div>
  )
}
