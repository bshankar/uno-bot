const { Deck } = require('./deck')
const { Player } = require('./player')

class Game {
  constructor (playerNames) {
    this.deck = new Deck()
    this.playerNames = playerNames
    this.directionReversed = false
  }

  start () {
    this.players = this.playerNames.map(p => new Player(p))
    this.deck.deal(this.players)
    this.top = this.deck.draw(1)[0]
    this.currentPlayer = 0
    this.drawCount = 0
    this.winningSequence = []
  }

  play (attempted = 0) {
    if (attempted > 1) return
    const player = this.players[this.currentPlayer]
    const card = player.choose(this.top, undefined, this.drawCount)
    if (card !== undefined) this.playCard(card)
    else {
      player.hand = player.hand.concat(this.deck.draw(this.drawCount || 1))
      this.drawCount = 0
      if (this.top.value[0] !== '+') this.play(attempted + 1)
    }
  }

  nextPlayer (n) {
    if (this.directionReversed === false) {
      return (this.currentPlayer + n) % this.players.length
    }
    return this.previousPlayer(n)
  }

  previousPlayer (n) {
    if (this.directionReversed === false) {
      return (this.currentPlayer - n + this.players.length) % this.players.length
    }
    return this.nextPlayer(n)
  }

  playCard (card) {
    this.top = card
    const player = this.players[this.currentPlayer]
    const index = player.hand.indexOf(card)
    player.hand.splice(index, 1)
    if (player.hand.length === 0) {
      this.winningSequence.push(player)
      this.players.splice(this.currentPlayer, 1)
      this.currentPlayer = this.previousPlayer(1)
    }
    if (this.top.value === 'skip') this.skipChance()
    else if (this.top.value === 'reverse') this.reverse()
    else if (this.top.value[0] === '+') this.drawTwoOrFour()
    else this.currentPlayer = this.nextPlayer(1)
  }

  skipChance () {
    this.currentPlayer = this.nextPlayer(2)
  }

  reverse () {
    this.directionReversed = !this.directionReversed
  }

  drawTwoOrFour () {
    let found
    this.currentPlayer = this.nextPlayer(1)
    this.drawCount = this.top.value === '+2' ? this.drawCount + 2 : this.drawCount + 4
    const player = this.players[this.currentPlayer]
    if (this.top.value === '+2') found = this.drawHelper('+')
    else if (this.top.value === '+4') found = this.drawHelper('+4')
    if (found === undefined) {
      player.hand = player.hand.concat(this.deck.draw(this.drawCount))
      this.drawCount = 0
    } else this.top = found
    this.currentPlayer = this.nextPlayer(1)
  }

  drawHelper (stringToMatch) {
    for (let i = 0; i < this.players[this.currentPlayer].hand.length; i++) {
      if (this.players[this.currentPlayer].hand[i]['value'].startsWith(stringToMatch)) {
        this.players[this.currentPlayer].hand.splice(i, 1)
        return this.players[this.currentPlayer].hand[i]
      }
    }
  }
}

module.exports = { Game }
