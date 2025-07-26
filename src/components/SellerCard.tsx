import { useNavigate } from "react-router-dom";
import type { Seller } from "../types/Seller";

interface SellerCardProps {
  seller: Seller;
}

const SellerCard = ({ seller }: SellerCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/seller/${seller.id}`)}
      className="bg-white rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition w-[250px] h-[340px] flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Imagen ocupa la mitad superior */}
      <div className="h-[50%] w-full">
        <img
          src={seller.avatar_url}
          alt={seller.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div className="text-center">
          <h2 className="text-lg font-heading font-semibold text-dark">
            {seller.name}
          </h2>
          <p className="text-sm text-muted mt-1 line-clamp-2">{seller.bio}</p>
        </div>
        <div className="text-center mt-4">
          <span className="text-xs text-gray-400">Haz clic para ver sus productos</span>
        </div>
      </div>
    </div>
  );
};

export default SellerCard;
