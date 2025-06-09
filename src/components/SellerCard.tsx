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
                className="bg-white rounded-xl shadow-md p-5 cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
                >
                <img
                    src={seller.avatar_url}
                    alt={seller.name}
                    className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-800">{seller.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{seller.bio}</p>
            </div>
        
        </>
    )

}

export default SellerCard