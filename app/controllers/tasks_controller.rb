class TasksController < ApplicationController
  def view
  end

  def index
    @tasks = Task.all 
  end
  
  def new
    @task = Task.new
  end
  
  def create
  end
  
  def task_params
  end
  
end
