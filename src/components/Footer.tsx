import { Link } from "react-router-dom";

export const Footer = ({ className }: { className?: string }) => {
  const navigation = {
    publishers: [
      { name: 'Overview', href: '/publishers' },
      { name: 'Integration', href: '/publishers#integration' },
      { name: 'Pricing', href: '/publishers#pricing' },
      { name: 'Documentation', href: '/docs' },
    ],
    advertisers: [
      { name: 'Overview', href: '/advertisers' },
      { name: 'Ad Formats', href: '/advertisers#formats' },
      { name: 'Inventory', href: '/advertisers#inventory' },
      { name: 'Pricing', href: '/advertisers#pricing' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  };

  return (
    <footer className={`bg-foreground text-background ${className || ''}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-background">
                Gravity
              </span>
            </Link>
            <p className="text-sm text-background/60 max-w-xs">
              Where individual value meets aligned incentives.
            </p>
          </div>

          {/* For Publishers */}
          <div>
            <p className="text-sm font-medium text-background mb-4">
              For Publishers
            </p>
            <ul className="space-y-3">
              {navigation.publishers.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Advertisers */}
          <div>
            <p className="text-sm font-medium text-background mb-4">
              For Advertisers
            </p>
            <ul className="space-y-3">
              {navigation.advertisers.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-sm font-medium text-background mb-4">
              Company
            </p>
            <ul className="space-y-3">
              {navigation.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-sm font-medium text-background mb-4">
              Legal
            </p>
            <ul className="space-y-3">
              {navigation.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/40">
            © {new Date().getFullYear()} Gravity AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a 
              href="https://twitter.com/gravityai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-background/40 hover:text-background transition-colors"
            >
              Twitter
            </a>
            <a 
              href="https://linkedin.com/company/gravityai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-background/40 hover:text-background transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
