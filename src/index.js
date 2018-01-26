const {Deck} = require('./deck')
const {Game} = require('./game')
const {Card} = require('./card')

// const d = new Deck()
// console.log(d.cards.length)

// d.add(d.cards[g.currentPlayer])
// d.add(d.cards[1])
// d.add(d.cards[2])
// console.log(d.remaining)

// d.draw(2)
// console.log(d.remaining)

const g = new Game(['P1', 'P2', 'P3', 'P4'])
g.start()

console.log(g.currentPlayer)
console.log(g.players[0].name)
g.players[0].hand = [new Card('red', '+2')]
console.log(g.players[0].hand.length)
g.play()
console.log('After playing')

console.log(g.currentPlayer)
console.log(g.players[1].name)
console.log(g.players[1].hand.length)
console.log(g.top)
g.players[1].hand = [new Card('green', '+2')]
console.log(g.players[1].hand.length)
g.play()
console.log('After playing')

console.log(g.currentPlayer)
console.log(g.players[2].name)
console.log(g.players[2].hand.length)
console.log(g.top)
g.players[2].hand = [new Card('anycolor', '+4')]
console.log(g.players[2].hand.length)
g.play()
console.log('After playing')

console.log(g.currentPlayer)
console.log(g.players[3].name)
console.log(g.players[3].hand.length)
console.log(g.top)
g.play()
console.log('After playing')

console.log(g.currentPlayer)
console.log(g.players[g.currentPlayer].name)
console.log(g.players[g.currentPlayer].hand.length)

// console.log(g.currentPlayerer)

// g.playCard(new Card('green', 'skip'))
// console.log(g.currentPlayerer)
// g.playCard(new Card('green', 'reverse'))
// console.log(g.players[g.currentPlayerer])
// g.play()
// console.log(g.currentPlayerer)
// console.log(g.players[g.currentPlayer].hand.length)
// g.playCard(new Card('green', '+2'))
// console.log(g.players[g.currentPlayer].hand.length)
