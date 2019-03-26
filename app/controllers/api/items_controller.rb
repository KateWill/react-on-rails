class Api::ItemsController < ApplicationController
  # before_action :set_item, only: [:show, :destroy, :update, :edit]
  
  # Read
  def index
    # @items = Item.all
    render json: Item.all
  end

  # def show
  
  # end

  # def new
  #   @item = Item.new(item_params)
  # end

  # Create
  def create
    @item = Item.new(item_params)
    
    if @item.save
      render json: @item
    else
      render json: { errors: @item.errors }, status: :unprocessable_entity
    end
  end

  # def edit

  # end

  # Update
  def update
  #  if @item.update(item_params)
  #   render json: @item
  #  else
  #   rrender json: { errors: @item.errors }, status: :unprocessable_entity
  #  end

  item = Item.find(params[:id])
  item.update(complete: !item.complete)
  render json: item

  end

  # Delete
  def destroy
    # @item.destroy
    Item.find(params[:id]).destroy
    render json: { message: 'item is deleted'}

  end


private

# def set_item
#   @item = Item.find(params[:id])
# end

def item_params
  params.require(item).permit(:name, :complete)
end

end
