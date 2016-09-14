class CategoriesController < ApplicationController
  before_action :logged_in_user
  
  def index
    @categories = current_user.categories 
  end
  
  def create
    new_category = Category.create(category_params)
    render json: new_category
  end

  def destroy
    Category.find(params[:id]).destroy! 
  end
  
  private
    
    def category_params
      params.require(:category).permit(:name, :user_id)
    end

    def logged_in_user
      unless logged_in?
        flash[:danger] = "Please log in."
        redirect_to login_url
      end
    end
    
end
