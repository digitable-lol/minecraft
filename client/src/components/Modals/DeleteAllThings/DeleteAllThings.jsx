import axios from 'axios'
import React from 'react'
import { Button } from 'react-bootstrap'
import { URL } from '../../../App'
import './index.scss'

const DeleteAllThings = ({ closeModalDeleteAllThings }) => {

    const deleteAll = () => {
        axios.delete(`${URL}/api/things/delete`).then(closeModalDeleteAllThings)
    }
  

    return (
        <div className='modal' onClick={closeModalDeleteAllThings}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <div className='modal-body newUserModal'>
                    <h2 style={{marginBottom: '25px'}}>Вы действительно желаете удалить все предметы из базы?</h2>
                    <Button onClick={deleteAll} variant="danger" style={{minWidth: '150px', marginRight: '10px'}}>ДА</Button>
                    <Button onClick={closeModalDeleteAllThings} style={{minWidth: '150px'}}>Нет</Button>
                </div>
            </div>
        </div>
    )
}
export default DeleteAllThings