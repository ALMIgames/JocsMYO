var mainState = {

  preload: function() {

    game.load.spritesheet('player', '../img/doodleJump/player.png', 44, 65, 10);
    game.load.image('blocTop', '../img/infiniteRunner/grass.png');
    game.load.image('bloc', '../img/infiniteRunner/grassCenter.png');


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
        this.addOneBlockTop(i * 80, 450);
    }
    for (var i = 0; i < 10; i++) {
        this.addOneBlockTop(i * 80, 350);
    }
    for (var i = 0; i < 10; i++) {
        this.addOneBlockTop(i * 80, 250);
    }
    for (var i = 0; i < 10; i++) {
        this.addOneBlockTop(i * 80, 150);
    }
    for (var i = 0; i < 10; i++) {
        this.addOneBlockTop(i * 80, 50);
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
    var bloc = game.add.sprite(x, y, 'bloc');

    this.blocs.add(bloc);

    game.physics.arcade.enable(bloc);

    bloc.body.checkCollision.down = false;
    bloc.body.checkCollision.left = false;
    bloc.body.checkCollision.right = false;
    this.blocs.setAll('body.immovable', true);

    bloc.body.velocity.y = 100;

    //Per acabar, quan un bloc surt de la pantalla el destruim
    bloc.checkWorldBounds = true;
    bloc.outOfBoundsKill = true;
  },

  addOneBlockTop: function(x, y) {
    var blocTop = game.add.sprite(x, y, 'blocTop');

    this.blocs.add(blocTop);

    game.physics.arcade.enable(blocTop);

    blocTop.body.checkCollision.down = false;
    blocTop.body.checkCollision.left = false;
    blocTop.body.checkCollision.right = false;
    this.blocs.setAll('body.immovable', true);

    blocTop.body.velocity.y = 100;

    blocTop.checkWorldBounds = true;
    blocTop.outOfBoundsKill = true;
  },

  addRowOfBlocks: function() {
    var space = Math.floor(Math.random() * 3 + 6);
    var top = true;

    for (var i = 0; i < 10; i++) {
      if (i > space) {
        if(top){
          this.addOneBlockTop(50, 0);
          top = false;
        }
        else{
          this.addOneBlock(50, 0);
        }
      }
    }

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
