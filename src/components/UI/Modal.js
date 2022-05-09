import classes from "./Modal.module.css"
import ReactDOM from "react-dom"


const Backdrop = props => { 
  return <div className={classes.backdrop}></div>
}

const ModalOverlay = props => {
  return <div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
  </div>
}

const portalElement = document.getElementById('overlays')


const Modal = props => {
    return <>
      {ReactDOM.createPortal(<Backdrop />,portalElement )}
      {ReactDOM.createPortal(<ModalOverlay>{ props.children}</ModalOverlay>,portalElement)}

  </>
}

export default Modal

/*
to render a Portal, we first of all need to go to the public folder and they are the index HTML file. And here we got this root div where the overall React application is being rendered. And above that route div, I will add a number div with an ID of over lace. And that is the div where I wanna Portal my modal and the backdrop too. So that is a change we need to make to any HTML. And with that back in the modal JS file we can create the backdrop and the overlay and then use the Portal.
 */