import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { createUser } from '../../../services/user.service'
import './index.scss'

const NewUserModal = ({ setNewUserModal, getAndSetUserList }) => {

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()

    const newUser = () => {
        if(firstName && lastName){
            createUser(firstName, lastName)
                .then(() => {
                    getAndSetUserList()
                    setNewUserModal(false)
                })
        }
    }

    return (
        <div className='modal' onClick={()=>setNewUserModal(false)}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <div className='modal-body newUserModal'>
                    <Form.Label>Имя</Form.Label>
                    <Form.Control value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control value={lastName} onChange={(e) => {setLastName(e.target.value)}}/>
                    <Button onClick={newUser} className="button_add">Добавить</Button>
                </div>
            </div>
        </div>
    )
}
export default NewUserModal