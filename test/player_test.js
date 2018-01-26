const { Player } = require('../src/player')
const { Card } = require('../src/card')
const assert = require('assert')

describe('Test choose function', function () {
  it('Chooses matching card by value', function () {
    let p1 = new Player('P1')
    p1.hand = [new Card('green', '+2')]
    let chosenCard = p1.choose(new Card ('red', '+2'), undefined, 0)
    assert.equal(chosenCard, p1.hand[0])
  })
  it('Chooses matching card by color', function () {
    let p2 = new Player('P2')
    p2.hand = [new Card('red', '5')]
    let chosenCard = p2.choose(new Card ('red', '3'), undefined, 0)
    assert.equal(chosenCard, p2.hand[0])
  })
  it('Check for unmatched value', function () {
    let p2 = new Player('P2')
    p2.hand = [new Card('red', '5')]
    let chosenCard = p2.choose(new Card ('green', '3'), undefined, 0)
    assert.equal(chosenCard, undefined)
  })
  it('Chooses matching draw 2 card', function () {
    let p2 = new Player('P2')
    p2.hand = [new Card('yellow', '+2')]
    let chosenCard = p2.choose(new Card ('red', '+2'), undefined, 2)
    assert.equal(chosenCard, p2.hand[0])
  })
  it('Chooses matching draw 4 card', function () {
    let p2 = new Player('P2')
    p2.hand = [new Card('', '+4')]
    let chosenCard = p2.choose(new Card ('red', '+2'), undefined, 2)
    assert.equal(chosenCard, p2.hand[0])
  })
  it('Check for unmatched draw 4', function () {
    let p2 = new Player('P2')
    p2.hand = [new Card ('red', '+2')]
    let chosenCard = p2.choose(new Card ('', '+4'), undefined, 2)
    assert.equal(chosenCard, undefined)
  })
})
