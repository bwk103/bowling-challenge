var Frame = function(){
  this._rolls = []
  this._complete = false;
  this._score = 0
}

Frame.prototype.frameScore = function(){
  return this._score;
}

Frame.prototype.isComplete = function(){
  return this._complete;
}

Frame.prototype.addRoll = function(roll){
  this._rolls.push(roll)
}

Frame.prototype.hasStrike = function(){
  if(this._rolls[0].score() === 10){
    this.endFrame();
  }
}

Frame.prototype.endFrame = function(){
  this._complete = true;
  this._score = (this._rolls.map(function(roll){
    return roll.score()
  }).reduce(function(total, nextRoll){
    return total + nextRoll
  }));
}

Frame.prototype.isFirstRoll = function(){
  return this._rolls.length === 0
}
