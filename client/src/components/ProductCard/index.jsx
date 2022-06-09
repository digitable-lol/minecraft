import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import "./index.scss"

const ProductCard = ({ data }) => {

    const { id, name, owner, date, cost, comment, image } = data
    const [showButtons, setShowButtons] = useState(false)
    const [canEdit, setCanEdit] = useState(false)
    const [nameState, setNameState] = useState(name)
    const [ownerState, setOwnerState] = useState(owner)
    const [dateState, setDateState] = useState(date)
    const [costState, setCostState] = useState(cost)
    const [commentState, setCommentState] = useState(comment)
    const updateProduct = ()=>{
        let sendData = {
            id:id,
            name:nameState,
            owner:ownerState,
            cost:costState,
            date:dateState,
            comment:commentState
        }
        console.log(sendData)
        setCanEdit(false)
    }

    return (
        <div className='card'>
            <div className='card_info'>
                <div className='card_info_left'>
                    <h2>{canEdit ? <input type="text" value={nameState} onChange={(e) => setNameState(e.target.value)}/> : nameState}</h2>
                    <img src={image} className='card_info_left__image' alt="товар" />
                </div>
                <div className='card_info_right'>
                    <p>Владелец: {canEdit ? <input type="text" value={ownerState} onChange={(e) => setOwnerState(e.target.value)}/> : ownerState}</p>
                    <p>Дата: {canEdit ? <input type="text" value={dateState} onChange={(e) => setDateState(e.target.value)}/> : dateState}</p>
                    <p>Стоимость: {canEdit ? <input type="text" value={costState} onChange={(e) => setCostState(e.target.value)}/> : costState}</p>
                    <p>Комментарий: {canEdit ? <input type="text" value={commentState} onChange={(e) => setCommentState(e.target.value)}/> : commentState}</p>
                    {canEdit && <Button onClick={updateProduct}>Сохранить</Button>}
                </div>
            </div>
            <div className='card_buttons'>
                <Button onClick={() => setShowButtons(!showButtons)}>...</Button>
                {showButtons && <>
                    <Button onClick={() => setCanEdit(true)}>Изменить</Button>
                    <Button>Удалить</Button>
                </>
                }
                <Button>QR код</Button>
            </div>
        </div>
    )
}

export default ProductCard