import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import "./styles.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const GaugeChart = ({ value, max, title, color }) => {
  const data = {
    datasets: [
      {
        data: [value, max - value],
        backgroundColor: [value >= 70 ? color : "#FF6347", "#4B5563"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    circumference: 180,
    rotation: -90,
    cutout: "75%",
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="gauge-chart">
      <h3>{title}</h3>
      <div className="chart-container">
        <Doughnut data={data} options={options} />
        <div className="gauge-value" style={{ color }}>
          {value}%
        </div>
      </div>
    </div>
  );
};

const LineChart = ({ data }) => {
  const options = {
    responsive: true,
    scales: {
      x: {
        type: "category",
        ticks: {
          color: "#9CA3AF",
        },
        grid: {
          color: "#4B5563",
        },
      },
      y: {
        min: 70,
        max: 100,
        ticks: {
          callback: (value) => value + "%",
          stepSize: 5,
          color: "#9CA3AF",
        },
        grid: {
          color: "#4B5563",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#9CA3AF",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

const App = () => {
  const [selectedFlare, setSelectedFlare] = useState(1);
  const [combustionEfficiency, setCombustionEfficiency] = useState(95);
  const [flareIntensity, setFlareIntensity] = useState(85);
  const [flameStability, setFlameStability] = useState(90);
  const [meterHistory, setMeterHistory] = useState({
    labels: [],
    datasets: [
      {
        label: "Combustion Efficiency",
        data: [],
        borderColor: "#00AE4D",
        backgroundColor: "#00AE4D",
      },
      {
        label: "Flare Intensity",
        data: [],
        borderColor: "#E2D51A",
        backgroundColor: "#E2D51A",
      },
      {
        label: "Flame Stability",
        data: [],
        borderColor: "#FB301E",
        backgroundColor: "#FB301E",
      },
    ],
  });

  useEffect(() => {
    const updateData = () => {
      const newEfficiency = Math.max(
        90,
        Math.min(100, combustionEfficiency + (Math.random() * 6 - 3))
      );
      const newIntensity = Math.max(
        50,
        Math.min(90, flareIntensity + (Math.random() * 6 - 3))
      );
      const newStability = Math.max(
        50,
        Math.min(90, flameStability + (Math.random() * 6 - 3))
      );

      setCombustionEfficiency(Math.round(newEfficiency));
      setFlareIntensity(Math.round(newIntensity));
      setFlameStability(Math.round(newStability));

      const newLabel = new Date().toLocaleTimeString();
      setMeterHistory((prevHistory) => ({
        labels: [...prevHistory.labels, newLabel].slice(-10),
        datasets: prevHistory.datasets.map((dataset, index) => ({
          ...dataset,
          data: [
            ...dataset.data,
            [newEfficiency, newIntensity, newStability][index],
          ].slice(-10),
        })),
      }));
    };

    const interval = setInterval(updateData, 1500);
    return () => clearInterval(interval);
  }, [combustionEfficiency, flareIntensity, flameStability]);

  return (
    <div className="dashboard">
      <h1>Flare Instance Monitor</h1>
      <div className="flare-selector">
        <label htmlFor="flareSelect">Select Flare: </label>
        <select
          id="flareSelect"
          value={selectedFlare}
          onChange={(e) => setSelectedFlare(Number(e.target.value))}
        >
          {[...Array(50)].map((_, i) => (
            <option key={i} value={i + 1}>
              Flare-{i + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="gauge-container">
        <GaugeChart
          value={combustionEfficiency}
          max={100}
          title="Combustion Efficiency"
          color="#00AE4D"
        />
        <GaugeChart
          value={flareIntensity}
          max={100}
          title="Flare Intensity"
          color="#E2D51A"
        />
        <GaugeChart
          value={flameStability}
          max={100}
          title="Flame Stability"
          color="#FB301E"
        />
      </div>
      <div className="line-chart-container">
        <h3>Flare Performance History</h3>
        <LineChart data={meterHistory} />
      </div>
    </div>
  );
};

export default App;
