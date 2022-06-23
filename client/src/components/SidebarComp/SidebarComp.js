import {useEffect, useState} from "react";
import { Button, Form, FormLabel, Offcanvas, Input } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker'
import { ButtonComp } from "../ButtonComp/ButtonComp";
import axios from "axios";
import InputRange from "react-input-range";
import 'react-input-range/lib/css/index.css';
import NewUserModal from "../NewUserModal";
import { URL } from "../../App";


export default function NavbarComp({
    setShow, 
    isDeleting, 
    setIsDeleting, 
    showFilter,
    handleShowFilter, 
    handleCloseFilter, 
    filter, 
    setFilter,
    usersList
}) {

    const [minmax, setMinmax] = useState({min: 0, max: 1000000})

    const [newShowUserModal, setShowNewUserModal] = useState(false)

    const getCardsWithFilters = () => {
        setFilter({...filter, isFiltered: true})
        handleCloseFilter()
    }

    
    const setPriceRange = (value) => {
        console.log(value)
        setMinmax(value)
        setFilter({...filter, priceLow: value.min, priceHigh: value.max, isFiltered: false})
    }

    const newUser = () => {
        handleCloseFilter()
        setShowNewUserModal(true)
    }

    const deleteAll = () => {
      axios.delete(`${URL}/api/things/delete`).then(handleCloseFilter)
    }


    let selectedUser = usersList.find(item => item.id === filter.userId)


    return (
        <>
            <Offcanvas show={showFilter} onHide={handleCloseFilter}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Меню</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <FormLabel>Количество: </FormLabel>
                    <Form.Control value={filter.quantity} onChange={(e) => {setFilter({...filter, quantity: e.target.value, isFiltered: false})}}/>
                    
                    <FormLabel>Фото чека: </FormLabel>
                    {/* <Form.Check value={filter.quantity} onChange={(e) => {setFilter({...filter, photoBill: e.target.checked, isFiltered: false})}}/> */}
                    <Form.Select onChange={(e) => {setFilter({...filter, photoBill: e.target.value, isFiltered: false})}}>
                        <option value={''}>Не важно</option>
                        <option value={true}>Есть</option>
                        <option value={false}>Нет</option>
                    </Form.Select>
                    
                    <div style={{margin: "25px 0"}}>
                        <InputRange
                            style={{margin: "25px 0"}}
                            minValue={1}
                            maxValue={1000000}
                            step={10}
                            onChange={(value) => setPriceRange(value)}
                            value={minmax}
                        />
                    </div>
                    

                    <FormLabel>Min Date: {new Date(filter.minDate).toLocaleString}</FormLabel>
                    <DatePicker value={filter.minDate} onChange={(e)=> setFilter({...filter, minDate: e.toDateString(), isFiltered: false})}/>
                    
                    <FormLabel>Max Date: {new Date(filter.maxDate).toLocaleString}</FormLabel> 
                    <DatePicker locale="ru" value={filter.maxDate} onChange={(e)=> setFilter({...filter, maxDate: e.toDateString(), isFiltered: false})}/>
                    <Form.Select onChange={e => {setFilter({...filter, userId: e.target.value, isFiltered: false})}} style={{marginTop: "25px"}}>
                        <option value={''}>Выберите пользователя</option> 
                        {
                            usersList.map((item) => {
                                return <option value={item.id}>{item.firstname} {item.lastname}</option> 
                            })
                        }
                    </Form.Select>
                    
                    <ButtonComp setShow={setShow} isDeleting={isDeleting} setIsDeleting={setIsDeleting} handleShowFilter={handleShowFilter} handleCloseFilter={handleCloseFilter}/>
                    <Button onClick={newUser} style={{margin: "0 auto 25px", width: "100%"}}>Добавить нового пользователя</Button>
                    <Button disabled onClick={deleteAll} style={{margin: "0 auto 25px", width: "100%"}}>Удалить всё</Button>
                    <Button onClick={getCardsWithFilters} style={{width: "100%"}}>Применить</Button>

                </Offcanvas.Body>
            </Offcanvas>
            {newShowUserModal && <NewUserModal setShowNewUserModal={setShowNewUserModal}/>}
        </>
    );
}
