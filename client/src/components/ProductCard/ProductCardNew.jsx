import React, { useRef, useState } from 'react'
import { ImQrcode } from "react-icons/im";
import './index.scss'
import './dropdownbtn.scss'
import { Button, Carousel, Form } from 'react-bootstrap';
import { API_URL } from '../../module/urlConsts';
import moment from 'moment';
import DatePicker from 'react-datepicker'
import { deleteProduct, updateProduct } from '../../services/card.service';
import { downloadQR } from '../../services/qr.service';


moment.locale('ru')


function ProductCardNew({ data, getCards, isDeleting, usersList }) {

  const { id, name, userid, user, date, price, discription, photosrc, quantity, photoBillsrc } = data
  const [canEdit, setCanEdit] = useState(false)
  const [nameState, setNameState] = useState(name)
  const [useridState, setUseridState] = useState(userid ?? 1)
  const [dateState, setDateState] = useState(date)
  const [priceState, setPriceState] = useState(price)
  const [commentState, setCommentState] = useState(discription)
  const [quantityState, setQuantityState] = useState(quantity)
  const [fileState, setFileState] = useState()
  const [photoBillState, setPhotoBillState] = useState()
  const [descriptionShow, setDescriptionShow] = useState(false)

  const fileInput = useRef()
  const fileCheckInput = useRef()


  const update = () => {
    updateProduct(id, {
      name: nameState,
      date: dateState,
      price: priceState,
      discription: commentState ?? "",
      photo: fileState,
      photoBill: photoBillState,
      userid, useridState,
      quantity: quantityState
    })
      .then(() => {
        setCanEdit(false)
        getCards()
      })
  }

  const deleteCard = (idProduct) => {
    deleteProduct(idProduct)
      .then(() => getCards())
  }

  const fileChange = () => {
    setFileState(fileInput.current.files[0])
  }

  const fileCheckChange = () => {
    setPhotoBillState(fileCheckInput.current.files[0])
  }

  const toggleDescriptionShow = () => {
    setDescriptionShow(!descriptionShow)
    if (descriptionShow) {
      window.scrollTo(0, cardRef.current.offsetTop - 56)
    }
  }

  const cardRef = useRef()

  const descriptionStyle = {
    height: '100%'
  }


  return (
    <>
      <div className='di_card-wrapper' ref={cardRef}>
        <div className='di_card'>
          <div className='di_card-info'>
            <div className='di_card-info__left'>
              {canEdit && <>
                <label>Фото товара: </label>
                <input type="file" ref={fileInput} onChange={e => fileChange()} />
              </>}
              {canEdit && <>
                <label>Фото чека: </label>
                <input type="file" ref={fileCheckInput} onChange={e => fileCheckChange()} />
              </>}

              {!canEdit && <Carousel interval={null}>
                <Carousel.Item>
                  <img className='carousel_image' src={`${API_URL}/${photosrc}`} alt={name} />
                </Carousel.Item>
                {photoBillsrc && <Carousel.Item>
                  <img className='carousel_image' src={`${API_URL}/${photoBillsrc}`} alt={name} />
                </Carousel.Item>}
              </Carousel>}

            </div>
            <div className='di_card-info__right'>
              {isDeleting && <div className="card_delete">
                <Button onClick={() => deleteCard(id)}>Удалить</Button>
              </div>}
              <h1 title={nameState}>
                {
                  canEdit ?
                    <input
                      className="card_info_title"
                      type="text"
                      placeholder='Название'
                      value={nameState}
                      onChange={(e) => setNameState(e.target.value)}
                    /> : nameState
                }
              </h1>
              <h3>Владелец: {canEdit ?
                <Form.Select
                  onChange={e => { setUseridState(e.target.value) }}
                  className='form_select'
                >
                  {
                    usersList.map((item) => {
                      return <option value={item.id}>{item.firstname} {item.lastname}</option>
                    })
                  }
                </Form.Select> : `${user.firstname} ${user.lastname}`}
              </h3>
              <h4>Дата:&nbsp;
                {
                  canEdit ?
                    <DatePicker value={dateState} onChange={(e) => setDateState(moment(e).format('LL'))} />
                    :
                    moment(dateState).format('Do MMMM YYYY')
                }
              </h4>

              <h5>
                Цена:&nbsp;
                {canEdit ? <input type="text" value={priceState} onChange={(e) => setPriceState(e.target.value)} /> : priceState}
              </h5>

              <h5>
                Количество:&nbsp;
                {canEdit ? <input type="text" value={quantityState} onChange={(e) => setQuantityState(e.target.value)} /> : quantityState}
              </h5>

              <div className='description_wrap'>
                <span style={descriptionShow ? descriptionStyle : null} className='di_card-info__right-description' title={discription}>
                  {canEdit ? <textarea type="text" value={commentState} onChange={(e) => setCommentState(e.target.value)} /> : commentState}
                  {!canEdit && commentState?.length > 26 && descriptionShow &&
                    <button className='di_card-info__right-toggleDescription' onClick={toggleDescriptionShow}>...</button>
                  }
                </span>
                {!canEdit && commentState?.length > 26 && !descriptionShow &&
                  <button className='di_card-info__right-toggleDescription' onClick={toggleDescriptionShow}>...</button>
                }
              </div>
              {canEdit && <Button onClick={update}>Сохранить</Button>}
            </div>
          </div>
          <div className='di_card-footer'>
            <div className='di_card-footer__left'>
              <div className='di-dropdown'>
                <button className="di-dropbtn">. . .</button>
                <div className="di-dropdown-content">
                  {!canEdit && <a onClick={() => setCanEdit(true)}>Изменить</a>}
                  {canEdit && <a onClick={() => setCanEdit(false)}>Отменить</a>}
                  <a onClick={() => deleteCard(id)}>Удалить</a>
                </div>
              </div>
            </div>
            <div className='di_card-footer__right'>
              <Button type='btn-primary di-qr-code' onClick={() => downloadQR(id)}>
                <ImQrcode size={"30px"} top={"10px"} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCardNew