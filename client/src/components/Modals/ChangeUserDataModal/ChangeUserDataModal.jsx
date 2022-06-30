import React from 'react'
import { useState } from 'react'
import { Button, Form, FormLabel } from 'react-bootstrap'
import { updateUser } from '../../../services/user.service'
import './index.scss'

const ChangeUserDataModal = ({ closeChangeUserData, usersList, getAndSetUserList }) => {

    const [selectedUser, setSelectedUser] = useState("")
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()

    const updateUserData = () => {
        updateUser(selectedUser, firstName, lastName)
            .then(() => {
                closeChangeUserData()
                getAndSetUserList()
            })
    }


    return (
        <div className='modal' onClick={closeChangeUserData}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <div className='modal-body newUserModal'>
                    <Form.Select onChange={(e) => setSelectedUser(e.target.value)} className='form_item'>
                        <option value={''}>Выберите пользователя:</option>
                        {
                            usersList.map((item) => {
                                return <option value={item.id}>{item.firstname} {item.lastname}</option>
                            })
                        }
                    </Form.Select>
                    {selectedUser && <> 
                        <FormLabel>Имя</FormLabel>
                        <Form.Control value={firstName} onChange={(e) => { setFirstName(e.target.value) }} className='form_item' />
                        <FormLabel>Фамилия</FormLabel>
                        <Form.Control value={lastName} onChange={(e) => { setLastName(e.target.value) }} className='form_item'/>
                    </>}
                    <Button onClick={updateUserData} variant="danger">Изменить</Button>
                    <Button onClick={closeChangeUserData}>Отмена</Button>
                </div>
            </div>
        </div>
    )
}
export default ChangeUserDataModal