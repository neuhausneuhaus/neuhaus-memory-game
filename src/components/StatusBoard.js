import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { initGame, changeDifficulty } from '../actions';
import TimerView from './Timer';


const StatusBoardContainer = styled.div `
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
  letter-spacing: ${props => props.lbl ==="turns" ? "10px" : "3px"};
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

class StatusBoardView extends Component {
  render() {
    // TODO: extract to a component file, with styled-components
    var matchCount = this.props.matchesMade
    var restartBtnText = this.props.gameCompleted ?
      "Play Again?" :
      "Restart"
    var diffucltyBtnText = this.props.difficulty === "easy" ?
      "Switch to Hard" :
      "Switch to Easy"

    return (
      <StatusBoardContainer>
        <TimerView/>
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
      </StatusBoardContainer>
    );
  }
}

const mapStateToProps = state => ({
  turnsTaken: state.turnsTaken,
  gameCompleted: state.gameCompleted,
  matchesMade: state.matchesMade,
  difficulty: state.difficulty
})

const mapDispatchToProps = (dispatch) => {
  return {
    onInitGame: () => {
      dispatch(initGame());
    },
    onChangeDifficulty: level => {
      dispatch(changeDifficulty(level));
    }
  };
};

const StatusBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusBoardView)

export default StatusBoard;
