import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [vault, setVault] = useState([]);
  const [selectedPassword, setSelectedPassword] = useState(null);
  const [masterPassword, setMasterPassword] = useState("");
  const [decrypted, setDecrypted] = useState("");

  const fetchVault = async () => {
    const res = await api.get("/vault");
    setVault(res.data.items);
  };

  useEffect(() => {
    fetchVault();
  }, []);

  const viewPassword = async (id) => {
    try {
      const res = await api.post(`/vault/${id}/view`, { masterPassword });
      console.log(res);
      setDecrypted(res.data.item.passwordPlain);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to decrypt");
    }
  };

  return (
    <div>
      <h2>Your Vault</h2>
      <div className="vault-list">
        {vault.map((item) => (
          <div key={item.id} className="vault-card">
            <h3>{item.label}</h3>
            <p>{item.username}</p>
            <p>********</p>
            <button onClick={() => setSelectedPassword(item.id)}>View</button>
          </div>
        ))}
      </div>

      {selectedPassword && (
        <div className="view-modal">
          <h3>Enter Master Password</h3>
          <input
            type="password"
            placeholder="Master password"
            onChange={(e) => setMasterPassword(e.target.value)}
          />
          <button onClick={() => viewPassword(selectedPassword)}>Decrypt</button>

          {decrypted && (
            <div>
              <p><strong>Password:</strong> {decrypted}</p>
              <button onClick={() => { setDecrypted(""); setSelectedPassword(null); }}>Close</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
