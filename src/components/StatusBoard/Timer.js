import React from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';

export const formatTime = time => {
  if (time < 0) return '--:--'
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const mm = m < 10 ? `0${m}` : m
  const s = time % 60
  const ss = s < 10 ? `0${s}` : s
  if (h > 0) return [h, mm, ss].join(':')
  return `${mm}:${ss}`
}

const TimerScreenContainer = styled.div `
  position: absolute;
  width: 216px;
  height: 60px;
  border: 1px solid grey;  
  display: inline-flex;
  left: calc(50% - 108px);
  padding-left: 3px;
`
const TimerLabel = styled.div `
  color: rgb(192, 181, 164);
  width: 100%;
  /*margin: 0 auto;*/
  font-size: 20px;
  letter-spacing: 3px;
`
const TimerScreen = styled.div `
  font-family: pixelLCD;
  font-size: 60px;
  color: red;
  height: 24px;
  line-height: 83px;
  position: absolute;
  top: 0;
  right: 0;
  padding-right: 4px;
  text-align: right;
  z-index: 0;
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


const TimerDiv = ({ time = 0 }) => (
  <div>
    <TimerLabel>Game Time</TimerLabel>
    <TimerScreenContainer>
      <TimerScreen>{formatTime(time)}</TimerScreen>
      <Digitizer>88:88</Digitizer>
    </TimerScreenContainer>
  </div>
)

class TimerView extends React.Component {
   constructor(props) {
     super(props)
     this.state = {
       secondsElapsed: 0,
     }
   }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick() {
    if (this.props.turnsTaken === 0 ) {
      this.setState({
        secondsElapsed: 0,
      })
    } else if (this.props.gameCompleted !== true ) {
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1,
      })
    }
  }

  reset() {
    this.setState({
      secondsElapsed: 0,
    })
  }

  render() {
    return <TimerDiv time={this.state.secondsElapsed} />
  }
}


const mapStateToProps = state => ({
  turnsTaken: state.turnsTaken,
  gameCompleted: state.gameCompleted,
  secondsElapsed: state.secondsElapsed
})

const Timer = connect( mapStateToProps )(TimerView)

export default Timer 
