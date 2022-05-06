import mealsImg from "../../assets/epic-meal-prep-5.jpg"
import classes from "./Header.module.css"

const Header = props => { 
  return <>
    <header className={classes.header}>
      <h1>React  Meals</h1>
      <button>Cart</button>
    </header>
    <div className={classes['main-image']} >
      <img src={mealsImg} alt="food" />
    </div>
  </>
};

export default Header;