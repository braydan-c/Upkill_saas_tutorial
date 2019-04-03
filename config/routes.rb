Rails.application.routes.draw do
    root to: 'pages#home'
    devise_for :users, controllers: { registrations: 'users/registrations' }
    get 'about', to: 'pages#about'
    resources :contacts, only: :create
    get 'signup', to: 'pages#signup'
    get 'contact-us', to: 'contacts#new', as: 'new_contact'
end
