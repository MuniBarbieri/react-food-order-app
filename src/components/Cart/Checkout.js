import { useRef, useState } from "react"
import classes from "./Checkout.module.css"

const isEmpty = value => value.trim() === ""
const isFiveChars = value => value.trim().length === 5

const Checkout = ({onCancel,onConfirm}) => { 

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef()
  const cityInputRef = useRef()

  const [formInputsValidity, setFormInputsValidity] = useState({
      nameValidity: true,
    streetValidity: true,
    postalValidity: true,
      cityValidity:true
  })

  const confirmHandler = (e) => {
    e.preventDefault()

    const submittedValues = {
      name: nameInputRef.current.value,
      street: streetInputRef.current.value,
      postal: postalInputRef.current.value,
      city: cityInputRef.current.value,
    }

    const {
      name,street,postal,city
    } = submittedValues

    const enteredNameIsValid = !isEmpty(name)
    const enteredCityIsValid = !isEmpty(city)
    const enteredStreetIsValid = !isEmpty(street)
    const enteredPostalCodeIsValid = isFiveChars(postal)


    setFormInputsValidity({
      nameValidity: enteredNameIsValid,
      streetValidity: enteredCityIsValid,
      postalValidity: enteredPostalCodeIsValid,
      cityValidity: enteredCityIsValid
    })

    const formIsValid = enteredNameIsValid && enteredCityIsValid && enteredStreetIsValid && enteredPostalCodeIsValid
    

    if (formIsValid) {
      onConfirm(submittedValues)
    }
  }


  const nameControlClasses = `${classes.control} ${formInputsValidity.nameValidity ? '' : classes.invalid}`
    const streetControlClasses = `${classes.control} ${formInputsValidity.streetValidity ? '' : classes.invalid}`
  const cityControlClasses = `${classes.control} ${formInputsValidity.cityValidity ? '' : classes.invalid}`
  
    const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalValidity ? '' : classes.invalid}`
  
  
  

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.nameValidity && <p>Please entered a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
                {!formInputsValidity.streetValidity && <p>Please entered a valid name</p>}

      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
                {!formInputsValidity.postalValidity && <p>Please enter a valid Postal Code (5 numbers) </p>}

      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
                {!formInputsValidity.cityValidity && <p>Please entered a valid name</p>}

      </div>
      <div className={classes.actions}>
        <button type='button' onClick={({onCancel,onConfirm}).onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout