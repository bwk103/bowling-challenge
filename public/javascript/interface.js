$(document).ready(function(){

  var game;
  var rollScores = $('.roll')
  var rollIndex = 0;
  var frameScores = $('.frame-score')
  var frameIndex = 0;

  $('#start-button').on('click', function(e){
    e.preventDefault()
    var player = new Player($('#player-name').val())
    game = new Game(player)
    $('.player-id').text(game.player.name())
    game.start();
    $(this).toggleClass('hide')
  })

  $('.roll-btn').on('click', function(){
    var score = parseInt(($(this).attr('value')));
    roll(score);
    disableButtons(score);
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
      if (game.currentFrame() === 10 && game.getCurrentFrame()._rolls.length > 0 ) {
        lastFrameScores()
      } else {
        tenScored()
      }
    } else {
    if (isXRoll('second') && isSpare(score)){
      score = '/'
    }
    if (isXRoll('third') && lastFrameSpare(score)){
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
      $('button.roll-btn').removeClass('hide')
      rollIndex += 2;
    } else {
      rollScores.eq(rollIndex).text('/');
    }
  }

  lastFrameScores = function(){
    if (isXRoll('second') && isSpare(10) ){
      rollScores.eq(rollIndex).text('/')
      rollIndex += 1;
    } else if (isXRoll('third')){
      if (lastFrameSpare(10)){
        rollScores.eq(rollIndex).text('/')
        rollIndex += 1;
      }
      rollScores.eq(rollIndex).text('X')
      $('button.roll-btn').removeClass('hide')
    } else {
      rollScores.eq(rollIndex).text('X')
      $('button.roll-btn').removeClass('hide')
      rollIndex += 1;
    }
  }

  lastFrameSpare = function(score){
    return parseInt(rollScores.eq(rollIndex).prev().text()) + score === 10
  }

  isXRoll = function(string){
    return rollScores.eq(rollIndex).attr('class').includes(string+'-roll')
  }

  isSpare = function(score){
    return parseInt(rollScores.eq(rollIndex).siblings(0).text()) + score === 10
  }

  updateAllFrames = function(){
    game.allFrames().forEach(function(frame, index){
      if (index === 0 && frame.isComplete()){
        $('#frameScore' + index).text(game.allFrames()[0].frameScore())
      } else {
        if (frame.isComplete()) {
          var prevScore = game.allFrames().slice(0, index)
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

  disableButtons = function(score){
    var btns;
    if (isXRoll('first')){
      btns = $('button.roll-btn')
      btns.removeClass('hide')
      btns = btns.filter(function(btn){
        return btn + score > 10
      })
      console.log(btns)
      btns.addClass('hide')
    }
    if(isXRoll('second')){
      btns = $('button.hide')
      btns.removeClass('hide')
    }
  }

  checkFrame = function(){
    if (game.allFrames().length <= 1) return;
    updateAllFrames()
  }

  checkGame = function(){
    if (game.gameComplete){
      $('.game-score').text(game.score());
    }
  }
})
