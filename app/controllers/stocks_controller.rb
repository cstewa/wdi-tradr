class StocksController < ApplicationController
  # POST /stocks
  # POST /stocks.json
  def create
    @stock = current_user.stocks.build(params[:stock])

    @stock.save
    @stocks = current_user.stocks
  end

  def chart
    symbol = params[:symbol]
    stock = Stock.where(:symbol => symbol)[0]
    render :json =>
      { price: stock.latest_price, time: Time.now, symbol: symbol }
  end

end
