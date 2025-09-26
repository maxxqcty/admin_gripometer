import React from "react";

interface LogoProps {
  size?: number;          // optional size
  withText?: boolean;     // show/hide text
  className?: string;     // extra styling
}

const Logo: React.FC<LogoProps> = ({ size = 40, withText = true, className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/assets/images/logo.png"   // logo in public folder
        alt="App Logo"
        width={size}
        height={size}
      />
      {withText && <span className="text-xl font-bold">MyApp</span>}
    </div>
  );
};

export default Logo;
