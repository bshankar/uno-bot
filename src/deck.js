const { Card } = require('./card')
const { shuffleArray } = require('./util')

class Deck {
  constructor () {
    this.remaining = []
    this.cardInit()
    shuffleArray(this.cards)
  }

  cardInit () {
    this.cards = []
    const colors = ['red', 'blue', 'yellow', 'green']
    // const remvalues = ['+2', 'reverse', 'skip']
    // const wildcards = ['+4', 'colorChange']
    for (let k = 0; k < 2; k++) {
      for (let i = 1; i < 10; i++) {
        for (let j = 0; j < 4; j++) {
          this.cards.push(new Card(colors[j], i + ''))
        }
      }
      // for (let i = 0; i < 4; i++) {
      // for (let j = 0; j < 3; j++) {
      // this.cards.push(new Card(colors[i], remvalues[j]))
      // }
      // }
    }
    for (let i = 0; i < 4; i++) {
      this.cards.push(new Card(colors[i], '0'))
    }
    // for (let i = 0; i < 4; i++) {
    // for (let j = 0; j < 2; j++) {
    // this.cards.push(new Card('', wildcards[j]))
    // }
    // }
  }

  deal (players) {
    for (let i = 0; i < players.length; ++i) {
      players[i].hand = this.cards.slice(7 * i, 7 * i + 7)
    }
    this.remaining = this.cards.slice(7 * players.length)
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

  shuffle () {
    shuffleArray(this.remaining)
  }
}

module.exports = { Deck }
