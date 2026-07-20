import { useEffect, useState } from "react";

function RateDish() {

  const [studentName, setStudentName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [menu, setMenu] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    getTodayMenu();
  }, []);

  const getTodayMenu = async () => {

    const response = await fetch("http://127.0.0.1:5000/");

    const data = await response.json();

    setMenu(data);

  };

  const submitRating = async (dishName) => {

    if (studentName === "") {
      alert("Enter Student Name");
      return;
    }

    if (registrationNumber === "") {
      alert("Enter Registration Number");
      return;
    }

    if (!ratings[dishName]) {
      alert("Please Select Rating");
      return;
    }

    const response = await fetch("http://127.0.0.1:5000/rate", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        student_name: studentName,
        registration_number: registrationNumber,
        dish_name: dishName,
        rating: ratings[dishName],

      }),

    });

    const data = await response.json();

    alert(data.message);

  };

  return (

    <div className="container">

      <h1>⭐ Rate Today's Menu</h1>

      <div style={{ textAlign: "center" }}>

        <input
          type="text"
          placeholder="Enter Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />

        <br />

        <input
          type="text"
          placeholder="Enter Registration Number"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
        />

      </div>

      {menu.map((item, index) => (

        <div className="menu-card" key={index}>

          <h2>{item.meal_type}</h2>

          <hr />

          <br />

          <h3>{item.dish}</h3>

          <br />

          <select
            onChange={(e) =>
              setRatings({
                ...ratings,
                [item.dish]: e.target.value,
              })
            }
          >
            <option value="">Select Rating</option>
            <option value="1">⭐ 1</option>
            <option value="2">⭐⭐ 2</option>
            <option value="3">⭐⭐⭐ 3</option>
            <option value="4">⭐⭐⭐⭐ 4</option>
            <option value="5">⭐⭐⭐⭐⭐ 5</option>
          </select>

          <br /><br />

          <button onClick={() => submitRating(item.dish)}>
            Submit Rating
          </button>

        </div>

      ))}

    </div>

  );

}

export default RateDish;