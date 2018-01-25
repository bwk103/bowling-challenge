describe('Player', function(){

  var player;

  beforeEach(function(){
    player = new Player('James')
  });

  it('has a name', function(){
    expect(player.name).toEqual('James')
  })

})
