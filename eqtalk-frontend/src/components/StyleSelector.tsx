
import React from "react";

const styles = ["温柔风", "幽默风", "直接风", "冷静风"];

const StyleSelector = ({ selectedStyle, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {styles.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={\`px-3 py-1 rounded-full border \${selectedStyle === s ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-700"}\`}
        >
          {s}
        </button>
      ))}
    </div>
  );
};

export default StyleSelector;
