import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { deleteUser } from '../../../services/user.service'
import './index.scss'

const DeleteUserModal = ({ setDeleteUserModal, usersList, getAndSetUserList }) => {

    const [selectedUser, setSelectedUser] = useState()

    const deleteSelectedUser = () => {
        deleteUser(selectedUser).then(() => {
            setDeleteUserModal(false) 
            getAndSetUserList()
        })
    }

    return (
        <div className='modal' onClick={()=>setDeleteUserModal(false)}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <div className='modal-body newUserModal'>
                    <h2>Выберите пользователя:</h2>
                    <Form.Select onChange={e => setSelectedUser(e.target.value)} style={{margin: "25px 0"}}>
                        <option value={''}>Выберите пользователя</option> 
                        {
                            usersList.map((item) => {
                                return <option value={item.id}>{item.firstname} {item.lastname}</option> 
                            })
                        }
                    </Form.Select>
                    <Button variant='danger' onClick={deleteSelectedUser} style={{marginRight: "15px"}}>Удалить</Button>
                    <Button onClick={()=>setDeleteUserModal(false)}>Отмена</Button>
                </div>
            </div>
        </div>
    )
}
export default DeleteUserModal