class Deck {
  constructor () {
    // cards []
    this.remaining = []
  }

  deal (players) {

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
