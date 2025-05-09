
import React, { useState } from "react";

const TagCloudWithRanking = () => {
  const [tags, setTags] = useState([
    { tag: "共情", count: 32 },
    { tag: "主动道歉", count: 25 },
    { tag: "直接表达", count: 18 },
    { tag: "调侃", count: 15 },
    { tag: "保持冷静", count: 12 }
  ]);

  return (
    <div className="text-center">
      <div className="flex flex-wrap justify-center gap-3">
        {tags.map((item) => (
          <span
            key={item.tag}
            className="cursor-pointer text-gray-700 hover:text-indigo-500"
            style={{ fontSize: \`\${14 + item.count / 2}px\` }}
          >
            {item.tag} ({item.count})
          </span>
        ))}
      </div>
      <h4 className="mt-4 font-bold">🏆 热门标签排行</h4>
      <ol className="text-left inline-block">
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
