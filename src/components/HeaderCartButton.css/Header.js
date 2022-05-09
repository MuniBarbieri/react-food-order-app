import mealsImg from "../../assets/epic-meal-prep-5.jpg"
import classes from "./Header.module.css"
import HeaderCartButton from "./HeaderCartButton";

const Header = ({onShowCart}) => { 
  return <>
    <header className={classes.header}>
      <h1>React  Meals</h1>
      <HeaderCartButton onShowCart={onShowCart}/>
    </header>
    <div className={classes['main-image']} >
      <img src={mealsImg} alt="food" />
    </div>
  </>
};

export default Header;