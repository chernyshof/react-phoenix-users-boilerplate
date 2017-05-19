defmodule Boilerplate.Web.PageController do
  use Boilerplate.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
