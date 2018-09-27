[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.png?v=103)](https://opensource.org/licenses/mit-license.php)
[![Dependencies](https://david-dm.org/neuhausneuhaus/neuhaus-memory-game.svg)](https://david-dm.org/neuhausneuhaus/neuhaus-memory-game)
![GitHub top language](https://img.shields.io/github/languages/top/badges/shields.svg)


# NYT Code Challenge - Memory Game

This is my submission for the [NYT Web Code Test](https://github.com/nytm/games-web-code-test), a playable version of the card-matching game Memory.


## Getting Started:
  To run the app: Clone this repo locally, navigate to it's parent directory in your terminal, and run:
  ```
    npm install
  ```
  and
  ```
    npm start
  ```

  The app will be available at http://localhost:3000 .

## Packages/Tools Used, and why:

* [create-react-app](https://github.com/facebook/create-react-app) - I first considered rewrite my app on top of a create-react-app template, as opposed to the suggested [kyt](https://github.com/NYTimes/kyt), after running into issues with implementing a Redux store with the prebuilt KYT Server Side Rendering. I decided that CRA would be the path of least resistance after reading this [KYT Issue Comment](https://github.com/NYTimes/kyt/issues/213#issuecomment-277010440), and learning that Jan Hoogeveen and the folks at CLEVER°FRANKE had deprecated [their version of KYT Starter with Redux](https://github.com/cleverfranke/cf-kyt-starter-universal-redux) in favor of create-react-app.
* [Redux](https://github.com/reduxjs/redux) - Having used [reflux](https://github.com/reflux/refluxjs) at my previous job, and noticing that redux is used in several NYT products, I thought that this would be the perfect opportunity to try my hand at Redux. Suffice it to say that I learned a lot, and am a big fan. No more passing props down through every single component!
* [styled-components](https://github.com/styled-components/styled-components) - Though I usually just use the [BEM Naming convention](http://getbem.com/) and SCSS, there's only so many times that you can hear that [CSS-in-JS is the future](https://medium.com/commite/warning-css-in-js-is-the-future-d411fc3e42d5) without seeing what all the fuss is about. I took this as an opportunity to try styled-components out.
* [superagent](https://github.com/visionmedia/superagent) - AJAX API used for fetching card data.


## Next Steps
In deciding when this challenge was "complete" and ready to submit, my threshold was to develop this app until I had:
- Created a UI that was both functional and fun to use
- Learn some new technologies that I feel will be useful to me in the future
- Give a general sense of my style

These are the next steps I would take in continuing to develop this app:
- [ ] Add responsive grid to the card board.
- [ ] Write Unit Tests
- [ ] Create stronger visual indicators for user actions like correct/incorrect matches, and completing the game
- [ ] Create a database to track high scores
