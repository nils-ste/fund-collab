import { useState } from "react";

export default function Accordion({title, children, openOnRender = true}) {
  const [open, setOpen] = useState(openOnRender); // 👈 open by default

  return (
    <div className="mb-5 border-gray-200  overflow-hidden">
      <h2>
        <button
          type="button"
          onClick={() => setOpen(prev => !prev)}
          aria-expanded={open}
          className="flex border border-gray-200 items-center justify-between w-full p-5 font-medium text-gray-300 hover:bg-gray-100 hover:text-black gap-3"
        >
          <span>{title}</span>

          <svg
            className={`w-3 h-3 shrink-0 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>

      {open && (
        <>
          {children}
        </>
      )}
    </div>
  );
}
