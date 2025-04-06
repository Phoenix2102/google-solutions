import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import saving from "../../images/piggy-bank.png"
import subs from "../../images/netflix.png"
import ex_this_month from "../../images/expense.png"
import t_expense from "../../images/money.png"

function TotalsBar() {
  const { expenses } = useSelector((state) => state.expenses);
  const { savings } = useSelector((state) => state.savings);
  const { bills } = useSelector((state) => state.bills);

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.cost, 0);
  const totalSavings = savings.reduce((acc, curr) => acc + curr.savedAmount, 0);
  const totalBills = bills.reduce((acc, curr) => acc + curr.cost, 0);

  const stats = [
    {
      title: 'Total Expense',
      value: totalExpense,
      icon: '💰',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Total Savings',
      value: totalSavings,
      icon: '🏦',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Total Bills',
      value: totalBills,
      icon: '📄',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`${stat.bgColor} rounded-xl p-6 transition-all duration-200 hover:shadow-md`}
        >
          <div className="flex items-center">
            <span className="text-2xl mr-3">{stat.icon}</span>
            <div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                {stat.title}
              </h3>
              <p className={`${stat.textColor} text-2xl font-bold`}>
                ₹ {stat.value.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TotalsBar;
