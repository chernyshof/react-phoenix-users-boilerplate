defmodule BoilerplateWeb.UserView do
  use BoilerplateWeb, :view
  alias BoilerplateWeb.UserView

  def render("user.json", %{user: user}) do
    %{id: user.id,
      username: user.username,
      email: user.email}
  end
end
