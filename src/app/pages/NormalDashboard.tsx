import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, Wallet, LogOut, Menu, X, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router';
import { normalUserData } from '../data/mockData';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function NormalDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const StatCard = ({ title, value, icon: Icon, trend, trendValue }: any) => (
    <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800">
      <div className="flex items-start justify-between mb-4">
        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-green-500" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${trend === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
            }`}>
            {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trendValue}
          </div>
        )}
      </div>
      <h3 className="text-sm text-zinc-400 mb-1">{title}</h3>
      <p className="text-2xl font-semibold text-white">${value.toLocaleString()}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-zinc-900/50 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">FinanceAI</h1>
                <p className="text-xs text-zinc-400">Welcome back, {user?.name}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-sm text-green-500 font-medium">Dashboard</Link>
              <Link to="/wallets" className="text-sm text-zinc-400 hover:text-white">Wallets</Link>
              <Link to="/ai-chat" className="text-sm text-zinc-400 hover:text-white">AI Assistant</Link>
              <Link to="/upload" className="text-sm text-zinc-400 hover:text-white">Upload Data</Link>
              <Link to="/insights" className="text-sm text-zinc-400 hover:text-white">Insights</Link>
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
              <Link to="/dashboard" className="text-sm text-green-500 font-medium py-2">Dashboard</Link>
              <Link to="/wallets" className="text-sm text-zinc-400 hover:text-white py-2">Wallets</Link>
              <Link to="/ai-chat" className="text-sm text-zinc-400 hover:text-white py-2">AI Assistant</Link>
              <Link to="/upload" className="text-sm text-zinc-400 hover:text-white py-2">Upload Data</Link>
              <Link to="/insights" className="text-sm text-zinc-400 hover:text-white py-2">Insights</Link>
              <Link to="/profile" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-lg text-sm mt-2">
                <UserIcon className="h-4 w-4" />
                Profile
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Balance"
            value={normalUserData.totalBalance}
            icon={DollarSign}
            trend="up"
            trendValue="+5.2%"
          />
          <StatCard
            title="Monthly Income"
            value={normalUserData.monthlyIncome}
            icon={TrendingUp}
          />
          <StatCard
            title="Monthly Expenses"
            value={normalUserData.monthlyExpenses}
            icon={TrendingDown}
            trend="down"
            trendValue="-2.1%"
          />
          <StatCard
            title="Savings"
            value={normalUserData.savings}
            icon={PiggyBank}
            trend="up"
            trendValue="+12.4%"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Income vs Expense Chart */}
          <div className="lg:col-span-2 bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-6">Income vs Expenses</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={normalUserData.incomeVsExpense}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    border: '1px solid #27272a',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Legend />
                <Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expense" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Expense by Category */}
          <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-6">Expenses by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={normalUserData.expensesByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {normalUserData.expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    border: '1px solid #27272a',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {normalUserData.expensesByCategory.slice(0, 4).map((cat) => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                  <span className="text-xs text-zinc-400">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Summary Card */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl p-8 shadow-lg text-white border border-green-500/20">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Monthly Summary</h3>
              <p className="text-green-100">January 2026</p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <p className="text-sm text-green-100">Savings Rate</p>
              <p className="text-2xl font-semibold">36.2%</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <p className="text-green-100 text-sm mb-1">Total Income</p>
              <p className="text-2xl font-semibold">${normalUserData.monthlyIncome.toLocaleString()}</p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <p className="text-green-100 text-sm mb-1">Total Expenses</p>
              <p className="text-2xl font-semibold">${normalUserData.monthlyExpenses.toLocaleString()}</p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <p className="text-green-100 text-sm mb-1">Net Savings</p>
              <p className="text-2xl font-semibold">${normalUserData.savings.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}