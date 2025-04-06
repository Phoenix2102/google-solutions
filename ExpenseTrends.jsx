import React from 'react';
import { BsGraphUp } from 'react-icons/bs';

function ExpenseTrends({ expenses, currentMonthTotal, previousMonthTotal }) {
  const calculateTrend = () => {
    if (!previousMonthTotal) return { percentage: 0, isIncrease: false };
    
    const difference = currentMonthTotal - previousMonthTotal;
    const percentage = previousMonthTotal === 0 
      ? 100 
      : Math.round((difference / previousMonthTotal) * 100);
    
    return {
      percentage: Math.abs(percentage),
      isIncrease: difference > 0
    };
  };

  const trend = calculateTrend();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold dark:text-white flex items-center gap-2">
          <BsGraphUp className="text-blue-500" />
          Expense Trends
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">Current Month</span>
          <span className="font-semibold dark:text-white">
            ₹{currentMonthTotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">Previous Month</span>
          <span className="font-semibold dark:text-white">
            ₹{previousMonthTotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">Change</span>
          <span className={`font-semibold ${
            trend.isIncrease ? 'text-red-500' : 'text-green-500'
          }`}>
            {trend.isIncrease ? '↑' : '↓'} {trend.percentage}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default ExpenseTrends; 