defmodule Boilerplate.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.{Query, Changeset}, warn: false
  alias Boilerplate.Repo

  alias Boilerplate.Accounts.User

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    if !is_exist_username(attrs["username"]) do
      if !is_exist_email(attrs["email"]) do
        %User{}
        |> User.registration_changeset(attrs)
        |> Repo.insert()
      else
        {:error, :already_taken_email}
      end
    else
      {:error, :already_taken_username}
    end
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a User.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}

  """
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end

  defp is_exist_username(username) do
    Repo.one(from p in User, where: fragment("lower(?)", p.username) == fragment("lower(?)", ^username))
  end

  defp is_exist_email(email) do
    Repo.one(from p in User, where: fragment("lower(?)", p.email) == fragment("lower(?)", ^email))
  end

  def get_current_token(conn) do
    Guardian.Plug.current_token(conn)
  end

  def revoke_token!(jwt) do
    Guardian.revoke!(jwt)
  end

  def get_claims(conn) do
    Guardian.Plug.claims(conn)
  end

  def refresh_token!(jwt, claims) do
    Guardian.refresh!(jwt, claims, %{ttl: {30, :days}})
  end

  def get_current_user(conn) do
    Guardian.Plug.current_resource(conn)
  end

  def sign_in_user(conn, user) do
    Guardian.Plug.api_sign_in(conn, user, :access)
  end

  def authenticate(%{"email" => email, "password" => password}) do
    user = Repo.one(from p in User, where: fragment("lower(?)", p.email) == fragment("lower(?)", ^email))

    case check_password(user, password) do
      true -> {:ok, user}
      _ -> {:error, :wrong_credentials}
    end
  end

  defp check_password(user, password) do
    case user do
      nil -> Comeonin.Bcrypt.dummy_checkpw()
      _ -> Comeonin.Bcrypt.checkpw(password, user.password_hash)
    end
  end
end
