export const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-center py-4 mt-8">
      <div className="text-gray-600 dark:text-gray-300 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 px-4">
        <span className="text-sm">&copy; {new Date().getFullYear()} Cibermarket. Todos los derechos reservados.</span>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-accent transition">Términos</a>
          <a href="#" className="hover:text-accent transition">Privacidad</a>
          <a href="#" className="hover:text-accent transition">Contacto</a>
        </div>
      </div>
    </footer>
  );
};