import React from 'react'
import { connect } from 'react-redux';


import styles from './Timer.scss'

export const formatTime = time => {
  if (time < 0) return '--:--'
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const mm = m < 10 ? `0${m}` : m
  const s = time % 60
  const ss = s < 10 ? `0${s}` : s
  if (h > 0) return [h, mm, ss].join(':')
  return `${m}:${ss}`
}

const TimerDiv = ({ time = 0 }) => <div className={styles.timer}>{formatTime(time)}</div>

class Timer extends React.Component {
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


const mapDispatchToProps = (dispatch) => {
  return {
    // onCardClicked: id => {
    //   dispatch(revealCard(id));
    // },
    // onCheckForMatchedPair: () => {
    //   dispatch(checkMatchedPair());
    // },
    // onInitGame: () => {
    //   dispatch(initGame());
    // },
    // onChangeDifficulty: level => {
    //   dispatch(changeDifficulty(level));
    // }
  };
};


const TimerView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)

export default TimerView
