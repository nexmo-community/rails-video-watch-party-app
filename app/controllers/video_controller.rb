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
    @name = params[:name]
    @opentok = OpenTok::OpenTok.new ENV['OPENTOK_API_KEY'], ENV['OPENTOK_API_SECRET']
    @api_key = ENV['OPENTOK_API_KEY']
    @api_secret = ENV['OPENTOK_API_SECRET']
    @session_id = Session.create_or_load_session_id
    if @name == 'Yehuda'
      @token = @opentok.generate_token(@session_id, {role: :moderator})
    else
      @token = @opentok.generate_token(@session_id)
    end
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
