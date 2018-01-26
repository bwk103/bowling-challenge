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
    };
  });

  describe('defaults', function(){
    it('is incomplete', function(){
      expect(frame.isComplete()).toEqual(false);
    })
  })

  // describe('#complete', function(){
  //   it('ends the frame', function(){
  //     frame.complete();
  //     expect(frame.isComplete()).toEqual(true);
  //   })
  // })

  describe('#frameScore', function(){
    it('checks the value of the two rolls', function(){
      spyOn(roll, 'score')
      frame.addRoll(roll)
      frame.addRoll(roll)
      frame.frameScore();
      expect(roll.score).toHaveBeenCalled();
    })
    it('returns the cumulative value of the rolls', function(){
      frame.addRoll(roll);
      frame.addRoll(roll2);
      expect(frame.frameScore()).toEqual(8)
    })
  })
})
