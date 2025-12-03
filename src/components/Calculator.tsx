import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Publisher Revenue Calculator
interface PublisherCalculatorProps {
  onCalculate?: (result: { monthly: number; yearly: number }) => void;
}

const VERTICAL_RPM: Record<string, number> = {
  'ai-assistant': 4.50,
  'ai-search': 3.80,
  'chatbot': 3.20,
  'content-tool': 2.90,
  'education': 2.50,
  'other': 2.00
};

export const PublisherCalculator = ({ onCalculate }: PublisherCalculatorProps) => {
  const [conversations, setConversations] = useState(100000);
  const [vertical, setVertical] = useState('ai-assistant');

  const result = useMemo(() => {
    const rpm = VERTICAL_RPM[vertical] || 2.00;
    const monthly = (conversations / 1000) * rpm;
    const yearly = monthly * 12;
    onCalculate?.({ monthly, yearly });
    return { monthly, yearly, rpm };
  }, [conversations, vertical, onCalculate]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border/50">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        Estimate Your Revenue
      </h3>
      
      {/* Conversations Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-medium text-foreground">
            Monthly Conversations
          </label>
          <span className="text-lg font-bold text-primary">
            {formatNumber(conversations)}
          </span>
        </div>
        <Slider
          value={[conversations]}
          onValueChange={(value) => setConversations(value[0])}
          min={10000}
          max={10000000}
          step={10000}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>10K</span>
          <span>10M</span>
        </div>
      </div>
      
      {/* Vertical Select */}
      <div className="mb-8">
        <label className="text-sm font-medium text-foreground block mb-3">
          Primary Vertical
        </label>
        <Select value={vertical} onValueChange={setVertical}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ai-assistant">AI Assistant</SelectItem>
            <SelectItem value="ai-search">AI Search</SelectItem>
            <SelectItem value="chatbot">Chatbot</SelectItem>
            <SelectItem value="content-tool">Content Tool</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Results */}
      <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
        <div className="text-sm text-muted-foreground mb-1">
          Estimated Monthly Revenue
        </div>
        <div className="text-4xl font-bold text-foreground mb-4">
          {formatCurrency(result.monthly)}
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Yearly projection</span>
          <span className="font-medium text-foreground">{formatCurrency(result.yearly)}</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-muted-foreground">Avg RPM</span>
          <span className="font-medium text-foreground">${result.rpm.toFixed(2)}</span>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-4 text-center">
        *Estimates based on average performance. Actual results may vary.
      </p>
    </div>
  );
};

// Advertiser ROI Calculator
interface AdvertiserCalculatorProps {
  onCalculate?: (result: { conversions: number; cpa: number }) => void;
}

const VERTICAL_CTR: Record<string, number> = {
  'ecommerce': 0.14,
  'fintech': 0.11,
  'saas': 0.10,
  'travel': 0.12,
  'health': 0.09,
  'other': 0.08
};

const VERTICAL_CVR: Record<string, number> = {
  'ecommerce': 0.04,
  'fintech': 0.025,
  'saas': 0.02,
  'travel': 0.03,
  'health': 0.018,
  'other': 0.015
};

export const AdvertiserCalculator = ({ onCalculate }: AdvertiserCalculatorProps) => {
  const [budget, setBudget] = useState(10000);
  const [vertical, setVertical] = useState('ecommerce');

  const result = useMemo(() => {
    const ctr = VERTICAL_CTR[vertical] || 0.08;
    const cvr = VERTICAL_CVR[vertical] || 0.015;
    const cpm = 15; // Average CPM
    
    const impressions = (budget / cpm) * 1000;
    const clicks = impressions * ctr;
    const conversions = Math.round(clicks * cvr);
    const cpa = conversions > 0 ? budget / conversions : 0;
    
    onCalculate?.({ conversions, cpa });
    return { impressions, clicks, conversions, cpa, ctr };
  }, [budget, vertical, onCalculate]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toFixed(0);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border/50">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        Estimate Your ROI
      </h3>
      
      {/* Budget Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-medium text-foreground">
            Monthly Ad Spend
          </label>
          <span className="text-lg font-bold text-primary">
            {formatCurrency(budget)}
          </span>
        </div>
        <Slider
          value={[budget]}
          onValueChange={(value) => setBudget(value[0])}
          min={1000}
          max={100000}
          step={1000}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>$1K</span>
          <span>$100K</span>
        </div>
      </div>
      
      {/* Vertical Select */}
      <div className="mb-8">
        <label className="text-sm font-medium text-foreground block mb-3">
          Target Vertical
        </label>
        <Select value={vertical} onValueChange={setVertical}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ecommerce">E-commerce</SelectItem>
            <SelectItem value="fintech">Fintech</SelectItem>
            <SelectItem value="saas">SaaS</SelectItem>
            <SelectItem value="travel">Travel</SelectItem>
            <SelectItem value="health">Health & Wellness</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Results */}
      <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Est. Conversions
            </div>
            <div className="text-3xl font-bold text-foreground">
              {result.conversions}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Est. CPA
            </div>
            <div className="text-3xl font-bold text-foreground">
              {result.cpa > 0 ? formatCurrency(result.cpa) : '-'}
            </div>
          </div>
        </div>
        <div className="flex justify-between text-sm pt-4 border-t border-primary/10">
          <span className="text-muted-foreground">Expected CTR</span>
          <span className="font-medium text-foreground">{(result.ctr * 100).toFixed(1)}%</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-muted-foreground">Est. clicks</span>
          <span className="font-medium text-foreground">{formatNumber(result.clicks)}</span>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-4 text-center">
        *Estimates based on average performance. Actual results may vary.
      </p>
    </div>
  );
};



