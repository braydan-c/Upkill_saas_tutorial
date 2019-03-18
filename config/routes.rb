Rails.application.routes.draw do
    root to: 'pages#home'
    get 'about', to: 'pages#about'
    resources :contacts, only: :create
    get 'signup', to: 'pages#signup'
    get 'contact-us', to: 'contacts#new'
end
