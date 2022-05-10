import { useReducer } from "react"
import CartContext from "./cart-context"

const CartProvider = props => {

  const initialState = {
    items: [],
    totalAmount:0
  }

  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_ITEM":
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
        return {
          ...state,
          items: [...state.items, action.payload],
          totalAmount: updatedTotalAmount
        }
      case "REMOVE_ITEM":
        return {
          ...state,
          items: state.items.filter((item,index) => {
            return index !== action.payload
          })
        }
        default:
        return state
    }
  }

  const [cartState, dispatchCartAction]  = useReducer(cartReducer)

  const addItemToCartHandler = item => { 
    dispatchCartAction({type:"ADD_ITEM", payload: item})
  }
  const removeItemFromCartHandler = id => {
    dispatchCartAction({type:"REMOVE_ITEM", payload: id})
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem:removeItemFromCartHandler
  }

  return <CartContext.Provider  value={cartContext}>
    {props.children}
  </CartContext.Provider>
 }

export default CartProvider