import React, { useState } from "react";
import { Star } from "lucide-react";

const EQTalkPage = ({ style, scene }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gpt-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scene, style, max_suggestions: 3 })
      });
      const data = await res.json();
      const lines = data.results.split("\n").filter(Boolean);
      const parsed = lines.map((line, idx) => {
        const [textPart, metaPart] = line.split("（");
        const score = (metaPart?.match(/⭐/g) || []).length;
        const reason = metaPart?.replace(/[）\n]/g, "").replace(/^.*?\/\s*/, "") || "";
        return { id: idx + 1, text: textPart.trim(), score, reason };
      });
      setSuggestions(parsed);
    } catch (err) {
      console.error("生成失败", err);
    }
    setLoading(false);
  };

  const handleSelect = async (resp) => {
    setSelected(resp);
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: "user_001",
        scene,
        selected_text: resp.text,
        style,
        score: resp.score,
        reason: resp.reason
      })
    });
  };

  return (
    <div>
      <button
        onClick={handleSubmit}
        className="mt-3 mb-5 px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        {loading ? "生成中..." : "🎯 生成高情商回复"}
      </button>

      <div className="space-y-4">
        {suggestions.map((r, idx) => (
          <div
            key={r.id}
            className="relative border border-gray-300 bg-white p-4 rounded-lg group hover:border-indigo-600 cursor-pointer transition"
            onClick={() => handleSelect(r)}
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-medium text-base">{idx + 1}. {r.text}</span>
              <div className="flex gap-1 text-yellow-500">
                {Array.from({ length: r.score }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
            </div>
            <div className="absolute right-2 top-2 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 bg-white text-xs px-3 py-1 rounded shadow border transition z-10 w-52 text-gray-700">
              💡 推荐理由：{r.reason}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="mt-5 p-3 bg-green-100 rounded text-green-800 border border-green-300 text-sm">
          ✅ 你选择发送的回复是：<strong>{selected.text}</strong>
        </div>
      )}
    </div>
  );
};

export default EQTalkPage;