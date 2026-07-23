import { useEffect, useState } from "react";

function TodayMenu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getTodayMenu();
  }, []);

  const getTodayMenu = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/");
      const data = await response.json();
      setMenu(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEmoji = (meal) => {
    switch (meal) {
      case "Breakfast":
        return "🍳";
      case "Lunch":
        return "🍛";
      case "Snacks":
        return "☕";
      case "Dinner":
        return "🌙";
      default:
        return "🍽️";
    }
  };

  const getClass = (meal) => {
    switch (meal) {
      case "Breakfast":
        return "breakfast";
      case "Lunch":
        return "lunch";
      case "Snacks":
        return "snacks";
      case "Dinner":
        return "dinner";
      default:
        return "";
    }
  };

  return (
    <div className="container">

      <div className="hero">
        <h1>🍽️ Today's Menu</h1>
        <p>Fresh meals served today in the LPU Mess</p>
      </div>

      <div className="today-grid">

        {menu.length === 0 ? (
          <h2>No Menu Available</h2>
        ) : (
          menu.map((item, index) => (
            <div
              key={index}
              className={`today-card ${getClass(item.meal_type)}`}
            >
              <div className="meal-icon">
                {getEmoji(item.meal_type)}
              </div>

              <h2>{item.meal_type}</h2>

              <div className="line"></div>

              <h3>{item.dish}</h3>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default TodayMenu;