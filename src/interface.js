var $ = require("jquery");

$(document).ready(function(){

  var game = new Game()
  var rollScores = $('.roll')
  var frameScores = $('.frame-score')

  $('#start-button').on('click', function(){
    game.start();
    console.log(game);
  })

  $('.roll-btn').on('click', function(){
    var score = parseInt(($(this).attr('value')));
    roll(score);
  })

  roll = function(score){
    game.roll(score)
    updateRollScores(score)
    checkFrame()
  }

  updateRollScores = function(score){
    rollScores.first().text(score);
    rollScores.splice(0, 1);
  }

  updateFrameScores = function(){
    frameScores.first().text(game.score());
    frameScores.splice(0, 1);
  }

  checkFrame = function(){
    var currentFrame = game._frames[game._currentFrameIndex()];
    if(game._frames.length > 1){
      var previousFrame = game._frames[(game._currentFrameIndex() -1)];
      if(previousFrame.isComplete && currentFrame._rolls.length === 0){
        updateFrameScores()
      }
      if (game.currentFrame() === 10 && currentFrame.isComplete()){
        updateFrameScores()
        updateFrameScores()
      }
    }
  }

})
