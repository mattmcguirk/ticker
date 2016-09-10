Rails.application.routes.draw do

  get  '/tasks/index', to: 'tasks#index'
  get  '/tasks/view',  to: 'tasks#view'
  get  '/tasks/new',   to: 'tasks#new'
  post '/tasks/new',   to: 'tasks#create'  
  root 'tasks#new'

end
