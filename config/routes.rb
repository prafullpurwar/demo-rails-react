Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  
  root 'homepage#index'
  get 'companies', to: 'companies#index'
  get 'users', to: 'users#index'
  get 'userCountByRoles', to: 'companies#fetch_count_by_roles'
end
