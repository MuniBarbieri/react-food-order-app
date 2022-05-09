import Modal from "../UI/Modal"
import classes from "./Cart.module.css"

const Cart = ({onHideCart}) => {

  const cartItems = <ul  className={classes['cart-items']}>
    {
[{ id: 'c1', name: 'sushi', amount: 2, price: 12.99 }].map((item,i) => <li key={i}>{ item.name}</li>)
    }
  </ul> 

  return (
    <Modal  onHideCart={onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount </span>
        <span>35</span>
      </div>
      <div className={classes.actions}>
        <button
          className={classes['button--alt']}
          onClick={onHideCart}
        >Close  
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  )
}

export default Cart