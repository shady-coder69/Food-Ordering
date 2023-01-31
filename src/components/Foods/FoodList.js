import { Fragment, useEffect, useState } from "react";
import Card from "../UI/Card";
import "./FoodList.css";
import IndividualFood from "./IndividualFood";

const FoodList = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-cc704-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Gaand mara gaya");
      }
      const data = await response.json();
      const Foods = [];
      for (const meal in data) {
        Foods.push({
          id: meal,
          name: data[meal].name,
          description: data[meal].description,
          price: data[meal].price,
        });
      }
      setMeals(Foods);
      setIsLoading(false);
    };
    fetchMeals().catch((err) => {
      setIsLoading(false);
      setError(err.message);
    });
  }, []);

  return (
    <Card className="food-list">
      {isLoading && <p className="loading">Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      <ul>
        {meals.map((food) => {
          return (
            <Fragment>
              <IndividualFood key={food.id} foodItem={food} />
              <hr />
            </Fragment>
          );
        })}
      </ul>
    </Card>
  );
};

export default FoodList;
