defmodule Boilerplate.Web.SessionController do
  use Boilerplate.Web, :controller
  
  alias Boilerplate.Accounts

  action_fallback Boilerplate.Web.FallbackController

  def create(conn, params) do
    with {:ok, user} <- Accounts.authenticate(params) do
      new_conn = Accounts.sign_in_user(conn, user) 
      jwt = Accounts.get_current_token(new_conn)

      new_conn
      |> put_status(:created)
      |> render("show.json", user: user, jwt: jwt)
    end
  end

  def delete(conn, _) do
    with jwt = Accounts.get_current_token(conn),
         Accounts.revoke_token!(jwt) do
      conn
      |> put_status(:ok)
      |> render("delete.json")
    end
  end

  def refresh(conn, _params) do
    user = Accounts.get_current_user(conn)
    with jwt = Accounts.get_current_token(conn),
         {:ok, claims} <- Accounts.get_claims(conn),
         {:ok, new_jwt, _new_claims} <- Accounts.refresh_token!(jwt, claims) do
      conn
      |> put_status(:ok)
      |> render("show.json", user: user, jwt: new_jwt)
    end
  end
end
