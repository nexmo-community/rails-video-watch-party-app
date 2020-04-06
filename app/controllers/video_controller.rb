require 'opentok'
require 'byebug'

class VideoController < ApplicationController
  before_action :opentok
  def opentok
    @opentok = OpenTok::OpenTok.new(ENV['OPENTOK_API_KEY'], ENV['OPENTOK_API_SECRET'])
  end

  def index
    session = @opentok.create_session
    ENV['OPENTOK_SESSION_ID'] = session.session_id
    ENV['OPENTOK_TOKEN'] = @opentok.generate_token(ENV['OPENTOK_SESSION_ID'])
  end

  def chat
  end

  def event
  end
end
