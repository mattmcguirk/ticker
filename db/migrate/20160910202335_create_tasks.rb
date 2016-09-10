class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.integer :time
      t.text :description
      t.integer :user_id

      t.timestamps
    end
  end
end
