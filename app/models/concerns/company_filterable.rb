module CompanyFilterable
    extend ActiveSupport::Concern

    included do
      has_many :users, dependent: :destroy #Association
      enum role: [ :buyer, :supplier ] #Company roles

      scope :filter_by_role, -> (role) { includes(:users).where(:role => role).limit(10) } #filter companies by role
      scope :filter_by_user_role, -> (role) { includes(:users).where(:users => {:role => role}).limit(10) } #filter company by user role
    end
    

    module ClassMethods

      #filter by role
      def filter(filtering_params)
        results = self.includes(:users).where(nil)
        filtering_params.each do |key, value|
          if(value.present?)
            results = results.public_send("filter_by_#{key}", value) if self.roles.include? value
            results = results.public_send("filter_by_user_#{key}", value) if ['sales', 'marketing', 'purchasing', 'executive'].include? value
          end
        end
        results
      end

      #get user's count by each role in company and users
      def count
        companies = []
        users = []
        user_count_by_roles = []
        roles = self.roles
        user_roles = User.roles
        roles.each do |role|
          companies << {'label': role[0], count: self.where(:role => role[0]).count}
        end
        user_count_by_roles << {'data': companies, text: 'Companies'}
        user_roles.each do |role|
          users << {'label': role[0], count: self.includes(:users).where(:users => {:role => role[0]}).count}
        end
        user_count_by_roles << {'data': users, text: 'Users'}
        user_count_by_roles
      end
    end
  end