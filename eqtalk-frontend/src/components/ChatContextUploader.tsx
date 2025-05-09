const ChatContextUploader = ({ defaultText, onSubmit }) => {
  const [textInput, setTextInput] = useState(defaultText || "");

  const handleSubmit = () => {
    if (textInput.trim()) {
      onSubmit({ type: "text", content: textInput.trim() });
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">📜 输入对话上下文（支持粘贴 5 轮以上）</label>
      <textarea
        rows={6}
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder={`A：你为什么今天又没回消息？\nB：我不是有意的…\nA：你总是这样。`}
        className="w-full border rounded-lg p-2 text-sm font-mono resize-y"
      />
      <button
        onClick={handleSubmit}
        className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        ✨ 提交对话上下文
      </button>
    </div>
  );
};
