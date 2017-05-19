# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :boilerplate,
  ecto_repos: [Boilerplate.Repo]

# Configures the endpoint
config :boilerplate, Boilerplate.Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "79zOvbcqg7tbo4wHLpnuOGIPdtmWb+iy46gekVvOzH+G7YOSageu4ZOG3C4KEEES",
  render_errors: [view: Boilerplate.Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Boilerplate.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
