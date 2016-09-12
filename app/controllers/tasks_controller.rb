class TasksController < ApplicationController
  before_action :logged_in, only: ['index','view']
  
  def view
    @task = Task.find(params[:id])
  end

  def index
    @tasks = current_user.tasks 
  end
  
  def new
    @task = Task.new
  end
  
  def create
    if logged_in?
      @task = Task.new(task_params)
      @task.save
    end
  end
  
  def destroy
    Task.find(params[:id]).destroy!
  end

  private  
    def task_params
      params.require(:task).permit(:time, :description, :user_id)
    end
  
    def logged_in
      redirect_to login_path if !logged_in? 
    end
    
end
