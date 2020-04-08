require 'opentok'
require 'byebug'
class VideoController < ApplicationController

  def index
    @opentok = OpenTok::OpenTok.new ENV['OPENTOK_API_KEY'], ENV['OPENTOK_API_SECRET']
    @api_key = ENV['OPENTOK_API_KEY']
    @api_secret = ENV['OPENTOK_API_SECRET']
    session = @opentok.create_session
    @session_id = session.session_id
    @token = @opentok.generate_token(@session_id, {:role => :moderator})
  end

  def chat
  end

  def webhook
  end
end
