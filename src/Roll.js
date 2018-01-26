var Roll = function(){
  this._score = null;
}

Roll.prototype.score = function(){
  return this._score;
}

Roll.prototype.addScore = function(value){
  if(!check_value(value)){
      throw new Error('Only integers between 0 and 10 please')
  }
  this._score = value;
  return value;
}

check_value = function(value){
  return (value === parseInt(value, 10)) && (value >= 0 && value <= 10)
}
