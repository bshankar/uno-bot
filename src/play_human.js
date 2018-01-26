const { Game } = require('./game')
const readline = require('readline')

function checkValid (game, card) {
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

  rl.on('line', function (line) {
    const index = parseInt(line)
    const player = game.players[game.currentPlayer]
    if (index < 0 || index >= player.hand.length) {
      console.log('Invalid index choice. Try again')
      return
    }
    if (checkValid(game, player.hand[index])) {
      game.playCard(player.hand[index])
    } else {
      console.log('This card cannot be played now. Try again')
      return
    }
    game.play()
    show(game)
  })
}

function cardToNotation (c) {
  return c.color[0].toUpperCase() + c.value
}

function show (game) {
  const hand = game.players[game.currentPlayer].hand
  console.log('top: ' + cardToNotation(game.top))
  console.log('Cards left (C): ', game.players[game.nextPlayer(1)].hand.length)
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
