require 'spec_helper'

describe User do

  it "has a stock" do
    stock = FactoryGirl.create(:stock)
    expect(User.last.stocks.first.symbol).to eq("AAPL")
  end

end