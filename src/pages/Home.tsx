import { useEffect, useState } from "react";
import { fetchArtists } from "../api/artist";
import { fetchMostSales } from "../api/mostsales";
import type { Artist } from "../types/Artist";
import type { MostSale } from "../types/MostSales";
import { ArtistCard } from "../components/ArtistCard";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import PageTitle from "../widgets/layout/page-tittle";
import { MostSaleCard } from "../components/ProductsCard";


export const Home = () => {
    const [artists, setArtists] = useState<Artist[]>([]);

    useEffect(() => {
        fetchArtists().then(setArtists).catch(console.error);

    }, []);

    const [mostsale, setMostSales] = useState<MostSale[]>([]);
    useEffect(() => {
        fetchMostSales().then(setMostSales).catch(console.error);
    }, []);

    return (
        <div >
            <Navbar/>
            {/* Hero Section */}
            <div className="relative w-full h-64 md:h-96">
                <img
                src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
                alt="Hero"
                className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h1 className="text-white text-3xl md:text-2xl font-bold text-center">
                    Descubre el talento artístico de Cibermarket
                </h1>
                </div>
            </div>

            <section className="px-4 pt-20 pb-20"> 
                <div className="container mx-auto">
                    <PageTitle section="" heading="Vendedores Destacados">
                        Selecionamos los vendedores destacados del dia.
                    </PageTitle>
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4 ">
                        <div>
                            <div className="flex justify-between">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                                    {artists.map(artist => (
                                    <ArtistCard key={artist.id} artist={artist} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>

            <section className="px-4 pt-20 pb-20"> 
                <div className="container mx-auto">
                    <PageTitle section="" heading="Articulos Que Estan Ardiendo">
                        Los articulos que todos estan buscando y se estan acabando...
                    </PageTitle>
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4 ">
                        <div>
                            <div className="flex justify-between">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                                    {mostsale.map(mostsale => (
                                    <MostSaleCard key={mostsale.id} mostsales={mostsale} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    )
}