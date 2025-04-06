import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import { useTheme } from '../../context/ThemeContext';

function BarChart({ expenses, selectedDateRange, selectedTag }) {
  const { darkMode } = useTheme();
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "expense-chart",
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          }
        },
        background: 'transparent',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      colors: ['#3B82F6'],
      theme: {
        mode: darkMode ? 'dark' : 'light',
        palette: 'palette1'
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          columnWidth: '60%',
          distributed: false,
          rangeBarOverlap: true,
          rangeBarGroupRows: false,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return '₹' + val.toFixed(0);
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: [darkMode ? '#e5e7eb' : '#374151']
        }
      },
      xaxis: {
        categories: [],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: darkMode ? '#e5e7eb' : '#374151',
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize: '12px'
          },
          rotate: -45,
          rotateAlways: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: darkMode ? '#e5e7eb' : '#374151',
            fontFamily: "'Nunito Sans', sans-serif"
          },
          formatter: (value) => `₹${value.toFixed(0)}`
        }
      },
      grid: {
        borderColor: darkMode ? '#374151' : '#e5e7eb',
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      tooltip: {
        theme: darkMode ? 'dark' : 'light',
        y: {
          formatter: (value) => `₹${value.toFixed(2)}`
        },
        x: {
          formatter: (value) => `Week of ${value}`
        }
      },
      states: {
        hover: {
          filter: {
            type: 'lighten',
            value: 0.15
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'darken',
            value: 0.35
          }
        }
      }
    },
    series: [{
      name: 'Expenses',
      data: []
    }]
  });

  useEffect(() => {
    const processExpenseData = () => {
      // Filter expenses based on selected tag
      let filteredExpenses = expenses;
      if (selectedTag && selectedTag !== 'All Categories') {
        filteredExpenses = expenses.filter(expense => expense.tag === selectedTag);
      }

      // Filter expenses based on date range
      if (selectedDateRange) {
        const startDate = new Date(selectedDateRange.startDate);
        const endDate = new Date(selectedDateRange.endDate);
        filteredExpenses = filteredExpenses.filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate >= startDate && expenseDate <= endDate;
        });
      }

      // Group expenses by week
      const weeklyData = new Map();
      filteredExpenses.forEach(expense => {
        const expenseDate = new Date(expense.date);
        const weekStart = new Date(expenseDate);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        const weekKey = weekStart.toISOString().split('T')[0];
        
        weeklyData.set(weekKey, (weeklyData.get(weekKey) || 0) + Number(expense.cost));
      });

      // Sort weeks and prepare chart data
      const sortedWeeks = Array.from(weeklyData.keys()).sort();
      const categories = sortedWeeks.map(week => {
        const date = new Date(week);
        return date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          year: 'numeric'
        });
      });
      
      const data = sortedWeeks.map(week => weeklyData.get(week));

      // Update chart data
      setChartData(prevState => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories
          },
          theme: {
            mode: darkMode ? 'dark' : 'light'
          }
        },
        series: [{
          name: selectedTag || 'All Expenses',
          data
        }]
      }));
    };

    processExpenseData();
  }, [expenses, darkMode, selectedDateRange, selectedTag]);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Expense Trends
      </h3>
      <div className="h-[400px]">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height="100%"
        />
      </div>
    </div>
  );
}

export default BarChart;
