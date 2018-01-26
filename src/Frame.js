var Frame = function(){
  this._rolls = []
  this._complete = false;
  this._score;
}

Frame.prototype.frameScore = function(){
  return this._rolls[0].score() + this._rolls[1].score()
}

Frame.prototype.isComplete = function(){
  this._complete = (this._rolls.length === 2)
  return this._complete;
}

// Frame.prototype.complete = function(){
//   this._complete = true;
// }

Frame.prototype.addRoll = function(roll){
  this._rolls.push(roll)
}
