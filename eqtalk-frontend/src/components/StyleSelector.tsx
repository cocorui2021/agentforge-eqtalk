import React from "react";

const StyleSelector = ({ styles, selected, onSelect }) => {
  return (
    <div style={{ marginTop: "10px" }}>
      {styles.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          style={{
            margin: "5px",
            padding: "8px 12px",
            background: selected === s ? "#4CAF50" : "#e0e0e0",
            color: selected === s ? "#fff" : "#333",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer"
          }}
        >
          {s}
        </button>
      ))}
    </div>
  );
};

export default StyleSelector;
