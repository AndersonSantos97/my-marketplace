import { useNavigate } from "react-router-dom";
import type { Seller } from "../types/Seller";

interface SellerCardProps {
    seller: Seller
}

const SellerCard = ({seller}: SellerCardProps) => {
    const navigate = useNavigate()

    return(
        <>
            <div
                onClick={() => navigate(`/seller/${seller.id}`)}
                className="bg-gray-50 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer overflow-hidden w-[250px] h-[340px] flex flex-col justify-between p-4"
                >
                {/* Imagen arriba */}
                <div className="flex justify-center mb-4">
                    <img
                    src={seller.avatar_url}
                    alt={seller.name}
                    className="w-24 h-24 rounded-full object-cover border-2 "
                    />
                </div>

                {/* Nombre y bio distribuidos */}
                <div className="text-center flex flex-col flex-grow justify-between">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{seller.name}</h2>
                    <p className="text-sm text-gray-600 line-clamp-3">{seller.bio}</p>
                </div>

                {/* Footer */}
                <div className="text-center mt-4">
                    <span className="text-xs text-gray-400">Haz clic para ver sus productos</span>
                </div>
            </div>
                    
        </>
    )

}

export default SellerCard