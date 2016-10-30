var game = new Phaser.Game(1000, 600, Phaser.AUTO, '' );/*{ preload: preload, create: create, update: update, render: render }*/

var LevelOne = function( game ) {};

LevelOne.Boot = function( game ) {};

var player;
var platforms;
var cursors;
var stars;
var diamonds;
var score = 0;
var scoreText, promptText;
var style1 = { font: '32px Arial', fill: '#FFF' },
    style2 = { font: '22px Arial', fill: '#FFF', align: 'centerY' };
var opaqimg;
var timer, timerEvent, text

LevelOne.Boot.prototype = {
  preload: function() {

        game.load.image('background', 'assets/phaser_background-02.png');
        game.load.image('opacity', 'assets/opacity-02.png');
        //game.load.image('ground', 'assets/platform.png');
        game.load.image('ground', 'assets/walls/ground.png');
        game.load.image('ground-right', 'assets/walls/ground.png');
        game.load.image('inner-wall-h', 'assets/walls/inner-wall-h.png');
        game.load.image('inner-wall-v', 'assets/walls/inner-wall-v.png');
        game.load.image('side-wall', 'assets/walls/side-wall.png');
        game.load.image('back-wall', 'assets/walls/back-wall.png');
        game.load.image('entrance', 'assets/walls/entrance.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('diamond', 'assets/diamond.png')
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    },

  create: function () {


    //create the external walls
    this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();

      // Create a custom timer
      timer = game.time.create();

      // Create a delay countdown timer, given params.
      timerEvent = timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 30, this.endTimer, this);

      // Start the timer!
      timer.start();

      //  We're going to be using physics, so enable the Arcade Physics system
      game.physics.startSystem(Phaser.Physics.ARCADE);

      // The player and its settings
      player = game.add.sprite(game.world.centerX, game.world.height - 0, 'dude')

      //  A simple background for our game
      game.add.tileSprite(0, 0, 1920, 1920, 'background');
      game.world.setBounds(0, 0, 1920, 1920);

      //  The platforms group contains the walls to containethe sprite
      platforms = game.add.group();

      opaqimg = game.add.sprite(1000, 600, 'opacity');
      opaqimg.fixedToCamera = true;
      opaqimg.cameraOffset.setTo(0, 0);

      //  We will enable physics for any object that is created in this group
      platforms.enableBody = true;

      this.ground = game.add.group();
      this.ground.enableBody = true;

      //this.ground.create(1014, game.world.height - 330, 'ground');
      var ground = platforms.create(60, game.world.height - 1860, 'side-wall');
      ground.body.immovable = true;
      var ground = platforms.create(60, game.world.height - 1860, 'back-wall');
      ground.body.immovable = true;
      var ground = platforms.create(1842, game.world.height - 1860, 'side-wall');
      ground.body.immovable = true;
      var ground = platforms.create(1014, game.world.height - 330, 'entrance');
      ground.body.immovable = true;
      var ground = platforms.create(888, game.world.height - 330, 'entrance');
      ground.body.immovable = true;

      // Here we create the bottom edge of the bank - ground.
      var ground = platforms.create(1014, game.world.height - 330, 'ground');
      //  This stops it from falling away when you jump on it
      ground.body.immovable = true;

      var ground = platforms.create(60, game.world.height - 330, 'ground');
      ground.body.immovable = true;
      //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
      ground.scale.setTo(1, 1);

      // create the internal bank walls that cannot move and are half the size of extrnal walls
      this.wall = game.add.group();
      this.wall.enableBody = true;

      var wall = platforms.create(560, 1400, 'inner-wall-h');
      wall.body.immovable = true;
      var wall = platforms.create(560, 635, 'inner-wall-v');
      wall.body.immovable = true;
      var wall = platforms.create(1326, 635, 'inner-wall-v');
      wall.body.immovable = true;

      wall.scale.setTo(1,1);


       // The player and its settings
      // player = game.add.sprite(32, game.world.height - 550, 'dude');
      player = game.add.sprite(game.world.centerX, game.world.height - 0, 'dude')

      //  We need to enable physics on the player
      game.physics.arcade.enable(player);

      // player.body.gravity.y = 300;
      player.body.collideWorldBounds = true;

      //  Our two animations, walking left and right.
      player.animations.add('left', [0, 1, 2, 3], 10, true);
      player.animations.add('right', [5, 6, 7, 8], 10, true);

      //  Our controls.
      cursors = game.input.keyboard.createCursorKeys();

      //  Finally some stars to collect
      stars = game.add.group();

      // Adding Diamonds
      diamonds = game.add.group()

      //  We will enable physics for any star that is created in this group
      stars.enableBody = true;

      diamonds.enableBody = true;

      //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++)
      {
          //  Create a star inside of the 'stars' group
          var star = stars.create(i * 70, 1500, 'star');

      }

      for (var i = 0; i < 6; i++)
      {
          //  Create a star inside of the 'stars' group
          var diamond = diamonds.create(i * 50, 1550, 'diamond');


      }

      //  The current level score controls
      scoreText = game.add.text(16, 16, 'score: 0', style1);
      scoreText.fixedToCamera = true

      // promptText variable
      promptText = game.add.text(420, 506, 'Press (key) to (action)', style2);
      promptText.fixedToCamera = true

      game.camera.follow(player);
      game.camera.deadzone = new Phaser.Rectangle(450, 250, 100, 100);
  },

  update: function () {

       //  Collide the player and the stars with the platforms
      game.physics.arcade.collide(player, platforms);
      game.physics.arcade.collide(stars, platforms);
      game.physics.arcade.collide(diamonds, platforms)

      //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
      game.physics.arcade.overlap(player, stars, this.collectStar, null, this);
      game.physics.arcade.overlap(player, diamonds, this.collectDiamond, null, this);


      //  Reset the players velocity (movement)
      player.body.velocity.x = 0;
      player.body.velocity.y = 0;

      if (cursors.left.isDown)
      {
          //  Move to the left
          player.body.velocity.x = -150;

          player.animations.play('left');
      }
      else if (cursors.right.isDown)
      {
          //  Move to the right
          player.body.velocity.x = 150;

          player.animations.play('right');
      }
      else
      {
          //  Stand still
          player.animations.stop();

          player.frame = 4;
      }

      if (cursors.up.isDown)
      {
          player.body.velocity.y = -150;
      }
      else if (cursors.down.isDown)
      {
          player.body.velocity.y = 150;
      }
  },
  render: function () {
    if (timer.running) {
      game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 940, 20, "#ff0");
    }
    else {
      game.debug.text("Done!", 940, 14, "#0f0");
    }
    // For camera debugging only. Plz don't delete.
    // game.debug.cameraInfo(game.camera, 32, 32);
    // game.debug.spriteCoords(player, 32, 500);
  },
  endTimer: function () {
    // Stop the timer when the delayed event triggers
    timer.stop();
  },
  formatTime: function (s) {
    // Conver into seconds.
    var minutes = "0" + Math.floor(s/ 60);
    var seconds = "0" + Math.floor(s - minutes * 60);
    return minutes.substr(-2) + ":" +seconds.substr(-2)
  },
  collectStar: function (player, star) {
      // Removes the star from the screen
      star.kill();

      //  Add and update the score
      score += 10;
      scoreText.text = 'Score: ' + score;

  },
  collectDiamond: function(player, diamond) {

      // Removes the star from the screen
      diamond.kill();


      //  Add and update the score
      score += 50;
      scoreText.text = 'Score: ' + score;
  }
}; // END OF LevelOne

game.state.add('Boot', LevelOne.Boot);
game.state.start('Boot');
