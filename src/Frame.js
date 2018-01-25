var Frame = function(){
  this._rolls = [new Roll, new Roll]
}

Frame.prototype.frameScore = function(){
  return this._rolls[0].score() + this._rolls[1].score()
}
