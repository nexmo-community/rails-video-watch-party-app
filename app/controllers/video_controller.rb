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
    session = @opentok.create_session
    @session_id = Session.create_or_load_session_id(session.session_id)
    if @name == 'Yehuda'
      token = session.generate_token({
        :session_id  => @session_id,
        :role        => :moderator,
        :expire_time => Time.now.to_i+(7 * 24 * 60 * 60), # in one week
        :initial_layout_class_list => ['focus', 'inactive']
      });
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
