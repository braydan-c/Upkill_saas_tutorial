Rails.application.routes.draw do
    root to: 'pages#home'
    get 'about', to: 'pages#about'
    get 'signup', to: 'pages#signup'
    get '/', to: 'pages#home'
end
