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

  def pay_item
   Payjp.api_key = "sk_test_〇〇〇〇〇〇"  # 秘密鍵を設定
   Payjp::Charge.create(
     amount: order_params[:price],  # 商品の値段
     card: order_params[:token],    # カードトークン
     currency:'jpy'                 # 通貨の種類
   )
  end
end
