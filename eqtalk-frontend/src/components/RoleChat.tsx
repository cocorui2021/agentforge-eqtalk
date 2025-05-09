const RoleChat = () => {
  const [role, setRole] = useState("gentle_friend");
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/role-reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role_id: role, user_input: input })
    });
    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div className="p-4 border rounded-xl space-y-2">
      <h3 className="font-semibold text-lg">🧑‍🎓 角色模拟练习</h3>
      <RoleSelector selected={role} onSelect={setRole} />
      <textarea
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full border rounded p-2 text-sm"
        placeholder="写下你要说的话"
      />
      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-4 py-1 rounded"
      >
        🎬 模拟回应
      </button>
      {reply && (
        <div className="bg-gray-100 p-3 rounded mt-3 border">
          <div className="text-sm text-gray-500">角色回复：</div>
          <div className="mt-1 text-base font-medium">{reply}</div>
        </div>
      )}
    </div>
  );
};
