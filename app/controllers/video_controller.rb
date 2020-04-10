require 'opentok'

class VideoController < ApplicationController
  skip_before_action :verify_authenticity_token
  @@opentok = OpenTok::OpenTok.new ENV['OPENTOK_API_KEY'], ENV['OPENTOK_API_SECRET']

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
    @api_key = ENV['OPENTOK_API_KEY']
    @api_secret = ENV['OPENTOK_API_SECRET']
    @session_id = Session.create_or_load_session_id
    if @name == 'Yehuda'
      @token = @@opentok.generate_token(@session_id, {role: :moderator, data: 'name=Yehuda'})
    else
      @token = @@opentok.generate_token(@session_id)
    end
  end

  def chat
  end

  def destroy
    if params[:video][:action] == 'off'
      @streams = @@opentok.streams.all(params[:video][:sessionId])
      @streams.each do |stream|
        @streams.reject! { |stream| stream.videoType == 'camera' }
      end
    end
  end

  def webhook
  end

  private

  def name_params
    params.permit(:name, :authenticity_token, :commit)
  end
end
