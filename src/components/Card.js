import React from 'react';
import styled from 'styled-components';
import ReactCardFlip from 'react-card-flip';
import cardHiddenImg from '../assets/images/cardHidden.png';
import cardPaperImg from '../assets/images/cardPaper.jpeg';


const CardContainer = styled.div `
  text-align: center;
  height: ${props => props.size === "large" ? "300px" : "200px"};
  width: ${props => props.size === "large" ? "300px" : "200px"};
  max-width: 30%;
`
const CardHidden = styled.div `
  background-image: url(${cardHiddenImg});
  background-repeat: no-repeat;
  background-size: contain;
  height: ${props => props.size === "large" ? "300px" : "200px"};
  width: ${props => props.size === "large" ? "300px" : "200px"};
`

const CardRevealed = styled.div `
  height: ${props => props.size === "large" ? "300px" : "200px"};
  width: ${props => props.size === "large" ? "300px" : "200px"};
`

const CardRevealedContents = styled.div `
  background-image: url(${cardPaperImg});
  background-repeat: no-repeat;
  background-size: cover;
  height: ${props => props.size === "large" ? "265px" : "176px"};
  width: ${props => props.size === "large" ? "192px" : "128px"};
  line-height: ${props => props.size === "large" ? "235px" : "156px"};
  font-size: ${props => props.size === "large" ? "80px" : "53px"};
  border: 1px solid black;
  margin: 15px auto 0;
  padding: 15px;
  border-radius: 5%;
  box-sizing: border-box;
  box-shadow: 2px 1px 6px 2px #00000073;
`

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!this.props.matched && !this.props.revealed) {
      this.props.onClick(this.props.id);
    }
  }

  render() {
    // var showIcon = this.props.revealed || this.props.matched;
    var cardIcon = this.props.icon;
    var size = this.props.size;
    return (
      <CardContainer matched={this.props.matched}
                     size={size}>
        <ReactCardFlip isFlipped={this.props.revealed}
                       infinite={true}>
          <CardHidden key="front" size={size} onClick={this.onClick}></CardHidden>
          <CardRevealed key="back" size={size} onClick={this.onClick}>
            <CardRevealedContents size={size}>{cardIcon}</CardRevealedContents>
          </CardRevealed>
        </ReactCardFlip>
      </CardContainer>
    );
  }
}


// import PropTypes from 'prop-types'

// Card.PropTypes = {
//     onClick: PropTypes.func.isRequired,
//     revealed: PropTypes.bool.isRequired,
//     resolved: PropTypes.bool.isRequired,
//     text: PropTypes.string.isRequired
// }

export default Card
