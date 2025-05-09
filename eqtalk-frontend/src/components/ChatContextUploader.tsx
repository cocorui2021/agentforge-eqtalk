import React, { useState } from "react";

const ChatContextUploader = ({ defaultText, onSubmit }) => {
  const [input, setInput] = useState(defaultText || "");

  const handleSubmit = () => {
    if (input.trim() !== "") {
      onSubmit({ type: "text", content: input });
    }
  };

  return (
    <div className="space-y-2">
      <textarea
        className="w-full p-2 border rounded-lg"
        rows={3}
        placeholder="请输入聊天场景..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        📤 提交场景
      </button>
    </div>
  );
};

export default ChatContextUploader;
