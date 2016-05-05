var mainState = {
    preload: function() {
      //Carreguem el sprite
      game.load.image('runner', '../img/infiniteRunner/runner.png');
    },

    create: function() {
      //Definim el color del cel
      game.stage.backgroundColor = '#00BFFF';

      //Carreguem les fisiques del phaser
      game.physics.startSystem(Phaser.Physics.ARCADE);

      //Pintem el corredor
      this.runner = game.add.sprite(100, 100, 'runner');

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
    },

    update: function() {
      //Si el corredor surt per dalt de la pantalla (es a dir que cau a un forat),
      //es eliminat i es reinicia el joc.
      //Falta implementar que si surt per l'esquerra de la pantalla també es eliminat.
      if (this.runner.y > 490){
        this.restartGame();
      }
    },

    //Funció de salt
    jump: function() {
        this.runner.body.velocity.y = -350;
    },

    //Funció de reset
    restartGame: function() {
        game.state.start('main');
    },
};



// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add and start the 'main' state to start the game
game.state.add('main', mainState, true);
