Rails.application.routes.draw do
  get '/', to: 'video#landing'
  get '/party', to: 'video#index'
  post '/name', to: 'video#name'
  post '/chat/send', to: 'video#chat'
  post '/event', to: 'video#webhook'
end
