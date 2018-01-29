var $ = require("jquery");

$(document).ready(function(){

  var game = new Game()
  var rollScores = $('.roll')
  var frameScores = $('.frame-score')

  $('#start-button').on('click', function(){
    game.start();
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
    if (score === 10){
      tenScored()
    } else {
      rollScores.first().text(score);
    }
    rollScores.splice(0, 1);
  }

  updateFrameScores = function(){
    frameScores.first().text(game.score());
    frameScores.splice(0, 1);
  }

  tenScored = function(){
    if ($(rollScores).first().attr('class').includes('first-roll')){
      rollScores.eq(0).text('X');
      rollScores.eq(1).text('-');
      rollScores.splice(0, 1)
    } else {
      rollScores.first().text('/');
    }
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
