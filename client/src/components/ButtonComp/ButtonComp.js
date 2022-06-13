import React, { Component, useState } from 'react'
import { Button } from 'react-bootstrap'
import ModalComp from '../ModalComp/ModalComp'


export const ButtonComp = () => {
    const [show, setShow] = useState(false)
    return (
        <div>
            <Button onClick={()=>setShow(true)} type="primary">Добавить</Button>{' '}
            <Button type="primary">Удалить</Button>{' '}
            {show && <ModalComp setShow={setShow}/>}
            {console.log(show)}
        </div>
    )
}


