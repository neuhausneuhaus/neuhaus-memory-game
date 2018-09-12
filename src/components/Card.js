import React from 'react'

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
    var cardClass  = 'card'
    if (this.props.revealed) {
      cardClass = cardClass + ' revealed'
    }
    if (this.props.matched) {
      cardClass = cardClass + ' matched'
    }
    var showIcon = this.props.revealed || this.props.matched;
    var cardIcon = showIcon ? this.props.icon : "Card";
    return (
      <div onClick={this.onClick} className={cardClass} >
        {cardIcon}
      </div>
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
