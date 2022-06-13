import axios from 'axios'
import React, { Component, useEffect, useState } from 'react'
import { Container, Col, Row, Stack } from 'react-bootstrap'
import ProductCard from '../ProductCard'



const cardListStyle = {
    display: "flex",
    marginTop: "25px",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "25px"
}

export default function GridComp() {
    const [cards, setCards] = useState([])
    function getCards() {
        axios.get(`https://localhost:5001/api/items`)
            .then(res => {
                const cards = res.data;
                console.log(cards)
                setCards(cards)
            })
    }

    useEffect(()=>{
        getCards()
    },[])
    return (
        <div>
            <Container>
                <div className='cardList' style={cardListStyle}>
                    {cards.map((card) => {
                        return (
                            <Col md={5} sm={5} xs={12}>
                                <ProductCard data={card} getCards={getCards} />
                            </Col>
                        )
                    })}
                </div>
            </Container>
        </div>
    )
}
