"use client"
export default function CategoryTabs({ categories, selected, onSelect }) {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition
          ${
            selected === cat
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}