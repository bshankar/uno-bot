const Card = require('./card')

class Deck {
  constructor () {
    // cards []
    this.remaining = []
  }

  deal (players) {
    for (let i = 0; i < players.length; ++i) {
      players.hand.push(this.cards.slice(7 * i, 7 * i + 6))
    }
    this.remaining = players.slice(7 * players.length)
  }

  add (card) {
    this.remaining.push(card)
  }

  draw (num) {
    let drawnCards = []
    for (let i = 0; i < num; i++) {
      drawnCards.push(this.remaining.shift())
    }
    return drawnCards
  }
}

module.exports = { Deck }
