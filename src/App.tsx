import { useState, useEffect } from 'react';

// Types
interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  note?: string;
}

interface TaskCategory {
  id: string;
  name: string;
  icon: string;
  time: string;
  color: string;
  bgColor: string;
  tasks: Task[];
}

// Default tasks data
const getDefaultCategories = (): TaskCategory[] => [
  {
    id: 'morning-open',
    name: 'Morning Opening',
    icon: '🌅',
    time: '7:00 - 8:00 AM',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50 border-amber-200',
    tasks: [
      { id: 'm1', text: 'Unlock shop & turn on all lights', completed: false, priority: 'high' },
      { id: 'm2', text: 'Turn on floral refrigeration units & check temperature (34-38°F)', completed: false, priority: 'high' },
      { id: 'm3', text: 'Check & water all fresh flower arrangements', completed: false, priority: 'high' },
      { id: 'm4', text: 'Remove any wilted flowers or dead leaves', completed: false, priority: 'medium' },
      { id: 'm5', text: 'Recut stems and refresh water in all displays', completed: false, priority: 'medium' },
      { id: 'm6', text: 'Set out daily special / featured arrangement', completed: false, priority: 'low' },
      { id: 'm7', text: 'Turn on POS system & check cash drawer', completed: false, priority: 'high' },
      { id: 'm8', text: 'Check voicemail & answer any emails', completed: false, priority: 'medium' },
      { id: 'm9', text: 'Review today\'s order schedule & deliveries', completed: false, priority: 'high' },
      { id: 'm10', text: 'Sweep entrance & wipe front windows', completed: false, priority: 'low' },
    ]
  },
  {
    id: 'mid-morning',
    name: 'Mid-Morning Tasks',
    icon: '🌷',
    time: '8:00 - 10:00 AM',
    color: 'text-pink-700',
    bgColor: 'bg-pink-50 border-pink-200',
    tasks: [
      { id: 'mm1', text: 'Process overnight online orders', completed: false, priority: 'high' },
      { id: 'mm2', text: 'Prepare scheduled delivery arrangements', completed: false, priority: 'high' },
      { id: 'mm3', text: 'Confirm delivery addresses & recipient names', completed: false, priority: 'high' },
      { id: 'mm4', text: 'Attach gift cards / personal messages to orders', completed: false, priority: 'medium' },
      { id: 'mm5', text: 'Check flower inventory — note what needs reordering', completed: false, priority: 'high' },
      { id: 'mm6', text: 'Update whiteboard with daily availability', completed: false, priority: 'low' },
      { id: 'mm7', text: 'Call/confirm any special event orders (weddings, funerals)', completed: false, priority: 'high' },
    ]
  },
  {
    id: 'afternoon',
    name: 'Afternoon Duties',
    icon: '🌻',
    time: '10:00 AM - 2:00 PM',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-50 border-yellow-200',
    tasks: [
      { id: 'a1', text: 'Greet walk-in customers warmly', completed: false, priority: 'high' },
      { id: 'a2', text: 'Assist customers with bouquet selection', completed: false, priority: 'high' },
      { id: 'a3', text: 'Process phone orders & take payment details', completed: false, priority: 'medium' },
      { id: 'a4', text: 'Wrap purchased flowers with care (tissue, ribbon, sleeve)', completed: false, priority: 'medium' },
      { id: 'a5', text: 'Restock wrapping supplies (paper, ribbon, cards)', completed: false, priority: 'low' },
      { id: 'a6', text: 'Take photos of best arrangements for social media', completed: false, priority: 'low' },
      { id: 'a7', text: 'Mist delicate flowers if needed', completed: false, priority: 'medium' },
      { id: 'a8', text: 'Rotate display arrangements for freshness', completed: false, priority: 'low' },
    ]
  },
  {
    id: 'late-afternoon',
    name: 'Late Afternoon',
    icon: '🌺',
    time: '2:00 - 4:00 PM',
    color: 'text-rose-700',
    bgColor: 'bg-rose-50 border-rose-200',
    tasks: [
      { id: 'la1', text: 'Prepare next-day delivery orders', completed: false, priority: 'high' },
      { id: 'la2', text: 'Process any remaining walk-in orders', completed: false, priority: 'medium' },
      { id: 'la3', text: 'Follow up on any customer complaints or issues', completed: false, priority: 'high' },
      { id: 'la4', text: 'Check on refrigeration temperature again', completed: false, priority: 'medium' },
      { id: 'la5', text: 'Update order tracking system', completed: false, priority: 'medium' },
      { id: 'la6', text: 'Respond to any pending social media messages', completed: false, priority: 'low' },
    ]
  },
  {
    id: 'closing',
    name: 'Closing Routine',
    icon: '🌙',
    time: '4:00 - 6:00 PM',
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-50 border-indigo-200',
    tasks: [
      { id: 'c1', text: 'Final customer service — last call walk-ins', completed: false, priority: 'medium' },
      { id: 'c2', text: 'Clean all work surfaces & tools (snips, buckets, tables)', completed: false, priority: 'high' },
      { id: 'c3', text: 'Sanitize vases and containers for tomorrow', completed: false, priority: 'medium' },
      { id: 'c4', text: 'Take out trash & recycling (stems, wrapping, etc.)', completed: false, priority: 'high' },
      { id: 'c5', text: 'Mop floors & sweep thoroughly', completed: false, priority: 'medium' },
      { id: 'c6', text: 'Count cash register & prepare deposit', completed: false, priority: 'high' },
      { id: 'c7', text: 'Run end-of-day report from POS', completed: false, priority: 'high' },
      { id: 'c8', text: 'Mist and cover overnight flower displays', completed: false, priority: 'medium' },
      { id: 'c9', text: 'Set alarm system & lock all doors', completed: false, priority: 'high' },
      { id: 'c10', text: 'Turn off non-essential lights (keep cooler on!)', completed: false, priority: 'high' },
    ]
  },
  {
    id: 'weekly',
    name: 'Weekly Reminders',
    icon: '📋',
    time: 'Throughout the Week',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50 border-emerald-200',
    tasks: [
      { id: 'w1', text: 'Place wholesale flower order (Mon/Wed/Fri)', completed: false, priority: 'high' },
      { id: 'w2', text: 'Deep clean cooler shelves & drains', completed: false, priority: 'medium' },
      { id: 'w3', text: 'Check & reorder supplies (wrapping paper, ribbon, foam)', completed: false, priority: 'medium' },
      { id: 'w4', text: 'Update website with seasonal arrangements', completed: false, priority: 'low' },
      { id: 'w5', text: 'Post 3+ photos on Instagram/Facebook', completed: false, priority: 'low' },
      { id: 'w6', text: 'Review upcoming event calendar (weddings, holidays)', completed: false, priority: 'high' },
      { id: 'w7', text: 'Check flower food & preservative stock', completed: false, priority: 'medium' },
      { id: 'w8', text: 'Organize ribbon & supply storage area', completed: false, priority: 'low' },
      { id: 'w9', text: 'Sharpen & sanitize all cutting tools', completed: false, priority: 'medium' },
      { id: 'w10', text: 'Review & update pricing if needed', completed: false, priority: 'medium' },
    ]
  },
];

function App() {
  const [categories, setCategories] = useState<TaskCategory[]>(() => {
    const saved = localStorage.getItem('floral-checklist');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Check if it's a new day
        const savedDate = localStorage.getItem('floral-checklist-date');
        const today = new Date().toDateString();
        if (savedDate !== today) {
          // Reset daily tasks but keep weekly
          return getDefaultCategories();
        }
        return parsed;
      } catch {
        return getDefaultCategories();
      }
    }
    return getDefaultCategories();
  });

  const [activeTab, setActiveTab] = useState<string>('all');
  const [showNotes, setShowNotes] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('floral-notes');
    return saved ? JSON.parse(saved) : {};
  });
  const [greeting, setGreeting] = useState('');

  // Set greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('floral-checklist', JSON.stringify(categories));
    localStorage.setItem('floral-checklist-date', new Date().toDateString());
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('floral-notes', JSON.stringify(notes));
  }, [notes]);

  const toggleTask = (categoryId: string, taskId: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          tasks: cat.tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        };
      }
      return cat;
    }));
  };

  const resetDay = () => {
    if (window.confirm('🌸 Reset all tasks for a fresh day?')) {
      setCategories(getDefaultCategories());
      setNotes({});
    }
  };

  const resetCategory = (categoryId: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, tasks: cat.tasks.map(t => ({ ...t, completed: false })) };
      }
      return cat;
    }));
  };

  // Calculate progress
  const getTotalProgress = () => {
    const allTasks = categories.flatMap(c => c.tasks);
    const completed = allTasks.filter(t => t.completed).length;
    return { completed, total: allTasks.length, percentage: Math.round((completed / allTasks.length) * 100) };
  };

  const getCategoryProgress = (category: TaskCategory) => {
    const completed = category.tasks.filter(t => t.completed).length;
    return { completed, total: category.tasks.length, percentage: Math.round((completed / category.tasks.length) * 100) };
  };

  const progress = getTotalProgress();

  const filteredCategories = activeTab === 'all'
    ? categories
    : categories.filter(c => c.id === activeTab);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700">Priority</span>;
      case 'medium': return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-orange-100 text-orange-700">Important</span>;
      default: return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">Routine</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-3xl">🌸</span>
                <span>Bloom & Petal</span>
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {greeting}! Here's your daily checklist ✨
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={resetDay}
                className="px-3 py-2 text-sm bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-lg transition-colors font-medium"
              >
                🔄 New Day
              </button>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mt-4 bg-gradient-to-r from-pink-100 to-emerald-100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Today's Progress</span>
              <span className="text-sm font-bold text-gray-700">
                {progress.completed}/{progress.total} tasks ({progress.percentage}%)
              </span>
            </div>
            <div className="w-full bg-white/60 rounded-full h-4 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-400 to-emerald-400 transition-all duration-500 ease-out"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            {progress.percentage === 100 && (
              <p className="text-center text-sm font-medium text-emerald-700 mt-2">
                🎉 Amazing! All tasks complete! Time to enjoy those beautiful blooms! 🌷
              </p>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-all ${
                activeTab === 'all'
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-pink-50 border border-gray-200'
              }`}
            >
              📋 All Tasks
            </button>
            {categories.map(cat => {
              const catProgress = getCategoryProgress(cat);
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-all ${
                    activeTab === cat.id
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-pink-50 border border-gray-200'
                  }`}
                >
                  {cat.icon} {cat.name} ({catProgress.completed}/{catProgress.total})
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {filteredCategories.map(category => {
          const catProgress = getCategoryProgress(category);
          return (
            <section
              key={category.id}
              className={`rounded-2xl border-2 ${category.bgColor} overflow-hidden shadow-sm`}
            >
              {/* Category Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h2 className={`font-bold text-lg ${category.color}`}>{category.name}</h2>
                    <p className="text-xs text-gray-500">⏰ {category.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    {catProgress.completed}/{catProgress.total}
                  </span>
                  <button
                    onClick={() => resetCategory(category.id)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-lg transition-colors"
                    title="Reset this section"
                  >
                    ↺
                  </button>
                </div>
              </div>

              {/* Category Progress Bar */}
              <div className="px-4 pb-2">
                <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-pink-300 to-pink-500 transition-all duration-300"
                    style={{ width: `${catProgress.percentage}%` }}
                  />
                </div>
              </div>

              {/* Tasks */}
              <div className="px-4 pb-4 space-y-2">
                {category.tasks.map(task => (
                  <div key={task.id} className="group">
                    <div
                      className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
                        task.completed
                          ? 'bg-white/40 opacity-70'
                          : 'bg-white/70 hover:bg-white/90 hover:shadow-sm'
                      }`}
                    >
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleTask(category.id, task.id)}
                        className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                          task.completed
                            ? 'bg-emerald-400 border-emerald-400 text-white'
                            : 'border-gray-300 hover:border-pink-400'
                        }`}
                      >
                        {task.completed && (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>

                      {/* Task Content */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                          {task.text}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {getPriorityBadge(task.priority)}
                          <button
                            onClick={() => setShowNotes(showNotes === task.id ? null : task.id)}
                            className="text-xs text-gray-400 hover:text-pink-500 transition-colors"
                          >
                            {notes[task.id] ? '📝 Note added' : '💬 Add note'}
                          </button>
                        </div>
                        {showNotes === task.id && (
                          <textarea
                            className="mt-2 w-full text-sm p-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
                            rows={2}
                            placeholder="Add a note..."
                            value={notes[task.id] || ''}
                            onChange={(e) => setNotes(prev => ({ ...prev, [task.id]: e.target.value }))}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Tips Section */}
        <section className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200 p-6">
          <h3 className="font-bold text-emerald-800 text-lg flex items-center gap-2">
            💡 Quick Tips for the Day
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-emerald-700">
            <li className="flex items-start gap-2">
              <span>🌡️</span>
              <span>Keep cooler at 34-38°F — flowers last 2-3x longer at proper temperature</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✂️</span>
              <span>Always cut stems at 45° angle under water for best absorption</span>
            </li>
            <li className="flex items-start gap-2">
              <span>💧</span>
              <span>Add flower food to every arrangement — it feeds & prevents bacteria</span>
            </li>
            <li className="flex items-start gap-2">
              <span>🚫</span>
              <span>Keep flowers away from fruit — ethylene gas causes premature wilting</span>
            </li>
            <li className="flex items-start gap-2">
              <span>😊</span>
              <span>Always smile and offer suggestions — customers love personalized service!</span>
            </li>
          </ul>
        </section>

        {/* Don't Forget Section */}
        <section className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border-2 border-red-200 p-6">
          <h3 className="font-bold text-red-800 text-lg flex items-center gap-2">
            ⚠️ Don't Forget!
          </h3>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white/70 rounded-xl p-3 border border-red-100">
              <p className="font-medium text-red-700 text-sm">🔑 Keys & Alarm</p>
              <p className="text-xs text-gray-600 mt-1">Always double-check doors are locked & alarm is set</p>
            </div>
            <div className="bg-white/70 rounded-xl p-3 border border-red-100">
              <p className="font-medium text-red-700 text-sm">❄️ Cooler Running</p>
              <p className="text-xs text-gray-600 mt-1">NEVER turn off the flower cooler overnight</p>
            </div>
            <div className="bg-white/70 rounded-xl p-3 border border-red-100">
              <p className="font-medium text-red-700 text-sm">💰 Cash Drawer</p>
              <p className="text-xs text-gray-600 mt-1">Count & secure cash drawer, leave correct change for tomorrow</p>
            </div>
            <div className="bg-white/70 rounded-xl p-3 border border-red-100">
              <p className="font-medium text-red-700 text-sm">📱 Phone Forwarding</p>
              <p className="text-xs text-gray-600 mt-1">Make sure shop phone forwards to after-hours number</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-6 text-sm text-gray-400">
          <p>🌸 Made with love for Bloom & Petal Floral Shop 🌸</p>
          <p className="mt-1">Checklist auto-resets each day • Progress saved locally</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
