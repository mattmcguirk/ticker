Rails.application.routes.draw do

  get  '/tasks', to: 'tasks#index'
  get  '/track',   to: 'tasks#new'
  post '/track',   to: 'tasks#create' 
  get  '/signup',  to: 'users#new'
  post '/signup',  to: 'users#create'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'  
  resources :users
  root 'tasks#new'

end
