import { useReducer } from "react"
import CartContext from "./cart-context"

const CartProvider = props => {

  const initialState = {
    items: [],
    totalAmount:10
  }

  const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_ITEM":
        console.log("Reducer", action.payload)
        const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount
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
        return initialState
    }
  }

  const [cartState, dispatchCartAction]  = useReducer(cartReducer, initialState)

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