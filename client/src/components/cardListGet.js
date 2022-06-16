import React from 'react';

import axios, { CanceledError } from 'axios';


export default class CardList extends React.Component {
  state = {
    cards: []
  }

  componentDidMount() {
    axios.get(`https://localhost:5001/api/things`)
      .then(res => {
        const cards = res.data;
        console.log(cards)
        this.setState({ cards });
      })
  }

  render() {
    return (
      <>
        {this.state.cards.map(card => <li key={card.id}>
          {card.name},
          {card.owner},
          {card.price},
          {card.comment},
          {card.date ? card.date.toLocalString() : "Неизвестно"}
        </li>)}
      </>
    )
  }
}