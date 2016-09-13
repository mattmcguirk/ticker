Rails.application.routes.draw do

  get 'categories/create'

  get 'categories/destroy'

  get  '/tasks',       to: 'tasks#index'
  delete '/tasks/:id', to: 'tasks#destroy'
  get  '/track',       to: 'tasks#new'
  post '/track',       to: 'tasks#create' 
  get  '/signup',      to: 'users#new'
  post '/signup',      to: 'users#create'
  get    '/login',     to: 'sessions#new'
  post   '/login',     to: 'sessions#create'
  delete '/logout',    to: 'sessions#destroy'  
  resources :tasks
  resources :users
  root 'tasks#new'

end
