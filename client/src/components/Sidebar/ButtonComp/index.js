import React from 'react'
import { Button } from 'react-bootstrap'


export const ButtonComp = (props) => {

    return (
        <div style={{margin: "25px 0", display: "flex", justifyContent:"center"}}>
            <Button onClick={()=>{props.setShow(true); props.handleCloseFilter()}} style={{width: "40%", marginRight: '10px'}} type="primary">Добавить</Button>{' '}
            {!props.isDeleting && <>
            <Button onClick={()=>{props.setIsDeleting(true); props.handleCloseFilter()}} style={{width: "40%"}} type="primary">Удалить</Button>{' '}</>}
            {props.isDeleting && <>
            <Button onClick={()=>{props.setIsDeleting(false); props.handleCloseFilter()}} style={{width: "40%"}} type="primary">Отмена</Button>{' '}</>}
        </div>
    )
}


