defmodule BoilerplateWeb.AuthErrorController do
  import Plug.Conn
  use BoilerplateWeb, :controller

  def auth_error(conn, {_type, _reason}, _opts) do
    conn
    |> put_status(:unauthorized)
    |> render(BoilerplateWeb.SessionView, "wrong_credentials.json")
  end
end
