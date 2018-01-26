class Player {
  constructor (name) {
    this.name = name
    this.hand = []
  }

  choose (topCard, color, drawCount) {

    if (drawCount !== undefined) {
      // play draw equal or better card
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
