import { TrendingUp, Shield, Target, Sparkles, Info } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { superUserData } from '../data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export function InvestmentPlanPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-semibold text-white">AI Investment Planning</h1>
          </div>
          <p className="text-zinc-400">Personalized investment strategy powered by AI + MCP</p>
        </div>

        {/* AI Badge */}
        <div className="mb-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 text-white border border-purple-500/20">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <span className="font-medium text-purple-400">AI-Generated Strategy</span>
              </div>
              <p className="text-zinc-300 text-sm mb-4">
                This investment plan has been tailored to your financial goals, risk tolerance, and current portfolio.
                The recommendations are based on advanced AI analysis of market trends and your personal financial data.
              </p>
              <div className="flex items-center gap-6 text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Risk: {superUserData.riskProfile}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  <span>Health Score: {superUserData.financialHealthScore}/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-6">Recommended Asset Allocation</h3>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={superUserData.investmentStrategy.allocation}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={3}
                      dataKey="percentage"
                    >
                      {superUserData.investmentStrategy.allocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#18181b" />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#18181b',
                        border: '1px solid #27272a',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-col justify-center space-y-4">
                {superUserData.investmentStrategy.allocation.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-zinc-300">{item.name}</span>
                    </div>
                    <span className="text-lg font-semibold text-white">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-700">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-400 mb-1">Why this allocation?</p>
                    <p className="text-sm text-blue-300">
                      Based on your moderate risk profile and strong financial health, this balanced approach
                      maximizes growth potential while maintaining stability through diversification.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="space-y-6">
            <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800">
              <h4 className="text-sm font-medium text-zinc-400 mb-4">Expected Returns</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-zinc-400">1 Year</span>
                    <span className="text-sm font-semibold text-green-500">8-10%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-zinc-400">3 Years</span>
                    <span className="text-sm font-semibold text-green-600">10-12%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-zinc-400">5+ Years</span>
                    <span className="text-sm font-semibold text-green-700">12-15%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-700 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800">
              <h4 className="text-sm font-medium text-zinc-400 mb-4">Risk Metrics</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Volatility</span>
                  <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded text-xs font-medium border border-yellow-500/20">
                    Medium
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Diversification</span>
                  <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs font-medium border border-green-500/20">
                    High
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Liquidity</span>
                  <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs font-medium border border-green-500/20">
                    High
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Instruments */}
        <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800 mb-8">
          <h3 className="text-lg font-semibold text-white mb-6">Recommended Investment Instruments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {superUserData.investmentStrategy.recommendations.map((rec, index) => (
              <div
                key={index}
                className="p-5 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-zinc-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white mb-1">{rec.instrument}</h4>
                    <p className="text-xs text-zinc-400">{rec.rationale}</p>
                  </div>
                  <span className="text-lg font-semibold text-green-500">{rec.allocation}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-500 font-medium">AI Recommended</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Long-term Plan */}
        <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-xl p-8 shadow-lg text-white border border-green-500/20">
          <h3 className="text-xl font-semibold mb-6">Long-term Financial Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-5 border border-white/10">
              <div className="text-3xl font-semibold mb-2">Year 1-2</div>
              <p className="text-zinc-300 text-sm mb-3">Building Foundation</p>
              <ul className="space-y-2 text-sm text-zinc-200">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                  <span>Establish emergency fund (6 months)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                  <span>Begin systematic investments in equity</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                  <span>Pay down high-interest debt</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-5 border border-white/10">
              <div className="text-3xl font-semibold mb-2">Year 3-5</div>
              <p className="text-zinc-300 text-sm mb-3">Growth Phase</p>
              <ul className="space-y-2 text-sm text-zinc-200">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5"></div>
                  <span>Maximize equity allocation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5"></div>
                  <span>Diversify into international markets</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5"></div>
                  <span>Consider real estate investments</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-5 border border-white/10">
              <div className="text-3xl font-semibold mb-2">Year 5+</div>
              <p className="text-zinc-300 text-sm mb-3">Wealth Preservation</p>
              <ul className="space-y-2 text-sm text-zinc-200">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-1.5"></div>
                  <span>Rebalance towards stable assets</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-1.5"></div>
                  <span>Focus on passive income streams</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-1.5"></div>
                  <span>Tax-efficient wealth transfer planning</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-sm text-zinc-300">
              💡 This plan adapts to your changing life circumstances and market conditions.
              Review quarterly with AI insights for optimal results.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
