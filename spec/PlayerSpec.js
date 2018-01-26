describe('Player', function(){

  var player;

  beforeEach(function(){
    player = new Player('James')
  });

  describe('#name', function(){
    it('returns the player name', function(){
      expect(player.name()).toEqual('James')
    })
  })
})
