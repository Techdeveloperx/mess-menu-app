import { useState } from "react";
import TodayMenu from "./TodayMenu";
import WeeklyMenu from "./WeeklyMenu";
import RateDish from "./RateDish";
import TopDish from "./TopDish";
import BottomDish from "./BottomDish";

function Home() {

  const [page, setPage] = useState("home");

  if (page === "today") {
    return (
      <>
        <button className="back-btn" onClick={() => setPage("home")}>
          ⬅ Back
        </button>
        <TodayMenu />
      </>
    );
  }

  if (page === "weekly") {
    return (
      <>
        <button className="back-btn" onClick={() => setPage("home")}>
          ⬅ Back
        </button>
        <WeeklyMenu />
      </>
    );
  }

  if (page === "rate") {
    return (
      <>
        <button className="back-btn" onClick={() => setPage("home")}>
          ⬅ Back
        </button>
        <RateDish />
      </>
    );
  }

  if (page === "top") {
    return (
      <>
        <button className="back-btn" onClick={() => setPage("home")}>
          ⬅ Back
        </button>
        <TopDish />
      </>
    );
  }

  if (page === "bottom") {
    return (
      <>
        <button className="back-btn" onClick={() => setPage("home")}>
          ⬅ Back
        </button>
        <BottomDish />
      </>
    );
  }

  return (
    <div className="container">

      <h1>🍽️ LPU Mess Menu App</h1>

      <p>Welcome to the Smart LPU Mess Management System</p>

      <div style={{ textAlign: "center" }}>

        <button className="home-btn" onClick={() => setPage("today")}>
          🍽️ Today's Menu
        </button>

        <br />

        <button className="home-btn" onClick={() => setPage("weekly")}>
          📖 Weekly Menu
        </button>

        <br />

        <button className="home-btn" onClick={() => setPage("rate")}>
          ⭐ Rate Today's Menu
        </button>

        <br />

        <button className="home-btn" onClick={() => setPage("top")}>
          🏆 Top Rated Dishes
        </button>

        <br />

        <button className="home-btn" onClick={() => setPage("bottom")}>
          📉 Bottom Rated Dishes
        </button>

      </div>

    </div>
  );
}

export default Home;