import { useState } from "react";

function TodayMenu() {
  const [menu, setMenu] = useState([]);

  const getMenu = async () => {
    const response = await fetch("http://127.0.0.1:5000/");
    const data = await response.json();
    setMenu(data);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Today's Menu</h2>

      <button onClick={getMenu}>Load Menu</button>

      <div style={{ marginTop: "20px" }}>
        {menu.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid white",
              padding: "15px",
              margin: "10px",
              borderRadius: "10px"
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

export default TodayMenu;