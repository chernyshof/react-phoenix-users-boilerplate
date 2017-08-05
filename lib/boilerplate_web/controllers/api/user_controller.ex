defmodule BoilerplateWeb.UserController do
  use BoilerplateWeb, :controller

  alias Boilerplate.Accounts
  alias Boilerplate.Accounts.User

  action_fallback BoilerplateWeb.FallbackController

  def create(conn, user_params) do
    with {:ok, %User{} = user} <- Accounts.create_user(user_params) do
      new_conn = Accounts.sign_in_user(conn, user)
      jwt = Accounts.get_current_token(new_conn)

      new_conn
      |> put_status(:created)
      |> render(BoilerplateWeb.SessionView, "show.json", user: user, jwt: jwt)
    end
  end
end
