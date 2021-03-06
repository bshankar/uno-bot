const { Game } = require('../src/game')
const { Card } = require('../src/card')
const { Player } = require('../src/player')
const assert = require('assert')

describe('Test game methods', function () {
  it('Test for hand length update', function () {
    let game = new Game(['P1', 'P2', 'P3', 'P4', 'P5'])
    game.start()
    game.top = new Card('red', '6')
    game.currentColor = 'red'
    game.players[0].hand = [new Card('red', '+2'), new Card('red', '2')]
    assert.equal(2, game.players[0].hand.length)
    game.play()
    assert.equal(1, game.players[0].hand.length)
    assert.equal(2, game.drawCount)
    assert.equal(1, game.currentPlayer)
    game.players[0].hand = [new Card('red', '+2'), new Card('red', '2')]
    assert.equal(2, game.players[0].hand.length)
    game.play()
  })
  // it('Test nextPlayer', function() {
  //   let game = new Game(['P1', 'P2', 'P3', 'P4', 'P5'])
  //   game.start()
  //   assert.equal(1, game.nextPlayer(1))
  //   assert.equal(0, game.nextPlayer(5))
  // })
  // it('Test prevPlayer', function() {
  //   let game = new Game(['P1', 'P2', 'P3', 'P4', 'P5'])
  //   game.start()
  //   assert.equal(4, game.previousPlayer(1))
  //   assert.equal(0, game.previousPlayer(5))
  // })
  // it('Test draw helper', function() {
  //   let game = new Game(['P1', 'P2', 'P3', 'P4', 'P5'])
  //   game.start()
  //   game.players[0].hand = [new Card('red', '+2'), new Card('red', '2')]
  //   assert.equal(game.players[0].hand[0], game.drawHelper('+2'))
  // })
  // it('Test draw2', function() {
  //   let game = new Game(['P1', 'P2', 'P3', 'P4', 'P5'])
  //   game.start()
  //   game.top = new Card('green', '+2')
  //   game.players[1].hand = [new Card('red', '+2'), new Card('red', '2')]
  //   game.drawTwoOrFour()
  //   assert.deepEqual(new Card('red', '+2'), game.top)
  //   assert.equal(2, game.drawCount)
  // })
  // it('Test draw4', function() {
  //   let game = new Game(['P1', 'P2', 'P3', 'P4', 'P5'])
  //   game.start()
  //   game.top = new Card('', '+4')
  //   game.players[1].hand = [new Card('red', '+2'), new Card('red', '2')]
  //   game.drawTwoOrFour()
  //   assert.deepEqual(new Card('', '+4'), game.top)
  //   assert.equal(6, game.players[1].hand.length)
  // })
  // it('Test playcard', function() {
  //   let game = new Game(['P1', 'P2', 'P3', 'P4', 'P5'])
  //   game.start()
  //   game.players[0].hand = [new Card('green', '2')]
  //   game.playCard(game.players[0].hand[0])
  //   assert.deepEqual(new Card('green', '2'), game.top)
  //   assert.equal(0, game.currentPlayer)
  // })
  // it('Test current color on init', function() {
  //   let game = new Game(['P1', 'P2', 'P3', 'P4', 'P5'])
  //   game.start()
  //   game.top = new Card('green', '2')
  //   game.currentColor = game.top.color
  //   game.players[0].hand = [new Card('green', '2'), new Card('blue', '9')]
  //   game.play()
  //   assert.equal('green', game.currentColor)
  //   assert.equal(1, game.currentPlayer)
  // })
  // it('Test random color function', function() {
  //   let game = new Game(['P1', 'P2', 'P3', 'P4', 'P5'])
  //   game.start()
  //   // console.log(game.currentColor)
  //   // console.log(game.getRandColor())
  // })
  // it('Test color change on playing card', function() {
  //   let game = new Game(['P1', 'P2', 'P3', 'P4', 'P5'])
  //   game.start()
  //   game.top = new Card('red', '2')
  //   game.drawCount = 4
  //   game.players[0].hand = [new Card('green', '2'), new Card('blue', '9')]
  //   game.play()
  //   assert.equal(game.currentColor, 'green')
  // })
  // it('Test color on not playing card', function() {
  //   let game = new Game(['P1', 'P2', 'P3', 'P4', 'P5'])
  //   game.start()
  //   game.top = new Card('red', '5')
  //   game.currentColor = 'red'
  //   game.drawCount = 4
  //   game.players[0].hand = [new Card('green', '2'), new Card('blue', '9')]
  //   game.play()
  //   assert.equal(game.currentColor, 'red')
  // })
  // it('Test color on playing draw 4 card', function() {
  //   let game = new Game(['P1', 'P2', 'P3', 'P4', 'P5'])
  //   game.start()
  //   game.top = new Card('red', '4')
  //   game.currentColor = game.top.color
  //   assert.equal(game.currentColor, 'red')
  //   game.players[0].hand = [new Card('', '+4'), new Card('blue', '9')]
  //   game.play()
  //   assert.equal(1, game.players[0].hand.length)
  //   assert.deepEqual(new Card('', '+4'), game.top)
  //   console.log(game.currentColor)
  //   assert.equal(1, game.currentPlayer)
  //   game.players[1].hand = [new Card('green', '2'), new Card('blue', '8')]
  //   console.log(game.players[1].hand)
  //   game.play()
  //   console.log(game.currentColor)
  //   console.log(game.players[0].hand)
  //   console.log(game.players[1].hand)
  // })
})
