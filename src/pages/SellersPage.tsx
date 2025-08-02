import { useEffect, useState } from "react";
import type { Seller } from "../types/Seller";
import { fetchSellers } from "../api/seller";
//import { useNavigate } from "react-router-dom";
import SellerCard from "../components/SellerCard";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Hero from "../components/Hero";


const SellersPage = () => {
    const [sellers, setSellers] = useState<Seller[]>([])
    const [skip, setSkip] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const limit = 8
    const [loading, setLoading] = useState(false)
    //const navigate = useNavigate()

    useEffect(() => {
        fetchSellers().then(setSellers)
    }, [])

    const loadSellers = async () => {
        setLoading(true)
        try {
            const newSellers = await fetchSellers(skip, limit)

            setSellers(prev => {
            const existingIds = new Set(prev.map(s => s.id))
            const uniqueNew = newSellers.filter(s => !existingIds.has(s.id))
            return [...prev, ...uniqueNew]
            })

            setSkip(prev => prev + limit)
            if (newSellers.length < limit) setHasMore(false)
        } catch (error) {
            console.error("Error al cargar vendedores:", error)
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <>
            <div className="max-w-7xl mx-auto">
                <div className="relative">
                    <Hero 
                        image="/images/4.png"
                        title="El Mejor lugar para vender"
                    />
                    <Navbar />
                </div>
            </div>
            <section className="px-4 pt-20 pb-20">
                <div className="md:px-10 lg:px-16 pt-20 pb-20 max-w-screen-xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-center">Vendedores</h1>

                    <div className="grid grid-cols-1 place-content-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {sellers.map(seller => (
                        <SellerCard key={seller.id} seller={seller} />
                        ))}
                    </div>

                    {loading ? (
                        <div className="flex justify-center mt-8">
                            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        </div>
                        ) : hasMore && (
                        <div className="flex justify-center mt-8">
                            <button
                            onClick={loadSellers}
                            className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow"
                            >
                            Ver más
                            </button>
                        </div>
                    )}
                </div>
            </section>
            <Footer/>  
        </>
    )
}

export default SellersPage