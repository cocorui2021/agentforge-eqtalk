import React, { useState } from "react";

const demo_prompt = `
  用户输入场景示范（点击即可应用）：
  1. A: 你为什么总是忽略我发的消息？
  2. B: 对不起，我工作太忙了，没能及时看到。
  3. A: 你总是说忙，真的很让人失望。
  4. B: 我知道我做得不好，但请相信我不是故意的。
  5. A: 好吧，我现在不想再说了，可能我有点过于敏感了。

【提示】点击后将作为实际对话内容输入，系统不会将此内容视为示范输入。请注意。
`;

const DemoDialog = ({ onUseDemo }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleUseDemo = () => {
    onUseDemo("你为什么总是忽略我发的消息？\n对不起，我工作太忙了，没能及时看到。\n你总是说忙，真的很让人失望。\n我知道我做得不好，但请相信我不是故意的。\n好吧，我现在不想再说了，可能我有点过于敏感了。");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-200 bg-opacity-80 flex items-center justify-center z-20">
      <div className="bg-white p-5 rounded-xl shadow-md max-w-md w-full">
        <h3 className="text-xl font-semibold">示范语句（点击后使用此语句）</h3>
        <p className="text-sm text-gray-700 mb-4">{demo_prompt}</p>
        <button
          onClick={handleUseDemo}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          使用示范对话
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-3 text-gray-500"
        >
          不使用示范，直接输入
        </button>
      </div>
    </div>
  );
};

export default DemoDialog;
