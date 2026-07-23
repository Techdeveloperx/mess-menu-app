import { useEffect, useState } from "react";

function WeeklyMenu() {

  const [day, setDay] = useState("Monday");
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getMenu(day);
  }, [day]);

  const getMenu = async (selectedDay) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/menu/${selectedDay}`
      );

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
        <h1>📅 Weekly Menu</h1>
        <p>Select a day to view the complete mess menu</p>
      </div>

      <div className="day-selector">

        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
          <option>Sunday</option>
        </select>

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

export default WeeklyMenu;