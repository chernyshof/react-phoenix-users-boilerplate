defmodule BoilerplateWeb.SessionView do
  use BoilerplateWeb, :view
  alias BoilerplateWeb.SessionView

  def render("show.json", %{user: user, jwt: jwt}) do
    %{data: render_one(user, BoilerplateWeb.UserView, "user.json"),
      meta: %{token: jwt}}
  end

  def render("delete.json", _) do
    %{ok: true}
  end

  def render("no_session.json", _) do
    %{errors: "invalid or expired session token"}
  end
  
  def render("wrong_credentials.json", _) do
    %{errors: "Wrong email or password"}
  end
end
