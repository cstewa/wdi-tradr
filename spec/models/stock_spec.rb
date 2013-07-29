require 'spec_helper'

describe Stock do

  it "belongs to a user" do
    stock = FactoryGirl.create(:stock)
    expect(stock.user.email).to eq("harrison@harrison.com")
  end

  it "has a starting price" do
    stock = FactoryGirl.create(:stock)
    price = stock.set_starting_price
    expect(stock.starting_price.nil?).to be_false
  end

  it "has a latest price" do
    stock = FactoryGirl.create(:stock)
    price = stock.latest_price
    expect(price.class).to eq(String)
  end

end