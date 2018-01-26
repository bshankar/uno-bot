class Deck {
  constructor () {
    //cards = [{"color" : ""}]
    // remaining []
  }

  card_init () {
    this.cards = {}
    var i, j
    var colors = ["red", "blue", "yellow", "green"]
    var remvalues = ["+2", "reverse", "skip"]
    var wildcards = ["+4", "colorChange"]
    for (k = 0; k <2; k++){
      for ( i = 1; i <10; i ++){
        for (j = 0; j < 4; j++){
          this.cards["color"] = colors[j]
          this.cards["value"] = i + ""
        }
      }
      for ( i = 0; i < 4; i ++){
        for (j = 0; j < 3; j++){
          this.cards["color"] = colors[j]
          this.cards["value"] = remvalues[i]
        }
      }
    }
    for ( i = 0; i < 4; i ++) {
      this.cards["color"] = colors[i]
      this.cards["value"] = "0"
    }
    for ( i = 0; i < 4; i ++){
      for (j = 0; j < 2; j++){
        this.cards["color"] = "anycolor"
        this.cards["value"] = wildcards[i]
      }
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
