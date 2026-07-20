import { useState } from "react";

function WeeklyMenu() {
  const [day, setDay] = useState("Monday");
  const [menu, setMenu] = useState([]);

  const getMenu = async () => {
    const response = await fetch(`http://127.0.0.1:5000/menu/${day}`);
    const data = await response.json();
    setMenu(data);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Weekly Menu</h2>

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

      <br /><br />

      <button onClick={getMenu}>
        Show Menu
      </button>

      <div style={{ marginTop: "20px" }}>
        {menu.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid white",
              borderRadius: "10px",
              padding: "15px",
              margin: "10px"
            }}
          >
            <h3>{item.meal_type}</h3>
            <p>{item.dish}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyMenu;