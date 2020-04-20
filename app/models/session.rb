require 'opentok'

class Session < ApplicationRecord
  @opentok = OpenTok::OpenTok.new ENV['OPENTOK_API_KEY'], ENV['OPENTOK_API_SECRET']

  def self.create_or_load_session_id
    last_session = Session.last
    if last_session && last_session.expired == false
      @session_id = last_session.session_id
      return @session_id
    elsif (last_session && last_session.expired == true) || (!last_session)
      session = @opentok.create_session
      record = Session.new
      record.session_id = session.session_id
      record.save
      @session_id = session_id
      return @session_id
    else 
      raise 'Something went wrong with the session creation!'
    end
  end
end
