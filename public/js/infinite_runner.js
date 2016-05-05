var mainState = {
//Funció de preload
    preload: function() {
      //Carreguem els sprites
      game.load.image('runner', '../img/infiniteRunner/runner.png');
      game.load.image('bloc', '../img/infiniteRunner/bloc.png');
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
      this.runner = game.add.sprite(200, 100, 'runner');

      //I li afegim la fisica
      game.physics.arcade.enable(this.runner);

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
      spaceKey.onDown.add(this.jump, this);

      //Creem un grup on afegirem mes endavant els blocs que formaran el terreny
      this.blocs = game.add.group();

      //I una funció que fa que cada x temps es crei automaticament una columna de blocs
      this.timer = game.time.events.loop(250, this.addRowOfBlocks, this);

      //Per ultim afegim una capa plana de terreny per a començar la partida.
      for (var i = 0; i < 10; i++) {
          this.addOneBlock(i * 50, 450);
      }

    },

//Funció d'update
    update: function() {
      //Si el corredor surt per dalt de la pantalla (es a dir que cau a un forat),
      //es eliminat i es reinicia el joc.
      //Falta implementar que si surt per l'esquerra de la pantalla també es eliminat.
      if (this.runner.y > 490 || this.runner.x < 0){
        this.restartGame();
      }

      //Definim primer la velocitat a 0 i despres la colisio, ja que sino un cop
      //colisioni la velocitat es posara a 200 (veure funcio setFriction) i no
      //tornara mai a 0 (original)
      this.runner.body.velocity.x = 0;
      //Afegim la funció de colisió
      game.physics.arcade.collide(this.blocs, this.runner,
      this.setFriction, null, this);


//      this.runner.body.velocity.x = 0;
    },

//Funció de salt
    jump: function() {
          if(this.runner.body.touching.down) {
            this.runner.body.velocity.y = -480;
          }
    },

//Funció de reset
    restartGame: function() {
        game.state.start('main');
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
      bloc.body.velocity.x = -180;

      //Per acabar, quan un bloc surt de la pantalla el destruim
      bloc.checkWorldBounds = true;
      bloc.outOfBoundsKill = true;
    },

//Funcio per crear columnes de blocs
    addRowOfBlocks: function() {
        //Primer agafem aleatoriament un número (aquest serà l'altura de la columna)
        //O dit d'una altra forma, la posició de l'espai sense blocs
        //Els calculs que hi ha son per a mantenir controlat l'espai on es creen.
        var space = Math.floor(Math.random() * 3 + 6);

        //I afegim els blocs fent un espai des de space a top
        for (var i = 0; i < 10; i++) {
          if (i > space) {
            this.addOneBlock(400, i * 50);
          }
        }

        //I pujem la puntuació cada cop que es crea una columna nova.
        this.score += 1;
        this.labelScore.text = this.score;
    },

//Funcio de friccio per a que el runner no es quedi quiet quan toqui els blocs
    setFriction: function (runner, bloc) {
      runner.body.velocity.x = 200;
    },
};



// Initialize Phaser, and create a 400px by 500px game
var game = new Phaser.Game(400, 500);

// Add and start the 'main' state to start the game
game.state.add('main', mainState, true);
