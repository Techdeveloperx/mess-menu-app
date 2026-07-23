import { useState } from "react";

function SearchStudent() {

  const [regno, setRegno] = useState("");
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchStudent = async () => {

    if (regno.trim() === "") {
      alert("Please enter Registration Number");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        `http://127.0.0.1:5000/student/${regno}`
      );

      const data = await response.json();

      setRatings(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="container">

      <div className="hero">

        <h1>🔍 Search Student Ratings</h1>

        <p>
          View all ratings submitted by a student.
        </p>

      </div>

      <div className="student-form">

        <input
          placeholder="Registration Number"
          value={regno}
          onChange={(e)=>setRegno(e.target.value)}
        />

        <button
          className="submit-btn"
          onClick={searchStudent}
        >
          Search
        </button>

      </div>

      {loading && (

        <div className="loader-container">

          <div className="loader"></div>

          <div className="loader-text">
            Searching...
          </div>

        </div>

      )}

      {!loading && ratings.length>0 && (

        <div className="leaderboard">

          {ratings.map((item,index)=>(

            <div
              className="leader-card"
              key={index}
            >

              <div className="leader-rank">

                ⭐

              </div>

              <div className="leader-info">

                <h2>{item.dish_name}</h2>

                <p>

                  Student :
                  {" "}
                  {item.student_name}

                </p>

                <p>

                  Rating :
                  {" "}
                  {item.rating}
                  /5

                </p>

              </div>

            </div>

          ))}

        </div>

      )}

      {!loading && ratings.length===0 && regno!=="" && (

        <h2
          style={{
            marginTop:"30px"
          }}
        >
          No Ratings Found
        </h2>

      )}

    </div>

  );

}

export default SearchStudent;