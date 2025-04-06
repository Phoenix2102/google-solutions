import React from "react";

function Spinner() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
        <div className="mt-4 text-center text-gray-600 font-semibold">
          <span className="text-blue-500">Spend</span>
          <span className="text-gray-700">Wise</span>
        </div>
      </div>
    </div>
  );
}

export default Spinner;