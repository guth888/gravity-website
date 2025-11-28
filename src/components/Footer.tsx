import { Link } from "react-router-dom";

export const Footer = ({ className }: { className?: string }) => {
  const navigation = {
    publishers: [
      { name: 'How it works', href: '/#how-it-works' },
      { name: 'Pricing', href: '/publishers#pricing' },
      { name: 'Docs', href: '/docs' },
      { name: 'Case studies', href: '/case-studies' },
    ],
    advertisers: [
      { name: 'Formats', href: '/advertisers#formats' },
      { name: 'Inventory', href: '/advertisers#inventory' },
      { name: 'Reporting', href: '/advertisers#reporting' },
      { name: 'FAQ', href: '/#faq' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
  };

  return (
    <footer className={`bg-background border-t border-border/20 ${className || ''}`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-8 mb-16">
          
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="text-xl font-medium text-foreground tracking-tight">
                Gravity
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Where individual value meets aligned incentives.
            </p>
          </div>

          {/* For Publishers */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground/60 mb-6">
              For Publishers
            </p>
            <ul className="space-y-4">
              {navigation.publishers.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Advertisers */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground/60 mb-6">
              For Advertisers
            </p>
            <ul className="space-y-4">
              {navigation.advertisers.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground/60 mb-6">
              Company
            </p>
            <ul className="space-y-4">
              {navigation.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Gravity AI
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
