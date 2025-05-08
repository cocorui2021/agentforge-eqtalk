
import React, { useState } from "react";

const ChatContextUploader = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleTextSubmit = () => {
    if (text.trim()) {
      onSubmit({ type: "text", content: text });
      setText("");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      onSubmit({ type: "image", content: file });
    }
  };

  return (
    <div className="border p-4 bg-white rounded-md mb-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="粘贴聊天文本..."
        className="w-full p-2 h-24 border rounded mb-2"
      />
      <button onClick={handleTextSubmit} className="bg-primary text-white py-2 px-4 rounded">
        使用文本生成建议
      </button>
      <div className="mt-3">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <img src={imagePreview} alt="预览" className="w-full mt-2 rounded border max-h-60 object-contain" />
        )}
      </div>
    </div>
  );
};

export default ChatContextUploader;
