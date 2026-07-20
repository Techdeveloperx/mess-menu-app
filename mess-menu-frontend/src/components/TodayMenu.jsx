import { useEffect, useState } from "react";

function TodayMenu() {

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getTodayMenu();
  }, []);

  const getTodayMenu = async () => {

    const response = await fetch("http://127.0.0.1:5000/");

    const data = await response.json();

    setMenu(data);

  };

  return (

    <div className="container">

      <h1>🍽️ Today's Menu</h1>

      {menu.length === 0 ? (

        <h2>No Menu Available</h2>

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

export default TodayMenu;