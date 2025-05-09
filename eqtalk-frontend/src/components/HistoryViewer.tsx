import React, { useState, useEffect } from "react";

const HistoryViewer = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      const res = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "user_001" })
      });
      const data = await res.json();
      setHistory(data.history);
    }
    fetchHistory();
  }, []);

  return (
    <div className="mt-4 p-4 border rounded-lg bg-white shadow">
      <h3 className="font-bold text-lg mb-2">📚 最近对话历史</h3>
      {history.length === 0 && <p className="text-gray-500">暂无记录</p>}
      <ul className="space-y-3">
        {history.map((item, idx) => (
          <li key={idx} className="border-b pb-2">
            <p className="text-gray-800"><strong>场景：</strong>{item.scene}</p>
            <p><strong>选择回复：</strong>{item.selected_text}</p>
            <p className="text-sm text-gray-500">风格：{item.style} ｜ 推荐评分：{item.score} ｜ {item.reason}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryViewer;
