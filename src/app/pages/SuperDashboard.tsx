import { TrendingUp, Building, CreditCard, Award, Target, Shield } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { superUserData } from '../data/mockData';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function SuperDashboard() {
  const StatCard = ({ title, value, icon: Icon, color, subtitle }: any) => (
    <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800">
      <div className="flex items-start justify-between mb-4">
        <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <h3 className="text-sm text-zinc-400 mb-1">{title}</h3>
      <p className="text-2xl font-semibold text-white mb-1">${value.toLocaleString()}</p>
      {subtitle && <p className="text-xs text-zinc-500">{subtitle}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-white mb-2">Advanced Financial Dashboard</h1>
          <p className="text-zinc-400">Comprehensive overview of your wealth and investments</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Net Worth"
            value={superUserData.netWorth}
            icon={Award}
            color="from-green-600 to-emerald-600"
            subtitle="Assets - Liabilities"
          />
          <StatCard
            title="Total Assets"
            value={superUserData.assets.total}
            icon={Building}
            color="from-green-600 to-emerald-600"
            subtitle="+5.2% this quarter"
          />
          <StatCard
            title="Total Liabilities"
            value={superUserData.liabilities.total}
            icon={CreditCard}
            color="from-red-600 to-rose-600"
            subtitle="-8.3% this quarter"
          />
          <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium">
                Excellent
              </div>
            </div>
            <h3 className="text-sm text-zinc-400 mb-1">Financial Health Score</h3>
            <p className="text-2xl font-semibold text-white mb-1">{superUserData.financialHealthScore}/10</p>
            <p className="text-xs text-zinc-500">Above average</p>
          </div>
        </div>

        {/* Asset vs Liability Chart and Breakdowns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Asset vs Liability Trend */}
          <div className="lg:col-span-2 bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-6">Asset vs Liability Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={superUserData.assetVsLiability}>
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
                <Line
                  type="monotone"
                  dataKey="assets"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="liabilities"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Asset Breakdown */}
          <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-6">Asset Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={superUserData.assets.breakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {superUserData.assets.breakdown.map((entry, index) => (
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
            <div className="mt-4 space-y-2">
              {superUserData.assets.breakdown.map((asset) => (
                <div key={asset.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: asset.color }}></div>
                    <span className="text-xs text-zinc-400">{asset.name}</span>
                  </div>
                  <span className="text-xs font-medium text-white">
                    ${(asset.value / 1000).toFixed(0)}k
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Liabilities and Risk Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Liabilities Breakdown */}
          <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-6">Liabilities Breakdown</h3>
            <div className="space-y-4">
              {superUserData.liabilities.breakdown.map((liability, index) => {
                const percentage = (liability.value / superUserData.liabilities.total) * 100;
                return (
                  <div key={liability.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-zinc-400">{liability.name}</span>
                      <span className="text-sm font-semibold text-white">
                        ${liability.value.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: liability.color,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-6 border-t border-zinc-800">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-400">Total Liabilities</span>
                <span className="text-lg font-semibold text-white">
                  ${superUserData.liabilities.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Risk Profile & Strategy */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl p-6 shadow-lg text-white border border-green-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-lg bg-black/20 flex items-center justify-center border border-white/10">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Risk Profile</h3>
                <p className="text-green-100 text-sm">{superUserData.riskProfile}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <p className="text-green-100 text-sm mb-2">Recommended Allocation</p>
                <div className="grid grid-cols-4 gap-2">
                  {superUserData.investmentStrategy.allocation.map((item) => (
                    <div key={item.name} className="text-center">
                      <div
                        className="h-2 rounded-full mb-1"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <p className="text-xs text-white font-semibold">{item.percentage}%</p>
                      <p className="text-xs text-green-100">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <p className="text-green-100 text-sm mb-3">AI Insights</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5"></div>
                    <span>Portfolio well-diversified across asset classes</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5"></div>
                    <span>Debt-to-asset ratio is healthy at 12.3%</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-400 mt-1.5"></div>
                    <span>Consider increasing equity allocation by 5%</span>
                  </li>
                </ul>
              </div>
            </div>

            <button className="w-full bg-white text-green-600 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors">
              View Detailed Investment Plan
            </button>
          </div>
        </div>

        {/* Long-term Health Score */}
        <div className="bg-zinc-900 rounded-xl p-8 shadow-sm border border-zinc-800">
          <h3 className="text-lg font-semibold text-white mb-6">Financial Health Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-400">Liquidity</span>
                <span className="text-sm font-semibold text-white">9.2/10</span>
              </div>
              <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-400">Debt Management</span>
                <span className="text-sm font-semibold text-white">8.5/10</span>
              </div>
              <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-400">Investment Growth</span>
                <span className="text-sm font-semibold text-white">7.8/10</span>
              </div>
              <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-400">Savings Rate</span>
                <span className="text-sm font-semibold text-white">8.0/10</span>
              </div>
              <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
