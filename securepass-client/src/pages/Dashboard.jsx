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
      setDecrypted(res.data.item.passwordPlain);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to decrypt");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">🔐 Your Vault</h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {vault.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">{item.label}</h3>
            <p className="text-gray-600 text-sm">{item.username}</p>
            <p className="text-gray-400 text-sm mt-1">********</p>
            <button
              onClick={() => setSelectedPassword(item.id)}
              className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded-lg text-sm"
            >
              View
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Enter Master Password</h3>
            <input
              type="password"
              placeholder="Master password"
              className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-indigo-400"
              onChange={(e) => setMasterPassword(e.target.value)}
            />
            <button
              onClick={() => viewPassword(selectedPassword)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold mb-2"
            >
              Decrypt
            </button>
            {decrypted && (
              <div className="mt-4 bg-gray-50 p-3 rounded-md text-center">
                <p className="text-gray-800 font-semibold">
                  Password: {decrypted}
                </p>
                <button
                  onClick={() => navigator.clipboard.writeText(decrypted)}
                  className="mt-2 text-sm text-indigo-600 hover:underline"
                >
                  Copy
                </button>
              </div>
            )}
            <button
              onClick={() => {
                setDecrypted("");
                setSelectedPassword(null);
              }}
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-lg text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
