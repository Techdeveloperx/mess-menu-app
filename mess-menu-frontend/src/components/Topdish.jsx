import { useEffect, useState } from "react";

function TopDish() {

  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    getTopDishes();
  }, []);

  const getTopDishes = async () => {

    const response = await fetch("http://127.0.0.1:5000/top-dishes");

    const data = await response.json();

    setDishes(data);

  };

  return (

    <div className="container">

      <h1>🏆 Top Rated Dishes</h1>

      {dishes.length === 0 ? (

        <h2>No Top Rated Dishes Found</h2>

      ) : (

        dishes.map((dish, index) => (

          <div className="card" key={index}>

            <h2>
              {index === 0 && "🥇 "}
              {index === 1 && "🥈 "}
              {index === 2 && "🥉 "}
              {dish.dish_name}
            </h2>

            <hr />

            <br />

            <h3>Average Rating</h3>

            <h2>⭐ {dish.average_rating}</h2>

          </div>

        ))

      )}

    </div>

  );

}

export default TopDish;