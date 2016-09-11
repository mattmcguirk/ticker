Rails.application.routes.draw do

  get  '/tasks', to: 'tasks#index'
  get  '/tasks/index', to: 'tasks#index'
  get  '/tasks/view',  to: 'tasks#view'
  get  '/tasks/new',   to: 'tasks#new'
  post '/tasks/new',   to: 'tasks#create' 
  get  '/signup',  to: 'users#new'
  post '/signup',  to: 'users#create'
  resources :users
  root 'tasks#new'

end
