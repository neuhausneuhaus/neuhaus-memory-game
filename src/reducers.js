import { REVEAL_CARD, CHECK_MATCHED_PAIR, markCardsMatched, 
         MARK_CARDS_MATCHED, hidePair, HIDE_PAIR, INIT_GAME, 
         checkMatchedPair, revealCard, CHANGE_DIFFICULTY } from "./actions";


var startingCards = {
  /*TODO: Fetch from https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json instead of hardcoding!*/
  "levels": [
    {
      "cards": [ "✈", "♘", "✈", "♫", "♫", "☆", "♘", "☆" ],
      "difficulty": "easy"
    },
    {
      "cards": [ "❄", "⍨", "♘", "✈", "☯", "♠", "☆", "❄", "♫", "♫", "☯", "☆", "✈", "⍨", "♠", "♘" ],
      "difficulty": "hard"
    }
  ]
}
// TODO: FIX ME!!!!!
var difficultySelected = "easy";

var numberOfCards = difficultySelected==="easy" ? 8 : 16;




// const initialTurnState = {
const initialGameState = {
  selectionsInTurn : 0,
  firstSelection : undefined,
  secondSelection : undefined,
  thirdSelection : undefined,
  turnsTaken : 0,
  matchesMade : 0,
  gameCompleted: false,
  difficulty: "easy",
  cards: generateNewCards()
};

function cardReduc(state=[], action) {
  switch (action.type) {
    case REVEAL_CARD:
      return state.map((card) => {
        if (action.id === card.id) {
          return Object.assign({}, card, {
            revealed: true
          });
        }
        return card;
      });
    
    case MARK_CARDS_MATCHED:
      return state.map((card) => {
        if (action.id1 === card.id || action.id2 === card.id) {
          return Object.assign({}, card, {
            matched: true
          })
        }
        return card;
      });
    
    case HIDE_PAIR:
      return state.map((card) => {
        if (action.id1 === card.id || action.id2 === card.id) {
          return Object.assign({}, card, {
            revealed: false
          })
        }
        return card;
      });
    
    default:
      return state;
  }
}

// Returns object 
function gameReduc(state = initialGameState, action){
  switch (action.type) {
    case INIT_GAME:
      return Object.assign({}, initialGameState, { cards: generateNewCards(state.difficulty) } );
    
    case CHANGE_DIFFICULTY:
      // For now, this will both change difficulty, and initiate a new game regardless of progress in current game
      // TODO: consider adding alert warning in cases where game has progressed past a certain point.
      var level = state.difficulty === "easy" ?
        "hard" :
        "easy" ;

      return Object.assign({}, initialGameState, {
        difficulty: level,
        cards: generateNewCards(level)
      });

    case CHECK_MATCHED_PAIR:
      if (state.selectionsInTurn === 2 && cardsHaveIdenticalIcons(state.firstSelection, state.secondSelection, state.cards)) {
        // √ Match √
        let matchesMade = state.matchesMade + 1;
        let gameCompleted = false;
        if (matchesMade >= numberOfCards/2) {
          gameCompleted = true;
        }
        return Object.assign({}, state, { 
          matchesMade: matchesMade,
          turnsTaken: state.turnsTaken + 1,
          selectionsInTurn: 0,
          gameCompleted: gameCompleted, 
          cards: cardReduc(state.cards, markCardsMatched(state.firstSelection, state.secondSelection)) } );      
      } else if (state.selectionsInTurn === 2) {
        // X Not Match X
        return Object.assign({}, state, { 
          selectionsInTurn: 0,
          turnsTaken: state.turnsTaken + 1, 
          cards: cardReduc(state.cards, hidePair(state.firstSelection, state.secondSelection)) } );              
      }
      return state;
    
    case REVEAL_CARD:
      if (state.selectionsInTurn === 2)
      {
        // Two cards are already revealed
        // Check for match and trigger a new reveal
        let s = gameReduc(state, checkMatchedPair());
        return gameReduc(s, revealCard(action.id));
      }

      let card = getCard(action.id, state.cards);
      if (card.revealed || card.matched) {        
        return state;
      }

      let firstSelection = state.firstSelection;
      let secondSelection = state.secondSelection;
      if (state.selectionsInTurn === 0) {
        firstSelection = action.id;
      } else {
        secondSelection = action.id;
      }
      let numClicks = state.selectionsInTurn + 1;

      return Object.assign({}, state, { 
        firstSelection: firstSelection, 
        secondSelection: secondSelection, 
        selectionsInTurn : numClicks,
        cards: cardReduc(state.cards, action) } );    
    
    // case SHUFFLE_CARDS:
    //   return Object.assign({}, state, { cards: cardReduc(state.cards, action) } );
    
    default:
      return state;
  }
}



/*TODO: Move these functions to more appropriate home?*/

function generateNewCards(difficulty="easy") {
  var cardIcons = [];
  if (difficulty==="easy") {
    cardIcons = startingCards.levels.find(obj => {
      return obj.difficulty === "easy"
    }).cards;
  } else {
    cardIcons = startingCards.levels.find(obj => {
      return obj.difficulty === "hard"
    }).cards;
  }

  var randomizedIcons = cardIcons.sort(function(a, b){return 0.5 - Math.random()});

  var cardArray = [];
  for (var i = 0; i < randomizedIcons.length; i++) {

    var card = {
      id: i,
      icon: randomizedIcons[i],
      revealed: false,
      matched: false
    };
    cardArray.push(card);
  }
  return cardArray;
};


function getCard(id, cards) {
  for(let i=0; i < numberOfCards; i++) {
    if (cards[i].id === id) {
      return cards[i];
    }
  };
}

function cardsHaveIdenticalIcons(id1, id2, cards) {
  if (getCard(id1, cards).icon === getCard(id2, cards).icon) {
    return true;
  } else {
    return false;
  }
}


export default gameReduc;
