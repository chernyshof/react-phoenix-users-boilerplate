defmodule Boilerplate.Web.UserView do
  use Boilerplate.Web, :view
  alias Boilerplate.Web.UserView

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      username: user.username,
      email: user.email,
    }
  end
end
