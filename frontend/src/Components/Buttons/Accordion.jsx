import { useState } from "react";

export default function Accordion({ title, children, openOnRender = true }) {
  const [open, setOpen] = useState(openOnRender); // 👈 open by default

  return (
    <div className="mb-5 border-(--color-border-primary)  overflow-hidden">
      <h2>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className="flex border border-(--color-border-primary) items-center justify-between w-full p-5 font-medium text-(--color-font-primary) hover:bg-(--color-primary-hover) gap-3"
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

      <div
        className={`grid transition-all duration-300 ease-in-out
  ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="p-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
