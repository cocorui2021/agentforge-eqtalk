
import React, { useState } from "react";
import EQTalkPage from "./components/EQTalkPage";
import StyleSelector from "./components/StyleSelector";
import ChatContextUploader from "./components/ChatContextUploader";

const App = () => {
  const [style, setStyle] = useState("温柔风");
  const [chatInput, setChatInput] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <StyleSelector selectedStyle={style} onChange={setStyle} />
        <ChatContextUploader
          onSubmit={(payload) => {
            if (payload.type === "text") {
              setChatInput(payload.content);
            }
          }}
        />
        <EQTalkPage style={style} scene={chatInput} />
      </div>
    </div>
  );
};

export default App;
