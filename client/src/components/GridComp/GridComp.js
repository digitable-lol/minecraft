import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Col } from 'react-bootstrap'
import ProductCard from '../ProductCard'
import PaginationComp from './Pagination'
import './GridStyle.scss'
import SidebarComp from '../SidebarComp/SidebarComp'
import Footer from '../FooterComp/FooterComp'
import ProductCardNew from '../ProductCard/ProductCardNew'


// const cardListStyle = {
//     display: "flex",
//     //marginTop: "25px",
//     padding-top: "100px",
//     flexWrap: "wrap",
//     justifyContent: "center",
//     gap: "25px"
// }

export default function GridComp({isDeleting, getCards, cards, pageNum, setPageNum, totalPages, setTotalPages, usersList}) {
    
    // function getCards() {
    //     axios.get(`https://localhost:5001/api/things?PageNumber=${pageNum}&PageSize=6`)
    //         .then(res => {
    //             const cards = res.data.data;
    //             console.log(cards)
    //             setCards(cards)
    //             setTotalPages(res.data.totalPages)
    //         })

    // }

    useEffect(() => {
        getCards({pageNum:pageNum, setTotalPages:setTotalPages})
    }, [pageNum])


    return (
            <Container>
                <div className='cardList'>
                    {cards.length===0 && <h2>Нет элементов по вашему запросу</h2>}
                    {cards.map((card) => {
                        return (
                            <Col md={5} sm={5} xs={12} key={card.id}>
                                <ProductCardNew usersList={usersList} data={card} getCards={getCards} isDeleting={isDeleting} />
                            </Col>
                        )
                    })}
                </div>
                <PaginationComp setPageNum={setPageNum} pageNum={pageNum} totalPages={totalPages} />
            </Container>
    )
}
