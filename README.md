[![Build Status](https://travis-ci.org/bwk103/bowling-challenge.svg?branch=master)](https://travis-ci.org/bwk103/bowling-challenge)

# Bowling Scorecard

## Challenge

Create an application using Javascript which allows the user to score a bowling game.

Try my application [here](https://bk-bowling.herokuapp.com/)

## Getting Started
The easiest way to use the scorer is to visit the heroku link (above), but if you instead wish to run it on a local server, follow these steps:

### Prerequisites
Whilst the project is predominantly written in JavaScript, it uses Sinatra to run on a localhost, therefore you're going to need the following:

#### Ruby
If you're on Linux or Mac you can probably ignore this step, otherwise download and install Ruby from [here](https://www.ruby-lang.org/en/).

#### Bundler
The simplest way to install Sinatra is via bundler. Therefore if you've never used it in the past, run the following at the command line:

`gem install bundler`

### Installing Bowling Scorecard
Navigate to an appropriate location and run the following command:

`git clone https://github.com/bwk103/bowling-challenge.git`

Once all the files have been downloaded, navigate to the new project directory and run the following:

`bundle install`

After the dependencies have been installed, you're good to go. Launch the application using the following command:

`rackup config.ru`

And in your browser, navigate to the appropriate port.

## Playing the Game
It's bowling, but without most of the fun!  Unless you happen to be visiting a bowling alley without any form of scorer, you'll have to use your imagination to picture the toppling of the pins.  

To get started, first enter your name in the text field, then click on 'Play game'.  Then, simulate your first shot, then your second etc, etc.  The game will automatically jump to the next frame for you.

The scoring rules for ten-pin-bowling are far more complex than I could have imagined before starting this project so rather than try to explain them in detail here, I shall defer to [Wikipedia](https://en.wikipedia.org/wiki/Ten-pin_bowling#Traditional_scoring).

![Imgur](https://i.imgur.com/e36ARPb.png)


![Imgur](https://i.imgur.com/dVr3DJC.png)

## Running the tests
In order to run my javascript tests, execute the following command and the tests will appear in your browser.

`open SpecRunner.html`

## Built With
- Jamine Standalone - JavaScript testing framework
- Sinata
- Pure CSS - CSS modules for buttons and inputs
- Google Fonts - for, erm, fonts
- Heroku - hosting application
- jQuery - for east selecting and editing elements

## Acknowledgements
- Makers Academy for their challenge.
- Background Photo by Todd Diemer on Unsplash
