import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const MarketChart = ({ apiUrl }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch chart data");
      const json = await response.json();

      // 👇 Expecting data format like:
      // [{ time: "09:15", price: 16500 }, { time: "09:30", price: 16510 }, ...]
      setData(json);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData(); // initial load

    // Auto-refresh every few seconds (simulate live market)
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [apiUrl]);

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  if (data.length === 0) {
    return <p className="text-gray-500 text-sm">Loading chart...</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="time" tick={{ fontSize: 10 }} />
        <YAxis domain={["auto", "auto"]} tick={{ fontSize: 10 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "6px",
          }}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
          isAnimationActive={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MarketChart;
