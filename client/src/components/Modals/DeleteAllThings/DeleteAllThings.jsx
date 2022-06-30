import React from 'react'
import { Button } from 'react-bootstrap'
import { deleteAllProduct } from '../../../services/card.service'
import './index.scss'

const DeleteAllThings = ({ closeModalDeleteAllThings }) => {

    const deleteAll = () => {
        deleteAllProduct()
            .then(closeModalDeleteAllThings)
    }

    return (
        <div className='modal' onClick={closeModalDeleteAllThings}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <div className='modal-body newUserModal'>
                    <h2>Вы действительно желаете удалить все предметы из базы?</h2>
                    <Button onClick={deleteAll} variant="danger">ДА</Button>
                    <Button onClick={closeModalDeleteAllThings}>Нет</Button>
                </div>
            </div>
        </div>
    )
}
export default DeleteAllThings