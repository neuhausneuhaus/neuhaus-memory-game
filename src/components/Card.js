import React from 'react'
// import styled, { css } from 'styled-components'
import styled from 'styled-components'
import ReactCardFlip from 'react-card-flip';
import cardHiddenImg from '../images/cardHidden.png'
import cardPaperImg from '../images/cardPaper.jpeg'
  const CardContainer = styled.div `
    text-align: center;
    width: 300px;
    height: 300px;
    float: left; 
  `

   // `${props => props.revealed ?
   //   css`
   //     background-color: red; 
   //     border: 1px solid orange;`:
   //   css`
   //     background-image: url(${cardHiddenImg});
   //     background-color: yellow;
   //     border: 1px solid teal;`
   // };
   // ${props => props.matched && css`
   //     background-color: green; 
   //     border: 1px solid darkGreen;`
   // };`

  // TODO:replace all 300px heights & widths with viewsize based var
  // Note: CardRevealedContents dimensions, margin & lineheight would need to be recalculated too
const CardHidden = styled.div `
  background-image: url(${cardHiddenImg});
  background-repeat: no-repeat;
  background-size: contain;
  height: 300px;
  width: 300px;
`

const CardRevealed = styled.div `
  width: 300px;
  height: 300px;
`

const CardRevealedContents = styled.div `
  background-image: url(${cardPaperImg});
  background-repeat: no-repeat;
  background-size: cover;
  height: 265px;
  width: 192px;
  line-height: 235px;
  font-size: 80px;
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
    return (
      <CardContainer
                       matched={this.props.matched}
                       >
        <ReactCardFlip isFlipped={this.props.revealed}
                       infinite={true}
                       >
          <CardHidden key="front" onClick={this.onClick}></CardHidden>
          <CardRevealed key="back" onClick={this.onClick}>
            <CardRevealedContents>{cardIcon}</CardRevealedContents>
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
