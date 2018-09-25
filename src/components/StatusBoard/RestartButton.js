import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { initGame } from '../../actions';


const RestartBtnArea = styled.div `
  width: 50%;
  display: inline-block;
  text-align: right;
  padding: 0 20px 10px 10px;
  box-sizing: border-box;
`
const RestartBtnLabel = styled.div `
  color: rgb(192,181,164);
  font-size: 16px;
  letter-spacing: 3px;
  padding-top:10px;
`
const RestartBtn = styled.button `
  color: rgba(7, 15, 14, 0.75);
  position: relative;
  display: inline-block;
  width: 80px;
  height: 80px;
  border: 0;
  outline: none;
  background-color: #f9fbd6;
  border-radius: 10%;
  cursor: pointer;
  transition: box-shadow 200ms, font-size 200ms;
  box-shadow: inset 0 3.3333333333px 0 #fcfded, inset 0 -3.3333333333px 1.3333333333px #f6f9bf, 0 0 1.3333333333px #f9fbd6, inset 0 0 2.6666666667px #eff490, inset 0 0 2.6666666667px rgba(51, 51, 51, 0.5), inset 0 0 1.3333333333px 6.6666666667px #f9fbd6, inset 0 -2.6666666667px 2px 8px rgba(51, 51, 51, 0.7), inset 0 0 1.3333333333px 8px #ebf279, inset 0 0 1.3333333333px 8px rgba(51, 51, 51, 0.7), inset 0 0 0.6666666667px 8.6956521739px #b6bf13, inset 0 0 0.6666666667px 10px rgba(255, 255, 255, 0.7), inset 0 4px 0 9.4117647059px rgba(255, 255, 255, 0.7), inset 0 -4px 1.3333333333px 9.4117647059px rgba(242, 246, 168, 0.2), inset 0 0 0 14.5454545455px #f9fbd6, inset 0 32px 10.6666666667px #f6f9bf, inset 0 0 8px 13.3333333333px #f2f6a8, 0 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 50px;
  line-height: 50px;
  &:active {
    box-shadow: inset 0 3.3333333333px 0 #fcfded, inset 0 -3.3333333333px 1.3333333333px #f6f9bf, 0 0 1.3333333333px #f9fbd6, inset 0 0 2.6666666667px #eff490, inset 0 0 2.6666666667px rgba(51, 51, 51, 0.5), inset 0 0 1.3333333333px 6.6666666667px #f9fbd6, inset 0 -2.6666666667px 2px 8px rgba(51, 51, 51, 0.7), inset 0 0 1.3333333333px 8px #ebf279, inset 0 0 1.3333333333px 8px rgba(51, 51, 51, 0.7), inset 0 0 2px 9.4117647059px #dee91c, inset 0 0 0.6666666667px 10.6666666667px rgba(255, 255, 255, 0.2), inset 0 4px 0 28px rgba(255, 255, 255, 0.5), inset 0 -4px 1.3333333333px 28px rgba(235, 242, 121, 0.2), inset 0 0 0 14.5454545455px #f7fac8, inset 0 32px 10.6666666667px #f4f7b1, inset 0 0 8px 13.3333333333px #eff490, 0 2px 4px rgba(0, 0, 0, 0.5);
    background-color: #f8facd;
    font-size: 45px;
  }
  &:active:before {
    opacity: 0.5;
  }
  &:before {
    content: "";
    position: absolute;
    bottom: 18px;
    left: 22px;
    display: block;
    width: 36px;
    height: 24px;
    background: rgba(255, 255, 255, 0.2);
    background: linear-gradient(to top, rgba(255, 255, 255, 0.3) 0%, rgba(249, 251, 214, 0.1) 100%);
    border-radius: 8% 8% 12% 12%;
    transition: opacity 200ms;
  }
`


class RestartButtonArea extends Component {

  render() {
      var labelText = this.props.gameCompleted ?
        "Play Again" :
        "Restart"
    return (
      <RestartBtnArea>
        <RestartBtn onClick={this.props.onInitGame} gameCompleted={this.props.gameCompleted}>
          ↻
        </RestartBtn>
        <RestartBtnLabel>{labelText}</RestartBtnLabel>
      </RestartBtnArea>
    );
  }
}

 const mapStateToProps = state => ({
   gameCompleted: state.gameCompleted
 })

const mapDispatchToProps = (dispatch) => {
  return {
    onInitGame: () => {
      dispatch(initGame());
    }
  };
};

const RestartButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(RestartButtonArea)

export default RestartButton;