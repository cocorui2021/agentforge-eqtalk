import React, { useState } from "react";

const TagCloudWithRanking = ({ tags }) => {
  const [votes, setVotes] = useState({});

  const handleVote = (tag) => {
    setVotes((prev) => ({
      ...prev,
      [tag]: (prev[tag] || 0) + 1
    }));
    fetch("/api/feedback-tag-vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tag_name: tag })
    });
  };

  const sortedTags = Object.keys(votes).sort((a, b) => votes[b] - votes[a]);

  return (
    <div className="flex gap-8 p-4">
      {/* 标签云 */}
      <div className="flex-1 flex flex-wrap gap-4 justify-center">
        {tags.map((tag, idx) => {
          const voteCount = votes[tag.name] || 0;
          const scale = 1 + voteCount * 0.1;
          return (
            <button
              key={idx}
              onClick={() => handleVote(tag.name)}
              style={{
                transform: `scale(${scale})`,
                transition: "transform 0.3s ease",
                background: tag.hot ? "linear-gradient(to right, #f9d423, #ff4e50)" : "#f0f4f8",
                color: tag.hot ? "#fff" : "#333"
              }}
              className="px-4 py-2 rounded-full shadow hover:scale-110 transition text-sm relative"
            >
              {tag.name}
              <span className="absolute top-0 right-0 text-xs text-gray-500">
                ❤️ {voteCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* 投票排行榜 */}
      <div className="w-60 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">🔥 热门表达排行</h3>
        <ul className="space-y-2">
          {sortedTags.slice(0, 5).map((tag, idx) => (
            <li key={idx} className="flex justify-between text-gray-700">
              <span>{idx + 1}. {tag}</span>
              <span>❤️ {votes[tag]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TagCloudWithRanking;
