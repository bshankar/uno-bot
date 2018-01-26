const Card = require('./card')

class Deck {
  constructor () {
    // cards []
    // remaining []
  }

  deal (players) {
    for (let i = 0; i < players.length; ++i) {
      players.hand.push(this.cards.slice(7 * i, 7 * i + 6))
    }
    this.remaining = players.slice(7 * players.length)
  }

  add (card) {

  }

  draw (num) {

  }
}

module.exports = { Deck }
