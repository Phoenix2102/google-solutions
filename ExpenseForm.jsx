import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createExpense,
} from "../../features/expenses/expenseSlice";
import arrow from "../../images/Vector.png";
import Datepicker from "react-tailwindcss-datepicker";

function ExpenseForm({ onClose }) {
  const [desc, setDesc] = useState("");
  const [cost, setCost] = useState("");
  const [tag, setTag] = useState("");
  const [mode, setMode] = useState("");
  const [date, setDate] = useState({
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString()
  });

  const handleValueChange = (newDate) => {
    setDate(newDate);
  };

  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    if (!date.startDate) {
      return;
    }

    const onlyDate = new Date(date.startDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    dispatch(createExpense({ desc, cost: Number(cost), tag, mode, onlyDate }));
    setDesc("");
    setCost("");
    setTag("");
    setMode("");
    onClose();
  };

  const [selectedOption, setSelectedOption] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setTag(option);
    setDropdownOpen(false);
  };

  function Dropdown({ selectedOption, isDropdownOpen, handleOptionSelect }) {
    const options = ["Food", "Shopping", "Travel", "Medical", "Movie", "Entertainment", "Bills", "Others"];
    return (
      <div className="w-56">
        <div 
          className="relative w-56 px-4 py-2.5 ring-1 ring-gray-500 rounded-lg outline-none duration-300 cursor-pointer hover:ring-2" 
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          {selectedOption || "Select category"}
          <span className="absolute right-[10px]">
            <img
              src={arrow}
              className={`w-[7px] inline ml-3 mr-2 duration-300 ${isDropdownOpen ? "rotate-[270deg]" : "rotate-[90deg]"}`}
              alt="dropdown arrow"
            />
          </span>
        </div>
        {isDropdownOpen && (
          <ul className="absolute mt-2 text-gray-700 bg-white py-1 w-56 rounded-lg shadow-lg z-10">
            {options.map((option) => (
              <li 
                className={`cursor-pointer px-4 py-2 hover:bg-gray-100 duration-200 ${
                  selectedOption === option ? "bg-blue-50 text-blue-600" : ""
                }`}
                key={option} 
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-[2]"></div>
      <div className="rounded-xl bg-white shadow-2xl drop-shadow-2xl p-6 z-[3] w-[95%] max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Add Expense</h1>
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
              <input
                type="text"
                name="desc"
                id="desc"
                placeholder="Description"
                value={desc}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  name="cost"
                  id="cost"
                  placeholder="Amount"
                  value={cost}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
                  onChange={(e) => setCost(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Datepicker
                  useRange={false}
                  asSingle={true}
                  value={date}
                  onChange={handleValueChange}
                  inputClassName="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
                  displayFormat={"DD/MM/YYYY"}
                  readOnly={true}
                  popoverDirection="down"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="mode"
                id="mode"
                placeholder="Payment method"
                value={mode}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
                onChange={(e) => setMode(e.target.value)}
                required
              />
              <Dropdown
                selectedOption={selectedOption}
                isDropdownOpen={isDropdownOpen}
                handleOptionSelect={handleOptionSelect}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;
