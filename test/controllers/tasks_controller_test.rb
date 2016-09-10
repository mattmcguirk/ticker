require 'test_helper'

class TasksControllerTest < ActionDispatch::IntegrationTest
  test "should get view" do
    get tasks_view_url
    assert_response :success
  end

  test "should get index" do
    get tasks_index_url
    assert_response :success
  end

end
