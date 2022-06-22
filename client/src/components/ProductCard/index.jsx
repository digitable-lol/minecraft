import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import "./index.scss"

const ProductCard = ({ data, getCards, isPost = false, setShow, isDeleting}) => {

    const { id, name, userid, user, date, price, comment, photosrc, quantity, photoBillsrc } = data
    const [showButtons, setShowButtons] = useState(false)
    const [canEdit, setCanEdit] = useState(isPost)
    const [nameState, setNameState] = useState(name)
    const [useridState, setUseridState] = useState(userid)
    const [dateState, setDateState] = useState(date)
    const [priceState, setPriceState] = useState(price)
    const [commentState, setCommentState] = useState(comment)
    const [quantityState, setQuantityState] = useState(quantity)
    const [fileState, setFileState] = useState()
    const [photoBillSrcState, setPhotoBillSrcState] = useState()
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
        formData.append("photoBillsrc", photoBillSrcState)
        formData.append("userid", 1)
        formData.append("quantity", quantityState)
        formData.append("userid", useridState)
        formData.append("photosrc", photosrc)

        console.log(useridState);
        // &${nameState}&userid=${useridState}&date=${dateState}&price=${priceState}&disc=${commentState}&quantity=${quantityState}`
        axios.put(`https://localhost:5001/api/things/${idProduct}`,
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
        formData.append("photoBillsrc", photoBillSrcState)
        formData.append("quantity", quantityState)
        formData.append("userid", useridState)

        axios.post(`https://localhost:5001/api/things/new`, formData)
                    .then(()=>(setShow(false), getCards()))
    }

    // ?name=${nameState}&userFN=${firstNameState}&userLN=${lastNameState}&date=${dateState}&price=${priceState}&disc=${commentState}&quantity=${quantityState}

    useEffect(() => {
        axios.get('https://localhost:5001/api/users').then((res)=> {setUsersList(res.data)})
      }, [])


    const deleteProduct = (idProduct)=>{
        axios.delete(`https://localhost:5001/api/things/${idProduct}`).then(()=>getCards())
    }


    const fileChange = () =>{
        formData.append("photo", fileInput.current.files[0])
        setFileState(formData.get("photo"))
    }

    const fileCheckChange = () =>{
        formData.append("photoBillsrc", fileCheckInput.current.files[0])
        setPhotoBillSrcState(formData.get("photoBillsrc"))
    }


    return (
        <div className='card'>
            {isDeleting && <div className="card_delete">
                        <Button onClick={() => deleteProduct(id)}>Удалить</Button>
                    </div>}
            <div className='card_info'>
                <div className='card_info_left'>
                    <h2>{canEdit ? <input className="card_info_title" type="text" value={nameState} onChange={(e) => setNameState(e.target.value)}/> : nameState}</h2>
                    {canEdit && <>
                        <label>Фото товара: </label>
                        <input type="file" ref={fileInput} onChange={e => fileChange()} />
                    </>}
                    {canEdit &&<>
                        <label>Фото чека: </label>
                        <input type="file" ref={fileCheckInput} onChange={e => fileCheckChange()} />
                    </>}
                    <img src={`https://localhost:5001/${photosrc}`} className='card_info_left__image' alt={name} />
                    {photoBillsrc && <img src={photoBillsrc} className='card_info_left__image' alt={name} />}
                </div>
                <div className='card_info_right'>
                    {/* <p>Владелец: {canEdit ? <input type="text" value={ownerState} onChange={(e) => setOwnerState(e.target.value)}/> : ownerState}</p> */}
                    {/* <p>ID владельца: {canEdit ? <input type="text" value={useridState} onChange={(e) => setUseridState(e.target.value)}/> : dateState}</p> */}
                    <p>Имя владельца: {canEdit ?
                     <Form.Select 
                        onChange={e => {setUseridState(e.target.value)}}
                        style={{marginTop: "25px"}}
                      >
                        {
                            usersList.map((item) => {
                                return <option value={item.id}>{item.firstname} {item.lastname}</option> 
                            })
                        }
                    </Form.Select> : `${user.firstname} ${user.lastname}`}</p>
                    <p>Дата: {canEdit ? <input type="text" value={dateState} onChange={(e) => setDateState(e.target.value)}/> : dateState}</p>
                    <p>Стоимость: {canEdit ? <input type="text" value={priceState} onChange={(e) => setPriceState(e.target.value)}/> : priceState}</p>
                    <p>Количество: {canEdit ? <input type="text" value={quantityState} onChange={(e) => setQuantityState(e.target.value)}/> : quantityState}</p>
                    <p>Комментарий: {canEdit ? <input type="text" value={commentState} onChange={(e) => setCommentState(e.target.value)}/> : commentState}</p>
                    {canEdit && !isPost && <Button onClick={() => updateProduct(id)}>Сохранить</Button>}
                </div>
            </div>
            <div className='card_buttons'>
                {!isPost && !isDeleting && <Button onClick={() => setShowButtons(!showButtons)}>...</Button>}
                {!isPost && showButtons && <>
                    <Button onClick={() => setCanEdit(true)}>Изменить</Button>
                    <Button onClick={() => deleteProduct(id)}>Удалить</Button>
                </>
                }
                {isPost && <Button onClick={postProduct}>Добавить</Button>}
                {!isPost && !isDeleting && <Button>QR код</Button>}
            </div>
        </div>
    )
}

export default ProductCard