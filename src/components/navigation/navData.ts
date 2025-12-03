export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavData {
  forPublishers: NavItem[];
  forAdvertisers: NavItem[];
  resources: NavItem[];
  company: NavItem[];
}

export const navData: NavData = {
  forPublishers: [
    { label: 'Network Overview', href: '/publishers#network', description: 'How the network works' },
    { label: 'Revenue Estimator', href: '/publishers#revenue', description: 'See your earning potential' },
    { label: 'Live Demo', href: '/publishers#demo', description: 'See how suggestions appear' },
    { label: 'Demand Partners', href: '/publishers#partners', description: '50+ premium partners' },
  ],
  forAdvertisers: [
    { label: 'Browse Inventory', href: '/advertisers#inventory', description: 'Explore available conversations' },
    { label: 'Targeting & Intent', href: '/advertisers#targeting', description: 'Intent-based targeting' },
    { label: 'Ad Formats', href: '/advertisers#formats', description: 'Native formats that convert' },
    { label: 'How It Works', href: '/advertisers#how-it-works', description: 'From brief to live in 48hrs' },
    { label: 'Pricing', href: '/advertisers#pricing', description: 'Transparent CPM rates' },
  ],
  resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Webinars', href: '/webinars' },
    { label: 'Support', href: '/support' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Team', href: '/team' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
};
