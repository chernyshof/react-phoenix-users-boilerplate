defmodule Boilerplate.AccountsTest do
  use Boilerplate.DataCase

  alias Boilerplate.Accounts

  describe "users" do
    alias Boilerplate.Accounts.User 
    @valid_attrs %{name: "Test Name", email: "test@test.com", password: "password", username: "username"}
    @update_attrs %{name: "Updated Name", email: "test_update@test.com", password: "updated_password", username: "testusername_updated"}
    @invalid_attrs %{name: nil, email: nil, password_hash: nil, username: nil}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounts.create_user()

      user
    end

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

    test "list_users/0 returns all users" do
      user = user_fixture()
      admin = Accounts.get_user_by_username("admin")
      is_the_same_users(Accounts.list_users(), [admin, user])
    end

    test "get_user_by_username/1 returns the user with given username" do
      user = user_fixture()
      user2 = Accounts.get_user_by_username(user.username)
      is_the_same_users(user, user2)
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      user2 = Accounts.get_user!(user.id)
      is_the_same_users(user, user2)
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Accounts.create_user(@valid_attrs)
      assert user.name == @valid_attrs.name
      assert user.email == @valid_attrs.email
      assert user.username == @valid_attrs.username
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, user} = Accounts.update_user(user, @update_attrs)
      assert %User{} = user
      assert user.email == @update_attrs.email
      assert user.name == @update_attrs.name
      assert user.username == @update_attrs.username
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:ok, user} = Accounts.update_user(user, @update_attrs)
      assert {:error, %Ecto.Changeset{}} = Accounts.update_user(user, @invalid_attrs)
      user_u = Accounts.get_user!(user.id)
      is_the_same_users(user_u, user)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Accounts.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Accounts.change_user(user)
    end
  end
end
