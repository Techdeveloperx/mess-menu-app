import { useEffect, useState } from "react";

function RateDish() {

  const [studentName, setStudentName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [menu, setMenu] = useState([]);
  const [ratings, setRatings] = useState({});

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [popup, setPopup] = useState({
    show: false,
    success: true,
    title: "",
    message: "",
  });

  useEffect(() => {
    getTodayMenu();
  }, []);

  const getTodayMenu = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:5000/"
      );

      const data = await response.json();

      setMenu(data);

    } catch (error) {

      console.log(error);

      setPopup({
        show: true,
        success: false,
        title: "Error",
        message: "Unable to load today's menu.",
      });

    } finally {

      setLoading(false);

    }

  };

  const closePopup = () => {

    setPopup({
      ...popup,
      show: false,
    });

  };

  const submitRating = async (dishName) => {

    if (studentName.trim() === "") {

      setPopup({
        show: true,
        success: false,
        title: "Missing Information",
        message: "Please enter Student Name.",
      });

      return;
    }

    if (registrationNumber.trim() === "") {

      setPopup({
        show: true,
        success: false,
        title: "Missing Information",
        message: "Please enter Registration Number.",
      });

      return;
    }

    if (!ratings[dishName]) {

      setPopup({
        show: true,
        success: false,
        title: "Rating Required",
        message: "Please select a rating.",
      });

      return;
    }

    try {

      setSubmitting(true);

      const response = await fetch(
        "http://127.0.0.1:5000/rate",
        {
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
        }
      );

      const data = await response.json();

      const success =
        !data.message.toLowerCase().includes("already");

      setPopup({
        show: true,
        success: success,
        title: success ? "Success" : "Already Rated",
        message: data.message,
      });

      if (success) {

        setRatings((prev) => ({
          ...prev,
          [dishName]: 0,
        }));

      }

    } catch (error) {

      setPopup({
        show: true,
        success: false,
        title: "Server Error",
        message: "Something went wrong.",
      });

    } finally {

      setSubmitting(false);

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

  if (loading) {

    return (

      <div className="loader-container">

        <div className="loader"></div>

        <div className="loader-text">
          Loading Today's Menu...
        </div>

      </div>

    );

  }

  return (

    <div className="container">

      <div className="hero">

        <h1>⭐ Rate Today's Food</h1>

        <p>
          Your feedback helps improve the mess experience.
        </p>

      </div>

      <div className="student-form">

        <input
          type="text"
          placeholder="👤 Student Name"
          value={studentName}
          onChange={(e) =>
            setStudentName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="🆔 Registration Number"
          value={registrationNumber}
          onChange={(e) =>
            setRegistrationNumber(e.target.value)
          }
        />

      </div>

      <div className="today-grid">

        {menu.map((item, index) => (

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

            <div className="star-rating">

              {[1,2,3,4,5].map((star)=>(
                                <span
                  key={star}
                  className={
                    ratings[item.dish] >= star
                      ? "star active-star"
                      : "star"
                  }
                  onClick={() =>
                    setRatings({
                      ...ratings,
                      [item.dish]: star,
                    })
                  }
                >
                  ⭐
                </span>
              ))}

            </div>

            <button
              className="submit-btn"
              disabled={submitting}
              onClick={() => submitRating(item.dish)}
            >
              {submitting ? "Submitting..." : "Submit Rating"}
            </button>

          </div>

        ))}

      </div>

      {popup.show && (

        <div className="popup-overlay">

          <div className="popup">

            <div className="popup-icon">
              {popup.success ? "✅" : "❌"}
            </div>

            <h2>{popup.title}</h2>

            <p>{popup.message}</p>

            <button
              className="popup-btn"
              onClick={() => {

                closePopup();

                if (popup.success) {

                  setStudentName("");
                  setRegistrationNumber("");
                  setRatings({});

                }

              }}
            >
              OK
            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default RateDish;