const Card = require('./card')

class Deck {
  constructor () {
    this.remaining = []
  }

  cardInit () {
    this.cards = {}
    var i, j
    var colors = ["red", "blue", "yellow", "green"]
    var remvalues = ["+2", "reverse", "skip"]
    var wildcards = ["+4", "colorChange"]
    for (k = 0; k <2; k++){
      for ( i = 1; i <10; i ++){
        for (j = 0; j < 4; j++){
          this.cards["color"] = colors[j]
          this.cards["value"] = i + ""
        }
      }
      for ( i = 0; i < 4; i ++){
        for (j = 0; j < 3; j++){
          this.cards["color"] = colors[j]
          this.cards["value"] = remvalues[i]
        }
      }
    }
    for ( i = 0; i < 4; i ++) {
      this.cards["color"] = colors[i]
      this.cards["value"] = "0"
    }
    for ( i = 0; i < 4; i ++){
      for (j = 0; j < 2; j++){
        this.cards["color"] = "anycolor"
        this.cards["value"] = wildcards[i]
      }
    }
    console.log(cards)
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
