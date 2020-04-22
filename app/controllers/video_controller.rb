# frozen_string_literal: true

require 'opentok'

class VideoController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_opentok_vars

  def set_opentok_vars
    @api_key = ENV['OPENTOK_API_KEY']
    @api_secret = ENV['OPENTOK_API_SECRET']
    @session_id = Session.create_or_load_session_id
    @moderator_name = ENV['MODERATOR_NAME']
    @name ||= params[:name]
    @token = Session.create_token(@name, @moderator_name, @session_id)
  end

  def json_request?
    request.format.json?
  end

  def landing; end

  def name
    @name = name_params[:name]
    redirect_to party_url(name: @name)
  end

  def index; end

  def chat; end

  def screenshare
    @darkmode = 'dark'
  end

  def webhook; end

  private

  def name_params
    params.permit(:name, :authenticity_token, :commit)
  end
end
