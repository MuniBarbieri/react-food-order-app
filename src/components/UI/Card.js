import classses from "./Card.module.css"

export const Card = props => {
  return (
    <div className={classses.card}>{ props.children}</div>
  )
};

export default Card