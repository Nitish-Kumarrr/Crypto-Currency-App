import React, { useEffect, useState } from "react";
import { baseUrl } from "./baseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Loader from "./Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const CoinChart = ({ currency }) => {
  const { id } = useParams();
  const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState(1);

  useEffect(() => {
    const getChartData = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setChartData(data.prices);
      } catch (error) {
        console.log("ChartCard :: error ::", error);
      }
    };
    getChartData();
  }, [id, currency, days]);

  const myData = {
    labels: chartData.map((data) => {
      const date = new Date(data[0]);
      const time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `price in past ${days} days in ${currency}`,
        data: chartData.map((data) => data[1]),
        borderColor: "orange",
        borderWidth: "3",
      },
    ],
  };

  return chartData.length === 0 ? (
    <Loader />
  ) : (
    <>
      <Line
        data={myData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            point: {
              radius: "1",
            },
          },
        }}
      />

      <div className="btn" style={{ marginTop: "30px" }}>
        <button onClick={() => setDays(1)}>24 hours</button>
        <button onClick={() => setDays(30)}>1 Month</button>
        <button onClick={() => setDays(365)}>1 Year</button>
      </div>
    </>
  );
};

export default CoinChart;
