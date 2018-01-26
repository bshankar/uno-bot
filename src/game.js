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
    while (this.top.color === '' || this.top.value === '+2' ||
           this.top.value === 'reverse' || this.top.value === 'skip') {
      this.deck.add(this.top)
      this.deck.shuffle()
      this.top = this.deck.draw(1)[0]
    }
    this.currentColor = this.top.color
    this.currentPlayer = 0
    this.drawCount = 0
    this.winningSequence = []
  }

  play (attempted = 0) {
    if (attempted > 1) return
    const player = this.players[this.currentPlayer]
    const card = player.choose(this.top, this.currentColor, this.drawCount)
    if (card !== undefined) this.playCard(card)
    else {
      player.hand = player.hand.concat(this.deck.draw(this.drawCount || 1))
      this.drawCount = 0
      if (this.top.value[0] !== '+') this.play(attempted + 1)
      this.currentPlayer = this.nextPlayer(1)
    }
  }

  nextPlayer (n, direction = this.directionReversed) {
    if (direction === false) {
      return (this.currentPlayer + n) % this.players.length
    }
    return this.previousPlayer(n, false)
  }

  previousPlayer (n, direction = this.directionReversed) {
    if (direction === false) {
      return (this.currentPlayer - n + this.players.length) % this.players.length
    }
    return this.nextPlayer(n, false)
  }

  playCard (card) {
    this.top = card
    this.currentColor = this.top.color === '' ? this.getRandColor() : this.top.color
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
    else if (this.top.value === 'colorChange') this.currentColor = this.getRandColor()
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
  }

  drawHelper (stringToMatch) {
    for (let i = 0; i < this.players[this.currentPlayer].hand.length; i++) {
      if (this.players[this.currentPlayer].hand[i]['value'].startsWith(stringToMatch)) {
        const card = this.players[this.currentPlayer].hand[i]
        this.players[this.currentPlayer].hand.splice(i, 1)
        this.drawCount += card.value === '+2' ? 2 : 4
        this.currentColor = stringToMatch === '+4' ? this.getRandColor : this.currentColor
        return card
      }
    }
  }
  getRandColor () {
    let colors = ['red', 'yellow', 'green', 'blue']
    let index = Math.floor(Math.random() * colors.length)
    if (colors[index] !== this.currentColor) return colors[index]
    return this.getRandColor()
  }
}

module.exports = { Game }
