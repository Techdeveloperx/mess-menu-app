import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function RatingChart() {
  const [labels, setLabels] = useState([]);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/top-dishes");
      const data = await res.json();

      setLabels(data.map((item) => item.dish_name));
      setRatings(data.map((item) => item.average_rating));
    } catch (error) {
      console.log(error);
    }
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Average Rating",
        data: ratings,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top Rated Dishes",
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default RatingChart;