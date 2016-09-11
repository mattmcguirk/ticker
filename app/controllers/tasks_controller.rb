class TasksController < ApplicationController
  def view
    @task = Task.find(params[:id])
  end

  def index
    @tasks = Task.all 
  end
  
  def new
    @task = Task.new
  end
  
  def create
    @task = Task.new(task_params)
    @task.save 
  end

  private  
    def task_params
      params.require(:task).permit(:time, :description, :user_id)
    end
  
end
