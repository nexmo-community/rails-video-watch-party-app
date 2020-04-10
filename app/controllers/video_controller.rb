require 'opentok'

class VideoController < ApplicationController
  skip_before_action :verify_authenticity_token, if: :json_request?

  def json_request?
    request.format.json?
  end

  def landing
  end

  def name
    @name = name_params[:name]
    redirect_to party_url(:name => @name)
  end

  def index
    @opentok = OpenTok::OpenTok.new ENV['OPENTOK_API_KEY'], ENV['OPENTOK_API_SECRET']
    @api_key = ENV['OPENTOK_API_KEY']
    @api_secret = ENV['OPENTOK_API_SECRET']
    session = @opentok.create_session
    @session_id = Session.create_or_load_session_id(session.session_id)
    @token = @opentok.generate_token(@session_id)
    @name = params[:name]
  end

  def chat
  end

  def webhook
  end

  private

  def name_params
    params.permit(:name, :authenticity_token, :commit)
  end
end
