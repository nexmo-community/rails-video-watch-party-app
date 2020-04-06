Rails.application.routes.draw do
  get '/', to: 'video#index'
  post '/chat/send', to: 'video#chat'
end
