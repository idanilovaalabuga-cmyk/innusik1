import { useState, useEffect } from 'react';
import {
  FlowerIcon,
  SunriseIcon,
  TulipIcon,
  SunflowerIcon,
  HibiscusIcon,
  MoonIcon,
  ClipboardIcon,
  RefreshIcon,
  NoteIcon,
  CommentIcon,
  LightbulbIcon,
  WarningIcon,
  KeyIcon,
  SnowflakeIcon,
  MoneyIcon,
  PhoneIcon,
  ThermometerIcon,
  ScissorsIcon,
  WaterDropIcon,
  BanIcon,
  SmileIcon,
  PartyIcon,
  LanguageIcon,
  CameraIcon
} from './components/Icons';

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
  icon: React.ComponentType<{ className?: string; size?: number }>;
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
    title: 'TsvetyDlyaInnysika',
    greetingMorning: 'Good Morning',
    greetingAfternoon: 'Good Afternoon',
    greetingEvening: 'Good Evening',
    subtitle: "Here's your daily checklist",
    newDay: 'New Day',
    todayProgress: "Today's Progress",
    allTasks: 'All Tasks',
    tasks: 'tasks',
    allComplete: 'Amazing! All tasks complete! Time to enjoy those beautiful blooms!',
    resetConfirm: 'Reset all tasks for a fresh day?',
    resetSection: 'Reset this section',
    priority: 'Priority',
    important: 'Important',
    routine: 'Routine',
    addNote: 'Add note',
    noteAdded: 'Note added',
    notePlaceholder: 'Add a note...',
    tipsTitle: 'Operational Recommendations',
    tips: [
      { icon: CameraIcon, text: 'Photo fixation: require employee to take 2 photos (display after morning check and finished arrangement on neutral background before delivery)' },
      { icon: ClipboardIcon, text: 'Digital reporting: replace notebook writing and manual message to owner with mandatory simple electronic form with fields "Terminal revenue", "Receipt photo", "Cleaning status"' },
      { icon: LightbulbIcon, text: 'Standards visualization: print cutting rules (hydrangea, tulip, others) and processing (rose, dianthus) as brief memo with images and post it directly above flower cleaning zone' },
      { icon: MoneyIcon, text: 'Material consumption control: introduce rule of mandatory counting of used packaging and oasis at end of shift, comparing with number of sold bouquets and arrangements to identify overconsumption' },
    ],
    dontForgetTitle: "Don't Forget!",
    dontForget: [
      { icon: KeyIcon, title: 'Keys & Alarm', text: 'Always double-check doors are locked & alarm is set' },
      { icon: SnowflakeIcon, title: 'Cooler Running', text: 'NEVER turn off the flower cooler overnight' },
      { icon: MoneyIcon, title: 'Cash Drawer', text: 'Count & secure cash drawer, leave correct change for tomorrow' },
      { icon: PhoneIcon, title: 'Phone Forwarding', text: 'Make sure shop phone forwards to after-hours number' },
    ],
    footer1: 'Made with love for TsvetyDlyaInnysika',
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
    newDay: 'Новый день',
    todayProgress: 'Прогресс за сегодня',
    allTasks: 'Все задачи',
    tasks: 'задач',
    allComplete: 'Отлично! Все задачи выполнены! Время наслаждаться прекрасными цветами!',
    resetConfirm: 'Сбросить все задачи для нового дня?',
    resetSection: 'Сбросить эту секцию',
    priority: 'Приоритет',
    important: 'Важно',
    routine: 'Обычное',
    addNote: 'Добавить заметку',
    noteAdded: 'Заметка добавлена',
    notePlaceholder: 'Добавить заметку...',
    tipsTitle: 'Операционные рекомендации',
    tips: [
      { icon: CameraIcon, text: 'Фотофиксация: обязать сотрудника делать 2 фотографии (витрина после утренней проверки и готовая композиция на нейтральном фоне перед выдачей)' },
      { icon: ClipboardIcon, text: 'Цифровизация отчета: заменить запись в тетрадь и ручное сообщение владельцу на обязательное заполнение простой электронной формы с полями "Выручка по терминалу", "Фото чека", "Статус уборки"' },
      { icon: LightbulbIcon, text: 'Визуализация стандартов: распечатать правила среза (гортензия, тюльпан, остальные) и обработки (роза, диантус) в виде краткой памятки с изображениями и закрепить ее непосредственно над зоной зачистки цветов' },
      { icon: MoneyIcon, text: 'Контроль расхода материалов: ввести правило обязательного подсчета использованных упаковок и оазиса в конце смены, сопоставляя их с количеством проданных букетов и композиций для выявления перерасхода' },
    ],
    dontForgetTitle: 'Не забудьте!',
    dontForget: [
      { icon: KeyIcon, title: 'Ключи и сигнализация', text: 'Всегда проверяйте, что двери заперты и сигнализация включена' },
      { icon: SnowflakeIcon, title: 'Холодильник работает', text: 'НИКОГДА не выключайте цветочный холодильник на ночь' },
      { icon: MoneyIcon, title: 'Кассовый ящик', text: 'Пересчитайте и zabezpieчьте кассу, оставьте сдачу на завтра' },
      { icon: PhoneIcon, title: 'Переадресация телефона', text: 'Убедитесь, что телефон магазина переадресует на нерабочий номер' },
    ],
    footer1: 'Сделано с любовью для ЦветыДляИннусика',
    footer2: 'Чек-лист автоматически сбрасывается каждый день • Прогресс сохраняется локально',
    language: 'Язык',
    english: 'English',
    russian: 'Русский',
  }
};

// Default tasks data
const getDefaultCategories = (): TaskCategory[] => [
  {
    id: 'morning-checklist',
    name: 'Start of Work Day',
    nameRu: 'Начало рабочего дня',
    icon: SunriseIcon,
    time: 'Morning',
    timeRu: 'Утро',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50 border-amber-200',
    bgColorRu: 'bg-blue-50 border-blue-200',
    tasks: [
      { id: 'm1', text: 'Display inspection: visual check of all flowers and ready arrangements', textRu: 'Осмотр витрины: визуальная проверка состояния всех цветов и готовых композиций', completed: false, priority: 'high' },
      { id: 'm2', text: 'Check water in vases: assess transparency and water level, identify stale flowers', textRu: 'Проверка воды в вазах: оценка прозрачности и уровня воды, выявление несвежих цветов', completed: false, priority: 'high' },
      { id: 'm3', text: 'Water replacement: complete water change in all vases according to water change log', textRu: 'Замена воды: полная замена воды во всех вазах согласно журналу замены воды', completed: false, priority: 'high' },
      { id: 'm4', text: 'Check water change log: confirm all previous change marks are entered correctly', textRu: 'Проверка журнала замены воды: подтверждение, что все отметки о предыдущих заменах внесены корректно', completed: false, priority: 'medium' },
      { id: 'm5', text: 'Check floor cleanliness (no trash, leaves, water marks)', textRu: 'Проверка чистоты пола (отсутствие мусора, листьев, следов воды)', completed: false, priority: 'medium' },
      { id: 'm6', text: 'Check work table surface', textRu: 'Проверка поверхности рабочего стола', completed: false, priority: 'medium' },
      { id: 'm7', text: 'Check space under the table', textRu: 'Проверка пространства под столом', completed: false, priority: 'low' },
      { id: 'm8', text: 'Check interior condition of drawers', textRu: 'Проверка внутреннего состояния ящиков', completed: false, priority: 'low' },
      { id: 'm9', text: 'Check storage shelves', textRu: 'Проверка полочек для хранения', completed: false, priority: 'low' },
      { id: 'm10', text: 'Check vase cleanliness (no plaque and organic residue)', textRu: 'Проверка чистоты ваз (отсутствие налета и остатков органики)', completed: false, priority: 'medium' },
    ]
  },
  {
    id: 'flower-processing',
    name: 'Flower Cleaning & Processing',
    nameRu: 'Зачистка и обработка цветов',
    icon: ScissorsIcon,
    time: 'Throughout the Day',
    timeRu: 'В течение дня',
    color: 'text-pink-700',
    bgColor: 'bg-pink-50 border-pink-200',
    bgColorRu: 'bg-blue-50 border-blue-200',
    tasks: [
      { id: 'fp1', text: 'Container preparation: wash vases with dish soap and sponge until perfectly clean', textRu: 'Подготовка тары: мыть вазы с моющим средством для посуды и губкой до идеальной чистоты', completed: false, priority: 'high' },
      { id: 'fp2', text: 'Vase selection: use tall vases for tall flowers, short vases for short flowers. Do not breed many vases', textRu: 'Подбор ваз: использовать высокие вазы для высоких цветов, низкие вазы для коротких цветов. Не плодить много ваз', completed: false, priority: 'medium' },
      { id: 'fp3', text: 'Water preparation: water should always be the coldest and freshest. Exception: water for fresh eucalyptus from delivery should be hot, such eucalyptus should not be put in the refrigerator immediately', textRu: 'Подготовка воды: вода всегда должна быть самой холодной и свежей. Исключение: вода для свежего эвкалипта с поставки должна быть горячей, такой эвкалипт в холодильник сразу не ставить', completed: false, priority: 'high' },
      { id: 'fp4', text: 'Stem processing: keep the stem clean and perfect, completely remove greenery, as it rots in water', textRu: 'Обработка стебля: оставлять стебель чистым и идеальным, полностью удалять зелень, так как она тухнет в воде', completed: false, priority: 'high' },
      { id: 'fp5', text: 'Hydrangea: lots of water, even stem cut, split in half', textRu: 'Гортензия: много воды, ровный срез стебля, рассеченный надвое', completed: false, priority: 'high' },
      { id: 'fp6', text: 'Tulip: even cut', textRu: 'Тюльпан: ровный срез', completed: false, priority: 'medium' },
      { id: 'fp7', text: 'Other flowers: angled cut', textRu: 'Остальные цветы: косой срез', completed: false, priority: 'medium' },
      { id: 'fp8', text: 'Alstroemeria: provide more water in the vase', textRu: 'Альстромерия: обеспечить побольше воды в вазе', completed: false, priority: 'medium' },
      { id: 'fp9', text: 'Roses: remove bad petals and wrapper', textRu: 'Розы: убирать плохие лепестки и рубашку', completed: false, priority: 'high' },
      { id: 'fp10', text: 'Dianthus: slightly spread the bud and remove lower petals', textRu: 'Диантус: немного раздвигать бутон и убирать нижние лепестки', completed: false, priority: 'medium' },
    ]
  },
  {
    id: 'bouquet-assembly',
    name: 'Bouquet & Arrangement Assembly',
    nameRu: 'Сборка букетов и композиций',
    icon: FlowerIcon,
    time: 'Throughout the Day',
    timeRu: 'В течение дня',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-50 border-yellow-200',
    bgColorRu: 'bg-blue-50 border-blue-200',
    tasks: [
      { id: 'ba1', text: 'Main rule: ACCURACY at all stages', textRu: 'Главное правило: АККУРАТНОСТЬ на всех этапах', completed: false, priority: 'high' },
      { id: 'ba2', text: 'Base preparation: before assembly, choose a vase, basket or box. Soak oasis in cold water. Always put a dummy under the oasis, but not too much so the box does not look "pot-bellied"', textRu: 'Подготовка основы: перед сборкой выбрать вазу, корзину или коробку. Замочить оазис в холодной воде. Под оазис всегда подложить муляж, но не слишком много, чтобы коробка не выглядела "пузатой"', completed: false, priority: 'high' },
      { id: 'ba3', text: 'Color solutions: choose packaging and decorations to match the color of buds, greens or main packaging. Use color wheel or Pinterest references. Main rule: do not variegate and do not overdo with colors, everything should match perfectly', textRu: 'Цветовые решения: упаковку и украшения подбирать в цвет бутонов, зелени или основной упаковки. Использовать цветовой круг или референсы из Pinterest. Главное правило: не пестрить и не переборщить с цветами, все должно идеально сочетаться', completed: false, priority: 'high' },
      { id: 'ba4', text: 'Proportions: the size of the box for the composition always depends on the number of flowers. Flowers in the bouquet should always be slightly higher than the packaging', textRu: 'Пропорции: размер коробки для композиции всегда зависит от количества цветов. Цветы в букете всегда должны быть чуть выше упаковки', completed: false, priority: 'medium' },
      { id: 'ba5', text: 'Work with packaging: carefully adjust and trim the packaging if necessary so that it is not visible that it was trimmed', textRu: 'Работа с упаковкой: аккуратно подправлять и подрезать упаковку при необходимости так, чтобы не было видно, что ее подрезали', completed: false, priority: 'medium' },
      { id: 'ba6', text: 'The place of tying the bouquet and packaging should always be in one place', textRu: 'Место связки букета и упаковки всегда должно быть в одном месте', completed: false, priority: 'medium' },
      { id: 'ba7', text: 'Glue the packaging so that it does not fly apart during transportation', textRu: 'Упаковку подклеить, чтобы она не разлетелась при транспортировке', completed: false, priority: 'medium' },
      { id: 'ba8', text: 'Skirt design: for a composition, the skirt is made at the end. For a bouquet, the skirt can not be made separately, or made at the beginning, depending on the chosen packaging option', textRu: 'Оформление юбки: для композиции юбка делается в конце. Для букета юбку можно не делать отдельно, либо сделать в начале, в зависимости от выбранного варианта упаковки', completed: false, priority: 'low' },
      { id: 'ba9', text: 'Assembly of composition in oasis: it is better to insert flowers immediately 1 time, as the oasis collapses strongly. Insert all flowers from the edge to the center of the oasis. The composition should look integral from different sides', textRu: 'Сборка композиции в оазис: цветы вставлять лучше сразу 1 раз, так как оазис сильно разваливается. Все цветы вставлять от края к центру оазиса. Композиция с разных сторон должна выглядеть целостной', completed: false, priority: 'high' },
    ]
  },
  {
    id: 'end-of-day',
    name: 'End of Work Day',
    nameRu: 'Завершение рабочего дня',
    icon: MoonIcon,
    time: 'Evening',
    timeRu: 'Вечер',
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-50 border-indigo-200',
    bgColorRu: 'bg-blue-50 border-blue-200',
    tasks: [
      { id: 'e1', text: 'Financial reconciliation: reconciliation of totals on the cash terminal', textRu: 'Финансовая сверка: сверка итогов на кассовом терминале', completed: false, priority: 'high' },
      { id: 'e2', text: 'Data fixation: write down the results in a notebook', textRu: 'Фиксация данных: записать итоги в тетрадь', completed: false, priority: 'high' },
      { id: 'e3', text: 'Reporting: write to the owner about the total revenue', textRu: 'Отчетность: написать владельцу об итоговой выручке', completed: false, priority: 'high' },
      { id: 'e4', text: 'Cleaning: wash the floor', textRu: 'Уборка: вымыть пол', completed: false, priority: 'medium' },
      { id: 'e5', text: 'Flower care: drain water from all vases in the refrigerator', textRu: 'Уход за цветами: слить воду из всех ваз в холодильнике', completed: false, priority: 'high' },
      { id: 'e6', text: 'Safety: turn on the alarm, close the door', textRu: 'Безопасность: поставить сигнализацию, закрыть дверь', completed: false, priority: 'high' },
    ]
  },
];

function App() {
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const t = translations[language];
  const isRussian = language === 'ru';

  const STORAGE_VERSION = 'v4'; // Increment when data structure changes

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
    // Save only serializable data (exclude icon components)
    const serializableCategories = categories.map(cat => ({
      ...cat,
      icon: undefined, // Remove icon component before saving
    }));
    localStorage.setItem('floral-checklist', JSON.stringify(serializableCategories));
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
    // Create reset categories with all tasks set to false
    const resetCategories = categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      nameRu: cat.nameRu,
      icon: cat.icon,
      time: cat.time,
      timeRu: cat.timeRu,
      color: cat.color,
      bgColor: cat.bgColor,
      bgColorRu: cat.bgColorRu,
      tasks: cat.tasks.map(task => ({
        id: task.id,
        text: task.text,
        textRu: task.textRu,
        completed: false,
        priority: task.priority,
        note: task.note
      }))
    }));
    
    // Update state
    setCategories(resetCategories);
    setNotes({});
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
                }`}>{t.english}</span>
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
                }`}>{t.russian}</span>
              </button>
            </div>
          </div>

          {/* Bottom Row: Title + New Day Button */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold flex items-center gap-2 transition-colors duration-500 ${
                isRussian ? 'text-blue-900' : 'text-gray-800'
              }`}>
                <FlowerIcon className={isRussian ? 'text-blue-600' : 'text-pink-500'} size={32} />
                <span>{t.title}</span>
              </h1>
              <p className={`text-sm mt-1 transition-colors duration-500 ${
                isRussian ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {greeting}! {t.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={resetDay}
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors font-medium cursor-pointer relative z-20 ${
                isRussian 
                  ? 'bg-blue-200 hover:bg-blue-300 text-blue-800' 
                  : 'bg-pink-100 hover:bg-pink-200 text-pink-700'
              }`}
            >
              <RefreshIcon size={16} />
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
                <PartyIcon className="inline mr-2" size={16} />
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
                    {getCategoryName(cat)} ({catProgress.completed}/{catProgress.total})
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
          const CategoryIcon = category.icon;
          return (
            <section
              key={category.id}
              className={`rounded-2xl border-2 overflow-hidden shadow-sm transition-colors duration-500 ${getCategoryBg(category)}`}
            >
              {/* Category Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CategoryIcon className={isRussian ? 'text-blue-600' : category.color} size={28} />
                  <div>
                    <h2 className={`font-bold text-lg transition-colors duration-500 ${
                      isRussian ? 'text-blue-800' : category.color
                    }`}>{getCategoryName(category)}</h2>
                    <p className="text-xs text-gray-500">{getCategoryTime(category)}</p>
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
                    <RefreshIcon size={16} />
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
                            className={`flex items-center gap-1 text-xs transition-colors ${
                              isRussian 
                                ? (notes[task.id] ? 'text-blue-600' : 'text-blue-400 hover:text-blue-600')
                                : (notes[task.id] ? 'text-pink-600' : 'text-gray-400 hover:text-pink-500')
                            }`}
                          >
                            {notes[task.id] ? <NoteIcon size={12} /> : <CommentIcon size={12} />}
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
            <LightbulbIcon size={20} />
            {t.tipsTitle}
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {t.tips.map((tip, index) => {
              const TipIcon = tip.icon;
              return (
                <li key={index} className={`flex items-start gap-2 transition-colors duration-500 ${
                  isRussian ? 'text-blue-800' : 'text-emerald-700'
                }`}>
                  <TipIcon size={16} />
                  <span>{tip.text}</span>
                </li>
              );
            })}
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
            <WarningIcon size={20} />
            {t.dontForgetTitle}
          </h3>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.dontForget.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <div key={index} className={`rounded-xl p-3 border transition-colors duration-500 ${
                  isRussian ? 'bg-white/70 border-blue-200' : 'bg-white/70 border-red-100'
                }`}>
                  <p className={`font-medium text-sm flex items-center gap-2 transition-colors duration-500 ${
                    isRussian ? 'text-blue-800' : 'text-red-700'
                  }`}>
                    <ItemIcon size={16} />
                    {item.title}
                  </p>
                  <p className={`text-xs mt-1 transition-colors duration-500 ${
                    isRussian ? 'text-blue-700' : 'text-gray-600'
                  }`}>{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className={`text-center py-6 text-sm transition-colors duration-500 ${
          isRussian ? 'text-blue-400' : 'text-gray-400'
        }`}>
          <p className="flex items-center justify-center gap-2">
            <FlowerIcon size={16} />
            {t.footer1}
            <FlowerIcon size={16} />
          </p>
          <p className="mt-1">{t.footer2}</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
