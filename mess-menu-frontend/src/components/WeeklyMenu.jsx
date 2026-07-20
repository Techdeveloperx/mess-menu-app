import { useEffect, useState } from "react";

function WeeklyMenu() {

  const [day, setDay] = useState("Monday");
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getMenu(day);
  }, [day]);

  const getMenu = async (selectedDay) => {

    const response = await fetch(
      `http://127.0.0.1:5000/menu/${selectedDay}`
    );

    const data = await response.json();

    setMenu(data);
  };

  return (

    <div className="container">

      <h1>📖 Weekly Menu</h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>

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

      {menu.length === 0 ? (

        <h2 style={{ textAlign: "center" }}>
          No Menu Available
        </h2>

      ) : (

        menu.map((item, index) => (

          <div className="menu-card" key={index}>

            <h2>{item.meal_type}</h2>

            <hr />

            <br />

            <h3>{item.dish}</h3>

          </div>

        ))

      )}

    </div>

  );

}

export default WeeklyMenu;