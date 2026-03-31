// Replace RevenueChart.jsx بالكامل

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function RevenueChart() {
  const [monthlyRevenue, setMonthlyRevenue] = useState([0, 0, 0, 0, 0, 0]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      const res = await axios.get(
        'https://golf-charity-frontend-r9tw.onrender.com/api/admin/subscriptions',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const subscriptions = res.data.subscriptions || [];

      const revenueByMonth = [0, 0, 0, 0, 0, 0];

      subscriptions.forEach((subscription) => {
        const month = new Date(subscription.created_at).getMonth();

        if (month >= 0 && month <= 5) {
          revenueByMonth[month] += Number(subscription.amount_paid || 0);
        }
      });

      setMonthlyRevenue(revenueByMonth);
    } catch (error) {
      console.log(error);
    }
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: monthlyRevenue,
        backgroundColor: '#06b6d4',
        borderRadius: 12
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#9ca3af'
        },
        grid: {
          color: 'rgba(255,255,255,0.05)'
        }
      },
      y: {
        ticks: {
          color: '#9ca3af'
        },
        grid: {
          color: 'rgba(255,255,255,0.05)'
        }
      }
    }
  };

  return (
    <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8">
      <h2 className="text-3xl font-bold text-white mb-8">
        Revenue Overview
      </h2>

      <Bar data={data} options={options} />
    </div>
  );
}

export default RevenueChart;