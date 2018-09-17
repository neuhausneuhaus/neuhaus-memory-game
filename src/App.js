import React, { Component } from 'react';
import GameView from './components/Game';
import styled from 'styled-components'
import './App.css';

const AppWrapper = styled.div `
  text-align: center;
`

class App extends Component {

  render() {
    return (
      <AppWrapper>
        <GameView/>
      </AppWrapper>
    );
  }
}

export default App;
