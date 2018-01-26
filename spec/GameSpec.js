describe('Game', function(){
  var game;
  var roll;
  var frame;

  beforeEach(function(){
    game = new Game();
    frame = {
      isComplete: function(){
        return true;
      },
      addRoll: function(frame){
        return true;
      },
      _rolls: [],
    }
  })

  describe('#start', function(){
    it('starts the first frame', function(){
      expect(game._frames.length).toBe(0)
      game.start()
      expect(game._frames.length).toBe(1);
    })
  })

  describe('#currentFrame', function(){
    it('returns the number of the current frame', function(){
      game.start();
      expect(game.currentFrame()).toEqual(1)
    })
  });

  describe('#nextFrame', function(){
    it('goes to the next frame', function(){
      game.start();
      game.nextFrame();
      expect(game._frames.length).toEqual(2);
    })

    it('does not create another frame if the game already has 10 frames', function(){

      game.start();
      for(let i= 0; i<20; i++){
        game.roll(3);
      }
      expect(game._frames.length).toEqual(10);
    })
  })

  describe('#score', function(){
    it('returns the current score', function(){
      expect(game.score()).toBe(0)
    })
  })

  describe('#roll', function(){

    describe('during the game', function(){
      it('rolls a ball', function(){
        roll = jasmine.createSpyObj('roll', ['addScore'])
        game.start();
        game.roll(5, roll);
        expect(roll.addScore).toHaveBeenCalled();
      })

      it('checks whether the frame is over', function(){
        roll = jasmine.createSpyObj('roll', ['addScore'])
        spyOn(frame, 'isComplete')
        game.start(frame);
        game.roll(3, roll);
        expect(frame.isComplete).toHaveBeenCalled();
      })

      it('moves to the next frame if the current frame is over', function(){
        roll = jasmine.createSpyObj('roll', ['addScore', 'isComplete'])
        game.start();
        game.roll(3);
        game.roll(5);
        expect(game.currentFrame()).toEqual(2);
      })

      it('gets the frame score when complete', function(){
        game.start()
        game.roll(3);
        game.roll(5);
        expect(game.score()).toEqual(8);
      })

      it('adds the frame score to the total', function(){
        game.start()
        for(let i =0;i<20;i++){
          game.roll(1)
        }
        expect(game.score()).toEqual(20);
      })
    })
  })

  describe('#gameOver', function(){

    it('confirms the game is over and tells the player their score', function(){
      game.start();
      for(let i=0; i<10; i++){
        game.roll(1)
      }
      expect(game.gameOver()).toEqual('Game Over. You scored 10')
    })
  })
})
