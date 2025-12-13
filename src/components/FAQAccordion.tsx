import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  allowMultiple?: boolean;
}

export const FAQAccordion = ({ items, allowMultiple = false }: FAQAccordionProps) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(index) ? [] : [index]
      );
    }
  };

  const isOpen = (index: number) => openItems.includes(index);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div 
          key={index}
          className="bg-white rounded-xl border border-border/50 overflow-hidden transition-all hover:border-border"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-5 flex items-center justify-between text-left"
          >
            <span className="font-medium text-foreground pr-4">
              {item.question}
            </span>
            <ChevronDown 
              className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                isOpen(index) ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          <div 
            className={`
              grid transition-all duration-200 ease-in-out
              ${isOpen(index) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
            `}
          >
            <div className="overflow-hidden">
              <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Compact FAQ for sidebars or smaller spaces
export const FAQCompact = ({ items }: { items: FAQItem[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full text-left text-sm font-medium text-foreground hover:text-primary transition-colors py-2 flex items-center justify-between"
          >
            {item.question}
            <ChevronDown 
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openIndex === index && (
            <p className="text-sm text-muted-foreground pb-3 pl-4 border-l-2 border-primary/20 animate-fade-in-up">
              {item.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};




