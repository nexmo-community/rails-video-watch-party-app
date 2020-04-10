require 'opentok'

class VideoController < ApplicationController

  def index
    @opentok = OpenTok::OpenTok.new ENV['OPENTOK_API_KEY'], ENV['OPENTOK_API_SECRET']
    @api_key = ENV['OPENTOK_API_KEY']
    @api_secret = ENV['OPENTOK_API_SECRET']
    session = @opentok.create_session
    @session_id = session.session_id
    @token = session.generate_token
  end

  def chat
  end

  def webhook
  end
end
