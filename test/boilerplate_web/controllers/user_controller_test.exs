defmodule BoilerplateWeb.UserControllerTest do
  use BoilerplateWeb.ConnCase

  alias Boilerplate.Accounts
  alias Boilerplate.Accounts.User
  alias Boilerplate.AccountsTest

  @create_attrs %{name: "Test Name", email: "test@test.com", password: "password", username: "username"}
  @update_attrs %{name: "Updated Name", email: "test_update@test.com", password: "updated_password", username: "testusername_updated"}
  @invalid_attrs %{name: nil, email: nil, password_hash: nil, username: nil}

    defp usermap(user), do: Map.drop(user, [:last_login, :password])

  defp is_the_same_users([], []), do: true
  defp is_the_same_users([user|t], [user2|t2]) do
    user = usermap(user)
    user2 = usermap(user2)
    # assert
    assert user == user2
    is_the_same_users(t, t2)
  end
  defp is_the_same_users(user, user2) do
    is_the_same_users([user], [user2])
  end

  def fixture(:user) do
    {:ok, user} = Accounts.create_user(@create_attrs)
    user
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all users", %{conn: conn} do
      t = Accounts.get_user_by_username("admin")
      admin =%{"id" => t.id, "name" => t.name, "username" => t.username}
      conn = get conn, user_path(conn, :index)
      assert %{"users" => users} = json_response(conn, 200)["data"]
      is_the_same_users(users, [admin])
    end
  end

  describe "create user" do
    test "renders user when data is valid", %{conn: conn} do
      conn = post conn, user_path(conn, :create), @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, user_path(conn, :show, id, %{"username" => "username"})
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "name" => @create_attrs.name,
        "username" => @create_attrs.username}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, user_path(conn, :create), @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  # describe "update user" do
  #   setup [:create_user]

  #   test "renders user when data is valid", %{conn: conn, user: %User{id: id} = user} do
  #     conn = put conn, user_path(conn, :update, user), user: @update_attrs
  #     assert %{"id" => ^id} = json_response(conn, 200)["data"]

  #     conn = get conn, user_path(conn, :show, id)
  #     assert json_response(conn, 200)["data"] == %{
  #       "id" => id,
  #       "email" => "some updated email",
  #       "password_hash" => "some updated password_hash",
  #       "username" => "some updated username"}
  #   end

  #   test "renders errors when data is invalid", %{conn: conn, user: user} do
  #     conn = put conn, user_path(conn, :update, user), user: @invalid_attrs
  #     assert json_response(conn, 422)["errors"] != %{}
  #   end
  # end

  # describe "delete user" do
  #   setup [:create_user]

  #   test "deletes chosen user", %{conn: conn, user: user} do
  #     conn = delete conn, user_path(conn, :delete, user)
  #     assert response(conn, 204)
  #     assert_error_sent 404, fn ->
  #       get conn, user_path(conn, :show, user)
  #     end
  #   end
  # end

  defp create_user(_) do
    user = fixture(:user)
    {:ok, user: user}
  end
end
