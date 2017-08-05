defmodule BoilerplateWeb.PageControllerTest do
  use BoilerplateWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Welcome to Phoenix!"
  end
end
