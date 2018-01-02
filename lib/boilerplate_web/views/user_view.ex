defmodule BoilerplateWeb.UserView do
  use BoilerplateWeb, :view
  alias BoilerplateWeb.UserView

  def render("index.json", %{users: users}) do
    %{
      data: %{
        users: render_many(users, UserView, "show_user.json"),
      }
    }
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      is_staff: user.is_staff,
      is_superuser: user.is_superuser}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "show_user.json")}
  end

  def render("show_user.json", %{user: user}) do
    %{id: user.id,
      username: user.username,
      name: user.name}
    # email: user.email
  end

  def render("404.json", _assigns) do
    %{errors: "User not found"}
  end
end
