class Player {
  constructor (name) {
    this.name = name
    this.hand = []
  }

  findCard (fun) {
    return this.hand.filter(c => fun(c))[0]
  }

  matches (topCard, card) {
    if (topCard.color === card.color ||
        card.color === 'anycolor' ||
        topCard.value === card.value) {
      return true
    }
    return false
  }

  choose (topCard, color, drawCount) {
    if (color === undefined && drawCount === 0) {
      return this.findCard(c => this.matches(topCard, c))
    } else if (drawCount !== 0) {
      return this.findCard(c => (topCard.value === '+2' &&
                                c.value[0] === '+') ||
                           (topCard.value === '+4' &&
                            c.value === '+4'))
    } else if (color !== undefined) {
      return this.findCard(c => c.color === color)
    }
  }
}

module.exports = { Player }
