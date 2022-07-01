import { useRef, useState } from "react";
import { Button, Form, FormLabel, Offcanvas } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker'
import { ButtonComp } from "./ButtonComp";
import InputRange from "react-input-range";
import 'react-input-range/lib/css/index.css';
import NewUserModal from "../Modals/NewUserModal";
import DeleteAllThings from "../Modals/DeleteAllThings/DeleteAllThings";
import DeleteUserModal from "../Modals/DeleteUserModal";
import ChangeUserDataModal from "../Modals/ChangeUserDataModal/ChangeUserDataModal";

import './SideBar.scss'

export default function Sidebar({
    setShow,
    isDeleting,
    setIsDeleting,
    showFilter,
    handleShowFilter,
    handleCloseFilter,
    filter,
    setFilter,
    usersList,
    getCards,
    getAndSetUserList
}) {

    const [minmax, setMinmax] = useState({ min: 0, max: 1000000 })

    const [newUserModal, setNewUserModal] = useState(false)

    const [deleteAllModal, setDeleteAllModal] = useState(false)

    const [deleteUserModal, setDeleteUserModal] = useState(false)

    const [changeUserDataModal, setChangeUserDataModal] = useState(false)

    const getCardsWithFilters = () => {
        setFilter({ ...filter, isFiltered: true })
        handleCloseFilter()
    }


    const setPriceRange = (value) => {
        setMinmax(value)
        setFilter({ ...filter, priceLow: value.min, priceHigh: value.max, isFiltered: false })
    }

    const newUser = () => {
        handleCloseFilter()
        setNewUserModal(true)
    }

    const openModalUserDelete = () => {
        handleCloseFilter()
        setDeleteUserModal(true)
    }

    const openModalDeleteAllThings = () => {
        handleCloseFilter()
        setDeleteAllModal(true)
    }

    const closeModalDeleteAllThings = () => {
        setDeleteAllModal(false)
    }

    const openChangeUserData = () => {
        handleCloseFilter()
        setChangeUserDataModal(true)
    }

    const closeChangeUserData = () => {
        setChangeUserDataModal(false)
    }

    const clearFilterRef = useRef(null)

    const clearFilter = () => {
        setFilter({
            isFiltered: false,
        })
        getCards()
        handleCloseFilter()
        setTimeout(() => clearFilterRef.current.click(), 200)
    }

    return (
        <>
            <Offcanvas show={showFilter} onHide={handleCloseFilter} className='offCanvas'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Меню</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <FormLabel>Количество: </FormLabel>
                    <Form.Control value={filter.quantity} onChange={(e) => { setFilter({ ...filter, quantity: e.target.value, isFiltered: false }) }} />

                    <FormLabel>Фото чека: </FormLabel>
                    <Form.Select onChange={(e) => { setFilter({ ...filter, photoBill: e.target.value, isFiltered: false }) }}>
                        <option value={''}>Не важно</option>
                        <option value={true}>Есть</option>
                    </Form.Select>

                    <div className="sidebar_range">
                        <InputRange
                            className="sidebar_range"
                            minValue={1}
                            maxValue={1000000}
                            step={10}
                            onChange={(value) => setPriceRange(value)}
                            value={minmax}
                        />
                    </div>


                    <FormLabel>Дата от: {new Date(filter.minDate).toLocaleString}</FormLabel>
                    <DatePicker value={filter.minDate} onChange={(e) => setFilter({ ...filter, minDate: e.toDateString(), isFiltered: false })} />

                    <FormLabel>Дата до: {new Date(filter.maxDate).toLocaleString}</FormLabel>
                    <DatePicker locale="ru" value={filter.maxDate} onChange={(e) => setFilter({ ...filter, maxDate: e.toDateString(), isFiltered: false })} />
                    <Form.Select onChange={e => { setFilter({ ...filter, userId: e.target.value, isFiltered: false }) }} className='sidebar_form-select'>
                        <option value={''}>Выберите пользователя:</option>
                        {
                            usersList.map((item) => {
                                return <option value={item.id}>{item.firstname} {item.lastname}</option>
                            })
                        }
                    </Form.Select>

                    <ButtonComp setShow={setShow} isDeleting={isDeleting} setIsDeleting={setIsDeleting} handleShowFilter={handleShowFilter} handleCloseFilter={handleCloseFilter} />
                    <div className="sidebar_buttons">
                        <Button onClick={newUser} className='sidebar_button'>Добавить нового пользователя</Button>
                        <Button onClick={openChangeUserData} className='sidebar_button'>Изменить имя пользователя</Button>
                        <Button onClick={openModalUserDelete} className='sidebar_button' variant="danger">Удалить пользователя</Button>
                        <Button onClick={openModalDeleteAllThings} className='sidebar_button' variant="danger">Удалить всё</Button>
                        <Button onClick={getCardsWithFilters} className='sidebar_button' variant="success">Применить</Button>
                        <Button onClick={clearFilter} ref={clearFilterRef} className='sidebar_button'>Сбросить фильтры</Button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
            {changeUserDataModal && <ChangeUserDataModal getAndSetUserList={getAndSetUserList} closeChangeUserData={closeChangeUserData} usersList={usersList}/>}
            {deleteUserModal && <DeleteUserModal setDeleteUserModal={setDeleteUserModal} getAndSetUserList={getAndSetUserList} usersList={usersList} />}
            {newUserModal && <NewUserModal setNewUserModal={setNewUserModal} getAndSetUserList={getAndSetUserList} />}
            {deleteAllModal && <DeleteAllThings closeModalDeleteAllThings={closeModalDeleteAllThings} />}
        </>
    );
}
