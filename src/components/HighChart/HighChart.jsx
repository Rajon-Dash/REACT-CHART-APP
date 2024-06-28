import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./HighChart.css"; // Importing CSS for styling
import { useNavigate } from "react-router-dom";

// Functional component for chart creation and display
const HighChart = () => {
  // State variables to manage chart name, type, and list of charts
  const [chartName, setChartName] = useState("");
  const [chartType, setChartType] = useState("");
  const [charts, setCharts] = useState(() => {
    // Load saved charts from localStorage or initialize with an empty array
    const savedCharts = localStorage.getItem("charts");
    return savedCharts ? JSON.parse(savedCharts) : [];
  });

  // Hook for navigation
  const navigate = useNavigate();

  // State to manage user login status
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  // State for customization options
  const [colorScheme, setColorScheme] = useState("#8884d8"); // Default color scheme
  const [showDataLabels, setShowDataLabels] = useState(true); // Data labels visibility

  // State for editing chart
  const [editIndex, setEditIndex] = useState(null);

  // Effect to save charts to localStorage whenever the charts state changes
  useEffect(() => {
    localStorage.setItem("charts", JSON.stringify(charts));
  }, [charts]);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false); // Update login status
    navigate("/"); // Navigate to the login page
  };

  // Handle form submission for creating or updating charts
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (chartName.trim() === "") {
      alert("Please provide a chart name."); // Validate chart name
      return;
    }

    const newChart = { chartName, chartType }; // Create new chart object

    if (editIndex !== null) {
      // Update existing chart if in edit mode
      const updatedCharts = charts.map((chart, index) =>
        index === editIndex ? newChart : chart
      );
      setCharts(updatedCharts);
      setEditIndex(null); // Reset edit index
    } else {
      // Add new chart to the list
      setCharts([...charts, newChart]);
    }

    // Reset form fields
    setChartName("");
    setChartType("");
  };

  // Handle chart deletion
  const handleDelete = (index) => {
    const newCharts = charts.filter((_, i) => i !== index); // Filter out the deleted chart
    setCharts(newCharts);
  };

  // Handle chart editing
  const handleEdit = (index) => {
    const chart = charts[index]; // Get the chart to be edited
    setChartName(chart.chartName);
    setChartType(chart.chartType);
    setEditIndex(index); // Set the edit index
  };

  // Render the chart using Highcharts
  const renderChart = (chart) => {
    let seriesData;
    if (chart.chartType === "pie") {
      seriesData = [
        {
          name: "Share",
          data: [
            { name: "Petrol", y: 938899 },
            { name: "Diesel", y: 1229600, color: colorScheme },
            { name: "Electricity", y: 325251 },
            { name: "Other", y: 238751 },
          ],
        },
      ];
    } else if (chart.chartType === "line") {
      seriesData = [
        {
          name: "Installation & Developers",
          data: [
            43934, 48656, 65165, 81827, 112143, 142383, 171533, 165174, 155157,
            161454, 154610,
          ],
        },
        {
          name: "Manufacturing",
          data: [
            24916, 37941, 29742, 29851, 32490, 30282, 38121, 36885, 33726,
            34243, 31050,
          ],
        },
        {
          name: "Sales & Distribution",
          data: [
            11744, 30000, 16005, 19771, 20185, 24377, 32147, 30912, 29243,
            29213, 25663,
          ],
        },
        {
          name: "Operations & Maintenance",
          data: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            11164,
            11218,
            10077,
          ],
        },
        {
          name: "Other",
          data: [
            21908, 5548, 8105, 11248, 8989, 11816, 18274, 17300, 13053, 11906,
            10073,
          ],
          color: colorScheme,
        },
      ];
    } else {
      seriesData = [
        {
          name: "Sample Data",
          data: [1, 2, 3, 4, 5],
          color: colorScheme,
          dataLabels: {
            enabled: showDataLabels,
          },
        },
        {
          name: "Sample Data 2",
          data: [3, 4, 5, 6, 7],
          dataLabels: {
            enabled: showDataLabels,
          },
        },
      ];
    }

    const options = {
      chart: {
        type: chart.chartType,
      },
      title: {
        text: chart.chartName,
      },
      series: seriesData,
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
  };

  // Render the component
  return (
    <div className="container">
      <h2>CREATE CHART</h2>
      <form onSubmit={handleSubmit} className="chart-items">
        <div className="chart-item">
          <input
            type="text"
            placeholder="Chart Name"
            value={chartName}
            onChange={(e) => setChartName(e.target.value)}
          />
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="">Select Chart Type</option>
            <option value="column">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="pie">Pie Chart</option>
            <option value="scatter">Scatter Plot</option>
          </select>
          <button type="submit">
            {editIndex !== null ? "Update Chart" : "Create Chart"}
          </button>
        </div>
        <div className="customize-options">
          <label>
            Color Scheme:
            <input
              type="color"
              value={colorScheme}
              onChange={(e) => setColorScheme(e.target.value)}
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={showDataLabels}
              onChange={() => setShowDataLabels(!showDataLabels)}
            />
            Show Data Labels
          </label>
        </div>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </form>

      <div className="charts-container">
        {charts.map((chart, index) => (
          <div key={index} className="chart">
            {renderChart(chart)}
            <button className="delete-button" onClick={() => handleDelete(index)}>
              Delete
            </button>
            <button className="edit-button" onClick={() => handleEdit(index)}>
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighChart;
