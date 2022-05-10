import { useContext } from "react"

import CartIcon from "../Cart/CartIcon"
import CartContext from "../../store/cart-context"
import classes from "./HeaderCartButton.module.css"

const HeaderCartButton = ({ onShowCart }) => {
  const cartCtx = useContext(CartContext)

  console.log(cartCtx)

  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
      return currentNumber + item.amount
  }, 10)

  
  return (
    <button
      className={classes.button}
      onClick={onShowCart}
    >
      <span className={classes.icon}>
    <CartIcon/>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>
        {numberOfCartItems}
      </span>
    </button>
  )
}

export default HeaderCartButton