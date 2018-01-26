class Player {
  constructor (name) {
    this.name = name
    this.hand = []
    this.turn = false
  }

  choose (top) {
    return this.hand[0]
  }
}

module.exports = { Player }
