import { useEffect, useState } from "react";
import Card from "../UI/Card"
import MealItem from "./MealItem/MealItem"
import classes from "./AvailableMeals.module.css"


const AvailableMeals = () => {

  const [ meals, setMeals] = useState([])

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
    }
    fetchMeals()
  }, [])
  
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
        {mealList}
        </ul>
      </Card>
    </section>
  )
}

export default AvailableMeals