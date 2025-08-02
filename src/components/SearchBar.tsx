import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() === "") return;
    navigate(`/search?query=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded p-2 mr-2"
        placeholder="Buscar productos..."
      />
      <button onClick={handleSearch} className="bg-blue-900 text-white p-2 rounded hover:bg-blue-500 cursor-pointer">
        Buscar
      </button>
    </div>
  );
};
