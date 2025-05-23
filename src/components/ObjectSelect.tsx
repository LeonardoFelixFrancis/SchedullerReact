import { useState, useEffect, useRef } from "react";

type Item = {
  value: string | number;
  description: string;
};

type Props = {
  name: string;
  value: string | number;
  onChange: (value: string | number) => void;
  items: Item[] | [];
  placeholder: string;
  label: string;
  error?: string;
};

export function ObjectSelect({
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
  const selected = items.find((item) => String(item.value) === String(value)) || null;

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
            {selected ? selected.description : (
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
                key={item.value}
                onClick={(event) => {
                  event.stopPropagation();
                  onChange(item.value);
                  setIsOpen(false);
                }}
                className={`px-3 py-2 hover:bg-blue-500 hover:text-white cursor-pointer ${
                  value === item.value ? "bg-blue-100" : ""
                }`}
              >
                {item.description}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
