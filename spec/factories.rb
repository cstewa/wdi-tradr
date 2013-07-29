FactoryGirl.define do

  factory :user do
    email "harrison@harrison.com"
    password "harrison"
    password_confirmation "harrison"
  end

  factory :stock do
    user
    quantity "5"
    symbol "AAPL"
  end

end