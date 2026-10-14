import { useState, useEffect } from 'react';

// Types
interface Task {
  id: string;
  text: string;
  textRu: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  note?: string;
}

interface TaskCategory {
  id: string;
  name: string;
  nameRu: string;
  icon: string;
  time: string;
  timeRu: string;
  color: string;
  bgColor: string;
  bgColorRu: string;
  tasks: Task[];
}

// Translations
const translations = {
  en: {
    title: 'ЦветыДляИннусика',
    greetingMorning: 'Good Morning',
    greetingAfternoon: 'Good Afternoon',
    greetingEvening: 'Good Evening',
    subtitle: "Here's your daily checklist",
    newDay: '🔄 New Day',
    todayProgress: "Today's Progress",
    allTasks: '📋 All Tasks',
    tasks: 'tasks',
    allComplete: '🎉 Amazing! All tasks complete! Time to enjoy those beautiful blooms! 🌷',
    resetConfirm: '🌸 Reset all tasks for a fresh day?',
    resetSection: 'Reset this section',
    priority: 'Priority',
    important: 'Important',
    routine: 'Routine',
    addNote: '💬 Add note',
    noteAdded: '📝 Note added',
    notePlaceholder: 'Add a note...',
    tipsTitle: '💡 Quick Tips for the Day',
    tips: [
      { icon: '🌡️', text: 'Keep cooler at 34-38°F — flowers last 2-3x longer at proper temperature' },
      { icon: '✂️', text: 'Always cut stems at 45° angle under water for best absorption' },
      { icon: '💧', text: 'Add flower food to every arrangement — it feeds & prevents bacteria' },
      { icon: '🚫', text: 'Keep flowers away from fruit — ethylene gas causes premature wilting' },
      { icon: '😊', text: 'Always smile and offer suggestions — customers love personalized service!' },
    ],
    dontForgetTitle: '⚠️ Don\'t Forget!',
    dontForget: [
      { title: '🔑 Keys & Alarm', text: 'Always double-check doors are locked & alarm is set' },
      { title: '❄️ Cooler Running', text: 'NEVER turn off the flower cooler overnight' },
      { title: '💰 Cash Drawer', text: 'Count & secure cash drawer, leave correct change for tomorrow' },
      { title: '📱 Phone Forwarding', text: 'Make sure shop phone forwards to after-hours number' },
    ],
    footer1: '🌸 Made with love for ЦветыДляИннусика 🌸',
    footer2: 'Checklist auto-resets each day • Progress saved locally',
    language: 'Language',
    english: 'English',
    russian: 'Русский',
  },
  ru: {
    title: 'ЦветыДляИннусика',
    greetingMorning: 'Доброе утро',
    greetingAfternoon: 'Добрый день',
    greetingEvening: 'Добрый вечер',
    subtitle: 'Ваш ежедневный чек-лист',
    newDay: '🔄 Новый день',
    todayProgress: 'Прогресс за сегодня',
    allTasks: '📋 Все задачи',
    tasks: 'задач',
    allComplete: '🎉 Отлично! Все задачи выполнены! Время наслаждаться прекрасными цветами! 🌷',
    resetConfirm: '🌸 Сбросить все задачи для нового дня?',
    resetSection: 'Сбросить эту секцию',
    priority: 'Приоритет',
    important: 'Важно',
    routine: 'Обычное',
    addNote: '💬 Добавить заметку',
    noteAdded: '📝 Заметка добавлена',
    notePlaceholder: 'Добавить заметку...',
    tipsTitle: '💡 Быстрые советы на день',
    tips: [
      { icon: '🌡️', text: 'Держите холодильник при 1-3°C — цветы простоят в 2-3 раза дольше при правильной температуре' },
      { icon: '✂️', text: 'Всегда обрезайте стебли под углом 45° под водой для лучшего впитывания' },
      { icon: '💧', text: 'Добавляйте подкормку для цветов в каждую композицию — она питает и предотвращает бактерии' },
      { icon: '🚫', text: 'Держите цветы подальше от фруктов — этилен вызывает преждевременное увядание' },
      { icon: '😊', text: 'Всегда улыбайтесь и предлагайте варианты — клиенты любят персональный сервис!' },
    ],
    dontForgetTitle: '⚠️ Не забудьте!',
    dontForget: [
      { title: '🔑 Ключи и сигнализация', text: 'Всегда проверяйте, что двери заперты и сигнализация включена' },
      { title: '❄️ Холодильник работает', text: 'НИКОГДА не выключайте цветочный холодильник на ночь' },
      { title: '💰 Кассовый ящик', text: 'Пересчитайте и zabezpieчьте кассу, оставьте сдачу на завтра' },
      { title: '📱 Переадресация телефона', text: 'Убедитесь, что телефон магазина переадресует на нерабочий номер' },
    ],
    footer1: '🌸 Сделано с любовью для ЦветыДляИннусика 🌸',
    footer2: 'Чек-лист автоматически сбрасывается каждый день • Прогресс сохраняется локально',
    language: 'Язык',
    english: 'English',
    russian: 'Русский',
  }
};

// Default tasks data
const getDefaultCategories = (): TaskCategory[] => [
  {
    id: 'morning-open',
    name: 'Morning Opening',
    nameRu: 'Утреннее открытие',
    icon: '🌅',
    time: '7:00 - 8:00 AM',
    timeRu: '7:00 - 8:00 утра',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50 border-amber-200',
    bgColorRu: 'bg-blue-50 border-blue-200',
    tasks: [
      { id: 'm1', text: 'Unlock shop & turn on all lights', textRu: 'Открыть магазин и включить все освещение', completed: false, priority: 'high' },
      { id: 'm2', text: 'Turn on floral refrigeration units & check temperature (34-38°F)', textRu: 'Включить холодильные установки и проверить температуру (1-3°C)', completed: false, priority: 'high' },
      { id: 'm3', text: 'Check & water all fresh flower arrangements', textRu: 'Проверить и полить все свежие цветочные композиции', completed: false, priority: 'high' },
      { id: 'm4', text: 'Remove any wilted flowers or dead leaves', textRu: 'Удалить увядшие цветы и мёртвые листья', completed: false, priority: 'medium' },
      { id: 'm5', text: 'Recut stems and refresh water in all displays', textRu: 'Подрезать стебли и обновить воду во всех витринах', completed: false, priority: 'medium' },
      { id: 'm6', text: 'Set out daily special / featured arrangement', textRu: 'Выставить ежедневную акцию / композицию дня', completed: false, priority: 'low' },
      { id: 'm7', text: 'Turn on POS system & check cash drawer', textRu: 'Включить кассовую систему и проверить денежный ящик', completed: false, priority: 'high' },
      { id: 'm8', text: 'Check voicemail & answer any emails', textRu: 'Проверить голосовую почту и ответить на письма', completed: false, priority: 'medium' },
      { id: 'm9', text: "Review today's order schedule & deliveries", textRu: 'Просмотреть график заказов и доставок на сегодня', completed: false, priority: 'high' },
      { id: 'm10', text: 'Sweep entrance & wipe front windows', textRu: 'Подмететь вход и протереть витрины', completed: false, priority: 'low' },
    ]
  },
  {
    id: 'mid-morning',
    name: 'Mid-Morning Tasks',
    nameRu: 'Задачи середины утра',
    icon: '🌷',
    time: '8:00 - 10:00 AM',
    timeRu: '8:00 - 10:00 утра',
    color: 'text-pink-700',
    bgColor: 'bg-pink-50 border-pink-200',
    bgColorRu: 'bg-blue-50 border-blue-200',
    tasks: [
      { id: 'mm1', text: 'Process overnight online orders', textRu: 'Обработать ночные онлайн-заказы', completed: false, priority: 'high' },
      { id: 'mm2', text: 'Prepare scheduled delivery arrangements', textRu: 'Подготовить запланированные композиции для доставки', completed: false, priority: 'high' },
      { id: 'mm3', text: 'Confirm delivery addresses & recipient names', textRu: 'Подтвердить адреса доставки и имена получателей', completed: false, priority: 'high' },
      { id: 'mm4', text: 'Attach gift cards / personal messages to orders', textRu: 'Прикрепить подарочные карты / личные сообщения к заказам', completed: false, priority: 'medium' },
      { id: 'mm5', text: 'Check flower inventory — note what needs reordering', textRu: 'Проверить запасы цветов — записать что нужно заказать', completed: false, priority: 'high' },
      { id: 'mm6', text: 'Update whiteboard with daily availability', textRu: 'Обновить доску с ежедневной доступностью', completed: false, priority: 'low' },
      { id: 'mm7', text: 'Call/confirm any special event orders (weddings, funerals)', textRu: 'Позвонить/подтвердить заказы на мероприятия (свадьбы, похороны)', completed: false, priority: 'high' },
    ]
  },
  {
    id: 'afternoon',
    name: 'Afternoon Duties',
    nameRu: 'Дневные обязанности',
    icon: '🌻',
    time: '10:00 AM - 2:00 PM',
    timeRu: '10:00 утра - 2:00 дня',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-50 border-yellow-200',
    bgColorRu: 'bg-blue-50 border-blue-200',
    tasks: [
      { id: 'a1', text: 'Greet walk-in customers warmly', textRu: 'Тепло приветствовать посетителей', completed: false, priority: 'high' },
      { id: 'a2', text: 'Assist customers with bouquet selection', textRu: 'Помогать клиентам с выбором букетов', completed: false, priority: 'high' },
      { id: 'a3', text: 'Process phone orders & take payment details', textRu: 'Принимать телефонные заказы и данные оплаты', completed: false, priority: 'medium' },
      { id: 'a4', text: 'Wrap purchased flowers with care (tissue, ribbon, sleeve)', textRu: 'Аккуратно упаковать купленные цветы (бумага, лента, чехол)', completed: false, priority: 'medium' },
      { id: 'a5', text: 'Restock wrapping supplies (paper, ribbon, cards)', textRu: 'Пополнить запасы упаковочных материалов (бумага, ленты, открытки)', completed: false, priority: 'low' },
      { id: 'a6', text: 'Take photos of best arrangements for social media', textRu: 'Сфотографировать лучшие композиции для соцсетей', completed: false, priority: 'low' },
      { id: 'a7', text: 'Mist delicate flowers if needed', textRu: 'Опрыскать нежные цветы при необходимости', completed: false, priority: 'medium' },
      { id: 'a8', text: 'Rotate display arrangements for freshness', textRu: 'Ротировать витринные композиции для свежести', completed: false, priority: 'low' },
    ]
  },
  {
    id: 'late-afternoon',
    name: 'Late Afternoon',
    nameRu: 'Вторая половина дня',
    icon: '🌺',
    time: '2:00 - 4:00 PM',
    timeRu: '2:00 - 4:00 дня',
    color: 'text-rose-700',
    bgColor: 'bg-rose-50 border-rose-200',
    bgColorRu: 'bg-blue-50 border-blue-200',
    tasks: [
      { id: 'la1', text: 'Prepare next-day delivery orders', textRu: 'Подготовить заказы на доставку завтра', completed: false, priority: 'high' },
      { id: 'la2', text: 'Process any remaining walk-in orders', textRu: 'Обработать оставшиеся заказы посетителей', completed: false, priority: 'medium' },
      { id: 'la3', text: 'Follow up on any customer complaints or issues', textRu: 'Отработать жалобы или проблемы клиентов', completed: false, priority: 'high' },
      { id: 'la4', text: 'Check on refrigeration temperature again', textRu: 'Снова проверить температуру холодильника', completed: false, priority: 'medium' },
      { id: 'la5', text: 'Update order tracking system', textRu: 'Обновить систему отслеживания заказов', completed: false, priority: 'medium' },
      { id: 'la6', text: 'Respond to any pending social media messages', textRu: 'Ответить на ожидающие сообщения в соцсетях', completed: false, priority: 'low' },
    ]
  },
  {
    id: 'closing',
    name: 'Closing Routine',
    nameRu: 'Закрытие магазина',
    icon: '🌙',
    time: '4:00 - 6:00 PM',
    timeRu: '4:00 - 6:00 вечера',
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-50 border-indigo-200',
    bgColorRu: 'bg-blue-50 border-blue-200',
    tasks: [
      { id: 'c1', text: 'Final customer service — last call walk-ins', textRu: 'Последнее обслуживание — последние посетители', completed: false, priority: 'medium' },
      { id: 'c2', text: 'Clean all work surfaces & tools (snips, buckets, tables)', textRu: 'Очистить все рабочие поверхности и инструменты (ножницы, вёдра, столы)', completed: false, priority: 'high' },
      { id: 'c3', text: 'Sanitize vases and containers for tomorrow', textRu: 'Дезинфицировать вазы и контейнеры на завтра', completed: false, priority: 'medium' },
      { id: 'c4', text: 'Take out trash & recycling (stems, wrapping, etc.)', textRu: 'Вынести мусор и переработку (стебли, упаковка и т.д.)', completed: false, priority: 'high' },
      { id: 'c5', text: 'Mop floors & sweep thoroughly', textRu: 'Помыть полы и тщательно подмести', completed: false, priority: 'medium' },
      { id: 'c6', text: 'Count cash register & prepare deposit', textRu: 'Пересчитать кассу и подготовить депозит', completed: false, priority: 'high' },
      { id: 'c7', text: 'Run end-of-day report from POS', textRu: 'Сделать отчёт за день из кассовой системы', completed: false, priority: 'high' },
      { id: 'c8', text: 'Mist and cover overnight flower displays', textRu: 'Опрыскать и накрыть цветочные витрины на ночь', completed: false, priority: 'medium' },
      { id: 'c9', text: 'Set alarm system & lock all doors', textRu: 'Включить сигнализацию и запереть все двери', completed: false, priority: 'high' },
      { id: 'c10', text: 'Turn off non-essential lights (keep cooler on!)', textRu: 'Выключить ненужное освещение (холодильник оставить включённым!)', completed: false, priority: 'high' },
    ]
  },
  {
    id: 'weekly',
    name: 'Weekly Reminders',
    nameRu: 'Еженедельные напоминания',
    icon: '📋',
    time: 'Throughout the Week',
    timeRu: 'В течение недели',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50 border-emerald-200',
    bgColorRu: 'bg-blue-50 border-blue-200',
    tasks: [
      { id: 'w1', text: 'Place wholesale flower order (Mon/Wed/Fri)', textRu: 'Заказать оптом цветы (Пн/Ср/Пт)', completed: false, priority: 'high' },
      { id: 'w2', text: 'Deep clean cooler shelves & drains', textRu: 'Глубокая очистка полок и стоков холодильника', completed: false, priority: 'medium' },
      { id: 'w3', text: 'Check & reorder supplies (wrapping paper, ribbon, foam)', textRu: 'Проверить и заказать материалы (упаковочная бумага, ленты, пена)', completed: false, priority: 'medium' },
      { id: 'w4', text: 'Update website with seasonal arrangements', textRu: 'Обновить сайт сезонными композициями', completed: false, priority: 'low' },
      { id: 'w5', text: 'Post 3+ photos on Instagram/Facebook', textRu: 'Опубликовать 3+ фото в Instagram/Facebook', completed: false, priority: 'low' },
      { id: 'w6', text: 'Review upcoming event calendar (weddings, holidays)', textRu: 'Просмотреть календарь мероприятий (свадьбы, праздники)', completed: false, priority: 'high' },
      { id: 'w7', text: 'Check flower food & preservative stock', textRu: 'Проверить запасы подкормки и консервантов для цветов', completed: false, priority: 'medium' },
      { id: 'w8', text: 'Organize ribbon & supply storage area', textRu: 'Организовать хранение лент и материалов', completed: false, priority: 'low' },
      { id: 'w9', text: 'Sharpen & sanitize all cutting tools', textRu: 'Заточить и продезинфицировать все режущие инструменты', completed: false, priority: 'medium' },
      { id: 'w10', text: 'Review & update pricing if needed', textRu: 'Проверить и обновить цены при необходимости', completed: false, priority: 'medium' },
    ]
  },
];

function App() {
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const t = translations[language];
  const isRussian = language === 'ru';

  const STORAGE_VERSION = 'v3'; // Increment when data structure changes

  const [categories, setCategories] = useState<TaskCategory[]>(() => {
    const saved = localStorage.getItem('floral-checklist');
    const savedVersion = localStorage.getItem('floral-checklist-version');
    const savedDate = localStorage.getItem('floral-checklist-date');
    const today = new Date().toDateString();
    
    // Always use fresh data with translations
    const defaultCategories = getDefaultCategories();
    
    // Check if saved data has translations (textRu fields)
    const hasTranslations = saved ? (() => {
      try {
        const parsed = JSON.parse(saved);
        return parsed[0]?.tasks[0]?.textRu !== undefined;
      } catch {
        return false;
      }
    })() : false;
    
    // If we have saved data with translations and it's the same day, restore completed states
    if (saved && savedVersion === STORAGE_VERSION && savedDate === today && hasTranslations) {
      try {
        const parsed = JSON.parse(saved);
        // Restore completed states from saved data
        return defaultCategories.map(cat => {
          const savedCat = parsed.find((c: TaskCategory) => c.id === cat.id);
          if (savedCat) {
            return {
              ...cat,
              tasks: cat.tasks.map(task => {
                const savedTask = savedCat.tasks.find((t: Task) => t.id === task.id);
                return savedTask ? { ...task, completed: savedTask.completed } : task;
              })
            };
          }
          return cat;
        });
      } catch {
        return defaultCategories;
      }
    }
    
    // Clear old data if version mismatch, different day, or missing translations
    localStorage.removeItem('floral-checklist');
    localStorage.removeItem('floral-checklist-date');
    localStorage.removeItem('floral-checklist-version');
    return defaultCategories;
  });

  const [activeTab, setActiveTab] = useState<string>('all');
  const [showNotes, setShowNotes] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('floral-notes');
    return saved ? JSON.parse(saved) : {};
  });
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(t.greetingMorning);
    else if (hour < 17) setGreeting(t.greetingAfternoon);
    else setGreeting(t.greetingEvening);
  }, [language, t]);

  useEffect(() => {
    localStorage.setItem('floral-checklist', JSON.stringify(categories));
    localStorage.setItem('floral-checklist-date', new Date().toDateString());
    localStorage.setItem('floral-checklist-version', STORAGE_VERSION);
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
    if (window.confirm(t.resetConfirm)) {
      setCategories(getDefaultCategories());
      setNotes({});
    }
  };

  const resetCategory = (categoryId: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, tasks: cat.tasks.map(task => ({ ...task, completed: false })) };
      }
      return cat;
    }));
  };

  const getTotalProgress = () => {
    const allTasks = categories.flatMap(c => c.tasks);
    const completed = allTasks.filter(task => task.completed).length;
    return { completed, total: allTasks.length, percentage: Math.round((completed / allTasks.length) * 100) };
  };

  const getCategoryProgress = (category: TaskCategory) => {
    const completed = category.tasks.filter(task => task.completed).length;
    return { completed, total: category.tasks.length, percentage: Math.round((completed / category.tasks.length) * 100) };
  };

  const progress = getTotalProgress();

  const filteredCategories = activeTab === 'all'
    ? categories
    : categories.filter(c => c.id === activeTab);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700">{t.priority}</span>;
      case 'medium': return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-orange-100 text-orange-700">{t.important}</span>;
      default: return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">{t.routine}</span>;
    }
  };

  const getCategoryName = (cat: TaskCategory) => isRussian ? (cat.nameRu || cat.name) : cat.name;
  const getCategoryTime = (cat: TaskCategory) => isRussian ? (cat.timeRu || cat.time) : cat.time;
  const getCategoryBg = (cat: TaskCategory) => isRussian ? (cat.bgColorRu || cat.bgColor) : cat.bgColor;
  const getTaskText = (task: Task) => {
    const result = isRussian ? (task.textRu || task.text) : task.text;
    return result;
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isRussian 
        ? 'bg-gradient-to-br from-blue-100 via-blue-50 to-sky-100' 
        : 'bg-gradient-to-br from-pink-50 via-white to-emerald-50'
    }`}>
      {/* Header */}
      <header className={`backdrop-blur-sm border-b sticky top-0 z-10 transition-colors duration-500 ${
        isRussian ? 'bg-blue-50/80 border-blue-200' : 'bg-white/80 border-pink-100'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-3">
          {/* Top Row: Language Radio Button - Upper Right Corner */}
          <div className="flex items-center justify-end mb-3">
            {/* Language Switcher - Radio Buttons */}
            <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 transition-colors duration-500 ${
              isRussian ? 'bg-blue-100 border-blue-400 shadow-md shadow-blue-200' : 'bg-pink-50 border-pink-300 shadow-md shadow-pink-100'
            }`}>
              <span className={`text-sm font-bold transition-colors duration-500 ${
                isRussian ? 'text-blue-800' : 'text-gray-700'
              }`}>{t.language}:</span>
              
              {/* English Radio Button */}
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer ${
                  language === 'en'
                    ? (isRussian ? 'bg-blue-200 ring-2 ring-blue-500' : 'bg-pink-200 ring-2 ring-pink-500')
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-pressed={language === 'en'}
                role="radio"
                aria-checked={language === 'en'}
              >
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  language === 'en'
                    ? 'border-pink-600 bg-pink-600'
                    : 'border-gray-400 bg-white'
                }`}>
                  {language === 'en' && (
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                  )}
                </span>
                <span className={`text-sm font-semibold transition-colors duration-300 ${
                  language === 'en'
                    ? (isRussian ? 'text-blue-900' : 'text-pink-800')
                    : (isRussian ? 'text-blue-600' : 'text-gray-600')
                }`}>🇬🇧 {t.english}</span>
              </button>

              {/* Russian Radio Button */}
              <button
                type="button"
                onClick={() => setLanguage('ru')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer ${
                  language === 'ru'
                    ? 'bg-blue-200 ring-2 ring-blue-500'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-pressed={language === 'ru'}
                role="radio"
                aria-checked={language === 'ru'}
              >
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  language === 'ru'
                    ? 'border-blue-600 bg-blue-600'
                    : 'border-gray-400 bg-white'
                }`}>
                  {language === 'ru' && (
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                  )}
                </span>
                <span className={`text-sm font-semibold transition-colors duration-300 ${
                  language === 'ru'
                    ? 'text-blue-900'
                    : (isRussian ? 'text-blue-600' : 'text-gray-600')
                }`}>🇷🇺 {t.russian}</span>
              </button>
            </div>
          </div>

          {/* Bottom Row: Title + New Day Button */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold flex items-center gap-2 transition-colors duration-500 ${
                isRussian ? 'text-blue-900' : 'text-gray-800'
              }`}>
                <span className="text-3xl">🌸</span>
                <span>{t.title}</span>
              </h1>
              <p className={`text-sm mt-1 transition-colors duration-500 ${
                isRussian ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {greeting}! {t.subtitle} ✨
              </p>
            </div>
            <button
              onClick={resetDay}
              className={`px-3 py-2 text-sm rounded-lg transition-colors font-medium ${
                isRussian 
                  ? 'bg-blue-200 hover:bg-blue-300 text-blue-800' 
                  : 'bg-pink-100 hover:bg-pink-200 text-pink-700'
              }`}
            >
              {t.newDay}
            </button>
          </div>

          {/* Overall Progress */}
          <div className={`mt-4 rounded-xl p-4 transition-colors duration-500 ${
            isRussian 
              ? 'bg-gradient-to-r from-blue-200 to-sky-200' 
              : 'bg-gradient-to-r from-pink-100 to-emerald-100'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-semibold transition-colors duration-500 ${
                isRussian ? 'text-blue-900' : 'text-gray-700'
              }`}>{t.todayProgress}</span>
              <span className={`text-sm font-bold transition-colors duration-500 ${
                isRussian ? 'text-blue-900' : 'text-gray-700'
              }`}>
                {progress.completed}/{progress.total} {t.tasks} ({progress.percentage}%)
              </span>
            </div>
            <div className="w-full bg-white/60 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${
                  isRussian 
                    ? 'bg-gradient-to-r from-blue-400 to-sky-400' 
                    : 'bg-gradient-to-r from-pink-400 to-emerald-400'
                }`}
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            {progress.percentage === 100 && (
              <p className={`text-center text-sm font-medium mt-2 transition-colors duration-500 ${
                isRussian ? 'text-blue-800' : 'text-emerald-700'
              }`}>
                {t.allComplete}
              </p>
            )}
          </div>

          {/* Category Filter Select */}
          <div className="mt-4">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className={`w-full px-4 py-3 text-sm font-medium rounded-xl border-2 transition-all duration-500 cursor-pointer focus:outline-none focus:ring-2 ${
                isRussian
                  ? 'bg-blue-50 border-blue-300 text-blue-900 focus:ring-blue-400'
                  : 'bg-pink-50 border-pink-300 text-gray-800 focus:ring-pink-400'
              }`}
            >
              <option value="all">{t.allTasks}</option>
              {categories.map(cat => {
                const catProgress = getCategoryProgress(cat);
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {getCategoryName(cat)} ({catProgress.completed}/{catProgress.total})
                  </option>
                );
              })}
            </select>
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
              className={`rounded-2xl border-2 overflow-hidden shadow-sm transition-colors duration-500 ${getCategoryBg(category)}`}
            >
              {/* Category Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h2 className={`font-bold text-lg transition-colors duration-500 ${
                      isRussian ? 'text-blue-800' : category.color
                    }`}>{getCategoryName(category)}</h2>
                    <p className="text-xs text-gray-500">⏰ {getCategoryTime(category)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium transition-colors duration-500 ${
                    isRussian ? 'text-blue-700' : 'text-gray-600'
                  }`}>
                    {catProgress.completed}/{catProgress.total}
                  </span>
                  <button
                    onClick={() => resetCategory(category.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isRussian ? 'text-blue-400 hover:text-blue-600 hover:bg-blue-100/50' : 'text-gray-400 hover:text-gray-600 hover:bg-white/50'
                    }`}
                    title={t.resetSection}
                  >
                    ↺
                  </button>
                </div>
              </div>

              {/* Category Progress Bar */}
              <div className="px-4 pb-2">
                <div className={`rounded-full h-2 overflow-hidden transition-colors duration-500 ${
                  isRussian ? 'bg-blue-100/50' : 'bg-white/50'
                }`}>
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isRussian ? 'bg-gradient-to-r from-blue-300 to-blue-500' : 'bg-gradient-to-r from-pink-300 to-pink-500'
                    }`}
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
                          ? (isRussian ? 'bg-blue-100/40 opacity-70' : 'bg-white/40 opacity-70')
                          : (isRussian ? 'bg-white/70 hover:bg-white/90 hover:shadow-sm' : 'bg-white/70 hover:bg-white/90 hover:shadow-sm')
                      }`}
                    >
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleTask(category.id, task.id)}
                        className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                          task.completed
                            ? (isRussian ? 'bg-blue-500 border-blue-500 text-white' : 'bg-emerald-400 border-emerald-400 text-white')
                            : (isRussian ? 'border-blue-300 hover:border-blue-500' : 'border-gray-300 hover:border-pink-400')
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
                        <p className={`text-sm transition-colors duration-500 ${
                          task.completed 
                            ? 'line-through text-gray-400' 
                            : (isRussian ? 'text-blue-900' : 'text-gray-700')
                        }`}>
                          {getTaskText(task)}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {getPriorityBadge(task.priority)}
                          <button
                            onClick={() => setShowNotes(showNotes === task.id ? null : task.id)}
                            className={`text-xs transition-colors ${
                              isRussian 
                                ? (notes[task.id] ? 'text-blue-600' : 'text-blue-400 hover:text-blue-600')
                                : (notes[task.id] ? 'text-pink-600' : 'text-gray-400 hover:text-pink-500')
                            }`}
                          >
                            {notes[task.id] ? t.noteAdded : t.addNote}
                          </button>
                        </div>
                        {showNotes === task.id && (
                          <textarea
                            className={`mt-2 w-full text-sm p-2 rounded-lg focus:outline-none focus:ring-2 resize-none transition-colors duration-500 ${
                              isRussian 
                                ? 'border-blue-200 focus:ring-blue-300' 
                                : 'border-pink-200 focus:ring-pink-300'
                            }`}
                            rows={2}
                            placeholder={t.notePlaceholder}
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
        <section className={`rounded-2xl border-2 p-6 transition-colors duration-500 ${
          isRussian 
            ? 'bg-gradient-to-r from-blue-100 to-sky-100 border-blue-300' 
            : 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200'
        }`}>
          <h3 className={`font-bold text-lg flex items-center gap-2 transition-colors duration-500 ${
            isRussian ? 'text-blue-900' : 'text-emerald-800'
          }`}>
            {t.tipsTitle}
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {t.tips.map((tip, index) => (
              <li key={index} className={`flex items-start gap-2 transition-colors duration-500 ${
                isRussian ? 'text-blue-800' : 'text-emerald-700'
              }`}>
                <span>{tip.icon}</span>
                <span>{tip.text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Don't Forget Section */}
        <section className={`rounded-2xl border-2 p-6 transition-colors duration-500 ${
          isRussian 
            ? 'bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-300' 
            : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
        }`}>
          <h3 className={`font-bold text-lg flex items-center gap-2 transition-colors duration-500 ${
            isRussian ? 'text-blue-900' : 'text-red-800'
          }`}>
            {t.dontForgetTitle}
          </h3>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.dontForget.map((item, index) => (
              <div key={index} className={`rounded-xl p-3 border transition-colors duration-500 ${
                isRussian ? 'bg-white/70 border-blue-200' : 'bg-white/70 border-red-100'
              }`}>
                <p className={`font-medium text-sm transition-colors duration-500 ${
                  isRussian ? 'text-blue-800' : 'text-red-700'
                }`}>{item.title}</p>
                <p className={`text-xs mt-1 transition-colors duration-500 ${
                  isRussian ? 'text-blue-700' : 'text-gray-600'
                }`}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className={`text-center py-6 text-sm transition-colors duration-500 ${
          isRussian ? 'text-blue-400' : 'text-gray-400'
        }`}>
          <p>{t.footer1}</p>
          <p className="mt-1">{t.footer2}</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
