import { useContext } from "react"
import Modal from "../UI/Modal"
import classes from "./Cart.module.css"
import CartContext from "../../store/cart-context"
import CartItem from "./CartItem"

const Cart = ({onHideCart}) => {

  const cartCtx = useContext(CartContext)
  const totalAmount = cartCtx.totalAmount.toFixed(2)
  const hasItems = cartCtx.items.length > 0;


  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }
  
  const cartItemAddHandler = item => {
      cartCtx.addItem({...item,amount: 1})
  }

  return (
    <Modal  onHideCart={onHideCart}>
      <ul  className={classes['cart-items']}>
        {cartCtx.items.map((item, i) =>
        <CartItem
            key={i}
            price={item.price}
            name={item.name}
            amount={item.amount}
            onRemove={()=>cartItemRemoveHandler(item.id)}
            onAdd={()=>cartItemAddHandler(item)}
        >{item.name}
        </CartItem>)}
    </ul> 
      <div className={classes.total}>
        <span>Total Amount </span>
        <span>{ totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button
          className={classes['button--alt']}
          onClick={onHideCart}
        >Close  
        </button>
        {

        hasItems&& <button className={classes.button}>Order</button>
        }
      </div>
    </Modal>
  )
}

export default Cart