defmodule Boilerplate.Web.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use Boilerplate.Web, :controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(Boilerplate.Web.ChangesetView, "error.json", changeset: changeset)
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> render(Boilerplate.Web.ErrorView, :"404")
  end

  def call(conn, {:error, :wrong_credentials}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(Boilerplate.Web.ChangesetView, "wrong_credentials.json") 
  end

  def call(conn, {:error, :no_session}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(Boilerplate.Web.SessionView, "no_session.json")
  end
end
