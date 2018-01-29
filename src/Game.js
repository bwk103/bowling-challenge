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
  if (thisFrame.isFirstRoll()) this._firstRoll(thisFrame, value, roll);
  else this._secondRoll(thisFrame, value, roll);
}

Game.prototype.currentFrame = function(){
  return this._frames.length
}

Game.prototype.addScore = function(frame){
  this._score += frame.frameScore();
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
  this.gameComplete = true;
  return `Game Over. You scored ${this.score()}`;
}

Game.prototype._firstRoll = function(frame, value, roll){
  roll.addScore(value)
  this._addToFrame(frame, roll)
  if(value === 10) return this._strikeScored(frame);
}

Game.prototype._strikeScored = function(frame){
  frame.endFrame();
  this.addScore(frame);
  if(this._isGameOver()) return this.gameOver();
  else this.nextFrame();
}

Game.prototype._secondRoll = function(frame, value, roll){
  if (!this._isValidScore(frame, value)) throw new Error('That score is impossible.')
  roll.addScore(value)
  this._addToFrame(frame, roll)
  frame.endFrame();
  this.addScore(frame);
  if(this._isGameOver()) return this.gameOver();
  else this.nextFrame();
}

Game.prototype._isGameOver = function(){
  return this._frames.length >= 10;
}

Game.prototype._isValidScore = function(frame, value){
  if(frame._rolls[0].score() + parseInt(value) > 10) return false;
  return true
}
