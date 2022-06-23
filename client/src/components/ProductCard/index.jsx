import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { URL } from '../../App'
import "./index.scss"
import 'moment/locale/ru' 

moment.locale('ru')


const ProductCard = ({ data, getCards, isPost = false, setShow, isDeleting, usersList}) => {

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

    const formData = new FormData()

    const fileInput = useRef()
    const fileCheckInput = useRef()


    const updateProduct = (idProduct) => {

        formData.append("name", nameState)
        formData.append("date", dateState)
        formData.append("price", priceState)
        formData.append("disc", commentState)
        fileState && formData.append("photo", fileState)
        photoBillState && formData.append("photoBill", photoBillState)
        formData.append("userid", useridState)
        formData.append("quantity", quantityState)
        photoBillsrc && formData.append("photosrc", photoBillsrc)

        axios.put(`${URL}/api/things/${idProduct}`,
            data
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
                    <img src={`${URL}/${photosrc}`} className='card_info_left__image' alt={name} />
                    {!(photoBillsrc === "undefined") && photoBillsrc ? <img src={`${URL}/${photoBillsrc}`} className='card_info_left__image' alt={name} /> : null}
                </div>
                <div className='card_info_right'>
                    <p>Владелец: {canEdit ?
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
                    <p>Дата: {canEdit ? <input type="text" value={dateState} onChange={(e) => setDateState(e.target.value)}/> : moment().subtract(dateState, 'days').calendar()}</p>
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