Rails.application.routes.draw do

  post '/categories',  to: 'categories#create'
  delete '/categories',to: 'categories#destroy'
  get '/categories',   to: 'categories#index' 
  get  '/tasks',       to: 'tasks#index'
  delete '/tasks/:id', to: 'tasks#destroy'
  get  '/track',       to: 'tasks#new'
  post '/track',       to: 'tasks#create' 
  get  '/signup',      to: 'users#new'
  post '/signup',      to: 'users#create'
  get    '/login',     to: 'sessions#new'
  post   '/login',     to: 'sessions#create'
  delete '/logout',    to: 'sessions#destroy'  
  resources :categories
  resources :tasks
  resources :users
  root 'tasks#new'

end
