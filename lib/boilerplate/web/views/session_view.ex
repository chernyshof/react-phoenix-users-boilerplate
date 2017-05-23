defmodule Boilerplate.Web.SessionView do
  use Boilerplate.Web, :view
  alias Boilerplate.Web.SessionView
  
  def render("show.json", %{user: user, jwt: jwt}) do
    %{
      data: render_one(user, Boilerplate.Web.UserView, "user.json"),
      meta: %{token: jwt}
    }
  end

  def render("delete.json", _) do
    %{ok: true}
  end

  def render("no_session.json", _) do
    %{errors: "invalid or expired session token"}
  end
end
