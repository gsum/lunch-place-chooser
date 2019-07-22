Rails.application.routes.draw do
  get 'pages/index'
  get "/locations_with_long_lat", to: "pages#locations_with_long_lat", as:"locations_with_long_lat"
  get "/locations_with_address", to: "pages#locations_with_address", as:"locations_with_address"
  root to: "pages#index"
end
