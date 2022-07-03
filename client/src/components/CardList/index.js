import React, { useEffect, useState } from 'react'
import { Container, Col } from 'react-bootstrap'
import PaginationComp from './Pagination'
import './GridStyle.scss'
import ProductCardNew from '../ProductCard/ProductCardNew'
import Spinner from '../Spinner'


export default function CardList({isDeleting, getCards, cards, pageNum, setPageNum, totalPages, setTotalPages, usersList, isLoading}) {

    useEffect(() => {
        getCards({pageNum : pageNum, setTotalPages : setTotalPages})
    }, [pageNum])


    return (
            <Container className='cardList-container'>
                {!isLoading ? <>
                <div className='cardList'>
                    {cards.length === 0 && <h2>Нет элементов по вашему запросу</h2>}
                    {cards.map((card) => {
                        return (
                            <Col md={5} sm={5} xs={12} key={card.id}>
                                <ProductCardNew usersList={usersList} data={card} getCards={getCards} isDeleting={isDeleting} />
                            </Col>
                        )
                    })}
                </div>
                <PaginationComp setPageNum={setPageNum} pageNum={pageNum} totalPages={totalPages} />
                </>
                 : <Spinner/>}
            </Container>
    )
}
