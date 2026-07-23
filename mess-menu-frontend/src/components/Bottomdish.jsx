import { useEffect, useState } from "react";

function BottomDish() {

  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    getBottomDishes();
  }, []);

  const getBottomDishes = async () => {
    try {

      const response = await fetch("http://127.0.0.1:5000/bottom-dishes");

      const data = await response.json();

      setDishes(data);

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="container">

      <div className="hero">

        <h1>📉 Lowest Rated Dishes</h1>

        <p>Dishes that need improvement</p>

      </div>

      <div className="leaderboard">

        {dishes.length === 0 ? (

          <h2>No Ratings Available</h2>

        ) : (

          dishes.map((dish, index) => (

            <div className="bottom-card" key={index}>

              <div className="leader-rank">

                😕
              </div>

              <div className="leader-info">

                <h2>{dish.dish_name}</h2>

                <p>

                  ⭐ {Number(dish.average_rating).toFixed(1)} / 5

                </p>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default BottomDish;