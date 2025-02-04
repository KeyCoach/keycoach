import React, { useState } from "react";

const Accordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`mx-auto w-full rounded-lg shadow-md dark:text-slate-100`}>
      <div className="overflow-hidden rounded-lg">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`hover:bg-gray-50 flex w-full items-center justify-between p-4 text-left dark:bg-slate-800 dark:text-slate-100 ${isOpen ? "" : "dark:text-slate-100 dark:shadow-slate-600"}`}
        >
          <span className="text-lg font-medium">Keyboard accuracy chart</span>
          <svg
            className={`h-5 w-5 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div
          className={`overflow-hidden shadow-md shadow-slate-600 transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="border-t p-4 dark:border-slate-400 dark:bg-slate-800">
            <p>
              This is where the keyboard accuracy chart will go. It will show the user's typing
              accuracy during the previous level.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
