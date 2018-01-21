defmodule BoilerplateWeb.SessionController do
  use BoilerplateWeb, :controller

  alias Boilerplate.Accounts

  action_fallback(BoilerplateWeb.FallbackController)

  def create(conn, params) do
    with {:ok, user} <- Accounts.authenticate(params) do
      new_conn = Accounts.sign_in_user(conn, user)
      jwt = Accounts.get_current_token(new_conn)

      spawn(fn -> Accounts.update_last_login(user) end)

      new_conn
      |> put_status(:created)
      |> render("show.json", user: user, jwt: jwt)
    end
  end

  def delete(conn, _) do
    user = Accounts.get_current_user(conn)

    with new_conn = Accounts.sign_out(conn) do
      spawn(fn -> Accounts.update_last_login(user) end)

      new_conn
      |> put_status(:ok)
      |> render("delete.json")
    end
  end

  def refresh(conn, _params) do
    user = Accounts.get_current_user(conn)

    with jwt = Accounts.get_current_token(conn),
         {:ok, _, {new_jwt, _new_claims}} <- Accounts.refresh_token(jwt) do
      spawn(fn -> Accounts.update_last_login(user) end)

      conn
      |> put_status(:ok)
      |> render("show.json", user: user, jwt: new_jwt)
    end
  end
end
