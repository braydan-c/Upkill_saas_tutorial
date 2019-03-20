Rails.application.routes.draw do
  devise_for :users
    root to: 'pages#home'
    get 'about', to: 'pages#about'
    resources :contacts, only: :create
    get 'signup', to: 'pages#signup'
    get 'contact-us', to: 'contacts#new', as: 'new_contact'
end
