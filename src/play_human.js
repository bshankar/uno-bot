const { Game } = require('./game')
const readline = require('readline')

function isValid (game, card) {
  if (card.value === '+4') return true
  if (game.top.value === '+4') return false
  if (game.players[0].matches(game.top, card) === true) return true
  return false
}

function listenForInput (game) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })

  let drawn = false
  rl.on('line', function (line) {
    const player = game.players[game.currentPlayer]
    const n = parseInt(line)
    if (line === '') {
      if (game.drawCount > 0) {
        player.hand = player.hand.concat(game.deck.draw(game.drawCount))
        game.currentPlayer = game.nextPlayer(1)
      } else if (drawn === false) {
        player.hand = player.hand.concat(game.deck.draw(1))
        drawn = true
        if (game.players.length === 1) {
          rl.close()
          console.log('You win')
          return
        }
        show(game)
        return
      }
    } else if (isNaN(n) !== true && player.hand[n] !== undefined &&
               isValid(game, player.hand[n])) {
      const card = player.hand[parseInt(line)]
      game.playCard(card)
      if (game.players[game.currentPlayer].name === 'player') return
    } else {
      console.log('Invalid card index. Try again')
      return
    }
    drawn = false
    show(game)
    game.currentPlayer = 1
    while (game.players[game.currentPlayer].name === 'computer') game.play()
    if (game.players.length === 1) {
      rl.close()
      console.log('Computer won')
      return
    }
    show(game)
  })
}

function cardToNotation (c) {
  return c.color[0].toUpperCase() + c.value
}

function show (game) {
  const hand = game.players[0].hand
  console.log('top: ' + cardToNotation(game.top))
  console.log('Cards left (C): ', game.players[1].hand.length)
  if (game.top.value === 'colorChange') console.log('I choose: ', game.currentColor)
  console.log(hand.map((c, i) => i + ': ' + cardToNotation(c)))
}

function playComputer () {
  const players = ['player', 'computer']
  const game = new Game(players)
  game.start()
  show(game)
  while (game.players[game.currentPlayer].name !== 'player') game.play()
  console.log('Choose card index: ')
  listenForInput(game)
}

playComputer()

module.exports = {show, playComputer}
