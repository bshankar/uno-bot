class Player {
  constructor (name) {
    this.name = name
    this.hand = []
  }

  findCard (fun) {
    return this.hand.filter(c => fun(c))[0]
  }

  matches (game, card) {
    if (game.currentColor === card.color ||
        card.color === '' ||
        game.top.value === card.value) {
      return true
    }
    return false
  }

  choose (game) {
    if (game.drawCount === 0) {
      return this.findCard(c => this.matches(game, c))
    } else if (game.drawCount !== 0) {
      return this.findCard(c => (game.top.value === '+2' &&
                                c.value[0] === '+') ||
                           (game.top.value === '+4' &&
                            c.value === '+4'))
    } else if (game.currentColor.length !== 0) {
      return this.findCard(c => c.color === game.currentColor)
    }
  }
}

module.exports = { Player }
