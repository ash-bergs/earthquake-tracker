import { EarthquakeEvent } from '@/utils/fetchEarthquakes';
import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { fetchTodaySignificantEventsWithTimes } from '@/utils/fetchEarthquakes';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

//TODO: move this to a shared place
const colorScale = [
  '#3b82f6', // Blue
  '#10b981', // Green
  '#fbbf24', // Yellow
  '#f59e0b', // Orange
  '#ef4444', // Red
];

const getHoverColor = (count: number): string => {
  if (count <= 1) return colorScale[0];
  if (count <= 2) return colorScale[1];
  if (count <= 3) return colorScale[2];
  if (count <= 4) return colorScale[3];
  return colorScale[4];
};

const EarthquakeChart: React.FC = () => {
  const [data, setData] = useState<{ hour: number; count: number }[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const events = await fetchTodaySignificantEventsWithTimes();
      console.log(events);
      if (events) {
        const hourlyCounts = processEarthquakeData(events);
        setData(hourlyCounts);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: data.map((d) => d.hour),
    datasets: [
      {
        label: 'Number of Earthquakes',
        data: data.map((d) => d.count),
        backgroundColor: data.map((d) => getHoverColor(d.count)),
        borderColor: data.map((d) => getHoverColor(d.count)),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hour of the Day (UTC)',
        },
        ticks: {
          callback: function (value: string | number) {
            return value.toString().padStart(2, '0') + ':00';
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Events',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ position: 'relative', height: '300px', width: 'auto' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default EarthquakeChart;

export const processEarthquakeData = (
  events: EarthquakeEvent[]
): { hour: number; count: number }[] => {
  const hourlyCounts = Array(24).fill(0);

  events.forEach((event) => {
    const date = new Date(event.time);
    const hour = date.getHours();
    hourlyCounts[hour]++;
  });

  return hourlyCounts.map((count, hour) => ({ hour, count }));
};
