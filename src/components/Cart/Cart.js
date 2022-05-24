import { useContext, useState } from "react"
import Modal from "../UI/Modal"
import classes from "./Cart.module.css"
import CartContext from "../../store/cart-context"
import CartItem from "./CartItem"
import Checkout from "./Checkout"

const Cart = ({onHideCart}) => {

  const [isCheckingout, setIsCheckingout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ didSubmit, setDidSubmit] = useState(false)
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

  const submitOrderHandler = async (userData) => {
    await fetch('https://react-food-app-ab32f-default-rtdb.firebaseio.com/orders.json', { method: 'POST', body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }) })
    
    setIsSubmitting(false)
    setDidSubmit(true)
    cartCtx.clearCart()
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
  

  const cartModalContent = <>
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
        <Checkout onCancel={onHideCart} onConfirm={submitOrderHandler}/>
      }
      { !isCheckingout && modalActions}

  </>

  const isSubmittingModalContent = <p>Sending order data...</p>
  const didSubmitModalContent = <>
    <p>Susccesfully sent the order!</p>
     <div className={classes.actions}>
        <button
          className={classes.button}
          onClick={onHideCart}
        >Close  
        </button>
  </div>
  </>
  
  return (
    <Modal  onHideCart={onHideCart}>
      {!isSubmitting && !didSubmit &&  cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  )
}

export default Cart;