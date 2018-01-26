const assert = require('assert')
const { Deck } = require('../src/deck')
const { Player } = require('../src/player')

describe('Test sanity of initial deck\'s cards', function () {
  it ('Number of cards should be 108', function () {
    const deck = new Deck()
    assert.equal(deck.cards.length, 108)
  })
  it ('Number of cards of each color should be 25', function () {
    const deck = new Deck()
    assert.equal(deck.cards.filter(c => c.color === 'blue').length, 25)
    assert.equal(deck.cards.filter(c => c.color === 'red').length, 25)
    assert.equal(deck.cards.filter(c => c.color === 'yellow').length, 25)
    assert.equal(deck.cards.filter(c => c.color === 'green').length, 25)
  })
  it ('Special cards should be 8', function () {
    const deck = new Deck()
    assert.equal(deck.cards.filter(c => c.color === '').length, 8)
  })

  it ('No undefined properties in all cards', function () {
    const deck = new Deck()
    assert.equal(deck.cards.filter(c => c.color === undefined || c.value === undefined).length, 0)
  })

  describe ('Add a few cards to the deck', function () {
    it ('Drawing 2 cards', function () {
      const deck = new Deck()
      deck.add(deck.cards[0])
      deck.add(deck.cards[1])
      deck.add(deck.cards[2])
      assert.equal(deck.remaining[0], deck.cards[0])
      assert.equal(deck.remaining[1], deck.cards[1])
      assert.equal(deck.remaining[2], deck.cards[2])
      const dc = deck.draw(2)
      assert.equal(deck.remaining.length, 1)
      assert.equal(dc.length, 2)
      assert.equal(dc[0], deck.cards[0])
      assert.equal(dc[1], deck.cards[1])
    })
  })

  describe ('Deal two players', function () {
    const deck = new Deck()
    const p1 = new Player('P1')
    const p2 = new Player('P2')
    deck.deal([p1, p2])
    it ('Each player\'s hand\'s length is 7', function () {
      assert.equal(p1.hand.length, 7)
      assert.equal(p2.hand.length, 7)
    })

    it ('The remaining cards should be 94', function () {
      assert.equal(deck.remaining.length, 94)
    })
  })
})
