class Deck {
  constructor () {
    //cards = [{"color" : ""}]
    // remaining []
  }

  card_init () {
    cards = {}
    var i, j
    var colors = ["red", "blue", "yellow", "green"]
    var remvalues = ["+2", "reverse", "skip"]
    for (k = 0; k <2; k++){
      for ( i = 1; i <10; i ++){
        for (j = 0; j < 4; j++){
          cards["color"] = colors[j]
          cards["value"] = i + ""
        }
      }
      for ( i = 0; i < 4; i ++){
        for (j = 0; j < 3; j++){
          cards["color"] = colors[j]
          cards["value"] = remvalues[i]
        }
      }
    }
    for ( i = 0; i < 4; i ++) {
      cards["color"] = colors[i]
      cards["value"] = "0"
    }
    for (i = 0; i < 4; i++) {
      cards["color"] = colors[i]
      cards["value"] = "anycolor"
    }
    console.log(cards)
  }

  deal (players) {

  }

  add (card) {

  }

  draw (num) {

  }
}

module.exports = { Deck }
