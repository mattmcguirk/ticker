class CategoriesController < ApplicationController
  before_action :logged_in_user
  
  def create
    Category.create(category_params)
  end

  def destroy
    Category.find(params[:id]).destroy! 
  end
  
  private
    
    def category_params
      params.require(:category).permit(:name, :user_id)
    end
    
end
