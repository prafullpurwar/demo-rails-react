class Company < ApplicationRecord
    include CompanyFilterable

    #User count for a company
    def users_count(role)
        roles = Company.roles
        if roles.include? role
            self.users.count
        else
            self.users.where(:role => role).count 
        end
    end

    #Add user_counts metod in json
    def as_json(options = {})
        json_to_return = super
        if options.has_key? :role
            count = users_count(options[:role])
            json_to_return[:users_count] = count
        end
        return json_to_return
    end
end
