class PagesController < ApplicationController
  require 'rest-client'
  def index
    #@lat_lng = cookies[:lat_lng].split("|")
  end

  def locations
    response = RestClient.get "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurents+fargo&key=AIzaSyDHwiQbOY5M-bsvr-Dk2g2r1IUVFuDvsao"
    val = JSON.parse response
    render json: {"response": val["results"]}
  end
end
