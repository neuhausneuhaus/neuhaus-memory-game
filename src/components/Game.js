// import React from 'react'
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*import Timer from '../Timer/Timer'*/
/*import Board from '../Board/Board'*/
import Card from './Card'
import { revealCard, checkMatchedPair, initGame, changeDifficulty } from '../actions';

// import './Game.scss'

class Game extends Component {
  // static propTypes = {
  //   name: React.PropTypes.string,
  // };

  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {
    // Interval to leave selected card revealed before 'turn' ends, 
    // before either marking as matched, or rehiding
    setInterval(this.props.onCheckForMatchedPair,5000);
  }

  getCards() {
    var onClick = this.props.onCardClicked;
    var cards = this.props.cards;
    var cardObjs = [];
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i];
      var cardObj = <Card key={c.id}
                          id={c.id}
                          icon={c.icon}
                          revealed = {c.revealed}
                          matched = {c.matched} 
                          onClick={onClick}/>
      cardObjs.push(cardObj);
    };
    return cardObjs;
  }
  statusArea() {
    // TODO: Consider extracting to a component file
    var genStatus = this.props.gameCompleted ?
      "YOU DID IT!" :
      this.props.matchesMade + "Pairs Found";
    var restartBtnText = this.props.gameCompleted ?
      "Play Again?" :
      "Restart"
    var diffucltyBtnText = this.props.difficulty === "easy" ?
      "switch to hard" :
      "switch to easy"

    return (
      <div className='game-status'>
        <div className='game-status_gen'>{genStatus}</div>
        <div className='game-status_turns'>{this.props.turnsTaken + " turns taken"}</div>
        <button className='game-status_restart-btn' onClick={this.props.onPlayAgain}>
          {restartBtnText}
        </button>
        <button className='game-status_difficulty-btn' onClick={this.props.onChangeDifficulty}>
          {diffucltyBtnText}
        </button>
      </div>
    );
  }
  render() {
    var cards = this.getCards();

    return (
      <div>
        {this.statusArea()}
        <div className='game-board'>
          {cards}
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  cards: state.cards,
  turnsTaken: state.turnsTaken,
  gameCompleted: state.gameCompleted,
  matchesMade: state.matchesMade,
  difficulty: state.difficulty
})

const mapDispatchToProps = (dispatch) => {
  return {
    onCardClicked: id => {
      dispatch(revealCard(id));
    },
    onCheckForMatchedPair: () => {
      dispatch(checkMatchedPair());
    },
    onPlayAgain: () => {
      dispatch(initGame());
    },
    onChangeDifficulty: level => {
      dispatch(changeDifficulty(level));
    }
  };
};

const GameView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)

export default GameView;


// export default Game
