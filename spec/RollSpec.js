describe('Roll', function(){
  var roll;

  beforeEach(function(){
    roll = new Roll()
  })

  describe('#score', function(){
    it('returns the score of the roll', function(){
      roll.addScore(4);
      expect(roll.score()).toEqual(4);
    })
  })

  describe('#addScore', function(){
    var errorMessage = 'Only integers between 0 and 10 please';

    it('saves the value of the roll', function(){
      roll.addScore(3)
      expect(roll.score()).toEqual(3)
    })

    it('throws an error if passed a string', function(){
      expect(function() { roll.addScore('something')}).toThrowError(errorMessage)
    })
    it('throws an error if passed a float', function(){
      expect(function() { roll.addScore(1.3)}).toThrowError(errorMessage)
    })
    it('throws an error if passed an integer less than 0', function(){
      expect(function() { roll.addScore(-3)}).toThrowError(errorMessage)
    })
    it('throws an error if passed an integer more than 10', function(){
      expect(function() {roll.addScore(12)}).toThrowError(errorMessage)
    })
  })
})
