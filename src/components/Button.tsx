interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}

export const Button = ({ children, onClick, type = "button" }: ButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    className="bg-primary text-white font-medium px-4 py-2 rounded-md hover:bg-blue-900 transition"
  >
    {children}
  </button>
);
