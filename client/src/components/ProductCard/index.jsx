import axios from 'axios'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import "./index.scss"

const ProductCard = ({ data, getCards, isPost = false, setShow }) => {

    const { id, name, owner, date, price, comment, image } = data
    const [showButtons, setShowButtons] = useState(false)
    const [canEdit, setCanEdit] = useState(isPost)
    const [nameState, setNameState] = useState(name)
    const [ownerState, setOwnerState] = useState(owner)
    const [dateState, setDateState] = useState(date)
    const [priceState, setPriceState] = useState(price)
    const [commentState, setCommentState] = useState(comment)
    const updateProduct = (idProduct)=>{

        const data={
            id:id, 
            name:nameState,
            owner:ownerState,
            data:dateState,
            price:priceState,
            comment:commentState
        }
        axios.put(`https://localhost:5001/api/items/${idProduct}`,data,{headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          }}).then(()=> setCanEdit(false))
    }

    const postProduct = ()=>{

        const data={ 
            name:nameState,
            owner:ownerState,
            data:dateState,
            price:priceState,
            comment:commentState
        }
        axios.post(`https://localhost:5001/api/items/new`,data).then(()=>(setShow(false), getCards()))
    }

    const deleteProduct = (idProduct)=>{
        axios.delete(`https://localhost:5001/api/items/${idProduct}`).then(()=>getCards())
    }


    return (
        <div className='card'>
            <div className='card_info'>
                <div className='card_info_left'>
                    <h2>{canEdit ? <input type="text" value={nameState} onChange={(e) => setNameState(e.target.value)}/> : nameState}</h2>
                    <img src={image} className='card_info_left__image' alt={name} />
                </div>
                <div className='card_info_right'>
                    <p>Владелец: {canEdit ? <input type="text" value={ownerState} onChange={(e) => setOwnerState(e.target.value)}/> : ownerState}</p>
                    <p>Дата: {canEdit ? <input type="text" value={dateState} onChange={(e) => setDateState(e.target.value)}/> : dateState}</p>
                    <p>Стоимость: {canEdit ? <input type="text" value={priceState} onChange={(e) => setPriceState(e.target.value)}/> : priceState}</p>
                    <p>Комментарий: {canEdit ? <input type="text" value={commentState} onChange={(e) => setCommentState(e.target.value)}/> : commentState}</p>
                    {canEdit && <Button onClick={() => updateProduct(id)}>Сохранить</Button>}
                </div>
            </div>
            <div className='card_buttons'>
                <Button onClick={() => setShowButtons(!showButtons)}>...</Button>
                {!isPost && showButtons && <>
                    <Button onClick={() => setCanEdit(true)}>Изменить</Button>
                    <Button onClick={() => deleteProduct(id)}>Удалить</Button>
                </>
                }
                {isPost && <Button onClick={postProduct}>Добавить</Button>}
                <Button>QR код</Button>
            </div>
        </div>
    )
}

export default ProductCard