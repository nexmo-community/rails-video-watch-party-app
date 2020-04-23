require 'rails_helper'

RSpec.describe "Videos", type: :request do
  context 'when visiting the landing page' do
    it 'renders the :landing template' do
      allow(Session).to receive(:create_new_session).and_return('1234')
      allow(Session).to receive(:create_token).and_return('12345')

      get '/'

      expect(response).to render_template(:landing)
    end
  end

  context 'when visiting the party page' do
    it 'renders the :index template' do
      allow(Session).to receive(:create_new_session).and_return('1234')
      allow(Session).to receive(:create_token).and_return('12345')

      get '/party'

      expect(response).to render_template(:index)
    end
  end

  context 'when visiting the screenshare page' do
    it 'renders the :screenshare template' do
      allow(Session).to receive(:create_new_session).and_return('1234')
      allow(Session).to receive(:create_token).and_return('12345')

      get '/screenshare'

      expect(response).to render_template(:screenshare)
    end
  end

  context 'when signing in with a name' do
    it 'redirects to the party page if the password is correct' do
      allow(Session).to receive(:create_new_session).and_return('1234')
      allow(Session).to receive(:create_token).and_return('12345')
      stub_const('ENV', ENV.to_hash.merge('PARTY_PASSWORD' => '123'))


      post '/name', params: { name: 'Ben', password: '123' }

      expect(response.location).to eq('http://www.example.com/party?name=Ben')
    end

    it 'creates a name based on the form parameters' do
      allow(Session).to receive(:create_new_session).and_return('1234')
      allow(Session).to receive(:create_token).and_return('12345')
      stub_const('ENV', ENV.to_hash.merge('PARTY_PASSWORD' => '123'))

      post '/name', :params => { :name => 'Ben', password: '123' }

      expect(request.params['name']).to eq('Ben')
    end

    it 'only allows permitted parameters' do
      allow(Session).to receive(:create_new_session).and_return('1234')
      allow(Session).to receive(:create_token).and_return('12345')
      stub_const('ENV', ENV.to_hash.merge('PARTY_PASSWORD' => '123'))

      post '/name', :params => { :not_allowed => true }

      expect(response.body).not_to include('not_allowed')
    end

    it 'redirects back to sign in if password is incorrect' do
      allow(Session).to receive(:create_new_session).and_return('1234')
      allow(Session).to receive(:create_token).and_return('12345')
      stub_const('ENV', ENV.to_hash.merge('PARTY_PASSWORD' => '123'))


      post '/name', params: { name: 'Ben', password: '1234' }

      expect(response.location).to eq('http://www.example.com/')  
    end
  end
end
