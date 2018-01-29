describe('Game', function(){
  var game;
  var roll;
  var frame;
  var frameWithSingleRoll;

  beforeEach(function(){
    game = new Game();
    frame = {
      isComplete: function(){
        return false;
      },
      addRoll: function(frame){
        return true;
      },
      isFirstRoll: function(frame){
        return true;
      },
      frameScore: function(){
        return 8;
      },
      hasStrike: function(){
        return false;
      },
      endFrame: function(){
        return false;
      },
      _rolls: function(){
        return roll
      },
      _rolls: [],
    },
    frameWithSingleRoll = {
      isComplete: function(){
        return false;
      },
      addRoll: function(frame){
        return true;
      },
      isFirstRoll: function(frame){
        return false;
      },
      frameScore: function(){
        return 10;
      },
      hasStrike: function(){
        return false;
      },
      endFrame: function(){
        return true;
      },
      _rolls: [roll]
    };
    roll = {
      addScore: function(){
        return true;
      },
      score: function(){
        return 5;
      }
    };
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

    beforeEach(function(){
      game.start()
    })

    it('goes to the next frame', function(){
      game.nextFrame();
      expect(game.currentFrame()).toEqual(2);
    })

    it('does not create another frame if the game already has 10 frames', function(){
      for(let i= 0; i<20; i++){
        game.roll(3);
      }
      expect(game._frames.length).toEqual(10);
    })
  })

  describe('#score', function(){
    it('returns the current game score', function(){
      game.start()
      expect(game.score()).toBe(0)
      game.roll(3)
      game.roll(3)
      expect(game.score()).toEqual(6)
    })
  })

  describe('#addScore', function(){
    it('checks the frameScore', function(){
      spyOn(frameWithSingleRoll, 'frameScore')
      game.start(frameWithSingleRoll)
      game.roll(3)
      expect(frameWithSingleRoll.frameScore).toHaveBeenCalled();
    })

    describe('when TWO ROLLS in a frame', function(){
      it('adds the cumulative value to the game score', function(){
        game.start()
        game.roll(5)
        game.roll(3)
        expect(game.score()).toEqual(8)
      })
    })

    describe('when STRIKE scored', function(){
      it('adds 10 to the game score', function(){
        game.start()
        game.roll(10)
        expect(game.score()).toEqual(10)
      })
    })
  })

  describe('#gameOver', function(){

    it('sets ends the game', function(){
      game.gameOver();
      expect(game.gameComplete).toBe(true)
    })

    it('confirms the game is over and tells the player their score', function(){
      game.start();
      for(let i=0; i<10; i++){
        game.roll(1)
      }
      expect(game.gameOver()).toEqual('Game Over. You scored 10')
    })
  })

  describe('#roll', function(){

    describe('when FIRST ROLL of the frame and NOT A STRIKE', function(){

      it('rolls a ball', function(){
        spyOn(roll, 'addScore')
        game.start();
        game.roll(5, roll);
        expect(roll.addScore).toHaveBeenCalledWith(5);
      })

      it('adds the roll to the current frame', function(){
        spyOn(frame, 'addRoll')
        game.start(frame)
        game.roll(5)
        expect(frame.addRoll).toHaveBeenCalled();
      });

      it('checks whether the player scored a strike', function(){
        spyOn(game, '_strikeScored')
        game.start(frame)
        game.roll(8)
        expect(game._strikeScored).not.toHaveBeenCalled();
      })
    })

    describe('when FIRST ROLL of the frame and A STRIKE', function(){

      it('rolls a ball', function(){
        spyOn(roll, 'addScore')
        game.start()
        game.roll(10, roll)
        expect(roll.addScore).toHaveBeenCalledWith(10)
      })

      it('adds the roll to the current frame', function(){
        spyOn(frame, 'addRoll')
        game.start(frame)
        game.roll(10)
        expect(frame.addRoll).toHaveBeenCalled();
      })

      it('checks whether the player scored a strike', function(){
        spyOn(game, '_strikeScored')
        game.start(frame)
        game.roll(10)
        expect(game._strikeScored).toHaveBeenCalled();
      })

      it('ends the current frame', function(){
        spyOn(frame, 'endFrame')
        game.start(frame)
        game.roll(10)
        expect(frame.endFrame).toHaveBeenCalled();
      })

      it('adds the frame score to the game score', function(){
        spyOn(game, 'addScore')
        game.start(frame)
        game.roll(10)
        expect(game.addScore).toHaveBeenCalled()
      })

      describe('when NOT in FINAL FRAME', function(){
        it('does not end the game', function(){
          spyOn(game, 'gameOver')
          game.start(frame)
          for(let i =0; i< 5; i++){
            game.roll(10)
          }
          expect(game.gameOver).not.toHaveBeenCalled();
        })

        it('moves to the next frame', function(){
          spyOn(game, 'nextFrame')
          game.start(frame)
          game.roll(10)
          expect(game.nextFrame).toHaveBeenCalled();
        })
      })

      describe('when in FINAL FRAME', function(){
        it('ends the game', function(){
          spyOn(game, 'gameOver')
          game.start(frame)
          for(let i =0; i< 10; i++){
            game.roll(10)
          }
          expect(game.gameOver).toHaveBeenCalled()
        })
      })

    })

    describe('when SECOND ROLL of the frame', function(){
      describe('when NOT in FINAL FRAME', function(){
        it('rolls a ball', function(){
          spyOn(roll, 'addScore')
          game.start(frameWithSingleRoll)
          game.roll(3, roll)
          expect(roll.addScore).toHaveBeenCalled();
        })

        it('adds the roll to the frame', function(){
          spyOn(frameWithSingleRoll, 'addRoll')
          game.start(frameWithSingleRoll)
          game.roll(3)
          expect(frameWithSingleRoll.addRoll).toHaveBeenCalled()
        })

        it('ends the current frame', function(){
          spyOn(frameWithSingleRoll, 'endFrame')
          game.start(frameWithSingleRoll)
          game.roll(2)
          expect(frameWithSingleRoll.endFrame).toHaveBeenCalled()
        })

        it('adds the frame score to the game score', function(){
          spyOn(game, 'addScore')
          game.start(frameWithSingleRoll)
          game.roll(2)
          expect(game.addScore).toHaveBeenCalled();
        })

        it('raises an error if the roll is invalid', function(){
          game.start(frameWithSingleRoll)
          message = 'That score is impossible.'
          expect(function() { game.roll(10) }).toThrowError(message)
        })
      })

      describe('when in FINAL FRAME', function(){
        it('ends the game', function(){
          game.start()
          for(let i = 0; i < 20; i++){
            game.roll(2)
          }
          expect(game._isGameOver()).toBe(true)
        });
      })
    })
  })
})
