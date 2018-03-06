$(document).ready(function(){

  var game = new Game()
  var rollScores = $('.roll')
  var rollIndex = 0;
  var frameScores = $('.frame-score')
  var frameIndex = 0;

  $('#start-button').on('click', function(){
    game.start();
  })

  $('.roll-btn').on('click', function(){
    var score = parseInt(($(this).attr('value')));
    roll(score);
    updateRollScores(score);
    checkFrame()
    checkGame()
  })

  roll = function(score){
    game.roll(score)
  }

  updateRollScores = function(score){
    var score = score;
    if (score === 10){
      if (game.currentFrame() === 10 && game._frames[9]._rolls.length > 0 ) {
        lastFrameScores()
      } else {
        tenScored()
      }
    } else {
    if (isSecondRoll() && isSpare(score)){
      score = '/'
    }
    if (isThirdRoll() && lastFrameSpare(score)){
      score = '/'
    }
    rollScores.eq(rollIndex).text(score)
    rollIndex += 1;
  }
}

  tenScored = function(){
    if ($(rollScores).eq(rollIndex).attr('class').includes('first-roll')){
      rollScores.eq(rollIndex).text('X');
      rollScores.eq(rollIndex + 1).text('-');
      rollIndex += 2;
    } else {
      rollScores.eq(rollIndex).text('/');
    }
  }

  ///
  lastFrameScores = function(){
    if (isSecondRoll() && isSpare(10) ){
      rollScores.eq(rollIndex).text('/')
      rollIndex += 1;
    } else if (isThirdRoll()){
      if (lastFrameSpare(10)){
        rollScores.eq(rollIndex).text('/')
        rollIndex += 1;
      }
      rollScores.eq(rollIndex).text('X')
    } else {
      rollScores.eq(rollIndex).text('X')
      rollIndex += 1;
    }
  }

  lastFrameSpare = function(score){
    return parseInt(rollScores.eq(rollIndex).prev().text()) + score === 10
  }

  //

  isSecondRoll = function(){
    return rollScores.eq(rollIndex).attr('class').includes('second-roll')
  }

  isThirdRoll = function(){
    return rollScores.eq(rollIndex).attr('class').includes('third-roll')
  }

  isSpare = function(score){
    return parseInt(rollScores.eq(rollIndex).siblings(0).text()) + score === 10
  }

  updateAllFrames = function(){
    game._frames.forEach(function(frame, index){
      if (index === 0 && frame.isComplete()){
        $('#frameScore' + index).text(game._frames[0].frameScore())
      } else {
        if (frame.isComplete()) {
          var prevScore = game._frames.slice(0, index)
            .map(function(prevFrame){
              return prevFrame.frameScore()
            })
            .reduce(function(total, nextScore){
            return total + nextScore
            })
            $('#frameScore' + index).text(prevScore + frame.frameScore())
        }
      }
    })
  }

  checkFrame = function(){
    if (game._frames.length <= 1) return;
    updateAllFrames()
  }

  checkGame = function(){
    if (game.gameComplete){
      $('.game-score').text(game.score());
    }
  }
})
