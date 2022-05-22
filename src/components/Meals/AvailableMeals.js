import { useEffect, useState } from "react";
import Card from "../UI/Card"
import MealItem from "./MealItem/MealItem"
import classes from "./AvailableMeals.module.css"


const AvailableMeals = () => {

  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [ httpError, setHttpError] = useState({error:false,errorMessage:''})

  const mealList = meals.map(meal => <MealItem
    id={meal.id}
    key={meal.id}
    name={meal.name}
    description={meal.description}
    price={meal.price} />
  )

  useEffect(() => {
    const fetchMeals = async () => { 
      const response = await fetch('https://react-food-app-ab32f-default-rtdb.firebaseio.com/meals.json')
      
      if (!response.ok) {
        throw Error ('Something went wrong!')
      }

      const responseData = await response.json()
      const responseDataEntries = Object.entries(responseData)

      const loadedMeals = responseDataEntries.map(el => {
        const meals = {
          id: el[0],
          ...el[1]
        }
        return meals
      })
      setMeals(loadedMeals)
      setIsLoading(false)
    }
    fetchMeals().catch(error => {
      setIsLoading(false);
      setHttpError({error:true,errorMessage:error.message})
    })
  
  }, [isLoading,httpError.error])
  
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {httpError.error &&
            <p className={classes.mealsError}> Failed to fetch </p>}
          {isLoading && <p className={classes.mealsLoading} >Loading meals....</p>}
        {mealList}
        </ul>
      </Card>
    </section>
  )
}

export default AvailableMeals