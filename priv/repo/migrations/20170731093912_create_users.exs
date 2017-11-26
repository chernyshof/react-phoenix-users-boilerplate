defmodule Boilerplate.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string, null: false
      add :username, :string, null: false
      add :email, :string, null: false
      add :password_hash, :string, null: false
      add :is_staff, :boolean, null: false, default: false
      add :is_superuser, :boolean, null: false, default: false
      add :last_login, :naive_datetime, default: fragment("now()")

      timestamps()
    end

    create index(:users, ["lower(username)"], unique: true)
    create index(:users, ["lower(email)"], unique: true)

    # In case if you not using postgres(not quite what we want but still better than nothing):
    # create index(:users, :username, unique: true)
    # create index(:users, :email, unique: true)
  end
end
