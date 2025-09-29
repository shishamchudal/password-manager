import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AddPassword() {
  const [label, setLabel] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [masterPassword, setMasterPassword] = useState("");
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!label || !username || !password || !masterPassword) {
      return alert("Please fill in all fields including master password.");
    }

    try {
      // Call server endpoint that handles encryption
      const res = await api.post("/vault/create-demo-encrypt", {
        label,
        username,
        passwordPlain: password,
        masterPassword
      });

      alert("Password saved successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to save password.");
    }
  };

  return (
    <div className="add-password">
      <h2>Add New Password</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Master Password"
          value={masterPassword}
          onChange={(e) => setMasterPassword(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
