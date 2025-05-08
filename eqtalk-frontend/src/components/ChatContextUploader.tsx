import React, { useState } from "react";

const ChatContextUploader = ({ defaultText, onSubmit }) => {
  const [inputText, setInputText] = useState(defaultText);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ type: "text", content: inputText });
  };

  return (
    <div className="mb-4">
      <textarea
        className="w-full p-3 border rounded-lg"
        rows={4}
        value={inputText}
        onChange={handleChange}
        placeholder="请输入对话内容..."
      ></textarea>
      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        提交对话
      </button>
    </div>
  );
};

export default ChatContextUploader;
