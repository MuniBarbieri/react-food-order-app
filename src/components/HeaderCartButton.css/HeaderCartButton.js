import { useContext, useEffect, useState } from "react"

import CartIcon from "../Cart/CartIcon"
import CartContext from "../../store/cart-context"
import classes from "./HeaderCartButton.module.css"

const HeaderCartButton = ({ onShowCart }) => {
  const cartCtx = useContext(CartContext)

  const [btnIsHighlighted, setBtnIsHighLighted] = useState(false)

  const { items } = cartCtx

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return
    }
    setBtnIsHighLighted(true)

    const timer = setTimeout(() => {
      setBtnIsHighLighted(false)
    }, 300);

    return () => {
      clearTimeout(timer);
    }

  },[items])
  const numberOfCartItems = items.reduce((currentNumber, item) => {

      return currentNumber + item.amount
  }, 0)

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`

  return (
    <button
      className={btnClasses}
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