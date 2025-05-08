import React, { useState, useEffect } from "react";

const STYLE_OPTIONS = [
  { label: "温柔风", value: "温柔风" },
  { label: "幽默风", value: "幽默风" },
  { label: "直接风", value: "直接风" },
  { label: "冷静风", value: "冷静风" }
];

const StyleSelector = ({ selectedStyle, onChange }) => {
  const [customStyle, setCustomStyle] = useState("");
  const [hotTrendStyle, setHotTrendStyle] = useState("");

  // 获取热点风格（模拟接口调用）
  useEffect(() => {
    async function fetchHotTrend() {
      const res = await fetch("/api/get-hot-trend-style");
      const data = await res.json();
      setHotTrendStyle(data.style);
    }
    fetchHotTrend();
  }, []);

  const handleAddCustomStyle = () => {
    if (customStyle.trim()) {
      // 发送到后端保存自定义风格
      fetch("/api/custom-style", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ style_name: customStyle, example_text: "示例内容" })
      });
      onChange(customStyle);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">🎭 选择回应风格</label>
      <div className="flex flex-wrap gap-2">
        {STYLE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1 rounded-full border text-sm transition font-medium ${
              selectedStyle === opt.value
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            {opt.label}
          </button>
        ))}
        {hotTrendStyle && (
          <button
            onClick={() => onChange(hotTrendStyle)}
            className="px-3 py-1 rounded-full bg-yellow-500 text-white text-sm"
          >
            热点风格：{hotTrendStyle}
          </button>
        )}
      </div>
      <div className="mt-2">
        <input
          type="text"
          value={customStyle}
          onChange={(e) => setCustomStyle(e.target.value)}
          placeholder="输入自定义风格"
          className="p-2 border rounded"
        />
        <button
          onClick={handleAddCustomStyle}
          className="ml-2 px-4 py-1 bg-green-600 text-white rounded"
        >
          添加自定义风格
        </button>
      </div>
    </div>
  );
};

export default StyleSelector;
