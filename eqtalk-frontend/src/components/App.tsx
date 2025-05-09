import React, { useState, useEffect } from "react";
import EQTalkPage from "./components/EQTalkPage";
import StyleSelector from "./components/StyleSelector";
import ChatContextUploader from "./components/ChatContextUploader";
import DemoDialog from "./components/DemoDialog";
import ContextImageUploader from "./components/ContextImageUploader";

// 添加到页面布局中
<ContextImageUploader onTextExtracted={(text) => setChatInput(text)} />

const App = () => {
  const [style, setStyle] = useState("温柔风");
  const [chatInput, setChatInput] = useState("");
  const [showDemoDialog, setShowDemoDialog] = useState(true);

  useEffect(() => {
    const savedStyle = localStorage.getItem("eqtalk-style");
    const savedChat = localStorage.getItem("eqtalk-chat");
    setStyle(savedStyle || "温柔风");
    setChatInput(savedChat || "你能不能别烦我？");
  }, []);

  useEffect(() => {
    localStorage.setItem("eqtalk-style", style);
  }, [style]);

  useEffect(() => {
    localStorage.setItem("eqtalk-chat", chatInput);
  }, [chatInput]);

  const handleUseDemo = (demoText: string) => {
    setChatInput(demoText);
    setShowDemoDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">🧠 EQTalk 高情商回复助手</h1>
        <StyleSelector selectedStyle={style} onChange={setStyle} />
        <ChatContextUploader
          defaultText={chatInput}
          onSubmit={(payload) => {
            if (payload.type === "text") {
              setChatInput(payload.content);
            }
          }}
        />
        <EQTalkPage style={style} scene={chatInput} />
      </div>

      {showDemoDialog && <DemoDialog onUseDemo={handleUseDemo} />}
    </div>
  );
};

export default App;
