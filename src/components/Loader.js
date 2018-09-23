
import React, { Component } from 'react';
import styled, { injectGlobal, keyframes } from 'styled-components'

// injectGlobal`
//   @font-face {
//     font-family: "timesesque";
//     src: url("/fonts/AncientMedium.ttf");
//   }
// `
const loadfade = keyframes`  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }`;
const LoadDiv = styled.div `
  font-family: timesesque;
  font-size: 60px;
  animation: ${loadfade} 2.5s infinite;
`;

class Loader extends Component {

  render() {
    return (
      <LoadDiv> LOADING CARDS... </LoadDiv>
    );
  }
}

export default Loader;
