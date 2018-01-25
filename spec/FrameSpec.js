describe('Frame', function(){
  var frame;
  var roll;

  beforeEach(function(){
    frame = new Frame()
    roll = jasmine.createSpy(roll, '_score').and.returnValue(3)
  });

  describe('defaults', function(){
    it('contains two rolls', function(){
      expect(frame._rolls.length).toEqual(2);
    })
  })

  describe('#frameScore', function(){
    it('returns the value of the two rolls', function(){
      expect(frame.frameScore()).toEqual(6)
    })
  })
})
