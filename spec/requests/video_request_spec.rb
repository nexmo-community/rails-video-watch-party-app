require 'rails_helper'

RSpec.describe "Videos", type: :request do
  context 'when visiting the landing page' do
    it 'renders the :landing template' do
      get '/'
      expect(response).to render_template(:landing)
    end
  end

  context 'when visiting the party page' do
    it 'renders the :index template' do
      get '/party'
      expect(response).to render_template(:index)
    end
  end

  context 'when visiting the screenshare page' do
    it 'renders the :screenshare template' do
      get '/screenshare'
      expect(response).to render_template(:screenshare)
    end
  end
end
