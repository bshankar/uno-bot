const {Deck} = require('./deck')
const {Game} = require('./game')
const {Card} = require('./card')

// const d = new Deck()
// console.log(d.cards.length)

// d.add(d.cards[0])
// d.add(d.cards[1])
// d.add(d.cards[2])
// console.log(d.remaining)

// d.draw(2)
// console.log(d.draw(2))
// console.log(d.remaining)

const g = new Game([1, 2, 3, 4])
g.start()
g.currentPlayer = 1
g.playCard(new Card('green', 'reverse'))
g.play()
console.log(g.players[g.currentPlayer])
console.log(g.top)
