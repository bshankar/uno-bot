const { Deck } = require('./deck')
const { Player } = require('./player')

class Game {
  constructor (playerNames) {
    this.top = null
    this.winningSequence = []
    this.deck = new Deck()
    this.players = []
    this.currentPlayer = null
    this.playerNames = playerNames
    this.drawCount = 0
  }

  start () {
    for (let i = 0; i < this.playerNames.length; ++i) {
      this.players.push(new Player(this.playerNames[i]))
    }
    this.deck.deal(this.players)
    this.top = this.deck.draw(1)[0]
    this.currentPlayer = 0
  }

  play (attempted = 0) {
    if (attempted > 1) return
    const card = this.players[this.currentPlayer].choose(this.top)
    if (card !== undefined) this.playCard(card)
    else {
      this.deck.draw(this.drawCount || 1)
      this.play(attempted + 1)
    }
  }

  playCard (card) {
    this.top = card
    const index = this.players[this.currentPlayer].hand.indexOf(card)
    this.players[this.currentPlayer].hand.splice(index, 1)
    if (this.top.value === 'skip') this.skipChance()
    else if (this.top.value === 'reverse') this.reverse()
    else this.currentPlayer = (this.currentPlayer + 1) % this.players.length
  }

  skipChance () {
    this.currentPlayer = (this.currentPlayer + 2) % this.players.length
  }

  reverse () {
    this.players.reverse()
  }
}

module.exports = { Game }
