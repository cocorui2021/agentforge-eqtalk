import React, { useState } from "react";

const ContextImageUploader = ({ onTextExtracted }) => {
  const [ocrText, setOcrText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/ocr-upload", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    setOcrText(data.extracted_text);
    onTextExtracted(data.extracted_text);
    setLoading(false);
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">📸 上传对话截图</label>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {loading && <p>正在识别文本...</p>}
      {ocrText && (
        <textarea
          rows={6}
          value={ocrText}
          onChange={(e) => setOcrText(e.target.value)}
          className="w-full border rounded-lg p-2 mt-2"
        />
      )}
    </div>
  );
};

export default ContextImageUploader;
