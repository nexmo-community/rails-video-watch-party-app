class Session < ApplicationRecord
  def self.create_or_load_session_id(session_id)
    last_session = Session.last
    if last_session && last_session.expired == false
      @session_id = last_session.session_id
      return @session_id
    elsif (last_session && last_session.expired == true) || (!last_session)
      session = Session.new
      session.session_id = session_id
      session.save
      @session_id = session_id
      return @session_id
    else 
      raise 'Something went wrong with the session creation!'
    end
  end
end
