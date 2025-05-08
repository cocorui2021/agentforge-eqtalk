import React from "react";

const StyleSelector = ({ selectedStyle, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">🎭 选择回应风格</label>
      <div className="flex flex-wrap gap-2">
        {["温柔风", "幽默风", "直接风", "冷静风"].map((style) => (
          <button
            key={style}
            onClick={() => onChange(style)}
            className={`px-3 py-1 rounded-full border text-sm transition font-medium ${
              selectedStyle === style
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            {style}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
