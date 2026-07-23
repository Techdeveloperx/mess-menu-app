import { useEffect, useState } from "react";

function TopDish() {

  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    getTopDishes();
  }, []);

  const getTopDishes = async () => {
    try {

      const response = await fetch("http://127.0.0.1:5000/top-dishes");

      const data = await response.json();

      setDishes(data);

    } catch (error) {
      console.log(error);
    }
  };

  const getRank = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "🏅";
  };

  return (

    <div className="container">

      <div className="hero">

        <h1>🏆 Top Rated Dishes</h1>

        <p>Students' Favourite Meals</p>

      </div>

      <div className="leaderboard">

        {dishes.length === 0 ? (

          <h2>No Ratings Available</h2>

        ) : (

          dishes.map((dish, index) => (

            <div className="leader-card" key={index}>

              <div className="leader-rank">

                {getRank(index)}

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

export default TopDish;