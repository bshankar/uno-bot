class Player {
  constructor (name) {
    this.name = name
    this.hand = []
  }

  choose (top) {
    return this.hand[0]
  }
}

module.exports = { Player }
