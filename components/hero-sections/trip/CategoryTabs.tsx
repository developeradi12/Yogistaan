"use client"

export default function CategoryTabs({ categories, selected, onSelect }) {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
      {categories.map((cat) => {
        const active = selected === cat

        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`
              px-5 py-2 rounded-full text-lg font-medium whitespace-nowrap
              transition-all duration-200
              ${
                active
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-gray-600 shadow-sm hover:bg-gray-100"
              }
            `}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}