var game = new Phaser.Game(600, 600);
// Play State
var playState = {
  create : function() {
    // Array will handle the balance itself along with its data
    this.balance = [];
    // balance[0] will be the left balance
    this.balance[0] = game.add.group();
    // set left balance weight to zero
    this.balance[0].weight = 0;
    // balance[1] will be the right balance
    this.balance[1] = game.add.group();
    // set right balance weight to zero
    this.balance[1].weight = 0;
    // The threshold upto which left and right balance can be deviated
    this.balanceThreshold = 500;
    // setting the block at the mouse click position
    game.input.onDown.add(this.placeBlock, this);
  },

  update : function() {

  },

  placeBlock: function() {
    this.block = game.add.sprite(game.input.worldX,game.input.worldY,"block");
    this.block.anchor.setTo(0.5, 0.5);
    // checked if the block is deviated from centre position
    if (game.width/2 !== this.block.x) {
      // define the side in which block have deviated 0 for left and 1 for right
      this.block.side = Math.floor(this.block.x/(game.width/2));
      // Add the block into the relevant side Array
      this.balance[this.block.side].add(this.block);
      //
      this.checkBalance();
    }
  },

  checkBalance: function() {
    var deviations = [];
    // Running loop two times to check two side deviation value
    for(var i = 0; i < 2; i++) {
      var deviation = 0;
      // Looping to check out deviation
      for (var j = 0; j < this.balance[i].length; j++) {
        // Access a block
        var block = this.balance[i]._hash[j];
        // Add deviation to of the block
        deviation += Math.abs(block.x - game.width/2);
      }
      // Left deviation and right deviation are feed to array
      deviations[i] = deviation;
    }
    // Check if the deviation exceed the threshold
    if ( Math.abs(deviations[0] - deviations[1]) > 500) {
      this.deathHandler();
    }
  },

  preload : function() {
    game.load.image('block', 'images/block100.png');
    game.load.image('bg', 'images/block100.png');
  },

  deathHandler : function() {}
};

game.state.add("playstate", playState);

// Home State
var homeState = {
  create : function() {
    var btn1 = game.add.text(game.world.centerX, game.world.centerY, 'Play', {fill : '#FFF'});
    btn1.anchor.setTo(0.5, 0.5);
    btn1.inputEnabled = true;
    btn1.events.onInputDown.add(function(){
      game.state.start("playstate");
    },this);
  },

  update : function() {},
  preload : function() {}
};

game.state.add("homestate", homeState);
game.state.start("homestate");