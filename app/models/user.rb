class User < ApplicationRecord
    belongs_to :company
    
    enum role: [ :sales, :marketing, :purchasing, :executive] #user roles
end
