import { BarChart3, TrendingUp, Calendar, Award, DollarSign, PieChart } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { useAuth } from '../context/AuthContext';
import { normalUserData, superUserData } from '../data/mockData';

export function InsightsPage() {
  const { user } = useAuth();
  const isSuper = user?.role === 'super';
  const data: any = isSuper ? superUserData : normalUserData;

  const InsightCard = ({ icon: Icon, title, value, subtitle, color }: any) => (
    <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800">
      <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-4 opacity-80`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-sm text-zinc-400 mb-1">{title}</h3>
      <p className="text-2xl font-semibold text-white mb-1">{value}</p>
      {subtitle && <p className="text-xs text-zinc-500">{subtitle}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-white mb-2">Financial Insights</h1>
          <p className="text-zinc-400">
            {isSuper ? 'Advanced analytics and portfolio insights' : 'Key metrics and spending insights'}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {isSuper ? (
            <>
              <InsightCard
                icon={Award}
                title="Net Worth"
                value={`$${data.netWorth.toLocaleString()}`}
                subtitle="Total assets minus liabilities"
                color="from-blue-600 to-indigo-600"
              />
              <InsightCard
                icon={TrendingUp}
                title="Total Assets"
                value={`$${data.assets.total.toLocaleString()}`}
                subtitle="+5.2% growth this quarter"
                color="from-green-600 to-emerald-600"
              />
              <InsightCard
                icon={DollarSign}
                title="Monthly Savings"
                value={`$${data.savings.toLocaleString()}`}
                subtitle="36.2% of income"
                color="from-purple-600 to-pink-600"
              />
              <InsightCard
                icon={BarChart3}
                title="Health Score"
                value={`${data.financialHealthScore}/10`}
                subtitle="Excellent financial health"
                color="from-orange-600 to-red-600"
              />
            </>
          ) : (
            <>
              <InsightCard
                icon={DollarSign}
                title="Total Balance"
                value={`$${data.totalBalance.toLocaleString()}`}
                subtitle="+5.2% from last month"
                color="from-blue-600 to-indigo-600"
              />
              <InsightCard
                icon={TrendingUp}
                title="Monthly Income"
                value={`$${data.monthlyIncome.toLocaleString()}`}
                subtitle="Steady income stream"
                color="from-green-600 to-emerald-600"
              />
              <InsightCard
                icon={PieChart}
                title="Monthly Expenses"
                value={`$${data.monthlyExpenses.toLocaleString()}`}
                subtitle="-2.1% from last month"
                color="from-purple-600 to-pink-600"
              />
              <InsightCard
                icon={Award}
                title="Savings Rate"
                value="36.2%"
                subtitle="Above average!"
                color="from-orange-600 to-red-600"
              />
            </>
          )}
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-xl p-8 shadow-lg text-white mb-8 border border-green-500/20">
          <h3 className="text-xl font-semibold mb-4">AI-Powered Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-5 border border-white/10">
              <h4 className="font-medium mb-3">💡 Smart Observation</h4>
              <p className="text-green-100 text-sm leading-relaxed">
                {isSuper
                  ? "Your asset allocation is well-balanced. Consider increasing your equity exposure by 5% to optimize long-term returns based on your moderate risk profile."
                  : "Your shopping expenses are 15% higher than your 6-month average. Consider setting a monthly budget cap to increase your savings rate."}
              </p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-5 border border-white/10">
              <h4 className="font-medium mb-3">🎯 Recommendation</h4>
              <p className="text-green-100 text-sm leading-relaxed">
                {isSuper
                  ? "Based on your strong financial health score, you're in a great position to explore tax-efficient investment vehicles like municipal bonds or tax-loss harvesting strategies."
                  : "You're on track to reach your emergency fund goal in 35 months. Transferring your next bonus could accelerate this to just 24 months."}
              </p>
            </div>
          </div>
        </div>

        {/* Monthly Summary */}
        <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Monthly Financial Summary</h3>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Calendar className="h-4 w-4" />
              <span>January 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <p className="text-sm text-green-500 mb-1">Total Income</p>
              <p className="text-2xl font-semibold text-white">
                ${data.monthlyIncome.toLocaleString()}
              </p>
              <p className="text-xs text-green-400 mt-1">↑ $200 from last month</p>
            </div>
            <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
              <p className="text-sm text-red-500 mb-1">Total Expenses</p>
              <p className="text-2xl font-semibold text-white">
                ${data.monthlyExpenses.toLocaleString()}
              </p>
              <p className="text-xs text-green-400 mt-1">↓ $120 from last month</p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <p className="text-sm text-blue-500 mb-1">Net Savings</p>
              <p className="text-2xl font-semibold text-white">
                ${data.savings.toLocaleString()}
              </p>
              <p className="text-xs text-green-400 mt-1">↑ $320 from last month</p>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-6">
              {isSuper ? 'Top Asset Categories' : 'Top Expense Categories'}
            </h3>
            <div className="space-y-4">
              {(isSuper ? data.assets.breakdown : data.expensesByCategory.slice(0, 5)).map((item: any, index: number) => {
                const total = isSuper ? data.assets.total : data.expensesByCategory.reduce((sum: number, cat: any) => sum + cat.value, 0);
                const percentage = ((item.value / total) * 100).toFixed(1);
                return (
                  <div key={item.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-zinc-300">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-white">
                          ${item.value.toLocaleString()}
                        </span>
                        <span className="text-xs text-zinc-500 ml-2">({percentage}%)</span>
                      </div>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Transactions or Investment Summary */}
          <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-6">
              {isSuper ? 'Investment Performance' : 'Recent Transactions'}
            </h3>
            {isSuper ? (
              <div className="space-y-4">
                {data.investmentStrategy.recommendations.map((rec: any, index: number) => (
                  <div key={index} className="p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">{rec.instrument}</span>
                      <span className="text-sm font-semibold text-green-500">{rec.allocation}</span>
                    </div>
                    <p className="text-xs text-zinc-400">{rec.rationale}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {data.transactions.map((transaction: any) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors border border-zinc-800"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{transaction.description}</p>
                      <p className="text-xs text-zinc-500">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-semibold ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                          }`}
                      >
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <p className="text-xs text-zinc-500">{transaction.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-xl p-8 shadow-lg text-white border border-green-500/20">
          <h3 className="text-xl font-semibold mb-6">Recommended Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isSuper ? (
              <>
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-green-500/10">
                  <div className="text-2xl mb-2">📈</div>
                  <h4 className="font-medium mb-1">Rebalance Portfolio</h4>
                  <p className="text-sm text-zinc-300">
                    Your equity allocation has drifted. Consider rebalancing to maintain target allocation.
                  </p>
                </div>
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-green-500/10">
                  <div className="text-2xl mb-2">💰</div>
                  <h4 className="font-medium mb-1">Tax Optimization</h4>
                  <p className="text-sm text-zinc-300">
                    Review tax-loss harvesting opportunities before quarter end.
                  </p>
                </div>
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-green-500/10">
                  <div className="text-2xl mb-2">🎯</div>
                  <h4 className="font-medium mb-1">Diversify Further</h4>
                  <p className="text-sm text-zinc-300">
                    Consider adding international exposure for better diversification.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-green-500/10">
                  <div className="text-2xl mb-2">💳</div>
                  <h4 className="font-medium mb-1">Reduce Shopping</h4>
                  <p className="text-sm text-zinc-300">
                    Set a $600 monthly cap on shopping to save an extra $2,400 annually.
                  </p>
                </div>
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-green-500/10">
                  <div className="text-2xl mb-2">🏦</div>
                  <h4 className="font-medium mb-1">Build Emergency Fund</h4>
                  <p className="text-sm text-zinc-300">
                    Add $500/month to reach 6 months of expenses in 35 months.
                  </p>
                </div>
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-green-500/10">
                  <div className="text-2xl mb-2">📊</div>
                  <h4 className="font-medium mb-1">Start Investing</h4>
                  <p className="text-sm text-zinc-300">
                    Your cashback wallet ($4,800) is ready for auto-investment.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
