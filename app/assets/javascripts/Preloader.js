var Heist = Heist || {};

Heist.Preloader = function (game) {
  this.background = null;

};

Heist.Preloader.prototype = {
  preload: function () {
      this.load.image('background', 'assets/phaser_background-02.png');
      this.load.image('opacity', 'assets/opacity-02.png');
      this.load.image('key', 'assets/key-01.png');
        //this.load.image('ground', 'assets/platform.png');
        this.load.image('ground', 'assets/walls/ground.png');
        this.load.image('ground-right', 'assets/walls/ground.png');
        this.load.image('inner-wall-h', 'assets/walls/inner-wall-h.png');
        this.load.image('inner-wall-v', 'assets/walls/inner-wall-v.png');
        this.load.image('inner-wall-h-small', 'assets/walls/inner-wall-h-small.png');
        this.load.image('inner-wall-v-small', 'assets/walls/inner-wall-v-small.png');
        this.load.image('side-wall', 'assets/walls/side-wall.png');
        this.load.image('back-wall', 'assets/walls/back-wall.png');
        this.load.image('entrance', 'assets/walls/entrance.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('diamond', 'assets/diamond.png')
        this.load.image('firstaid', 'assets/firstaid.png')
        this.load.image('guard', 'assets/baddie.png')
        this.load.image('background', 'assets/phaser_background-02.png');
        this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        this.load.spritesheet('button', 'assets/number-buttons-90x90.png', 90, 90);
  },
  create: function() {
    this.state.start('MainMenu')
  },

  update: function() {

  }


};
