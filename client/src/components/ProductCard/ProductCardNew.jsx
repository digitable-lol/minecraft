import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineQrcode } from 'react-icons/fa';
import { ImQrcode } from "react-icons/im";
import './index-new.scss'
import './dropdownbtn.css'
import { Button, Carousel, Form } from 'react-bootstrap';
import { URL as LOCAL_URL } from '../../App.js';
import moment from 'moment';
import QRModal from '../Modals/QRModal/QRModal'
import DatePicker from 'react-datepicker'


moment.locale('ru')


function ProductCardNew({ data, getCards, isPost = false, setShow, isDeleting, usersList }) {

  const { id, name, userid, user, date, price, discription, photosrc, quantity, photoBillsrc } = data
  const [canEdit, setCanEdit] = useState(isPost)
  const [nameState, setNameState] = useState(name)
  const [useridState, setUseridState] = useState(userid ?? 1)
  const [dateState, setDateState] = useState(date)
  const [priceState, setPriceState] = useState(price)
  const [commentState, setCommentState] = useState(discription)
  const [quantityState, setQuantityState] = useState(quantity)
  const [fileState, setFileState] = useState()
  const [photoBillState, setPhotoBillState] = useState()
  const [descriptionShow, setDescriptionShow] = useState(false)

  const [QRShow, setQRShow] = useState(false)

  var fileDownload = require('js-file-download');

  const fileInput = useRef()
  const fileCheckInput = useRef()


  const updateProduct = (idProduct) => {
    const formData = new FormData()

    formData.append("name", nameState)
    formData.append("date", dateState)
    formData.append("price", priceState)
    formData.append("discription", commentState ?? '')
    console.log(commentState);
    formData.append("photo", fileState)
    formData.append("photoBill", photoBillState)
    formData.append("userid", useridState)
    formData.append("quantity", quantityState)

    axios.put(`${URL}/api/things/update/${idProduct}`,
      formData,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      }
    ).then(() => setCanEdit(false))
  }

  const postProduct = () => {
    const formData = new FormData()

    formData.append("name", nameState)
    formData.append("date", dateState)
    formData.append("price", priceState)
    formData.append("disc", commentState)
    formData.append("photo", fileState)
    formData.append("photoBill", photoBillState)
    formData.append("quantity", quantityState)
    formData.append("userid", useridState)

    axios.post(`${LOCAL_URL}/api/things/new`, formData)
      .then(() => (setShow(false), getCards()))
  }


  const deleteProduct = (idProduct) => {
    axios.delete(`${LOCAL_URL}/api/things/delete/${idProduct}`).then(() => getCards())
  }


  const fileChange = () => {
    // formData.append("photo", fileInput.current.files[0])
    setFileState(fileInput.current.files[0])
  }

  const fileCheckChange = () => {
    setPhotoBillState(fileCheckInput.current.files[0])

  }

  const cardRef = useRef()

  const toggleDescriptionShow = () => {
    setDescriptionShow(!descriptionShow)
    if (descriptionShow) {
      window.scrollTo(0, cardRef.current.offsetTop - 56)
    }
  }

  const descriptionStyle = {
    height: '100%'
  }

  const deleteQRAndCloseModal = () => {
    axios.delete(`${LOCAL_URL}/api/things/DeleteQR`)
      .then(() => setQRShow(false))
  }

  const showQRModal = () => {
    setQRShow(true)
  }


  const [QRUrl, setQRUrl] = useState()

  const downloadQRRef = useRef()

  const downloadQR = () => {
    // axios.get(`${LOCAL_URL}/api/things/getQr/${id}`).then((res) => {
    //   const blob = awa
    // })

    axios.get(`${LOCAL_URL}/api/things/getQr/${id}`, { responseType: 'arraybuffer' }).then((res)=> {
      console.log(res)
      fileDownload(res.data, `${new Date}.png`)
      axios.delete(`${LOCAL_URL}/api/things/DeleteQR`)
    })
  }
  // const downloadQR = () => {
  //   axios.get(`${URL}/api/things/getQr/${id}`).then((res) =>{
  //     if(res){
  //         setQRUrl(res.data)
  //         downloadQRRef.current.click()          
  //     }
  //   })
  // }

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
                  <img style={{ maxHeight: "300px", objectFit: "contain" }} src={`${LOCAL_URL}/${photosrc}`} alt={name} />
                </Carousel.Item>
                { photoBillsrc && <Carousel.Item>
                  <img style={{ maxHeight: "300px", objectFit: "contain" }} src={`${LOCAL_URL}/${photoBillsrc}`} alt={name} /> 
                </Carousel.Item> }
              </Carousel>}

            </div>
            <div className='di_card-info__right'>
              {isDeleting && <div className="card_delete">
                  <Button onClick={() => deleteProduct(id)}>Удалить</Button>
              </div>}
              <h1>
                {canEdit ? <input className="card_info_title" type="text" placeholder='Название' value={nameState} onChange={(e) => setNameState(e.target.value)}/> : nameState}
              </h1>
              <h3>Владелец: {canEdit ? 
                <Form.Select
                  onChange={e => { setUseridState(e.target.value) }}
                  style={{ marginTop: "10px" }}
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
                <DatePicker value={dateState} onChange={(e)=> setDateState(moment(e).format('LL'))}/>
                  : 
                  moment(dateState).format('Do MMMM YYYY')
                }
              </h4>

              <h5>
                Цена:&nbsp;
                {canEdit ? <input type="text" value={priceState} onChange={(e) => setPriceState(e.target.value)}/> : priceState}
              </h5>

              <h5>
                Количество:&nbsp;
                {canEdit ? <input type="text" value={quantityState} onChange={(e) => setQuantityState(e.target.value)}/> : quantityState}
              </h5>

              <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <span style={descriptionShow ? descriptionStyle : null} className='di_card-info__right-description' title={discription}>
                  {canEdit ? <textarea type="text" value={commentState} onChange={(e) => setCommentState(e.target.value)}/> : commentState}
                  {!canEdit && commentState && descriptionShow && <button className='di_card-info__right-toggleDescription' onClick={toggleDescriptionShow}>...</button>}
                </span>
                {!canEdit && commentState && !descriptionShow && <button className='di_card-info__right-toggleDescription' onClick={toggleDescriptionShow}>...</button>}
              </div>
              {canEdit && !isPost && <Button onClick={() => updateProduct(id)}>Сохранить</Button>}
            </div>
          </div>
          <div className='di_card-footer'>
            <div className='di_card-footer__left'>
              <div className='di-dropdown'>
                <button className="di-dropbtn">. . .</button>
                <div className="di-dropdown-content">
                  {!isPost && <>
                      <a style={{cursor: "pointer"}} onClick={() => setCanEdit(true)}>Изменить</a>
                      <a style={{cursor: "pointer"}} onClick={() => deleteProduct(id)}>Удалить</a>
                  </>
                  }
                  {isPost && <a style={{cursor: "pointer"}}  onClick={postProduct}>Добавить</a>}
                </div>
              </div>
            </div>
            <div className='di_card-footer__right'>
              <Button type='btn-primary di-qr-code' onClick={downloadQR}>
                <ImQrcode size={"30px"} top={"10px"}/>
              </Button>
              {/* <a href={`${URL}/${QRUrl}`} download ref={downloadQRRef}>Скачать QR Code</a> */}
            </div>
          </div>
        </div>
      </div>
      {QRShow && <QRModal deleteQRAndCloseModal={deleteQRAndCloseModal} id={id}/>}
    </>
  )
}

export default ProductCardNew