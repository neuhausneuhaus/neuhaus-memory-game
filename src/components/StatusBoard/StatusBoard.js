import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import RestartButton from './RestartButton'
import Timer from './Timer';
import DifficultySelect from './DifficultySelect';


const StatusBoardContainer = styled.div `
  background-color: rgba(7, 15, 14);;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: block;
  padding: 10px;
  border: 15px groove gray;
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
  font-size: 20px;
  letter-spacing: ${props => props.lbl ==="turns" ? "10px" : "3px"};
`
const CountScreenContainer = styled.div `
  position: relative;
  width: 92px;
  height: 60px;
  border: 1px solid grey;
`
const CountScreen = styled.div `
  font-family: pixelLCD;
  font-size: 60px;
  color: #fdffd7;
  width: 100%;
  height: 100%;
  line-height: 83px;
  position: absolute;
  top: 0;
  right: 0;
  padding-right: 4px;
  text-align: right;
  z-index: 1;
  text-shadow: 0 0 12px;
`
const Digitizer = styled.div ` 
  font-family: pixelLCD;
  width: 100%;
  height: 100%;
  font-size: 60px;
  line-height: 83px;
  color: rgba(162, 155, 155, 0.30);;
  position: absolute;
  top: 0;
  right: 0;
  padding-right: 4px;
  text-align: right;
  z-index: 0;
`

const BoardDivider = styled.div `
  width: 84%;
  height: 2px;
  background-color: rgb(192,181,164);
  margin: 20px auto;
  box-shadow: inset 2px 1px #808080;
`

class StatusBoardView extends Component {
  render() {
    var matchCount = this.props.matchesMade

    return (
      <StatusBoardContainer>
        <Timer/>
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
        <BoardDivider/>
        <DifficultySelect/>
        <RestartButton/>
      </StatusBoardContainer>
    );
  }
}

const mapStateToProps = state => ({
  turnsTaken: state.turnsTaken,
  gameCompleted: state.gameCompleted,
  matchesMade: state.matchesMade
})
// 
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onInitGame: () => {
//       dispatch(initGame());
//     },
//   };
// };

const StatusBoard = connect(
  mapStateToProps
)(StatusBoardView)

export default StatusBoard;
