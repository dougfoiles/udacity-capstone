import "./Button.scss";

type Props = {
  onClick?: (param: any) => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined; // FIX-TYPESCRIPT
  className?: string;
  children: JSX.Element | string;
  loadMoreRef?: any;
  onMouseOver?: any;
  onMouseLeave?: any;
};

const Button = ({
  onClick = () => {},
  disabled = false,
  type,
  className = "",
  children,
  loadMoreRef,
  onMouseOver,
  onMouseLeave,
}: Props): JSX.Element => {
  return (
    <button
      className={`styled-button ${className ? className : ""}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
      ref={loadMoreRef}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
};

export default Button;
