class Player {
  constructor (name) {
    this.name = name
    this.hand = []
  }

  choose (topCard, color, drawCount) {
    if (drawCount !== 0) {
      if (topCard.value === '+2') {
        for (let i = 0; i < this.hand.length; ++i) {
          if (this.hand[i].value[0] === '+') return this.hand[i]
        }
      } else if (topCard.value === '+4') {
        for (let i = 0; i < this.hand.length; ++i) {
          if (this.hand[i].value === '+4') return this.hand[i]
        }
      }
      return
    }

    if (color !== undefined) {
      for (let i = 0; i < this.hand.length; ++i) {
        if (color === this.hand[i].color) return this.hand[i]
      }
    }

    for (let i = 0; i < this.hand.length; ++i) {
      if (topCard.color === this.hand[i].color ||
          this.hand[i] === 'anycolor' ||
          topCard.value === this.hand[i].value) {
        return this.hand[i]
      }
    }
  }
}

module.exports = { Player }
