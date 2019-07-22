class PagesController < ApplicationController
  require 'rest-client'
  def index
    @google_maps_api_key = ENV["google_maps_api_key"]
  end

  def locations_with_long_lat
    lat = params[:lat]
    long = params[:long]
    response = RestClient.get "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=#{lat},#{long}&radius=15000&type=restaurant&key=#{ENV["google_maps_api_key"]}"
    val = JSON.parse response
    random = rand(val["results"].length)
    render json: {"response": val["results"][random]}
  end

  def locations_with_address
    place = params[:place]
    response = RestClient.get "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurents+#{place}&key=#{ENV["google_maps_api_key"]}"
    val = JSON.parse response
    random = rand(val["results"].length)
    render json: {"response": val["results"][random]}
  end
end
