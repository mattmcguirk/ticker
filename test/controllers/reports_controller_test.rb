require 'test_helper'

class ReportsControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get reports_home_url
    assert_response :success
  end

  test "should get export_csv" do
    get reports_export_csv_url
    assert_response :success
  end

end
