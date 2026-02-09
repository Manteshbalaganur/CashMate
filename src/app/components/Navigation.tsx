import { useState } from 'react';
import { Wallet, LogOut, Menu, X, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router';

export function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-black/95 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">FinanceAI</h1>
              <p className="text-xs text-zinc-400">
                Welcome back, {user?.name}
                {user?.isSuperUserEnabled && (
                  <span className="ml-2 px-2 py-0.5 bg-green-900/50 text-green-400 rounded text-xs font-medium border border-green-800">
                    Super
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to={user?.isSuperUserEnabled ? '/super/dashboard' : '/dashboard'}
              className={`text-sm ${isActive('/dashboard') || isActive('/super/dashboard')
                  ? 'text-green-500 font-medium'
                  : 'text-zinc-400 hover:text-white'
                }`}
            >
              Dashboard
            </Link>
            {!user?.isSuperUserEnabled && (
              <Link
                to="/wallets"
                className={`text-sm ${isActive('/wallets')
                    ? 'text-green-500 font-medium'
                    : 'text-zinc-400 hover:text-white'
                  }`}
              >
                Wallets
              </Link>
            )}
            <Link
              to="/ai-chat"
              className={`text-sm ${isActive('/ai-chat')
                  ? 'text-green-500 font-medium'
                  : 'text-zinc-400 hover:text-white'
                }`}
            >
              AI Assistant
            </Link>
            <Link
              to="/upload"
              className={`text-sm ${isActive('/upload')
                  ? 'text-green-500 font-medium'
                  : 'text-zinc-400 hover:text-white'
                }`}
            >
              Upload Data
            </Link>
            <Link
              to="/insights"
              className={`text-sm ${isActive('/insights')
                  ? 'text-green-500 font-medium'
                  : 'text-zinc-400 hover:text-white'
                }`}
            >
              Insights
            </Link>
            {user?.isSuperUserEnabled && (
              <Link
                to="/super/investment"
                className={`text-sm ${isActive('/super/investment')
                    ? 'text-green-500 font-medium'
                    : 'text-zinc-400 hover:text-white'
                  }`}
              >
                Investments
              </Link>
            )}
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-sm transition-all shadow-sm shadow-green-900/20"
            >
              <UserIcon className="h-4 w-4" />
              Profile
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-zinc-800 flex flex-col gap-3">
            <Link
              to={user?.isSuperUserEnabled ? '/super/dashboard' : '/dashboard'}
              className={`text-sm py-2 ${isActive('/dashboard') || isActive('/super/dashboard')
                  ? 'text-blue-600 font-medium'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              Dashboard
            </Link>
            {!user?.isSuperUserEnabled && (
              <Link
                to="/wallets"
                className={`text-sm py-2 ${isActive('/wallets')
                    ? 'text-green-500 font-medium'
                    : 'text-zinc-400 hover:text-white'
                  }`}
              >
                Wallets
              </Link>
            )}
            <Link
              to="/ai-chat"
              className={`text-sm py-2 ${isActive('/ai-chat')
                  ? 'text-blue-600 font-medium'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              AI Assistant
            </Link>
            <Link
              to="/upload"
              className={`text-sm py-2 ${isActive('/upload')
                  ? 'text-blue-600 font-medium'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              Upload Data
            </Link>
            <Link
              to="/insights"
              className={`text-sm py-2 ${isActive('/insights')
                  ? 'text-blue-600 font-medium'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              Insights
            </Link>
            {user?.isSuperUserEnabled && (
              <Link
                to="/super/investment"
                className={`text-sm py-2 ${isActive('/super/investment')
                    ? 'text-blue-600 font-medium'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Investments
              </Link>
            )}
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-lg text-sm mt-2"
            >
              <UserIcon className="h-4 w-4" />
              Profile
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
