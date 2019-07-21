class PagesController < ApplicationController
  def index
    #@lat_lng = cookies[:lat_lng].split("|")
  end

  def locations
    ap "here"
    render json: {"response": "here"}
  end
end
