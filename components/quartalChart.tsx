import Chart from 'chart.js/auto';
import React, { useEffect, useRef } from 'react';

import { quartalChartProps } from '../types/placesType';

interface QuarterlyDataSum {
  [key: string]: number;
}
export const QuartalChart: React.FC<quartalChartProps> = ({ sales }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const quarterlyDataSum: QuarterlyDataSum = {
      Q1: 0,
      Q2: 0,
      Q3: 0,
      Q4: 0,
    };

    sales.forEach((item) => {
      const month = new Date(item.date).getMonth() + 1;
      const year = new Date(item.date).getFullYear();
      const currentYear = new Date().getFullYear();

      if (month >= 1 && month <= 3 && year === currentYear) {
        quarterlyDataSum.Q1 += item.amount;
      } else if (month >= 4 && month <= 6 && year === currentYear) {
        quarterlyDataSum.Q2 += item.amount;
      } else if (month >= 7 && month <= 9 && year === currentYear) {
        quarterlyDataSum.Q3 += item.amount;
      } else if (month >= 10 && month <= 12 && year === currentYear) {
        quarterlyDataSum.Q4 += item.amount;
      }
    });

    const quarterlyValues = Object.values(quarterlyDataSum);
    const labels = ['Q1', 'Q2', 'Q3', 'Q4'];
    const ctx = chartRef.current.getContext('2d');
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Доходность по кварталам',
              data: quarterlyValues,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [sales]);
  return <canvas ref={chartRef} id="myChart" width="400" height="400"></canvas>;
};
