import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / App name */}
        <Link
          to="/dashboard"
          className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition duration-200"
        >
          SecurePass
        </Link>

        {/* Right side links */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/add"
                className="text-gray-700 hover:text-indigo-600 font-medium transition duration-200"
              >
                Add Password
              </Link>

              <button
                onClick={logout}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
