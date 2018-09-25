import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { initGame, changeDifficulty } from '../../actions';
import toggleBallImg from '../../assets/images/metal-sphere-1.png';
import toggleBkgdImg from '../../assets/images/metal-bkgd-1.jpg';

const SelectedLabelArea = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 30px;
  height: 0;
  margin-top: 15px;
  width: 48%;
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
  width: 48%;
`;

const Toggle = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  transform: translate3d(0, 0, 0);
  /*background-color: rgb(89, 173, 122);*/
  background-image: url(${toggleBkgdImg});
  background-size: 110px;
  background-position: center;
  height: 28px;
  width: 80px;
  /*border-radius: 50px;*/
  border-radius: 12px;
  padding: 1px;
/*  border: 2px groove ${props => props.toggled ?
    "red" :
    "green"
  };*/
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
  /*border: 1px solid rgb(192,181,164);*/
  /*border-radius: 50px;*/
  /*background-color: rgb(35, 33, 35);*/
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
// 
// const RippleBg = styled.div`
//   width: 100%;
//   height: 100%;
//   top: 0;
//   left: 0;
//   background-image: radial-gradient(
//     circle, rgba(165, 73, 86, 1) 9%, transparent 10%
//   );
//   background-repeat: no-repeat;
//   background-position: 50%;
//   pointer-events: none;
//   transition: transform 0.5s, opacity 0.3s ease;
//   transform: ${props => props.visible ? 'scale(10, 10)' : 'scale(0, 0)'};
//   opacity: ${props => props.visible ? 1 : 0};
//   position: absolute;
//   z-index: 1;
// `;
// 
// const InnerLabel = styled.span`
//   font-size: 14px;
//   color: rgb(9, 15, 14);
//   position: absolute;
//   z-index: 1;
//   ${props => props.left && 'left: 10px;'};
//   ${props => props.right && 'right: 10px;'};
// `;
// 
// const OuterLabel = styled.span`
//   font-size: 14px;
//   color: rgb(192,181,164);
//   position: absolute;
//   top: 0px;
//   transform: translateY(-110%);
//   width: 100%;
//   text-align: center;
// `;


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
      <div>  
        {this.selectedLabels()}
        {this.toggleSwitch()}
      </div>
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

const DifficultySelect = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectionArea)

export default DifficultySelect;

