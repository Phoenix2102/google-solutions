import { useState } from "react";
import { useDispatch } from "react-redux";
import { createIncome } from "../../features/income/incomeSlice";
import Datepicker from "react-tailwindcss-datepicker";
import { BsCashStack } from 'react-icons/bs';

function IncomeForm({ onClose }) {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState({
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString()
  });

  const dispatch = useDispatch();

  const handleValueChange = (newDate) => {
    setDate(newDate);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!date.startDate) {
      return;
    }

    const formattedDate = new Date(date.startDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    dispatch(createIncome({
      source,
      amount: Number(amount),
      category,
      date: formattedDate
    }));

    setSource("");
    setAmount("");
    setCategory("");
    onClose();
  };

  const categories = [
    "Salary",
    "Freelance",
    "Investments",
    "Business",
    "Rental",
    "Other"
  ];

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-[2]"></div>
      <div className="rounded-xl bg-white shadow-2xl drop-shadow-2xl p-6 z-[3] w-[95%] max-w-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <BsCashStack className="w-6 h-6 text-green-500" />
            <h1 className="text-xl font-semibold text-gray-800">Add Income</h1>
          </div>
          <button 
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            onClick={onClose}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
                Source
              </label>
              <input
                type="text"
                id="source"
                placeholder="Income source"
                value={source}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition duration-200"
                onChange={(e) => setSource(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  placeholder="Amount"
                  value={amount}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition duration-200"
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition duration-200"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <Datepicker
                useRange={false}
                asSingle={true}
                value={date}
                onChange={handleValueChange}
                inputClassName="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition duration-200"
                displayFormat={"DD/MM/YYYY"}
                readOnly={true}
                popoverDirection="down"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              Add Income
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IncomeForm;