import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import "./index.scss"
import 'moment/locale/ru'
import DatePicker from 'react-datepicker'
import { postProduct } from '../../../../services/card.service'

moment.locale('ru')


const PostProcuctCard = ({ getCards, setShow, usersList }) => {

    const [nameState, setNameState] = useState('')
    const [useridState, setUseridState] = useState(1)
    const [dateState, setDateState] = useState('')
    const [priceState, setPriceState] = useState('')
    const [commentState, setCommentState] = useState('')
    const [quantityState, setQuantityState] = useState('')
    const [fileState, setFileState] = useState()
    const [photoBillState, setPhotoBillState] = useState()


    const fileInput = useRef()
    const fileCheckInput = useRef()


    const post = () => {
        postProduct({
            name: nameState,
            date: dateState,
            price: priceState,
            discription: commentState,
            photo: fileState,
            photoBill: photoBillState,
            quantity: quantityState,
            userid: useridState
        })
            .then(() => {
                setShow(false)
                getCards()
            })
    }


    const fileChange = () => {
        setFileState(fileInput.current.files[0])
    }

    const fileCheckChange = () => {
        setPhotoBillState(fileCheckInput.current.files[0])
    }

    return (
        <div className='card'>
            <div className='card_info'>
                <div className='card_info_left'>
                    <h2>
                        Название:
                        <input className="card_info_title" type="text" value={nameState} onChange={(e) => setNameState(e.target.value)} />
                    </h2>

                    <label>Фото товара: </label>
                    <input type="file" ref={fileInput} onChange={e => fileChange()} />

                    <label>Фото чека: </label>
                    <input type="file" ref={fileCheckInput} onChange={e => fileCheckChange()} />
                </div>
                <div className='card_info_right'>

                    <p>
                        Владелец:
                        <Form.Select
                            onChange={e => { setUseridState(e.target.value) }}
                            className="form_select"
                        >
                            {
                                usersList.map((item) => {
                                    return <option value={item.id}>{item.firstname} {item.lastname}</option>
                                })
                            }
                        </Form.Select>
                    </p>

                    <p>
                        Дата:
                        <DatePicker value={dateState} onChange={(e) => setDateState(moment(e).format('LL'))} />
                    </p>

                    <p>
                        Стоимость:
                        <input type="text" value={priceState} onChange={(e) => setPriceState(e.target.value)} />
                    </p>
                    <p>
                        Количество:
                        <input type="text" value={quantityState} onChange={(e) => setQuantityState(e.target.value)} />
                    </p>
                    <p>
                        Комментарий:
                        <input type="text" value={commentState} onChange={(e) => setCommentState(e.target.value)} />
                    </p>
                </div>
            </div>
            <div className='card_buttons'>
                <Button onClick={post}>Добавить</Button>
            </div>
        </div>
    )
}

export default PostProcuctCard