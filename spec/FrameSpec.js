describe('Frame', function(){
  var frame;
  var roll;

  beforeEach(function(){
    frame = new Frame();
    roll = {
      score: function(){
        return 3
      }
    };
    roll2 = {
      score: function(){
        return 5
      }
    },
    strikeRoll = {
      score: function(){
        return 10;
      }
    };
  });

  describe('defaults', function(){
    it('is incomplete', function(){
      expect(frame.isComplete()).toEqual(false);
    })
  })

  describe('#isComplete', function(){
    it('returns true when the frame is over', function(){
      frame.addRoll(strikeRoll)
      frame.endFrame()
      expect(frame.isComplete()).toEqual(true)
    })

    it('returns false when frame not over', function(){
      expect(frame.isComplete()).toEqual(false)
    })
  })

  describe('#frameScore', function(){
    it('returns the _score value', function(){
      frame.addRoll(roll)
      frame.addRoll(roll)
      frame.endFrame();
      expect(frame.frameScore()).toEqual(6)
    })
  })

  describe('#addRoll', function(){
    it('adds a roll to the frame', function(){
      expect(frame._rolls.length).toEqual(0);
      frame.addRoll(strikeRoll)
      expect(frame._rolls.length).toEqual(1);
    })
  })

  describe('#hasStrike', function(){
    it('checks whether the first roll was a strike', function(){
      spyOn(strikeRoll, 'score')
      frame.addRoll(strikeRoll)
      frame.hasStrike()
      expect(strikeRoll.score).toHaveBeenCalled();
    })

    describe('when a strike is scored', function(){
      it('finishes the current frame', function(){
        spyOn(frame, 'endFrame')
        frame.addRoll(strikeRoll)
        frame.hasStrike()
        expect(frame.endFrame).toHaveBeenCalled()
      });

      //WILL CALL TO BONUS CLASS IN DUE COURSE
    });

    describe('when a strike was not scored', function(){
      it('continues the current frame', function(){
        spyOn(frame, 'endFrame')
        frame.addRoll(roll);
        frame.hasStrike()
        expect(frame.endFrame).not.toHaveBeenCalled()
        expect(frame.isComplete()).toEqual(false)
      })
    })
  })

  describe('#endFrame', function(){
    it('sets the frame status to complete', function(){
      frame.addRoll(roll)
      frame.addRoll(roll)
      frame.endFrame();
      expect(frame.isComplete()).toBe(true);
    });

    it('checks the value of the roll/s', function(){
      spyOn(roll, 'score');
      frame.addRoll(roll)
      frame.addRoll(roll)
      frame.endFrame()
      expect(roll.score).toHaveBeenCalled()
    })

    it('sets score to the value of the rolls', function(){
      frame.addRoll(roll)
      frame.addRoll(roll)
      frame.endFrame();
      expect(frame.frameScore()).toEqual(6)
    })
  })

  describe('#isFirstRoll', function(){
    it('returns true if first roll in frame', function(){
      expect(frame.isFirstRoll()).toEqual(true)
    })

    it('returns false if second roll in frame', function(){
      frame.addRoll(roll);
      expect(frame.isFirstRoll()).toBe(false)
    })
  })
})
