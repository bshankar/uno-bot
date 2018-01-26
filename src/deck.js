const Card = require('./card')

class Deck {
  constructor () {
    this.remaining = []
    this.cardInit()
  }

  cardInit () {
    this.cards = {}
    let colors = ['red', 'blue', 'yellow', 'green']
    let remvalues = ['+2', 'reverse', 'skip']
    let wildcards = ['+4', 'colorChange']
    for (let k = 0; k < 2; k++) {
      for (let i = 1; i < 10; i ++) {
        for (let j = 0; j < 4; j++) {
          this.cards['color'] = colors[j]
          this.cards['value'] = i + ''
        }
      }
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
          this.cards['color'] = colors[j]
          this.cards['value'] = remvalues[i]
        }
      }
    }
    for (let i = 0; i < 4; i++) {
      this.cards['color'] = colors[i]
      this.cards['value'] = '0'
    }
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 2; j++) {
        this.cards['color'] = 'anycolor'
        this.cards['value'] = wildcards[i]
      }
    }
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
