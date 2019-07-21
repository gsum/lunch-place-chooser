class PagesController < ApplicationController
  require 'rest-client'
  def index
  end

  def locations_with_long_lat
    ap params.permit!
    lat = params[:lat]
    long = params[:long]
    response = RestClient.get "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=#{lat},#{long}&radius=15000&type=restaurant&key=AIzaSyDHwiQbOY5M-bsvr-Dk2g2r1IUVFuDvsao"

    #response = RestClient.get "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurents+fargo&key=AIzaSyDHwiQbOY5M-bsvr-Dk2g2r1IUVFuDvsao"
    val = JSON.parse response
    random = rand(val["results"].length)
    render json: {"response": val["results"][random]}
  end

  def locations_with_address
  end
end
