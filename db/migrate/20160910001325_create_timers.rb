class CreateTimers < ActiveRecord::Migration[5.0]
  def change
    create_table :timers do |t|
      t.integer :seconds_elapsed
      t.integer :user_id

      t.timestamps
    end
  end
end
