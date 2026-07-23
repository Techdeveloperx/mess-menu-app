import { useEffect, useState } from "react";
import logo from "../assets/Lovely_Professional_University_logo.png";
import TodayMenu from "./TodayMenu";
import WeeklyMenu from "./WeeklyMenu";
import RateDish from "./RateDish";
import TopDish from "./TopDish";
import BottomDish from "./BottomDish";
import SearchStudent from "./SearchStudent";
import RatingChart from "./RatingChart";


function Home() {
  const [darkMode, setDarkMode] = useState(true);

  const [page, setPage] = useState("home");

  const [stats, setStats] = useState({

    total_ratings: 0,
    total_students: 0,
    total_dishes: 0,
    top_dish: "N/A",
    bottom_dish: "N/A",

  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    getStats();

  }, []);

  const getStats = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:5000/stats"
      );

      const data = await response.json();

      setStats(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (page === "today") {

    return (
      <>
        <button
          className="back-btn"
          onClick={() => setPage("home")}
        >
          ⬅ Back to Dashboard
        </button>

        <TodayMenu />
      </>
    );

  }

  if (page === "weekly") {

    return (
      <>
        <button
          className="back-btn"
          onClick={() => setPage("home")}
        >
          ⬅ Back to Dashboard
        </button>

        <WeeklyMenu />
      </>
    );

  }

  if (page === "rate") {

    return (
      <>
        <button
          className="back-btn"
          onClick={() => setPage("home")}
        >
          ⬅ Back to Dashboard
        </button>

        <RateDish />
      </>
    );

  }

  if (page === "top") {

    return (
      <>
        <button
          className="back-btn"
          onClick={() => setPage("home")}
        >
          ⬅ Back to Dashboard
        </button>

        <TopDish />
      </>
    );

  }

  if (page === "bottom") {

    return (
      <>
        <button
          className="back-btn"
          onClick={() => setPage("home")}
        >
          ⬅ Back to Dashboard
        </button>

        <BottomDish />
      </>
    );

  }
  if (page === "search") {

  return (
    <>
      <button
        className="back-btn"
        onClick={() => setPage("home")}
      >
        ⬅ Back to Dashboard
      </button>

      <SearchStudent />
    </>
  );

}

  if (loading) {

    return (

      <div className="loader-container">

        <div className="loader"></div>

        <div className="loader-text">
          Loading Dashboard...
        </div>

      </div>

    );

  }

  return (

    <div className={darkMode ? "container dark" : "container light"}>

      <div className="hero">
        <button
  className="theme-btn"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>

        <img
          src={logo}
          alt="LPU Logo"
          className="logo"
        />

        <h1>LPU Mess Menu</h1>

        <p>
          Smart Mess Management & Food Rating System
        </p>

      </div>

      <div className="dashboard">

        <div
          className="dashboard-card"
          onClick={() => setPage("today")}
        >

          <div className="icon">🍳</div>

          <h2>Today's Menu</h2>

          <p>
            View today's breakfast, lunch,
            snacks and dinner.
          </p>

        </div>

        <div
          className="dashboard-card"
          onClick={() => setPage("weekly")}
        >

          <div className="icon">📅</div>

          <h2>Weekly Menu</h2>

          <p>
            See the complete menu
            for the whole week.
          </p>

        </div>

        <div
          className="dashboard-card"
          onClick={() => setPage("rate")}
        >

          <div className="icon">⭐</div>

          <h2>Rate Food</h2>

          <p>
            Give your feedback
            for today's meals.
          </p>

        </div>
                <div
          className="dashboard-card"
          onClick={() => setPage("top")}
        >

          <div className="icon">🏆</div>

          <h2>Top Rated</h2>

          <p>
            Check the most loved dishes
            by students.
          </p>

        </div>

        <div
  className="dashboard-card"
  onClick={() => setPage("bottom")}
>

  <div className="icon">📉</div>

  <h2>Lowest Rated</h2>

  <p>
    See which dishes need
    improvement.
  </p>

</div>

<div
  className="dashboard-card"
  onClick={() => setPage("search")}
>

  <div className="icon">🔍</div>

  <h2>Search Student</h2>

  <p>
    Search ratings using
    registration number.
  </p>

</div>

</div>

      

      {/* Statistics */}

      <h1
        style={{
          marginTop: "50px",
          marginBottom: "25px",
        }}
      >
        📊 Dashboard Statistics
      </h1>

      <div className="dashboard">

        <div className="dashboard-card">

          <div className="icon">⭐</div>

          <h2>{stats.total_ratings}</h2>

          <p>Total Ratings</p>

        </div>

        <div className="dashboard-card">

          <div className="icon">👨‍🎓</div>

          <h2>{stats.total_students}</h2>

          <p>Students Participated</p>

        </div>

        <div className="dashboard-card">

          <div className="icon">🍽️</div>

          <h2>{stats.total_dishes}</h2>

          <p>Rated Dishes</p>

        </div>

        <div className="dashboard-card">

          <div className="icon">🥇</div>

          <h2
            style={{
              fontSize: "22px",
            }}
          >
            {stats.top_dish}
          </h2>

          <p>Highest Rated Dish</p>

        </div>

        <div className="dashboard-card">

          <div className="icon">📉</div>

          <h2
            style={{
              fontSize: "22px",
            }}
          >
            {stats.bottom_dish}
          </h2>

          <p>Lowest Rated Dish</p>

        </div>

      </div>
      <RatingChart />


      <footer className="footer">

        Developed by <strong>Manisha</strong> ❤️
        <br />
        React • Flask • PostgreSQL

      </footer>

    </div>

  );

}

export default Home;