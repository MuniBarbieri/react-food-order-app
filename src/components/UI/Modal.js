import classes from "./Modal.module.css"
import ReactDOM from "react-dom"


const Backdrop = ({onHideCart}) => { 
  return <div className={classes.backdrop}  onClick={onHideCart} ></div>
}

const ModalOverlay = props => {
  return <div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
  </div>
}

const portalElement = document.getElementById('overlays')


const Modal = ({onHideCart,children}) => {
    return <>
      {ReactDOM.createPortal(<Backdrop onHideCart={onHideCart} />,portalElement )}
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>,portalElement)}

  </>
}

export default Modal
