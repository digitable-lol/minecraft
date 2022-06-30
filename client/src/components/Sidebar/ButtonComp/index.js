import React from 'react'
import { Button } from 'react-bootstrap'
import './ButtonComp.scss'


export const ButtonComp = (props) => {

    return (
        <div className='buttonComp'>
            <Button onClick={()=>{props.setShow(true); props.handleCloseFilter()}} className='buttonComp_item-first' type="primary">Добавить</Button>{' '}
            {!props.isDeleting && <>
                <Button onClick={()=>{props.setIsDeleting(true); props.handleCloseFilter()}} className='buttonComp_item' type="primary">Удалить</Button>{' '}
            </>}
            {props.isDeleting && <>
                <Button onClick={()=>{props.setIsDeleting(false); props.handleCloseFilter()}} className='buttonComp_item' type="primary">Отмена</Button>{' '}
            </>}
        </div>
    )
}


