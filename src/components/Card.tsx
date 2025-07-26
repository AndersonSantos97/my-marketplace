interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => (
  <div className={`bg-white rounded-xl shadow hover:shadow-lg transition ${className}`}>
    {children}
  </div>
);
