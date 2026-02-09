import { useState } from 'react';
import { Wallet, Shield, Gift, ArrowRight, TrendingUp } from 'lucide-react';
import { normalUserData } from '../data/mockData';
import { Navigation } from '../components/Navigation';

export function WalletsPage() {
  const [selectedInvestment, setSelectedInvestment] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-white mb-2">Wallet Management</h1>
          <p className="text-zinc-400">Manage your funds across different wallets</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Normal Wallet */}
          <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-blue-500" />
              </div>
              <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-medium border border-blue-500/20">
                Active
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {normalUserData.wallets.normal.label}
            </h3>
            <p className="text-sm text-zinc-400 mb-4">
              {normalUserData.wallets.normal.description}
            </p>
            <div className="mb-6">
              <p className="text-sm text-zinc-400 mb-1">Balance</p>
              <p className="text-3xl font-semibold text-white">
                ${normalUserData.wallets.normal.balance.toLocaleString()}
              </p>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
              View Transactions
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Emergency Fund Wallet */}
          <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-600/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-500" />
              </div>
              <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium border border-green-500/20">
                Protected
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {normalUserData.wallets.emergency.label}
            </h3>
            <p className="text-sm text-zinc-400 mb-4">
              {normalUserData.wallets.emergency.description}
            </p>
            <div className="mb-6">
              <p className="text-sm text-zinc-400 mb-1">Balance</p>
              <p className="text-3xl font-semibold text-white">
                ${normalUserData.wallets.emergency.balance.toLocaleString()}
              </p>
            </div>
            <div className="space-y-3">
              <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-lg transition-colors text-sm font-medium border border-zinc-700">
                Transfer to Normal Wallet
              </button>
              <button
                onClick={() => setSelectedInvestment(selectedInvestment ? null : 'emergency')}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium"
              >
                <TrendingUp className="h-4 w-4" />
                Invest a Percentage
              </button>
            </div>

            {/* Investment Options */}
            {selectedInvestment === 'emergency' && (
              <div className="mt-4 pt-4 border-t border-zinc-800 space-y-3">
                <p className="text-sm font-medium text-white mb-3">Investment Options</p>
                {normalUserData.investmentOptions.map((option) => (
                  <div
                    key={option.id}
                    className="p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 cursor-pointer transition-colors border border-zinc-700/50"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-white text-sm">{option.name}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${option.risk === 'Low'
                          ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                          : option.risk === 'Medium'
                            ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                            : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                        }`}>
                        {option.risk} Risk
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mb-1">{option.description}</p>
                    <p className="text-xs text-green-500 font-medium">{option.expectedReturn}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cashback Wallet */}
          <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/10 flex items-center justify-center">
                <Gift className="h-6 w-6 text-purple-500" />
              </div>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full text-xs font-medium border border-purple-500/20">
                Auto-Invest
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {normalUserData.wallets.cashback.label}
            </h3>
            <p className="text-sm text-zinc-400 mb-4">
              {normalUserData.wallets.cashback.description}
            </p>
            <div className="mb-6">
              <p className="text-sm text-zinc-400 mb-1">Balance</p>
              <p className="text-3xl font-semibold text-white">
                ${normalUserData.wallets.cashback.balance.toLocaleString()}
              </p>
            </div>
            <div className="space-y-3">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg transition-colors text-sm font-medium">
                Withdraw to Bank
              </button>
              <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-lg transition-colors text-sm font-medium border border-zinc-700">
                Spend on Purchase
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-800">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                Auto-investing 80% of cashback into diversified ETFs
              </div>
            </div>
          </div>
        </div>

        {/* Total Overview */}
        <div className="mt-8 bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-xl p-8 shadow-lg text-white border border-green-500/20">
          <h3 className="text-xl font-semibold mb-6">Total Wallet Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-green-100 text-sm mb-1">Total Balance</p>
              <p className="text-3xl font-semibold">${normalUserData.totalBalance.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-green-100 text-sm mb-1">Normal Wallet</p>
              <p className="text-2xl font-semibold">${normalUserData.wallets.normal.balance.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-green-100 text-sm mb-1">Emergency Fund</p>
              <p className="text-2xl font-semibold">${normalUserData.wallets.emergency.balance.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-green-100 text-sm mb-1">Cashback</p>
              <p className="text-2xl font-semibold">${normalUserData.wallets.cashback.balance.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
