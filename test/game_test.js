const { Game } = require('../src/game')
const { Card } = require('../src/card')
const assert = require('assert')

describe('Test game methods', function () {
  it('Test for hand length update', function () {
    let game = new Game(['P1', 'P2', 'P3', 'P4', 'P5'])
    game.start()
    game.top = new Card('red', '6')
    game.players[0].hand = [new Card('red', '+2'), new Card('red', '2')]
    assert.equal(2, game.players[0].hand.length)
    game.play()
    assert.equal(1, game.players[0].hand.length)
    assert.equal(0, game.drawCount)
    assert.equal(1, game.currentPlayer)
  })
  it('Test nextPlayer', function() {
    let game = new Game(['P1', 'P2', 'P3', 'P4', 'P5'])
    game.start()
    assert.equal(1, game.nextPlayer(1))
    assert.equal(0, game.nextPlayer(5))
  })
  it('Test prevPlayer', function() {
    let game = new Game(['P1', 'P2', 'P3', 'P4', 'P5'])
    game.start()
    assert.equal(4, game.previousPlayer(1))
    assert.equal(0, game.previousPlayer(5))
  })
  it('Test draw helper', function() {
    let game = new Game(['P1', 'P2', 'P3', 'P4', 'P5'])
    game.start()
    game.players[0].hand = [new Card('red', '+2'), new Card('red', '2')]
    assert.equal(game.players[0].hand[0], game.drawHelper('+2'))
  })
  it('Test draw2', function() {
    let game = new Game(['P1', 'P2', 'P3', 'P4', 'P5'])
    game.start()
    game.top = new Card('green', '+2')
    game.players[1].hand = [new Card('red', '+2'), new Card('red', '2')]
    game.drawTwoOrFour()
    assert.deepEqual(new Card('red', '+2'), game.top)
    assert.equal(2, game.drawCount)
  })
  it('Test draw4', function() {
    let game = new Game(['P1', 'P2', 'P3', 'P4', 'P5'])
    game.start()
    game.top = new Card('anycolor', '+4')
    game.players[1].hand = [new Card('red', '+2'), new Card('red', '2')]
    game.drawTwoOrFour()
    assert.deepEqual(new Card('anycolor', '+4'), game.top)
    assert.equal(6, game.players[1].hand.length)
  })
  it('Test playcard', function() {
    let game = new Game(['P1', 'P2', 'P3', 'P4', 'P5'])
    game.start()
    game.players[0].hand = [new Card('green', '2')]
    game.playCard(game.players[0].hand[0])
    assert.deepEqual(new Card('green', '2'), game.top)
    assert.equal(0, game.currentPlayer)
    console.log(game.winningSequence)
  })
})
