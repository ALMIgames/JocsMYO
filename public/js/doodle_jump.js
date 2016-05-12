var mainState = {
//Funció de preload
  preload: function() {

    //Carreguem els sprites
    //game.load.image('player', '../img/infiniteplayer/player.png');
    game.load.spritesheet('player', '../img/doodleJump/player.png', 44, 65, 10);
    game.load.image('blocTop', '../img/infiniteRunner/grass.png');
    game.load.image('bloc', '../img/infiniteRunner/grassCenter.png');


    game.load.audio('jump', ['../audio/infiniteRunner/jump.wav', '../audio/infiniteRunner/jump.mp3']);
  },

//Funció de create
  create: function() {
    //Puntuació
    this.score = 0;
    this.labelScore = game.add.text(20, 20, "0",
      { font: "30px Arial", fill: "#ffffff" });

    //Definim el color del cel
    game.stage.backgroundColor = '#00BFFF';

    //Carreguem les fisiques del phaser
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Pintem el corredor
    this.player = game.add.sprite(200, 100, 'player');

    //I li afegim la fisica
    game.physics.arcade.enable(this.player);


    var walk = this.player.animations.add('jump');


    //Li afegim gravetat al corredor
    this.player.body.gravity.y = 1000;

    //I fem que salti quan apretem l'espai
    /*
      NOTE:
      PRIMER ESTIC FENT ELS JOCS EN TECLAT PER PODER TESTEJAR I PROVAR BE LES COSES.
      IMPLEMENTAR CONTROLS AMB MYO ASAP
    */
    cursors = game.input.keyboard.createCursorKeys();


    //Creem un grup on afegirem mes endavant els blocs que formaran el terreny
    this.blocs = game.add.group();


    //Per ultim afegim una capa plana de terreny per a començar la partida.
    for (var i = 0; i < 10; i++) {
        this.addOneBlockTop(i * 80, 450);
    }

    //I carreguem el so
    this.jumpSound = game.add.audio('jump');

  },

//Funció d'update
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
    //si el final del mapa atrapa el jugador, es eliminat i es reinicia el joc.
    //mai hauria de sortir una casella per baix del mapa, pero per si de cas
    //l'eliminem també si cau
    if (this.player.y > 490){
      this.gameOver();
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


//Funció de comprovació de salt (per al doble salt)
  canJump: function() {

  },

//Funció de salt
  jump: function() {

  },

//Funció pre crear el terreny
  addOneBlock: function(x, y) {

  },

//Funció pre crear el terreny (posició de dalt, amb herba)
  addOneBlockTop: function(x, y) {
    //Crea un bloc de terreny a la posició x-y
    var blocTop = game.add.sprite(x, y, 'blocTop');

    //Afegim blocs al grup
    this.blocs.add(blocTop);

    //Li donem fisica al bloc
    game.physics.arcade.enable(blocTop);

    blocTop.body.checkCollision.down = false;
    //I fem que sigui inamovible, ja que sino quan colisionaven es destrossava el mapa
    this.blocs.setAll('body.immovable', true);

    //I una velocitat per moure'l cap a l'esquerra
    //Nota: si augmentem la velocitat, per mantenir juntes les peces de terra
    //hem de pujar la velocitat a la que cridem la funcio de crear
    blocTop.body.velocity.x = 0;

    //Per acabar, quan un bloc surt de la pantalla el destruim
    blocTop.checkWorldBounds = true;
    blocTop.outOfBoundsKill = true;
  },

//Funcio per crear columnes de blocs
  addRowOfBlocks: function() {

  },


//Funció de reset
  restartGame: function() {

  },

//Game Over
  gameOver: function () {


  },

  submitScore: function () {
  }

};



// Initialize Phaser, and create a 400px by 500px game.
//El quart paràmetre defineix el div on pintarem el joc al nostre laravel.
var game = new Phaser.Game(400, 500, Phaser.AUTO, 'doodle-jump');

// Add and start the 'main' state to start the game
game.state.add('main', mainState, true);
