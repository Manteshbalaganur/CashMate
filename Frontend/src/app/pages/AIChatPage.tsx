import { useState } from 'react';
import { Send, Sparkles, TrendingDown, PiggyBank, TrendingUp } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { aiPrompts } from '../data/mockData';

interface Message {
  type: 'user' | 'assistant';
  content: string;
}

export function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'assistant',
      content: "Hello! I'm your AI finance assistant. I can help you understand your spending patterns, suggest savings strategies, and recommend investments tailored to your goals. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { type: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Generate AI response based on input
    setTimeout(() => {
      let response = '';
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes('overspending') || lowerInput.includes('spending')) {
        response = "Based on your transaction data, I've identified that you're overspending in the **Shopping** category ($820 this month, 15% above your average). Your **Entertainment** expenses are also slightly elevated at $380. \n\nHere are my suggestions:\n• Set a monthly budget cap of $600 for shopping\n• Consider using the 24-hour rule before making non-essential purchases\n• Your food expenses ($950) are well-managed!";
      } else if (lowerInput.includes('save') || lowerInput.includes('savings')) {
        response = "Great question! Your current savings rate is 36.2%, which is excellent. Here's how you can save even more:\n\n**Quick wins:**\n• Reduce shopping expenses by $200/month → +$2,400/year\n• Use your cashback wallet efficiently (currently $4,800)\n• Set up automatic transfers of $500 to your Emergency Fund\n\n**AI Recommendation:** With these changes, you could increase your annual savings by $5,400, reaching a 45% savings rate!";
      } else if (lowerInput.includes('investment') || lowerInput.includes('invest')) {
        response = "Based on your financial profile and risk tolerance, I recommend a diversified approach:\n\n**Recommended Allocation:**\n• **SIP (50%):** Best for long-term wealth creation, expected 12-15% returns\n• **Fixed Deposit (30%):** Guaranteed returns for stability, 6-7% p.a.\n• **ETF/Paper Gold (20%):** Inflation hedge and portfolio diversification\n\n**Why this works for you:**\nYour steady income of $8,500/month and strong savings rate ($3,079/month) make you ideal for SIP investments. The emergency fund provides a safety net, so you can take moderate risks for better returns.";
      } else if (lowerInput.includes('health score') || lowerInput.includes('financial health')) {
        response = "Your Financial Health Score is **8.2/10** - Excellent! 🎉\n\n**What's working:**\n✓ Strong savings rate (36.2%)\n✓ Diverse wallet allocation\n✓ Low debt-to-income ratio\n✓ Consistent income stream\n\n**Areas for improvement:**\n• Emergency fund could be 6 months of expenses ($32,520 vs current $15,000)\n• Consider starting retirement investments\n• Optimize cashback wallet usage";
      } else if (lowerInput.includes('emergency') || lowerInput.includes('emergency fund')) {
        response = "Your emergency fund currently stands at **$15,000**. Financial experts recommend 6 months of expenses, which for you would be:\n\n6 × $5,420 = **$32,520**\n\n**Action Plan:**\n• Current gap: $17,520\n• Suggested monthly contribution: $500\n• Time to goal: ~35 months (3 years)\n\n💡 **Quick tip:** Transfer your next bonus or tax refund directly to your emergency fund to accelerate this goal!";
      } else {
        response = "I'm here to help with your finances! I can assist you with:\n\n• Analyzing your spending patterns\n• Creating personalized savings strategies\n• Recommending suitable investments\n• Evaluating your financial health\n• Planning your emergency fund\n\nWhat would you like to explore?";
      }

      const aiMessage: Message = { type: 'assistant', content: response };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);

    setInput('');
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-semibold text-white">AI Finance Assistant</h1>
          </div>
          <p className="text-zinc-400">Get personalized financial insights and recommendations</p>
        </div>

        {/* Suggested Prompts */}
        {messages.length === 1 && (
          <div className="mb-6 bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800">
            <h3 className="text-sm font-medium text-white mb-4">Try asking me about:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {aiPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  className="text-left p-4 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg transition-colors group border border-zinc-700/50 hover:border-zinc-600"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-zinc-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      {index === 0 && <TrendingDown className="h-4 w-4 text-red-500" />}
                      {index === 1 && <PiggyBank className="h-4 w-4 text-green-500" />}
                      {index === 2 && <TrendingUp className="h-4 w-4 text-blue-500" />}
                      {index === 3 && <Sparkles className="h-4 w-4 text-purple-500" />}
                      {index === 4 && <Sparkles className="h-4 w-4 text-indigo-500" />}
                    </div>
                    <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{prompt}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Container */}
        <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 flex flex-col" style={{ height: 'calc(100vh - 400px)', minHeight: '500px' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.type === 'user'
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                      : 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                    }`}
                >
                  {message.type === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-green-500" />
                      <span className="text-xs font-medium text-green-500">AI Assistant</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-zinc-800 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about your finances..."
                className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-zinc-500"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Send
              </button>
            </div>
            <p className="text-xs text-zinc-500 mt-2">
              Powered by AI + MCP • Context-aware financial intelligence
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
