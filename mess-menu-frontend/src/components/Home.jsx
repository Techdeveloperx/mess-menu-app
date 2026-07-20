import { useState } from "react";
import TodayMenu from "./TodayMenu";
import WeeklyMenu from "./WeeklyMenu";

function Home() {
  const [page, setPage] = useState("home");

  if (page === "today") {
    return (
      <div>
        <button onClick={() => setPage("home")}>⬅ Back</button>
        <TodayMenu />
      </div>
    );
  }

  if (page === "weekly") {
    return (
      <div>
        <button onClick={() => setPage("home")}>⬅ Back</button>
        <WeeklyMenu />
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>LPU Mess Menu App</h1>
      <p>Welcome to the LPU Mess Menu System</p>

      <button onClick={() => setPage("today")}>
        Today's Menu
      </button>

      <br /><br />

      <button onClick={() => setPage("weekly")}>
        Weekly Menu
      </button>
    </div>
  );
}

export default Home;