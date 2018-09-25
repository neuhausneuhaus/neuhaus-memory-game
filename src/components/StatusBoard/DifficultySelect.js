import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { changeDifficulty } from '../../actions';
import toggleBallImg from '../../assets/images/metal-sphere-1.png';
import toggleBkgdImg from '../../assets/images/metal-bkgd-1.jpg';

const DifficultyArea = styled.div`
  width: 50%;
  display: inline-block;
  padding-left: 20px;
  box-sizing: border-box;
`
const DifficultyAreaLabel = styled.div`
  color: rgb(192,181,164);
  font-size: 16px;
  letter-spacing: 3px;
  padding-top: 10px;
`

const SelectedLabelArea = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 30px;
  height: 10px;
  margin-top: 15px;
`;

const SelectedLabel = styled.div`
  position: relative;
  font-family: serif;
  font-weight: bold;
`;

const LabelImprint = styled.div`
  color: rgb(55, 58, 57);
  text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.31), 0px -1px 0px #304241eb;
`;

const LabelLight = styled.div`
  position: absolute;
  top: 0;
  color: ${props => props.color};
  opacity: ${props => props.lit ? 
    "100":
    "0"
  };
  text-shadow: 0 0 15px ${props => props.color};
`;

const ToggleArea = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: 10px;
`;

const Toggle = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  transform: translate3d(0, 0, 0);
  background-image: url(${toggleBkgdImg});
  background-size: 110px;
  background-position: center;
  height: 28px;
  width: 80px;
  border-radius: 12px;
  padding: 1px;

  border: 2px groove grey;
  &:hover {
    cursor: pointer;
  }
`;

const ToggleBall = styled.div`
  z-index: 2;
  box-shadow: ${props => props.toggled ?
    'inset -4px 0 12px 0px rgba(165, 73, 86, 0.22)':
    'inset 2px -1px 12px 0px rgba(89,173,122,0.48)'
  };
  transition: transform 0.3s cubic-bezier(1,.19,.15,.7);
  transition-delay: 0.1s;
  will-change: transform;
  border-radius: 12px;
  background-image: url(${toggleBallImg});
  background-repeat: no-repeat;
  background-size: 68px 68px;
  background-position: center;
  height: 28px;
  width: 46px;
  transform: ${props => props.toggled ?
    `translateX(35px)` :
    'translateX(-2px)'
  };
  &:hover {
    cursor: pointer;
  }
`;


class SelectionArea extends Component {
  
  selectedLabels() {
    return (
      <SelectedLabelArea>
        <SelectedLabel easy> 
          <LabelImprint>EASY</LabelImprint>
          <LabelLight color="rgb(74, 171, 112)" lit={this.props.difficulty==="easy"}>EASY</LabelLight>
        </SelectedLabel>
        <SelectedLabel hard> 
          <LabelImprint>HARD</LabelImprint>
          <LabelLight color="rgb(179, 63, 52)" lit={this.props.difficulty==="hard"}>HARD</LabelLight>
        </SelectedLabel>
      </SelectedLabelArea>
    );
  }

  toggleSwitch() {
    let isHard = this.props.difficulty === "hard";
    return (
      <ToggleArea>
        <Toggle 
          onClick={this.props.onChangeDifficulty}
          toggled={isHard}>
          <ToggleBall toggled={isHard}/>
        </Toggle>
      </ToggleArea>
    );
  }

  render() {
    return (
      <DifficultyArea>  
        {this.selectedLabels()}
        {this.toggleSwitch()}
        <DifficultyAreaLabel>Game Difficulty</DifficultyAreaLabel>
      </DifficultyArea>
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
    onChangeDifficulty: level => {
      dispatch(changeDifficulty(level));
    }
  };
};

const DifficultySelect = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectionArea)

export default DifficultySelect;

