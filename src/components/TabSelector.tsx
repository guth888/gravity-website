import { useState, ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
}

interface TabSelectorProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: 'pills' | 'underline' | 'cards';
  onChange?: (tabId: string) => void;
}

export const TabSelector = ({
  tabs,
  defaultTab,
  variant = 'pills',
  onChange
}: TabSelectorProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeContent = tabs.find(tab => tab.id === activeTab)?.content;

  if (variant === 'underline') {
    return (
      <div>
        {/* Tab Headers - Underline Style */}
        <div className="flex gap-8 border-b border-border mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                relative pb-4 text-sm font-medium transition-colors
                ${activeTab === tab.id 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <div className="flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </div>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="animate-fade-in-up">
          {activeContent}
        </div>
      </div>
    );
  }

  if (variant === 'cards') {
    return (
      <div>
        {/* Tab Headers - Card Style */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                p-4 rounded-xl border text-center transition-all
                ${activeTab === tab.id 
                  ? 'bg-primary text-white border-primary shadow-lg' 
                  : 'bg-white text-foreground border-border hover:border-primary/30 hover:shadow'
                }
              `}
            >
              {tab.icon && (
                <div className={`mb-2 flex justify-center ${activeTab === tab.id ? 'text-white' : 'text-primary'}`}>
                  {tab.icon}
                </div>
              )}
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="animate-fade-in-up">
          {activeContent}
        </div>
      </div>
    );
  }

  // Default: Pills variant
  return (
    <div>
      {/* Tab Headers - Pills Style */}
      <div className="inline-flex bg-muted rounded-full p-1 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all
              ${activeTab === tab.id 
                ? 'bg-white text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
              }
            `}
          >
            <div className="flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </div>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="animate-fade-in-up">
        {activeContent}
      </div>
    </div>
  );
};

// Simple toggle variant for two options
export const TabToggle = ({
  options,
  value,
  onChange
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="inline-flex bg-muted rounded-full p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`
            px-6 py-2 rounded-full text-sm font-medium transition-all
            ${value === option.value 
              ? 'bg-white text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};




