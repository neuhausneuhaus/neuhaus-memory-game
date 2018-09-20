export const REVEAL_CARD = 'REVEAL_CARD';
export const CHECK_MATCHED_PAIR = 'CHECK_MATCHED_PAIR';
export const MARK_CARDS_MATCHED = 'MARK_CARDS_MATCHED';
export const HIDE_PAIR = 'HIDE_PAIR';
export const INIT_GAME = 'INIT_GAME';
export const CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY';
export const GET_CRD_DATA = 'GET_CRD_DATA';
export const GET_CRD_DATA_RECEIVED = 'GET_CRD_DATA_RECEIVED';
export const GET_CRD_DATA_ERROR = 'GET_CRD_DATA_ERROR';



export function initGame() {
  return { type: INIT_GAME };
}

export function hidePair(id1, id2) {
  return { type: HIDE_PAIR, id1: id1, id2: id2 }
}
export function markCardsMatched(id1, id2) {
  return { type: MARK_CARDS_MATCHED, id1: id1, id2: id2 }
}

export function checkMatchedPair() {
  return { type: CHECK_MATCHED_PAIR };
}

export function revealCard(id) {
  return { type: REVEAL_CARD, id };
}

export function changeDifficulty(level) {
  return { type: CHANGE_DIFFICULTY, level }
}

export function getCardData() {
  return {type: GET_CRD_DATA };
}
export function getCardDataReceived(data) {
  return {type: GET_CRD_DATA_RECEIVED, data };
}
export function getCardDataError(data) {
  return {type: GET_CRD_DATA_ERROR };
}
