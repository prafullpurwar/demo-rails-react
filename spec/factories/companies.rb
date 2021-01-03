FactoryBot.define do
    factory :company do
      trait :buyer do
        role :buyer
      end
  
      trait :supplier do
        status :supplier
      end
    end
  end