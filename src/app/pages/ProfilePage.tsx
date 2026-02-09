import { User, Mail, Shield, LogOut, ChevronRight, Bell, Lock, CreditCard, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";

export function ProfilePage() {
  const { user, logout, toggleSuperUser } = useAuth();
  const { user: clerkUser } = useUser();
  const navigate = useNavigate();

  // ===== Clerk Data =====
  const displayName =
    clerkUser?.fullName ||
    clerkUser?.firstName ||
    clerkUser?.primaryEmailAddress?.emailAddress ||
    "User";

  const displayEmail =
    clerkUser?.primaryEmailAddress?.emailAddress || "";

  const handleLogout = () => {
    logout();
    navigate('/sign-in');
  };

  const handleToggleSuperUser = () => {
    toggleSuperUser();
    if (user?.isSuperUserEnabled) {
      navigate('/dashboard');
    } else {
      navigate('/super/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-zinc-900/50 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Profile & Settings</h1>
            <Link
              to={user?.isSuperUserEnabled ? '/super/dashboard' : '/dashboard'}
              className="text-sm text-green-500 hover:text-green-400"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Profile Card */}
        <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 p-6 mb-6">
          <div className="flex items-start gap-4">

            {/* Avatar */}
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0">
              {displayName.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-white mb-1">
                {displayName}
              </h2>

              <p className="text-zinc-400 mb-3">
                {displayEmail}
              </p>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user?.isSuperUserEnabled
                      ? 'bg-green-900/30 text-green-400 border border-green-800'
                      : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                  }`}
                >
                  {user?.isSuperUserEnabled ? 'Super User' : 'Normal User'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Super User */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-xl shadow-lg p-6 mb-6 text-white border border-green-500/20">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Super User Mode</h3>
                <div className="text-sm text-green-50">
                  Access advanced portfolio analytics and investment planning
                </div>
              </div>
            </div>

            <button
              onClick={handleToggleSuperUser}
              className={`relative inline-flex h-8 w-14 items-center rounded-full ${
                user?.isSuperUserEnabled ? 'bg-black/40' : 'bg-black/20'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  user?.isSuperUserEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl border border-red-500/20"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>

      </main>
    </div>
  );
}
