
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
      <button onClick={handleSubmit} className="mt-2 mb-4 px-4 py-2 bg-primary text-white rounded">
        {loading ? "生成中..." : "🎯 生成回复建议"}
      </button>

      <div className="space-y-4">
        {suggestions.map((r, idx) => (
          <div key={r.id}
            className="relative border p-3 rounded-xl group hover:border-primary cursor-pointer"
            onClick={() => handleSelect(r)}>
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">{idx + 1}. {r.text}</span>
              <div className="flex gap-1 text-yellow-500">
                {Array.from({ length: r.score }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
            </div>
            <div className="absolute right-2 top-2 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 bg-white text-sm px-3 py-1 rounded shadow border transition">
              ⮩ {r.reason}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="mt-4 p-3 bg-green-100 rounded text-green-700">
          ✅ 对方将收到的消息：{selected.text}
        </div>
      )}
    </div>
  );
};

export default EQTalkPage;
