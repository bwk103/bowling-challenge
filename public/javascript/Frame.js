var Frame = function(){
  this._rolls = []
  this._complete = false;
  this._score = 0;
  this._strikeBonus = [];
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
  return this._rolls[0].score() === 10
}

Frame.prototype.isBonusDue = function(){
  return this._score === 10;
}

Frame.prototype.endFrame = function(){
  this._score = (this._rolls.map(function(roll){
    return roll.score()
  }).reduce(function(total, nextRoll){
    return total + nextRoll
  }));
  if(this.isBonusDue()) return null;
  this._complete = true;
}

Frame.prototype.spareBonus = function(nextRollScore){
  this._score += nextRollScore
  this._complete = true;
}

Frame.prototype.strikeBonus = function(nextRoll, followingRoll){
  this._score += (nextRoll + followingRoll)
  this._complete = true;
}

Frame.prototype.isFirstRoll = function(){
  return this._rolls.length === 0
}

Frame.prototype.bonusScore = function(value){
  if (this._rolls.length === 2){
    this.spareBonus(value)
  } else {
    if(this._strikeBonus.length === 1){
      this.strikeBonus(this._strikeBonus[0], value)
      this._strikeBonus = [];
    } else {
      this._strikeBonus.push(value)
    }
  }
}
