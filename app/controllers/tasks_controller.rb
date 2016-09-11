class TasksController < ApplicationController
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

  private  
    def task_params
      params.require(:task).permit(:time, :description, :user_id)
    end
  
end
