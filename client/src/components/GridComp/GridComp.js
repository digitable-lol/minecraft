import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Col } from 'react-bootstrap'
import ProductCard from '../ProductCard'
import PaginationComp from './Pagination'


const cardListStyle = {
    display: "flex",
    marginTop: "25px",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "25px"
}

export default function GridComp({isDeleting}) {
    const [pageNum, setPageNum] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [cards, setCards] = useState([])
    function getCards() {
        axios.get(`https://localhost:5001/api/things?PageNumber=${pageNum}&PageSize=6`)
            .then(res => {
                const cards = res.data.data;
                console.log(cards)
                setCards(cards)
                setTotalPages(res.data.totalPages)
            })

    }

    useEffect(() => {
        getCards()
    }, [pageNum])
    return (
        <div>
            <Container>
                <div className='cardList' style={cardListStyle}>
                    {cards.map((card) => {
                        return (
                            <Col md={5} sm={5} xs={12}>
                                <ProductCard data={card} getCards={getCards} isDeleting={isDeleting} />
                            </Col>
                        )
                    })}
                </div>
                <PaginationComp setPageNum={setPageNum} pageNum={pageNum} totalPages={totalPages} />
            </Container>
        </div>
    )
}
