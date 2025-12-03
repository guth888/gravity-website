import { Link } from "react-router-dom";
import gravityLogo from '@/assets/gravity-logo.png';

export const Login = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <Link to="/" className="mb-16">
        <img 
          src={gravityLogo} 
          alt="Gravity" 
          className="h-28 sm:h-36 opacity-90 hover:opacity-100 transition-opacity"
        />
      </Link>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <a 
          href="https://app.trygravity.ai/publisher/login"
          className="
            flex items-center justify-center px-10 py-3.5 rounded-lg
            bg-foreground text-background font-medium text-sm
            transition-all duration-300
            hover:bg-foreground/90 hover:shadow-lg hover:scale-[1.02]
            min-w-[180px]
          "
        >
          Publishers
        </a>

        <a 
          href="https://app.trygravity.ai/advertiser/login"
          className="
            flex items-center justify-center px-10 py-3.5 rounded-lg
            bg-gray-100 text-foreground font-medium text-sm
            border-2 border-gray-300
            transition-all duration-300
            hover:bg-gray-200 hover:border-gray-400 hover:shadow-md hover:scale-[1.02]
            min-w-[180px]
          "
        >
          Advertisers
        </a>
      </div>
    </div>
  );
};

