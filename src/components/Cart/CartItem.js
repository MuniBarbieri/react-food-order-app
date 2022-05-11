import classes from "./CartItem.module.css"

const CartItem = ({name, amount, price, onAdd, onRemove}) => {
  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{ name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}> ${price}</span>
          <span className={classes.amount}> x { amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button 
          className={classes.onRemove}
          onClick={onRemove}
        >-</button>
        <button 
          className={classes.onAdd}
          onClick={onAdd}
        >+</button>
      </div>
    </li>
  )
}
export default CartItem