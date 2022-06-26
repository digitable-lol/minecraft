import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { URL } from '../../../App'
import './index.scss'

const NewUserModal = ({ setShowNewUserModal }) => {

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()

    const newUser = () => {
        console.log('firstName',firstName)
        if(firstName || lastName){
            axios.post(`${URL}/api/users/new?Firstname=${firstName}&Lastname=${lastName}`, {
                Firstname: firstName,
                Lastname: lastName 
            }).then(() => setShowNewUserModal(false))
        }
    }

    return (
        <div className='modal' onClick={()=>setShowNewUserModal(false)}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <div className='modal-body newUserModal'>
                    <Form.Label>Имя</Form.Label>
                    <Form.Control value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control value={lastName} onChange={(e) => {setLastName(e.target.value)}}/>
                    <Button onClick={newUser} style={{marginTop: "10px"}}>Добавить</Button>
                </div>
            </div>
        </div>
    )
}
export default NewUserModal