require './app'
require 'rack/test'

describe 'Bowling Scorer' do
  include Rack::Test::Methods

  def app
    BowlingApp
  end

  it 'renders index' do
    get '/'
    expect(last_response).to be_ok
    expect(last_response.body).to include('Bowling Challenge')
  end

end
