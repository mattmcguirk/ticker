class AddCategoriesTasksJoinTable < ActiveRecord::Migration[5.0]
  def self.up
    create_table :categories_tasks, :id => false do |t|
      t.integer :category_id
      t.integer :task_id
    end
  end
 
  def self.down
    drop_table :categories_items
  end
end
