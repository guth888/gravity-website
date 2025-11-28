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
    { label: 'Integration', href: '/publishers/integration', description: 'SDK docs, code samples' },
    { label: 'Documentation', href: '/publishers/docs' },
    { label: 'Features', href: '/publishers/features', description: 'Privacy, Real-time insights' },
    { label: 'Pricing', href: '/publishers/pricing' },
    { label: 'FAQ', href: '/publishers/faq' },
  ],
  forAdvertisers: [
    { label: 'Campaign Setup', href: '/advertisers/campaigns' },
    { label: 'DSP Integration', href: '/advertisers/dsp' },
    { label: 'Case Studies', href: '/advertisers/results' },
    { label: 'Pricing', href: '/advertisers/pricing' },
    { label: 'FAQ', href: '/advertisers/faq' },
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
