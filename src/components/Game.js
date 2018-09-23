// import React from 'react'
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from './Card';
import Loader from './Loader';
import { revealCard, checkMatchedPair} from '../actions';
import StatusBoard from './StatusBoard/StatusBoard'
import styled from 'styled-components';

const GameBoard = styled.div `
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 1280px;
  margin: 0 auto;
`

class Game extends Component {

  componentWillMount() {
    // Interval to leave selected card revealed before 'turn' ends, 
    // before either marking as matched, or rehiding
    setInterval(this.props.onCheckForMatchedPair,5000);
  }

  getCards() {
    var onClick = this.props.onCardClicked;
    
    var cards = this.props.cards;
    var cardObjs = [];
    var cardSize = this.props.difficulty === "easy" ? "large" : "small";
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i];
      var cardObj = <Card key={c.id}
                          id={c.id}
                          icon={c.icon}
                          revealed = {c.revealed}
                          matched = {c.matched} 
                          onClick={onClick}
                          size={cardSize}/>
      cardObjs.push(cardObj);
    };
    return cardObjs;
  }

  renderGameBoard() {
    console.log(this.props);
    return (
      <div>
        <StatusBoard/>
        <GameBoard>
          {this.getCards()}
        </GameBoard>
      </div>  
    )
  }
  renderLoader() {
    return (
      <Loader/>
    );
  }
  render() {
    return (
      <div>
        {this.props.cardDataLoaded ? this.renderGameBoard() : this.renderLoader()}
      </div>
    );
  }
}

// TODO: remove state.cardData from this map. its just for debugging.
const mapStateToProps = state => ({
  cardData: state.cardData,
  cardDataLoaded: state.cardDataLoaded,
  cards: state.cards,
  difficulty: state.difficulty
})

const mapDispatchToProps = (dispatch) => {
  return {
    onCardClicked: id => {
      dispatch(revealCard(id));
    },
    onCheckForMatchedPair: () => {
      dispatch(checkMatchedPair());
    }
  };
};

const GameView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)

export default GameView;


// export default Game
