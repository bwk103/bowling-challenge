var Game = function(){
  this._frames = [];
  this._score = 0;
  this.gameOver = false;
}
Game.prototype.start = function(frame=new Frame){
  this._frames.push(frame)
}

Game.prototype.score = function(){
  return this._score;
}

Game.prototype.roll = function(value, roll=new Roll){
  var thisFrame = this._frames[this._currentFrameIndex()]
  roll.addScore(value)
  this._addToFrame(thisFrame, roll)
  if (isFrameOver(thisFrame)){
    if (isGameOver(this)){
      return this._gameOver = true;
    }
    this._score += thisFrame.frameScore();
    this.nextFrame();
  }
}

Game.prototype._addToFrame = function(frame, roll){
  frame.addRoll(roll)
}

Game.prototype.currentFrame = function(){
  return this._frames.length
}

Game.prototype.nextFrame = function(frame=new Frame){
  this._frames.push(frame)
}

Game.prototype._currentFrameIndex = function(){
  return this._frames.length - 1
}

isFrameOver = function(frame){
  return frame.isComplete()
}

isGameOver = function(game){
  return game._frames.length >= 10;
}
