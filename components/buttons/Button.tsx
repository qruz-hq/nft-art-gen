import { useState } from 'react';

function Button({ type, children, className, ...props }: any) {
  const [over, setOver] = useState<EventTarget>();

  function getBackgroundColor() {
    switch (type) {
      case 'cta':
        return 'bg-palette-5';
      case 'secondary':
        return 'bg-palette-4';
      default:
        return 'bg-palette-3';
    }
  }
  return (
    <button
      type="button"
      className={` text-center w-52 py-3 border overflow-hidden
      border-transparent font-semibold
      ${getBackgroundColor()} text-xl
      rounded-[20px] shadow-sm text-palette-4 focus:outline-none 
      focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
      {...props}>
      {children}
    </button>
  );
}

export default Button;
