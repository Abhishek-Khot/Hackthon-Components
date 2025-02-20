import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChartComponent = () => {
  // Static data for the line chart
  const data = [1, 9, 6, 7, 5, 6];

  // Chart data configuration
  const chartData = {
    labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6'],
    datasets: [
      {
        label: 'My Dataset',
        data: data,
        borderColor: '#4A90E2', // Custom blue color for the line
        backgroundColor: 'rgba(74, 144, 226, 0.2)', // Lighter blue for fill
        borderWidth: 2,
        fill: true, // Fill the area under the line
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom sizing
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#4A90E2', // Bluish color for legend text
        },
      },
      title: {
        display: true,
        text: 'Line Chart Example',
        color: '#333', // Dark gray for title text
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#E0E0E0', // Light gray for grid lines
        },
        ticks: {
          color: '#4A90E2', // Bluish color for y-axis labels
        },
      },
      x: {
        grid: {
          color: '#E0E0E0', // Light gray for grid lines
        },
        ticks: {
          color: '#4A90E2', // Bluish color for x-axis labels
        },
      },
    },
    // Custom background color for the chart
    backgroundColor: '#F5F5F5', // Light gray background
  };

  return (
    <div style={{ width: '60%', height: '400px', margin: '150px auto', backgroundColor: '#F5F5F5', padding: '20px', borderRadius: '10px' }}>
      <h2 style={{ color: '#333', textAlign: 'center' }}>Line Chart</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChartComponent;