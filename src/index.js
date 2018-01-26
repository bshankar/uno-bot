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
// console.log(d.remaining)

const g = new Game([1, 2, 3, 4])
g.start()
console.log(g.currentPlayer)
g.players[g.currentPlayer].hand = [new Card('red', '+2')]
g.play()
console.log(g.top)
console.log(g.currentPlayer)
g.players[g.currentPlayer].hand = [new Card('green', '+2')]
g.play()
console.log(g.top)
console.log(g.currentPlayer)
g.players[g.currentPlayer].hand = [new Card('anycolor', '+4')]
g.play()
console.log(g.top)
console.log(g.currentPlayer)
g.play()
console.log(g.players[g.currentPlayer].hand.length)

// console.log(g.currentPlayer)

// g.playCard(new Card('green', 'skip'))
// console.log(g.currentPlayer)
// g.playCard(new Card('green', 'reverse'))
// console.log(g.players[g.currentPlayer])
// g.play()
// console.log(g.currentPlayer)
// console.log(g.players[0].hand.length)
// g.playCard(new Card('green', '+2'))
// console.log(g.players[0].hand.length)
