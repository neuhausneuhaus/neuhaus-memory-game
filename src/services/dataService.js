import request from 'superagent'

import { GET_CRD_DATA } from "../actions";

const dataService = store => next => action => {
  next (action)
  switch (action.type) {
    case GET_CRD_DATA:
      var cardURL = 'https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json'
      request.get(cardURL).end((err, res) => {
        if (err) {
          return next({
            type: 'GET_CRD_DATA_ERROR',
            err
          })
        }
        const data = JSON.parse(res.text);
        next({
          type: 'GET_CRD_DATA_RECEIVED',
          data
        })
      })
      break
      default:
        break
  } 
}

export default dataService