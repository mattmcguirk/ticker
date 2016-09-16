class AddTaskIdToCategories < ActiveRecord::Migration[5.0]
  def change
    add_column :categories, :task_id, :integer
  end
end
