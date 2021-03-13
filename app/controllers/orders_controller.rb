class OrdersController < ApplicationController
  def index
  end

  def create
  end

  private

  def order_params
    params.permit(:price, :token)
  end
end
