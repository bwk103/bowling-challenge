describe('Feature Tests', function(){

  var player;
  var roll;
  var frame;
  var game;

  beforeEach(function(){
    roll = new Roll();
    frame = new Frame();
    game = new Game();
  })

  describe('Bowling a gutter game (0 points every roll)', function(){
    beforeEach(function(){
      game.start()
      for(let i = 0; i < 20; i++){
        game.roll(0)
      }
    })

    it('has a final score of 0', function(){
      expect(game.score()).toBe(0)
    })

    it('ends the game', function(){
      expect(game.gameComplete).toBe(true)
    })
  })

  describe('Bowling a singles game (1 point every roll)', function(){
    beforeEach(function(){
      game.start()
      for(let i = 0; i < 20; i++){
        game.roll(1)
      }
    })

    it('has a final score of 20', function(){
      expect(game.score()).toBe(20)
    })

    it('ends the game', function(){
      expect(game.gameComplete).toBe(true)
    })
  })

  describe('Bowling a spares game (5 points every roll)', function(){
    beforeEach(function(){
      game.start()
      for(let i = 0; i < 21; i++){
        game.roll(5)
      }
    })

    it('has a final score of 150', function(){
      expect(game.score()).toBe(150)
    })

    it('ends the game', function(){
      expect(game.gameComplete).toBe(true)
    })
  })

  describe('Bowling a perfect game (strike every roll)', function(){
    beforeEach(function(){
      game.start()
      for(let i = 0; i < 12; i++){
        game.roll(10)
      }
    })

    it('has a final score of 300', function(){
      expect(game.score()).toBe(300)
    })

    it('ends the game', function(){
      expect(game.gameComplete).toBe(true)
    })
  })
})
