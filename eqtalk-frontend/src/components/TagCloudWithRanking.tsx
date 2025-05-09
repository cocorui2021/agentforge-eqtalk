import React, { useEffect, useState } from "react";

const TagCloudWithRanking = () => {
  const [tags, setTags] = useState([
    { tag: "共情", count: 32 },
    { tag: "主动道歉", count: 25 },
    { tag: "直接表达", count: 18 },
    { tag: "调侃", count: 15 },
    { tag: "保持冷静", count: 12 }
  ]);

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        {tags.map((item) => (
          <span
            key={item.tag}
            style={{
              fontSize: `${14 + item.count / 2}px`,
              margin: "10px",
              cursor: "pointer",
              color: "#555"
            }}
          >
            {item.tag} ({item.count})
          </span>
        ))}
      </div>
      <h4 style={{ marginTop: "20px" }}>🏆 热门标签排行</h4>
      <ol style={{ textAlign: "left", display: "inline-block" }}>
        {tags
          .sort((a, b) => b.count - a.count)
          .map((item, index) => (
            <li key={index}>
              {item.tag} - {item.count}票
            </li>
          ))}
      </ol>
    </div>
  );
};

export default TagCloudWithRanking;
