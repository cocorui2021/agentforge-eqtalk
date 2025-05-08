
import React from "react";

const STYLE_OPTIONS = [
  { label: "温柔风", value: "温柔风" },
  { label: "幽默风", value: "幽默风" },
  { label: "直接风", value: "直接风" },
  { label: "撒娇风", value: "撒娇风" },
  { label: "冷静风", value: "官方冷静" }
];

const StyleSelector = ({ selectedStyle, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">🎭 选择回应风格</label>
    <div className="flex flex-wrap gap-2">
      {STYLE_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1 rounded-full border text-sm transition ${
            selectedStyle === opt.value
              ? "bg-primary text-white border-primary"
              : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

export default StyleSelector;
