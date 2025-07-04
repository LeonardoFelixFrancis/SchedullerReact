import { useState, useEffect, useRef } from "react";

type Props = {
  name: string;
  value: string | number;
  onChange: (value: string | number) => void;
  items: string[];
  placeholder: string;
  label: string;
  error?: string;
};

export function Select({
  name,
  value,
  onChange,
  items,
  placeholder,
  label,
  error,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full" ref={dropdownRef}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        className="relative"
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen((prev) => !prev)}
      >
        <div
          className={`border rounded px-3 py-2 bg-white cursor-pointer flex justify-between items-center ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          <span>
            {value ? value : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </span>
          <svg
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {isOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-auto">
            {items.map((item) => (
              <li
                key={item}
                onClick={(event) => {
                  event.stopPropagation();
                  onChange(item);
                  setIsOpen(false);
                }}
                className={`px-3 py-2 hover:bg-blue-500 hover:text-white cursor-pointer ${
                  value === item ? "bg-blue-100" : ""
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
