import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export const Footer = ({ className }: { className?: string }) => {
  const navigation = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'How It Works', href: '#how-it-works' },
      { name: 'Demo', href: '#sandbox-demo' },
      { name: 'Pricing', href: '#pricing' },
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Blog', href: '#blog' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@gravity.ai' },
  ];

  return (
    <footer className={`relative bg-background ${className || ''}`}>
      {/* Subtle top gradient fade for visual continuity */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-5 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10 xl:gap-12 mb-10 md:mb-12">
          {/* Brand Section */}
          <div className="col-span-2 lg:col-span-2">
            <h3 className="text-xl md:text-2xl font-headline font-semibold mb-3 md:mb-4">GRAVITY</h3>
            <p className="text-gravity-grey text-sm leading-relaxed mb-4 md:mb-6 max-w-sm">
              The advertising layer built for AI. Connect your brand to high-intent audiences across LLM conversations.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 flex items-center justify-center text-gravity-grey hover:text-gravity-teal transition-all duration-200 hover:teal-glow"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground">
              Product
            </h4>
            <ul className="space-y-3">
              {navigation.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gravity-grey hover:text-gravity-teal transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground">
              Company
            </h4>
            <ul className="space-y-3">
              {navigation.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gravity-grey hover:text-gravity-teal transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground">
              Legal
            </h4>
            <ul className="space-y-3">
              {navigation.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gravity-grey hover:text-gravity-teal transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8">
          <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gravity-grey">
              © {new Date().getFullYear()} Gravity AI. All rights reserved.
            </p>
            <p className="text-sm text-gravity-grey">
              Built with precision for the future of advertising
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
