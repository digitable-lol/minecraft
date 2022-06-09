import React, { Component } from 'react'
import { Container, Col, Row, Stack } from 'react-bootstrap'
import ProductCard from '../ProductCard'


const testData = [
    {
        id:1,
        name: "Телевизор",
        owner: "Никита",
        date: new Date().toLocaleString(),
        cost: 20000,
        comment: "Отдать через два месяца",
        image: "https://bq.ru/upload/iblock/b6a/front.jpg"
    },
    {
        id:2,
        name: "Телевизор LG",
        owner: "Данил",
        date: new Date().toLocaleString(),
        cost: 20000,
        comment: "Отдать через два месяца",
        image: "https://bq.ru/upload/iblock/b6a/front.jpg"
    },
    {
        id:3,
        name: "Телевизор Samsung",
        owner: "Данил",
        date: new Date().toLocaleString(),
        cost: 20000,
        comment: "Отдать через два месяца",
        image: "https://bq.ru/upload/iblock/b6a/front.jpg"
    },
    {
        id:4,
        name: "Самокат",
        owner: "Человек",
        date: new Date().toLocaleString(),
        cost: 20000,
        comment: "Пробито колесо",
        image: "https://e7.pngegg.com/pngimages/221/7/png-clipart-segway-pt-electric-vehicle-electric-kick-scooter-electric-motorcycles-and-scooters-kick-scooter-scooter-mode-of-transport.png"
    },
    {
        id:5,
        name: "Самокат",
        owner: "Человек",
        date: new Date().toLocaleString(),
        cost: 20000,
        comment: "Пробито колесо",
        image: "https://e7.pngegg.com/pngimages/221/7/png-clipart-segway-pt-electric-vehicle-electric-kick-scooter-electric-motorcycles-and-scooters-kick-scooter-scooter-mode-of-transport.png"
    },
    {
        id:6,
        name: "Самокат",
        owner: "Человек",
        date: new Date().toLocaleString(),
        cost: 20000,
        comment: "Пробито колесо",
        image: "https://e7.pngegg.com/pngimages/221/7/png-clipart-segway-pt-electric-vehicle-electric-kick-scooter-electric-motorcycles-and-scooters-kick-scooter-scooter-mode-of-transport.png"
    }
]

const cardListStyle = {
    display: "flex",
    marginTop: "25px",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "25px"
}

export default class GridComp extends Component {
    render() {
        return (
            <div>
                <Container>
                    <div className='cardList' style={cardListStyle}>
                        {testData.map((card) => {
                            return (
                                <Col md={5} sm={5} xs={12}>
                                    <ProductCard data={card} />
                                </Col>
                            )
                        })}
                    </div>
                </Container>
            </div>
        )
    }
}
