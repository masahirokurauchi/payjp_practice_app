class OrdersController < ApplicationController
  def index
  end

  def create
  	@order = Order.new(price: order_params[:price])
  end

  private

  def order_params
    params.permit(:price, :token)
  end
end
