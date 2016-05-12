var mainState = {

  preload: function() {

    game.load.spritesheet('player', '../img/doodleJump/player.png', 44, 65, 10);
    game.load.image('bloc1', '../img/doodleJump/cloud_left.png');
    game.load.image('bloc2', '../img/doodleJump/cloud_center.png');
    game.load.image('bloc3', '../img/doodleJump/cloud_right.png');


    game.load.audio('jump', ['../audio/infiniteRunner/jump.wav', '../audio/infiniteRunner/jump.mp3']);
  },

  create: function() {

    this.score = 0;
    this.labelScore = game.add.text(20, 20, "0",
      { font: "30px Arial", fill: "#ffffff" });

    game.stage.backgroundColor = '#00BFFF';

    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.player = game.add.sprite(200, 100, 'player');

    game.physics.arcade.enable(this.player);

    var walk = this.player.animations.add('jump');

    this.player.body.gravity.y = 1000;

    cursors = game.input.keyboard.createCursorKeys();

    this.blocs = game.add.group();

    this.timer = game.time.events.loop(1000, this.addRowOfBlocks, this);

    for (var i = 0; i < 10; i++) {
        this.addOneBlock(i * 80, 450);
    }
    for (var i = 0; i < 10; i++) {
        this.addOneBlock(i * 80, 350);
    }
    for (var i = 0; i < 10; i++) {
        this.addOneBlock(i * 80, 250);
    }
    for (var i = 0; i < 10; i++) {
        this.addOneBlock(i * 80, 150);
    }
    for (var i = 0; i < 10; i++) {
        this.addOneBlock(i * 80, 50);
    }


    this.jumpSound = game.add.audio('jump');

  },

  update: function() {

    if (cursors.left.isDown) {
        this.player.body.velocity.x = -300;
    }
    if (cursors.right.isDown) {
        this.player.body.velocity.x = 300;
    }
    if (cursors.up.isDown) {
      console.log('up');
    }
    if (cursors.down.isDown) {
      console.log('down');
    }

    if (this.player.y > 490){
      this.restartGame();
    }

    if (this.player.x < 0){
      this.player.x = 400;
    }

    if (this.player.x > 400){
      this.player.x = 0;
    }

    game.physics.arcade.collide(this.blocs, this.player);

    if(this.player.body.touching.down) {
        this.player.body.velocity.y = -500;
        this.player.animations.stop('jump');
        this.player.animations.play('jump', 10, true);
    }
  },



  addOneBlock: function(x, y) {
    var bloc1 = game.add.sprite(x-70, y, 'bloc1');
    var bloc2 = game.add.sprite(x, y, 'bloc2');
    var bloc3 = game.add.sprite(x+70, y, 'bloc3');

    this.blocs.add(bloc1);
    this.blocs.add(bloc3);
    this.blocs.add(bloc2);

    game.physics.arcade.enable(bloc1);
    game.physics.arcade.enable(bloc2);
    game.physics.arcade.enable(bloc3);

    bloc1.body.checkCollision.down = false;
    bloc1.body.checkCollision.left = false;
    bloc1.body.checkCollision.right = false;
    bloc2.body.checkCollision.down = false;
    bloc2.body.checkCollision.left = false;
    bloc2.body.checkCollision.right = false;
    bloc3.body.checkCollision.down = false;
    bloc3.body.checkCollision.left = false;
    bloc3.body.checkCollision.right = false;
    this.blocs.setAll('body.immovable', true);

    bloc1.body.velocity.y = 100;
    bloc2.body.velocity.y = 100;
    bloc3.body.velocity.y = 100;

    //Per acabar, quan un bloc surt de la pantalla el destruim
    this.blocs.checkWorldBounds = true;
    this.blocs.outOfBoundsKill = true;
  },


  addRowOfBlocks: function() {
    var space = Math.floor(Math.random()*5);

    this.addOneBlock(space*100, 0);

    this.score += 1;
    this.labelScore.text = this.score;
  },


  restartGame: function() {
    game.state.start('main');
  },


  gameOver: function () {


  },

  submitScore: function () {
  }

};

var game = new Phaser.Game(400, 500, Phaser.AUTO, 'doodle-jump');

game.state.add('main', mainState, true);
