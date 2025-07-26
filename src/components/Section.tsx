interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`px-4 py-16 ${className}`}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);
