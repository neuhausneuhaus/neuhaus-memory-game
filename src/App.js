import React, { Component } from 'react';
import GameView from './components/Game';

import styled, { injectGlobal } from 'styled-components'


injectGlobal`
  @font-face {
    font-family: "timesesque";
    src: url("/fonts/AncientMedium.ttf");
  }
  @font-face {
    font-family: "radioland";
    src: url("/fonts/RADIOLAND.ttf");
  }
  @font-face {
    font-family: "pixelLCD";
    src: url("/fonts/Pixel-LCD-7.ttf");
  }
  @font-face {
    font-family: "unifont";
    src: url("/fonts/unifont_upper-11.0.02.ttf");
  }
`
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
