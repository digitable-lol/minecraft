import React, { Component, useState } from 'react'
import { Button } from 'react-bootstrap'
import ModalComp from '../ModalComp/ModalComp'


export const ButtonComp = (props) => {
    return (
        <div>
            <Button onClick={()=>props.setShow(true)} type="primary">Добавить</Button>{' '}
            {!props.isDeleting && <>
            <Button onClick={()=>props.setIsDeleting(true)} type="primary">Удалить</Button>{' '}</>}
            {props.isDeleting && <>
            <Button onClick={()=>props.setIsDeleting(false)} type="primary">Отмена</Button>{' '}</>}
        </div>
    )
}


