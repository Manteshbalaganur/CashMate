// Mock data for the finance tracker

export const normalUserData = {
  totalBalance: 0,
  monthlyIncome: 0,
  monthlyExpenses: 0,
  savings: 0,
  wallets: {
    normal: {
      balance: 0,
      label: 'Normal Wallet',
      description: 'Active balance for daily spending',
    },
    emergency: {
      balance: 0,
      label: 'Emergency Fund',
      description: 'Locked savings balance',
    },
    cashback: {
      balance: 0,
      label: 'Cashback Wallet',
      description: 'Auto-invested by default',
    },
  },
  incomeVsExpense: [
    { month: 'Aug', income: 8200, expense: 5100 },
    { month: 'Sep', income: 8500, expense: 5300 },
    { month: 'Oct', income: 8300, expense: 5600 },
    { month: 'Nov', income: 8700, expense: 5200 },
    { month: 'Dec', income: 8900, expense: 5800 },
    { month: 'Jan', income: 8500, expense: 5420 },
  ],
  expensesByCategory: [
    { name: 'Housing', value: 1800, color: '#6366f1' },
    { name: 'Food', value: 950, color: '#8b5cf6' },
    { name: 'Transport', value: 520, color: '#ec4899' },
    { name: 'Entertainment', value: 380, color: '#f59e0b' },
    { name: 'Utilities', value: 450, color: '#10b981' },
    { name: 'Shopping', value: 820, color: '#06b6d4' },
    { name: 'Others', value: 500, color: '#64748b' },
  ],
  investmentOptions: [
    {
      id: 'sip',
      name: 'SIP',
      description: 'Systematic Investment Plan',
      expectedReturn: '12-15% p.a.',
      risk: 'Medium',
    },
    {
      id: 'fd',
      name: 'Fixed Deposit',
      description: 'Safe & Guaranteed Returns',
      expectedReturn: '6-7% p.a.',
      risk: 'Low',
    },
    {
      id: 'etf',
      name: 'ETF (Paper Gold)',
      description: 'Gold-backed investment',
      expectedReturn: '8-10% p.a.',
      risk: 'Low-Medium',
    },
  ],
  transactions: [
    { id: 1, date: '2026-02-04', description: 'Grocery Store', amount: -125.50, category: 'Food' },
    { id: 2, date: '2026-02-03', description: 'Salary Deposit', amount: 8500.00, category: 'Income' },
    { id: 3, date: '2026-02-02', description: 'Electric Bill', amount: -89.00, category: 'Utilities' },
    { id: 4, date: '2026-02-01', description: 'Uber Ride', amount: -24.50, category: 'Transport' },
    { id: 5, date: '2026-01-31', description: 'Amazon Purchase', amount: -156.99, category: 'Shopping' },
  ],
};

export const superUserData = {
  ...normalUserData,
  netWorth: 285400.00,
  assets: {
    total: 325400.00,
    breakdown: [
      { name: 'Real Estate', value: 180000, color: '#6366f1' },
      { name: 'Stocks & Equity', value: 85000, color: '#8b5cf6' },
      { name: 'Cash & Savings', value: 45400, color: '#10b981' },
      { name: 'Gold & Commodities', value: 15000, color: '#f59e0b' },
    ],
  },
  liabilities: {
    total: 40000.00,
    breakdown: [
      { name: 'Home Loan', value: 32000, color: '#ef4444' },
      { name: 'Car Loan', value: 6500, color: '#f97316' },
      { name: 'Credit Card', value: 1500, color: '#ec4899' },
    ],
  },
  financialHealthScore: 8.4,
  riskProfile: 'Moderate',
  investmentStrategy: {
    allocation: [
      { name: 'Equity', percentage: 45, color: '#6366f1' },
      { name: 'Debt', percentage: 30, color: '#10b981' },
      { name: 'Gold', percentage: 10, color: '#f59e0b' },
      { name: 'Cash', percentage: 15, color: '#64748b' },
    ],
    recommendations: [
      {
        instrument: 'Large Cap Equity Funds',
        allocation: '25%',
        rationale: 'Stable growth with moderate risk',
      },
      {
        instrument: 'Government Bonds',
        allocation: '20%',
        rationale: 'Low risk, steady returns',
      },
      {
        instrument: 'Mid Cap Funds',
        allocation: '15%',
        rationale: 'Higher growth potential',
      },
      {
        instrument: 'Gold ETF',
        allocation: '10%',
        rationale: 'Hedge against inflation',
      },
    ],
  },
  assetVsLiability: [
    { month: 'Aug', assets: 310000, liabilities: 45000 },
    { month: 'Sep', assets: 315000, liabilities: 44000 },
    { month: 'Oct', assets: 318000, liabilities: 43000 },
    { month: 'Nov', assets: 320000, liabilities: 42000 },
    { month: 'Dec', assets: 323000, liabilities: 41000 },
    { month: 'Jan', assets: 325400, liabilities: 40000 },
  ],
};

export const aiChatMessages = [
  {
    type: 'assistant',
    content: "Hello! I'm your AI finance assistant. I can help you understand your spending patterns, suggest savings strategies, and recommend investments tailored to your goals. How can I help you today?",
  },
];

export const aiPrompts = [
  "Where am I overspending?",
  "How can I save more?",
  "Which investment suits me and why?",
  "What's my financial health score?",
  "Should I increase my emergency fund?",
];
