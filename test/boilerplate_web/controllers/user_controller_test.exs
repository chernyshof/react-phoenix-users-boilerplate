defmodule BoilerplateWeb.UserControllerTest do
  use BoilerplateWeb.ConnCase

  alias Boilerplate.Accounts
  alias Boilerplate.Accounts.User

  @create_attrs %{name: "Test Name", email: "test@test.com", password: "password", username: "username"}
  @create_attrs2 %{name: "Test Name", email: "test2@test.com", password: "password", username: "username2"}
  @update_attrs %{name: "Updated Name", email: "test_update@test.com", password: "updated_password", username: "testusername_updated"}
  @invalid_attrs %{name: nil, email: nil, password_hash: nil, username: nil}

    defp usermap(user), do: Map.drop(user, [:last_login, :password, "last_login", "password"])

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

  describe "index users" do
    test "lists all users", %{conn: conn} do
      t = Accounts.get_user_by_username("admin")
      admin =
        %{"id" => t.id,
          "name" => t.name,
          "username" => t.username,
          "email" => t.email,
          "is_staff" => t.is_staff,
          "is_superuser" => t.is_superuser}

      conn = Boilerplate.Accounts.sign_in_user(conn, t)
      conn = get conn, user_path(conn, :index)
      assert %{"users" => users} = json_response(conn, 200)["data"]
      is_the_same_users(users, [admin])
    end

    test "list should not be showed for unauthorized user", %{conn: conn} do
      conn = get conn, user_path(conn, :index)
      assert json_response(conn, 401)["errors"]
    end
  end

  describe "show user" do
    test "show user", %{conn: conn} do
      t = Accounts.get_user_by_username("admin")
      admin =
        %{"id" => t.id,
          "name" => t.name,
          "username" => t.username,
          "email" => t.email,
          "is_staff" => t.is_staff,
          "is_superuser" => t.is_superuser}

      conn = Boilerplate.Accounts.sign_in_user(conn, t)
      conn = get conn, user_path(conn, :show, t.id, %{"username" => "admin"})
      assert user = json_response(conn, 200)["data"]
      is_the_same_users(user, admin)
    end

    test "list should not be showed for unauthorized user", %{conn: conn} do
      conn = get conn, user_path(conn, :show, 1, %{"username" => "admin"})
      assert json_response(conn, 401)["errors"]
    end
  end

  describe "create user" do
    test "renders user when data is valid", %{conn: conn} do
      conn = post conn, user_path(conn, :create), @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, user_path(conn, :show, id, %{"username" => @create_attrs.username})
      assert data = json_response(conn, 200)["data"]
      assert Map.drop(data, ["last_login"]) == %{
        "id" => id,
        "name" => @create_attrs.name,
        "username" => @create_attrs.username}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, user_path(conn, :create), @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update user" do
    setup [:create_user]

    test "renders user when data is valid and users are the same", %{conn: conn, user: %User{id: id} = user} do
      conn = Boilerplate.Accounts.sign_in_user(conn, user)
      new_conn = put conn, user_path(conn, :update, user), user: @update_attrs
      assert %{"id" => ^id} = json_response(new_conn, 200)["data"]

      conn = get conn, user_path(conn, :show, id, %{"username" => @update_attrs.username})
      assert data = json_response(conn, 200)["data"]
      assert Map.drop(data, ["last_login"]) == %{
        "id" => id,
        "name" => @update_attrs.name,
        "username" => @update_attrs.username}
        # "email" => @update_attrs.email,
    end

    test "renders user when data is valid and admin is changing", %{conn: conn, user: %User{id: id} = user} do
      admin = Accounts.get_user_by_username("admin")
      conn = Boilerplate.Accounts.sign_in_user(conn, admin)
      new_conn = put conn, user_path(conn, :update, user), user: @update_attrs
      assert %{"id" => ^id} = json_response(new_conn, 200)["data"]

      conn = get conn, user_path(conn, :show, id, %{"username" => @update_attrs.username})
      assert data = json_response(conn, 200)["data"]
      assert Map.drop(data, ["last_login"]) == %{
        "id" => id,
        "name" => @update_attrs.name,
        "username" => @update_attrs.username,
        "email" => @update_attrs.email,
        "is_staff" => false,
        "is_superuser" => false}
    end

    test "not renders user when data is valid and users are not the same", %{conn: conn, user: %User{id: id} = user} do
      {:ok, %User{} = user2} = Accounts.create_user(@create_attrs2)
      conn = Boilerplate.Accounts.sign_in_user(conn, user2)
      new_conn = put conn, user_path(conn, :update, user), user: @update_attrs
      assert json_response(new_conn, 403)

      conn = get conn, user_path(conn, :show, id, %{"username" => @create_attrs.username})
      assert data = json_response(conn, 200)["data"]
      assert Map.drop(data, ["last_login"]) == %{
        "id" => id,
        "name" => @create_attrs.name,
        "username" => @create_attrs.username}
        # "email" => @update_attrs.email,
    end

    test "not renders user when data is valid and user are not authorised", %{conn: conn, user: %User{id: id} = user} do
      new_conn = put conn, user_path(conn, :update, user), user: @update_attrs
      assert json_response(new_conn, 401)["errors"]

      conn = Boilerplate.Accounts.sign_in_user(conn, user)
      conn = get conn, user_path(conn, :show, id, %{"username" => @create_attrs.username})
      assert data = json_response(conn, 200)["data"]
      assert Map.drop(data, ["last_login"]) == %{
        "id" => id,
        "name" => @create_attrs.name,
        "username" => @create_attrs.username}
        # "email" => @update_attrs.email,
    end

    test "renders errors when data is invalid", %{conn: conn, user: user} do
      conn = Boilerplate.Accounts.sign_in_user(conn, user)
      conn = put conn, user_path(conn, :update, user), user: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete user" do
    setup [:create_user]

    test "deletes chosen user when users are the same", %{conn: conn, user: user} do
      new_conn = Boilerplate.Accounts.sign_in_user(conn, user)
      new_conn = delete new_conn, user_path(new_conn, :delete, user.id)
      assert response(new_conn, 204)

      admin = Accounts.get_user_by_username("admin")
      conn = Boilerplate.Accounts.sign_in_user(conn, admin)
      conn = get conn, user_path(conn, :show, user.id, %{"username" => user.username})
      assert response(conn, 404)
    end

    test "deletes chosen user when admin is deleting", %{conn: conn, user: user} do
      admin = Accounts.get_user_by_username("admin")
      new_conn = Boilerplate.Accounts.sign_in_user(conn, admin)
      new_conn = delete new_conn, user_path(new_conn, :delete, user.id)
      assert response(new_conn, 204)

      conn = Boilerplate.Accounts.sign_in_user(conn, admin)
      conn = get conn, user_path(conn, :show, user.id, %{"username" => user.username})
      assert response(conn, 404)
    end

    test "not deletes chosen user when users are not the same", %{conn: conn, user: user} do
      {:ok, %User{} = user2} = Accounts.create_user(@create_attrs2)
      new_conn = Boilerplate.Accounts.sign_in_user(conn, user2)
      new_conn = delete new_conn, user_path(new_conn, :delete, user.id)
      assert response(new_conn, 403)

      admin = Accounts.get_user_by_username("admin")
      conn = Boilerplate.Accounts.sign_in_user(conn, admin)
      conn = get conn, user_path(conn, :show, user.id, %{"username" => user.username})
      assert response(conn, 200)
    end

    test "not deletes chosen user when user are not authorised", %{conn: conn, user: user} do
      new_conn = delete conn, user_path(conn, :delete, user.id)
      assert json_response(new_conn, 401)["errors"]

      admin = Accounts.get_user_by_username("admin")
      conn = Boilerplate.Accounts.sign_in_user(conn, admin)
      conn = get conn, user_path(conn, :show, user.id, %{"username" => user.username})
      assert response(conn, 200)
    end
  end

  defp create_user(_) do
    user = fixture(:user)
    {:ok, user: user}
  end
end
