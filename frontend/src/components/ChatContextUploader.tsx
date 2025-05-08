import React, { useState } from "react";

const ChatContextUploader = ({ defaultText = "", onSubmit }) => {
  const [text, setText] = useState(defaultText);
  const [imagePreview, setImagePreview] = useState(null);

  const handleTextSubmit = () => {
    if (text.trim()) {
      onSubmit({ type: "text", content: text });
    }
  };

  return (
    <div className="bg-gray-50 border rounded-lg p-4 space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="💬 粘贴聊天内容，如：你能不能别烦我？"
        className="w-full p-3 h-24 border rounded-md resize-none text-sm"
      />
      <div className="flex gap-2">
        <button
          onClick={handleTextSubmit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
        >
          使用文本生成建议
        </button>
        <label className="text-sm text-gray-600">
          或上传截图（未来版本支持 OCR）：
          <input
            type="file"
            className="ml-2"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImagePreview(URL.createObjectURL(file));
                onSubmit({ type: "image", content: file });
              }
            }}
          />
        </label>
      </div>
      {imagePreview && (
        <img
          src={imagePreview}
          className="rounded border mt-2 max-h-40 object-contain"
        />
      )}
    </div>
  );
};

export default ChatContextUploader;