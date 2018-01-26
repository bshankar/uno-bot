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
    const card = this.players[this.currentPlayer].choose(this.top, undefined, this.drawCount)
    if (card !== undefined) this.playCard(card)
    else {
      this.players[this.currentPlayer].hand = this.players[this.currentPlayer].hand.concat(this.deck.draw(this.drawCount || 1))
      if (this.top.value[0] !== '+') this.play(attempted + 1)
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
    let found
    this.drawCount = (this.top.value === '+2') ? this.drawCount + 2 : this.drawCount + 4
    const numberOfCards = this.players[this.currentPlayer].hand.length
    if (this.top.value === '+2') found = this.drawTwo(numberOfCards)
    else if (this.top.value === '+4') found = this.drawFour(numberOfCards)
    if (found === undefined) {
      this.players[this.currentPlayer].hand = this.players[this.currentPlayer].hand.concat(this.deck.draw(this.drawCount))
    } else this.top = found
    this.currentPlayer = (this.currentPlayer + 1) % this.players.length
  }

  drawTwo (num) {
    for (let i = 0; i < num; i++) {
      if (this.players[this.currentPlayer].hand[i]['value'][0] === '+') {
        this.players[this.currentPlayer].hand.splice(i, 1)
        return this.players[this.currentPlayer].hand[i]
      }
    }
  }

  drawFour (num) {
    for (let i = 0; i < num; i++) {
      if (this.players[this.currentPlayer].hand[i]['value'] === '+4') {
        this.players[this.currentPlayer].hand.splice(i, 1)
        return this.players[this.currentPlayer].hand[i]
      }
    }
  }
}

module.exports = { Game }
