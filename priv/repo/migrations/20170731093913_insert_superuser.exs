defmodule Boilerplate.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    Boilerplate.Accounts.create_user(%{name: "admin", username: "admin", password: "12345678", email: "admin@admin.com", is_superuser: true, is_staff: true}, %{is_superuser: true})
  end
end
