var Game = function(player){
  this._frames = [];
  this._score = 0;
  this.gameComplete = false;
  this.player = player
}
Game.prototype.start = function(frame=new Frame){
  this._frames.push(frame)
}

Game.prototype.score = function(){
  return this._score;
}

Game.prototype.roll = function(value, roll=new Roll){
  this._checkGameOver()
  if(this.lastFrameBonus()) return this._addBonusScores(value)
  var thisFrame = this.getCurrentFrame()
  if(!this._isFirstFrame()) this._addBonusScores(value);
  if (thisFrame.isFirstRoll()) this._firstRoll(thisFrame, value, roll);
  else this._secondRoll(thisFrame, value, roll);
}

Game.prototype.currentFrame = function(){
  return this._frames.length
}

Game.prototype.getCurrentFrame = function(){
  return this._frames[this._frames.length-1]
}

Game.prototype.allFrames = function(){
  return this._frames;
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
  if(this._isGameOver()) return this.gameOver();
  else if(this.isLastFrame()){
    null
  }
  else this.nextFrame();
}

Game.prototype._secondRoll = function(frame, value, roll){
  if (!this._isValidScore(frame, value)) throw new Error('That score is impossible.')
  roll.addScore(value)
  this._addToFrame(frame, roll)
  frame.endFrame();
  if(frame.isComplete()) this.addScore(frame);
  if(this._isGameOver()) return this.gameOver();
  else if (this.isLastFrame() && frame.isBonusDue()){
    return null
  } else this.nextFrame();
}

Game.prototype._checkGameOver = function(){
  if(this.gameComplete) throw new Error('The game is over')
}

Game.prototype._isGameOver = function(){
  var frame = this._frames[9] || { isComplete: () => false }
  return frame.isComplete() === true
}

Game.prototype._isValidScore = function(frame, value){
  if(frame._rolls[0].score() + parseInt(value) > 10) return false;
  return true
}

Game.prototype._isFirstFrame = function(){
  return this._frames.length === 1;
}

Game.prototype._addBonusScores = function(value){
  var game = this;
  var bonusFrames = this.allFrames().filter(function(frame){
    return frame.isBonusDue() && frame.isComplete() === false
  });
  if (bonusFrames.length > 0){
    bonusFrames.forEach(function(frame){
      frame.bonusScore(value);
      if(frame.isComplete()) game.addScore(frame)
    })
  }
  this.gameComplete = this._isGameOver();
}

Game.prototype.lastFrameBonus = function(){
  return this.allFrames().length === 10 && this.getCurrentFrame().isBonusDue()
}

Game.prototype.isLastFrame = function(){
  return this._frames.length === 10;
}
