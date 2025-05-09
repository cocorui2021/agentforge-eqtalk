const RoleSelector = ({ selected, onSelect }) => {
  const roles = [
    { id: "gentle_friend", name: "🧸 温柔的朋友" },
    { id: "blunt_boss", name: "💼 毒舌上司" },
    { id: "witty_partner", name: "🎭 幽默对象" }
  ];

  return (
    <div className="flex gap-2 my-2 flex-wrap">
      {roles.map((r) => (
        <button
          key={r.id}
          onClick={() => onSelect(r.id)}
          className={`px-3 py-1 rounded-full text-sm ${
            selected === r.id ? "bg-indigo-600 text-white" : "bg-white border"
          }`}
        >
          {r.name}
        </button>
      ))}
    </div>
  );
};
