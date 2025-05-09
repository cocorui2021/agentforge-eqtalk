import React, { useState } from "react";
import TagCloudWithRanking from "./TagCloudWithRanking";

const EQTalkPage = ({ style, scene }) => {
  const [response, setResponse] = useState("");

  const handleGenerate = async () => {
    const res = await fetch("/api/gpt/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: scene })
    });
    const data = await res.json();
    setResponse(data.response || "暂无合适回复，请尝试调整场景描述。");
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleGenerate}
        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
      >
        🚀 生成高情商回复
      </button>

      <h3 className="text-lg font-semibold text-gray-700">💬 推荐回复</h3>
      <div className="p-4 bg-gray-100 rounded-lg min-h-[50px] text-gray-800">
        {response}
      </div>

      <h3 className="text-lg font-semibold text-gray-700">📊 标签热度 & 投票排行</h3>
      <TagCloudWithRanking />
    </div>
  );
};

export default EQTalkPage;
