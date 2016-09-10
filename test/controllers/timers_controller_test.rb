require 'test_helper'

class TimersControllerTest < ActionDispatch::IntegrationTest
  test "should get view" do
    get timers_view_url
    assert_response :success
  end

end
