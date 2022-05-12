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
        const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount 

        const indexOfRepeatedItem = state.items.findIndex(item => {
          return item.id === action.payload.id
        })

        const existingCartItem = state.items[indexOfRepeatedItem]

        let updatedItems

        if (existingCartItem) {
           const updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount + action.payload.amount
          }
          updatedItems = [...state.items]
          updatedItems[indexOfRepeatedItem] = updatedItem
        } else {
          updatedItems = [...state.items, action.payload]
        }
        
        return {
          ...state,
          items: updatedItems,
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