Rails.application.routes.draw do
  
  get '/hello', to: "application#hello"
  get 'timers/view'
  root 'timers#view'

end
