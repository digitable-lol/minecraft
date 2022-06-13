import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default class CardListPost extends React.Component {
  state = {
    cards: '',
  }

  handleChange = event => {
    this.setState({ cards: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const item = {
      cards: this.state.card
    };

    axios.post(`https://localhost:5001/api/Post`, { item })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Товар:
            <input type="text" name="name" onChange={this.handleChange} />
            Владелец:
            <input type="text" owner="owner" onChange={this.handleChange} />
          </label>
          <Button type="submit">Add</Button>
        </form>
      </div>
    )
  }
}