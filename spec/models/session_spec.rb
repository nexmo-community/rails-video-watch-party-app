require 'rails_helper'

RSpec.describe Session, type: :model do
  context 'with no custom options' do
    before(:all) do
      @session = Session.create(session_id: '123456789')
    end

    it 'defaults to false for the expired field' do
      expect(@session.expired).to eq(false)
    end

    it 'has a session_id field equal to the value provided' do
      expect(@session.session_id).to eq('123456789')
    end
  end

  context 'with custom options' do
    before(:all) do
      @session = Session.create(session_id: '123456789', expired: true)
    end

    it 'accepts the value provided for the expired field' do
      expect(@session.expired).to eq(true)
    end
  end

  context 'it raises exceptions for bad or missing data' do
    it 'raises an error if a session ID is not provided' do
      expect{ Session.create }.to raise_error(ActiveRecord::NotNullViolation)
    end
  end
end
