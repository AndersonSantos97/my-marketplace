import { useNavigate } from "react-router-dom";
import {
  BrushIcon,
  BookIcon,
  CameraIcon,
  PaletteIcon,
  MusicIcon,
  MonitorIcon,
  RefrigeratorIcon,
  AmphoraIcon
} from "lucide-react";
import type { Category } from "../types/categories";

interface CategoryBarProps {
  categories: Category[];
}

const iconMap: Record<string, React.ReactNode> = {
  "arte": <PaletteIcon className="w-6 h-6" />,
  "ilustracion": <BrushIcon className="w-6 h-6" />,
  "literatura": <BookIcon className="w-6 h-6" />,
  "electronica": <MonitorIcon className="w-6 h-6" />,
  "linea blanca": <RefrigeratorIcon className="w-6 h-6" />,
  "esculturas": <AmphoraIcon className="w-6 h-6" />,
  "fotografía": <CameraIcon className="w-6 h-6" />,
  "música": <MusicIcon className="w-6 h-6" />
};

const CategoryBar = ({ categories }: CategoryBarProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white py-4 shadow-sm rounded-2xl">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center gap-4 overflow-x-auto">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/categoria/${cat.id}`)}
            className="flex flex-col items-center justify-center cursor-pointer hover:text-primary transition"
          >
            <div className="bg-primary/10 text-primary p-3 rounded-full mb-1 transform transition duration-300 hover:scale-110 hover:bg-primary/20 hover:shadow">
              {iconMap[cat.name.toLowerCase()] ?? <PaletteIcon className="w-6 h-6" />}
            </div>
            <span className="text-sm font-medium capitalize">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
