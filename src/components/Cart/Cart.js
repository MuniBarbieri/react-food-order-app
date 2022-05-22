import { useContext, useState } from "react"
import Modal from "../UI/Modal"
import classes from "./Cart.module.css"
import CartContext from "../../store/cart-context"
import CartItem from "./CartItem"
import Checkout from "./Checkout"

const Cart = ({onHideCart}) => {

  const [ isCheckingout, setIsCheckingout] = useState(false)
  const cartCtx = useContext(CartContext)
  const totalAmount = cartCtx.totalAmount.toFixed(2)
  const hasItems = cartCtx.items.length > 0;


  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }
  
  const cartItemAddHandler = item => {
      cartCtx.addItem({...item,amount: 1})
  }

  const orderHandler = () => {
    setIsCheckingout(!isCheckingout)
  }

  const modalActions =       <div className={classes.actions}>
        <button
          className={classes['button--alt']}
          onClick={onHideCart}
        >Close  
        </button>
        {

        hasItems && <button className={classes.button} onClick={orderHandler} >Order</button>
        }
      </div>

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
      {
        isCheckingout &&
        <Checkout onCancel={ onHideCart}/>
      }
      { !isCheckingout && modalActions}

    </Modal>
  )
}

export default Cart