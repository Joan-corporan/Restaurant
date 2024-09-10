

export const ActionButton = ({ className, onClick, disabled, children }) => (
  <button
    className={className}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);


