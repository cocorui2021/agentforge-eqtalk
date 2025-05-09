import React, { useState } from "react";
import StyleSelector from "./StyleSelector";
import TagCloudWithRanking from "./TagCloudWithRanking";

const EQTalkPage = () => {
  const [scene, setScene] = useState("");
  const [style, setStyle] = useState("全部");
  const [response, setResponse] = useState("");

  const styles = ["温柔风", "幽默风", "直接风", "冷静风"];

  const handleGenerate = async () => {
    const res = await fetch("/api/gpt/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: scene })
    });
    const data = await res.json();
    setResponse(data.response || "暂无合适回复，请尝试调整场景描述");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>🎯 聊天场景</h2>
      <textarea
        placeholder="请输入聊天场景..."
        value={scene}
        onChange={(e) => setScene(e.target.value)}
        style={{ width: "100%", height: "80px", marginBottom: "10px" }}
      />
      <StyleSelector styles={styles} selected={style} onSelect={setStyle} />
      <button onClick={handleGenerate} style={{ marginTop: "10px" }}>
        🚀 生成高情商回复
      </button>

      <h3 style={{ marginTop: "20px" }}>💬 推荐回复</h3>
      <div
        style={{
          padding: "15px",
          background: "#f0f0f0",
          borderRadius: "8px",
          minHeight: "50px"
        }}
      >
        {response}
      </div>

      <h3 style={{ marginTop: "30px" }}>📊 标签热度 & 投票排行</h3>
      <TagCloudWithRanking />
    </div>
  );
};

export default EQTalkPage;
