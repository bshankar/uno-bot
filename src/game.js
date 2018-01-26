const Deck = require('./deck')
const Player = require('./player')

class Game {
  constructor (playerNames) {
    this.top = null
    this.winningSequence = []
    this.deck = new Deck()
    this.players = []
    this.currentPlayer = null
    this.playerNames = playerNames
  }

  start () {
    for (let i = 0; i < this.playerNames.length; ++i) {
      this.players.push(new Player(this.playerNames[i]))
    }
    this.deck.deal(this.players)
    this.currentPlayer = 0
  }

  play () {
    const card = this.players[this.currentPlayer].choose()
    this.playCard(card)
  }

  playCard (card) {
    this.top = card
    const index = this.players[this.currentPlayer].hand.indexOf(card)
    this.players[this.currentPlayer].splice(index, 1)
    this.currentPlayer = (this.currentPlayer + 1) % this.players.length
  }
}

module.exports = { Game }