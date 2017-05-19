defmodule Boilerplate.GuardianSerializer do
  @behaviour Guardian.Serializer

  alias Boilerplate.Repo
  alias Boilerplate.Accounts.User

  def for_token(%User{} = user), do: {:ok, "User:#{user.id}"}
  def for_token(_), do: {:error, "Unknown resource type"}

  def from_token("User:" <> id), do: {:ok, Repo.get(User, String.to_integer(id))}
  def from_token(_), do: {:error, "Unknown resource type"}
end
