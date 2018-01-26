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
    else if (this.top.value[0] === '+') this.drawTwoOrFour()
    else this.currentPlayer = (this.currentPlayer + 1) % this.players.length
  }

  skipChance () {
    this.currentPlayer = (this.currentPlayer + 2) % this.players.length
  }

  reverse () {
    this.players.reverse()
    this.currentPlayer = (this.players.length - this.currentPlayer) % this.players.length
  }

  drawTwoOrFour () {
    const numberOfCards = this.players[this.currentPlayer].hand.length
    if (this.top.value === '+2') {
      this.drawCount += 2
      for (let i = 0; i < numberOfCards; i++) {
        if (this.players[this.currentPlayer].hand[i]['value'][0] === '+') {
          this.top = this.players[this.currentPlayer].hand[i]
          this.players[this.currentPlayer].hand.splice(i, 1)
          this.currentPlayer = (this.currentPlayer + 1) % this.players.length
        }
      }
    } else if (this.top.value === '+4') {
      this.drawCount += 4
      for (let i = 0; i < numberOfCards; i++) {
        if (this.players[this.currentPlayer].hand[i]['value'][0] === '+4') {
          this.top = this.players[this.currentPlayer].hand[i]
          this.players[this.currentPlayer].hand.splice(i, 1)
          this.currentPlayer = (this.currentPlayer + 1) % this.players.length
        }
      }
    } else {
      this.players[this.currentPlayer].hand.concat(this.deck.draw(1))
      this.currentPlayer = (this.currentPlayer + 1) % this.players.length
    }
  }
}

module.exports = { Game }
