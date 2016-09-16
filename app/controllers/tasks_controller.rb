class TasksController < ApplicationController
  before_action :logged_in, only: ['index','view','destroy']
  
  def view
    @task = Task.find(params[:id])
  end

  def index
    @tasks = current_user.tasks.order(created_at: :desc)
  end
  
  def new
    if logged_in? 
      @categories = current_user.categories 
      @category_options = current_user.categories.all.map{ |c| [ c.name, c.id ] }
    end
    @task = Task.new
  end
  
  def create
    if logged_in?
      @task = Task.new(task_params)
      unless @task.save
        return @task.errors.full_messages
      end
    end
  end
  
  def destroy
    task = Task.find(params[:id])

    if current_user == task.user
      task.destroy!
    end
  end
  
  private  
    def task_params
      params.require(:task).permit(:time, :description, :user_id, :category_id)
    end
  
    def logged_in
      redirect_to login_path if !logged_in? 
    end
    
end
