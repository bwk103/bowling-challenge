var Game = function(){
  this._frames = [];
  this._score = 0;
  this.gameComplete = false;
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
    this._score += thisFrame.frameScore();
    if (isGameOver(this)){
      this.gameComplete = true;
      return this.gameOver();
    }
    this.nextFrame();
  }
}


Game.prototype.currentFrame = function(){
  return this._frames.length
}

Game.prototype.nextFrame = function(frame=new Frame){
  this._frames.push(frame)
}

Game.prototype._addToFrame = function(frame, roll){
  frame.addRoll(roll)
}

Game.prototype._currentFrameIndex = function(){
  return this._frames.length - 1
}

Game.prototype.gameOver = function(){
  return `Game Over. You scored ${this.score()}`;
}

isFrameOver = function(frame){
  return frame.isComplete()
}

isGameOver = function(game){
  return game._frames.length >= 10;
}
