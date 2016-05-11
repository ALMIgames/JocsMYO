var mainState = {
//Funció de preload
  preload: function() {
    //Carreguem els sprites
    //game.load.image('runner', '../img/infiniteRunner/runner.png');
    game.load.spritesheet('scottpilgrim', '../img/infiniteRunner/scottpilgrim.png', 40, 48, 8);
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
    //this.runner = game.add.sprite(200, 100, 'runner');
    this.runner = game.add.sprite(200, 100, 'scottpilgrim');

    //I li afegim la fisica
    game.physics.arcade.enable(this.runner);


    var walk = this.runner.animations.add('walk');

     //  And this starts the animation playing by using its key ("walk")
     //  30 is the frame rate (30fps)
     //  true means it will loop when it finishes
     this.runner.animations.play('walk', 20, true);

    //Li afegim gravetat al corredor
    this.runner.body.gravity.y = 1000;

    //I fem que salti quan apretem l'espai
    /*
      NOTE:
      PRIMER ESTIC FENT ELS JOCS EN TECLAT PER PODER TESTEJAR I PROVAR BE LES COSES.
      IMPLEMENTAR CONTROLS AMB MYO ASAP
    */
    var spaceKey = game.input.keyboard.addKey(
                   Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.canJump, this);

    var rKey = game.input.keyboard.addKey(
                   Phaser.Keyboard.R);
    rKey.onDown.add(this.restartGame, this);

    //Creem un grup on afegirem mes endavant els blocs que formaran el terreny
    this.blocs = game.add.group();

    //I una funció que fa que cada x temps es crei automaticament una columna de blocs
    this.timer = game.time.events.loop(317, this.addRowOfBlocks, this);

    //Per ultim afegim una capa plana de terreny per a començar la partida.
    for (var i = 0; i < 10; i++) {
        this.addOneBlockTop(i * 80, 450);
    }

    //Posem el contador de salt a 0 al crear, no entenc per que començava a 2
    //si no tocava al terra
    this.saltCount = 0;

    //I carreguem el so
    this.jumpSound = game.add.audio('jump');

  },

//Funció d'update
  update: function() {


    //si el final del mapa atrapa el jugador, es eliminat i es reinicia el joc.
    //mai hauria de sortir una casella per baix del mapa, pero per si de cas
    //l'eliminem també si cau
    if (this.runner.y > 490 || this.runner.x < 0){
      this.gameOver();
    }

    //Definim primer la velocitat a 0 i despres la colisio, ja que sino un cop
    //colisioni la velocitat es posara a 200 (veure funcio setFriction) i no
    //tornara mai a 0 (original)
    this.runner.body.velocity.x = 0;

    //Afegim la funció de colisió amb setFriction (veure funcio setFriction)
    game.physics.arcade.collide(this.blocs, this.runner,
    this.setFriction, null, this);

    //Si l'algle es mes gran de 0 graus (quan salta puja)
    //el va baixant fins arribar a 0 (recte)

    //comentat per que posarem animacio de salt

    // if (this.runner.angle < 0) {
    //     this.runner.angle += 1;
    //   }

    //si el corredor toca al terra te dos salts (per al doble salt)
    //aprofito l'if per dir-li que si no toca pari l'animacio de correr
    if(this.runner.body.touching.down) {
      this.saltCount = 2;
      this.runner.animations.play('walk', 20, true);
    }
    else {
      this.runner.animations.stop('walk', 20, true);
    }
  },


//Funció de comprovació de salt (per al doble salt)
  canJump: function() {
    if(this.saltCount > 0) {
      this.jumpSound.play();
      this.jump();
    }
  },

//Funció de salt
  jump: function() {
    this.runner.body.velocity.y = -480;

    //Animacio per a que rote cap a dalt quan salta
    // var animation = game.add.tween(this.runner);
    // animation.to({angle: -20}, 100);
    // animation.start();

    this.saltCount--;
  },

//Funció pre crear el terreny
  addOneBlock: function(x, y) {
    //Crea un bloc de terreny a la posició x-y
    var bloc = game.add.sprite(x, y, 'bloc');

    //Afegim blocs al grup
    this.blocs.add(bloc);

    //Li donem fisica al bloc
    game.physics.arcade.enable(bloc);

    bloc.body.checkCollision.down = false;
    //I fem que sigui inamovible, ja que sino quan colisionaven es destrossava el mapa
    this.blocs.setAll('body.immovable', true);

    //I una velocitat per moure'l cap a l'esquerra
    //Nota: si augmentem la velocitat, per mantenir juntes les peces de terra
    //hem de pujar la velocitat a la que cridem la funcio de crear
    bloc.body.velocity.x = -250;

    //Per acabar, quan un bloc surt de la pantalla el destruim
    bloc.checkWorldBounds = true;
    bloc.outOfBoundsKill = true;
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
    blocTop.body.velocity.x = -250;

    //Per acabar, quan un bloc surt de la pantalla el destruim
    blocTop.checkWorldBounds = true;
    blocTop.outOfBoundsKill = true;
  },

//Funcio per crear columnes de blocs
  addRowOfBlocks: function() {
    //Primer agafem aleatoriament un número (aquest serà l'altura de la columna)
    //O dit d'una altra forma, la posició de l'espai sense blocs
    //Els calculs que hi ha son per a mantenir controlat l'espai on es creen.
    var space = Math.floor(Math.random() * 3 + 6);
    var top = true;
    //I afegim els blocs fent un espai des de space a top
    for (var i = 0; i < 10; i++) {
      if (i > space) {
        //Si es la primera, posem eb bloc top (amb herba)
        if(top){
          this.addOneBlockTop(400, (i * 50));
          top = false;
        }
        else{
          this.addOneBlock(400, (i * 50));
        }
      }
    }

    //I pujem la puntuació cada cop que es crea una columna nova.
    this.score += 1;
    this.labelScore.text = this.score;
  },

//Funcio de friccio per a que el runner no es quedi quiet quan toqui els blocs
  setFriction: function (runner, bloc) {
    runner.body.velocity.x = 250;
  },

//Funció de reset
  restartGame: function() {
    //Si el joc esta pausat ( o en game over ) posem el paused a false
    //sino no deixa premer tecles
    if(game.paused == true){
      game.paused = false;
    }
    game.state.start('main');
  },

//Game Over
  gameOver: function () {
    //Pausem el joc
    game.paused = true;

    //Definim el text
    var stateText;

    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '30px Arial', fill: '#fff' });
    stateText.text=" GAME OVER \n R per reiniciar \n SCORE: " + this.labelScore.text;

    stateText.align = 'center';
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = true;

    this.submitScore();

  },
  submitScore: function () {
    // JSON.stringify(this.labelScore.text[0].innerHTML);

    $.ajax({
        url: 'infiniterunner?score=' + this.labelScore.text
    })

    .done(function () {
        console.log('done');

        var save = confirm("Voleu desar la puntuació?");
        if (save) {
            console.log('Si');

        } else {
            console.log('No');
        }
    })

    .fail(function () {
        console.log('failed');
    });
  }

};



// Initialize Phaser, and create a 400px by 500px game.
//El quart paràmetre defineix el div on pintarem el joc al nostre laravel.
var game = new Phaser.Game(400, 500, Phaser.AUTO, 'infinite-runner');

// Add and start the 'main' state to start the game
game.state.add('main', mainState, true);
