// import React from 'react'
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*import Timer from '../Timer/Timer'*/
import Card from './Card';
import Loader from './Loader';
import { revealCard, checkMatchedPair, initGame, changeDifficulty } from '../actions';
import styled from 'styled-components';

const GameBoard = styled.div `
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 1280px;
  margin: 0 auto;
`
const ScoreBoardContainer = styled.div `
  background-color: rgba(7, 15, 14);;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: block;
  padding: 10px;
  border: 15px groove gray;
  /*display: flex;
  flex-flow: column wrap;*/
`
const MatchCount = styled.div `
  width: 50%;
  float: right;
  text-align: -webkit-right;
`
const TurnCount = styled.div `
  width: 50%;
`
const CountLabel = styled.div `
  color: rgb(192, 181, 164);
  width: 92px;
  /*margin: 0 auto;*/
  font-size: 20px;
  letter-spacing: ${props => props.lbl =="turns" ? "10px" : "3px"};
`
const CountScreenContainer = styled.div `
  position: relative;
  width: 92px;
  height: 60px;
  /*margin: 0 auto;*/
  border: 1px solid grey;
`
const CountScreen = styled.div `
  /*display: flex;*/
  font-family: ${props => props.won ? "pixelLCD" : "pixelLCD"};
  font-size: 60px;
  text-align: left;
  color: white;
  width: 100%;
  height: 100%;
  line-height: 83px;
  position: absolute;
  top: 0;
  right: 0;
  padding-right: 4px;
  text-align: right;
  z-index: 1;
`
const Digitizer = styled.div ` 
  font-family: pixelLCD;
  width: 100%;
  height: 100%;
  font-size: 60px;
  text-align: left;
  line-height: 83px;
  color: rgba(162, 155, 155, 0.30);;
  position: absolute;
  top: 0;
  right: 0;
  padding-right: 4px;
  text-align: right;
  z-index: 0;
/*background:
        radial-gradient(
            rgba(0,255,0,.8),
            black
        ),
        repeating-linear-gradient(
            transparent 0,
            rgba(0,0,0,.2) 3px,
            transparent 6px
        );
    background-blend-mode: overlay;
    background-size: cover;*/
`
const RestartBtn = styled.div `
  color: rgb(192, 181, 164);
`
const DifficultyBtn = styled.div `
  color: rgb(192, 181, 164);
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
  statusArea() {
    // TODO: extract to a component file, with styled-components
    var matchCount = this.props.gameCompleted ?
      "🏆" : this.props.matchesMade
    var restartBtnText = this.props.gameCompleted ?
      "Play Again?" :
      "Restart"
    var diffucltyBtnText = this.props.difficulty === "easy" ?
      "Switch to Hard" :
      "Switch to Easy"

    return (
      <ScoreBoardContainer>
        <MatchCount>
          <CountLabel lbl="matches">Matches</CountLabel>
          <CountScreenContainer>
            <CountScreen won={this.props.gameCompleted}>
              {matchCount}
            </CountScreen>
            <Digitizer>
              88
            </Digitizer>
          </CountScreenContainer>
        </MatchCount>
        <TurnCount>
          <CountLabel lbl="turns">Turns</CountLabel>
          <CountScreenContainer>
            <CountScreen>
              {this.props.turnsTaken}
            </CountScreen>
            <Digitizer>
              88
            </Digitizer>
          </CountScreenContainer>
        </TurnCount>
        <RestartBtn onClick={this.props.onInitGame}>
          {restartBtnText}
        </RestartBtn>
        <DifficultyBtn onClick={this.props.onChangeDifficulty}>
          {diffucltyBtnText}
        </DifficultyBtn>
      </ScoreBoardContainer>
    );
  }
  renderGameBoard() {
    console.log(this.props);
    return (
      <div>
        {this.statusArea()}
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
    onInitGame: () => {
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
