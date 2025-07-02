import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

interface HeroProps {
  image: string;
  title: string;
  subtitle?: string;
}

const Hero = ({image, title, subtitle} : HeroProps) => {
  return (
    <div className="relative h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden">
        <img
            //src="/images/hero.jpg"
            src={image}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        {/* Capa opcional para oscurecer más la imagen */}
        <div className="absolute inset-0 bg-black opacity-50" />

      {/* Contenido sobre la imagen */}
      <div className="relative z-10 flex flex-col justify-center h-full px-10 space-y-6 max-w-4xl">
        <h1 className="text-4xl md:text-6xl text-white font-serif font-semibold">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-white/80">{subtitle}</p>
        )}
        {/* Botones de redes sociales */}
        <div className="flex space-x-4 mt-2">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-white hover:text-blue-400 transition text-2xl" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-white hover:text-sky-400 transition text-2xl" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white hover:text-pink-400 transition text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
};
export default Hero;