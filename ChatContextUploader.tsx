import React, { useState } from "react";

const ChatContextUploader = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleTextSubmit = () => {
    if (text.trim()) {
      onSubmit({ type: "text", content: text });
      setText("");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      onSubmit({ type: "image", content: file }); // 实际上你可以上传到后端再处理 OCR
    }
  };

  return (
    <div className="my-6 border p-4 rounded-lg bg-gray-50">
      <h2 className="text-lg font-semibold mb-2">📤 上传对话上下文</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="粘贴聊天文本，如微信导出的对话…"
        className="w-full h-24 p-2 border rounded mb-3"
      />
      <button
        onClick={handleTextSubmit}
        className="mb-3 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
      >
        使用文本生成建议
      </button>

      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-2"
        />
        {imagePreview && (
          <img src={imagePreview} alt="上传预览" className="w-full max-h-60 object-contain border" />
        )}
      </div>
    </div>
  );
};

export default ChatContextUploader;
