import { useEffect, useState } from "react";
import { fetchArtists } from "../api/artist";
import { fetchMostSales } from "../api/mostsales";
import type { Artist } from "../types/Artist";
import type { MostSale } from "../types/MostSales";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import PageTitle from "../widgets/layout/page-tittle";
import { MostSaleCard } from "../components/ProductsCard";
import SellerCard from "../components/SellerCard";
import "keen-slider/keen-slider.min.css"
import Hero from "../components/Hero";
import CategoryBar from "../components/CategoryBar";
import axios from "../api/axiosInstance";
import type { Category } from "../types/categories";


export const Home = () => {
    const [artists, setArtists] = useState<Artist[]>([]);

    useEffect(() => {
        fetchArtists().then(setArtists).catch(console.error);

    }, []);

    const [mostsale, setMostSales] = useState<MostSale[]>([]);
    useEffect(() => {
        fetchMostSales().then(setMostSales).catch(console.error);
    }, []);


    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
    const fetchCategories = async () => {
        try {
            const response = await axios.get<Category[]>("/categories/");
            setCategories(response.data);
        } catch (error) {
            console.error("Error cargando categorías", error);
        }
        };

        fetchCategories();
    }, []);

    const firstFive = categories.slice(0, 5);
    const nextFive = categories.slice(5, 10);



    return (
        <div >
            <div className="max-w-7xl mx-auto">
                <div className="relative">
                    <Hero 
                        image="/images/2.png"
                        title="El Mejor Lugar Para Comprar"
                    />
                    <Navbar />
                </div>
            </div>

            <section className="px-4 pt-20 pb-10">
                {firstFive.length > 0 && <CategoryBar categories={firstFive} />}
            </section>

            {/* <section className="px-4 pt-20 pb-20">
                <div className="container mx-auto">
                    <PageTitle section="" heading="Vendedores Destacados">
                    Seleccionamos los vendedores destacados del día.
                    </PageTitle>

                    <div className="relative mt-6">
                    <div
                        ref={sliderRef}
                        className="keen-slider"
                    >
                        {artists.map((artist) => (
                        <div
                            key={artist.id}
                            className="keen-slider__slide"
                        >
                            <div className="mx-2">
                            <SellerCard seller={artist} />
                            </div>
                        </div>
                        ))}
                    </div>


                    <button
                        onClick={() => slider.current?.prev()}
                        className="absolute top-1/2 -translate-y-1/2 left-0.20 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition z-20"
                    >
                        <FaArrowLeft className="text-gray-700" />
                    </button>
                    <button
                        onClick={() => slider.current?.next()}
                        className="absolute top-1/2 -translate-y-1/2 right-2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition z-20"
                    >
                        <FaArrowRight className="text-gray-700" />
                    </button>
                    </div>
                </div>
            </section> */}

            <section className="px-4 pt-20 pb-20">
                <div className="container mx-auto">
                    <PageTitle section="" heading="Vendedores Destacados">
                    Seleccionamos los vendedores destacados del día.
                    </PageTitle>

                    <div className="relative py-4 px-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                            {artists.map((artist) => (
        
                                <div className="mx-2">
                                    <SellerCard seller={artist} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <section className="relative py-4 px-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {mostsale.map((item) => (
                            <MostSaleCard key={item.id} mostsales={item} />
                        ))}
                        </div>
                    </section>
                </div>
            </section>

  
            {/* Tarjeta Informativa */}
            <section className="px-4 pt-20 pb-20">
                <div className="container mx-auto">
                <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition max-w-5xl mx-auto flex flex-col justify-center items-center text-center p-10">
                    <PageTitle section="" heading="Compra de Todo Aquí">
                    Todos los vendedores alrededor del país querrán usarla. Puedes vender todo lo que se te ocurra. Vas a comprar lo que quieras.
                    </PageTitle>
                </div>
                </div>
            </section>

            <section className="px-4 pt-20 pb-10">
                {nextFive.length > 0 && <CategoryBar categories={nextFive} />}
            </section>

            {/* Artículos Que Están Ardiendo */}
            <section className="px-4 pt-20 pb-20">
                <div className="container mx-auto">
                <PageTitle section="" heading="Artículos Que Están Ardiendo">
                    Los artículos que todos están buscando y se están acabando...
                </PageTitle>

                <section className="relative py-4 px-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {mostsale.map((item) => (
                        <MostSaleCard key={item.id} mostsales={item} />
                    ))}
                    </div>
                </section>
                </div>
            </section>
            <Footer/>
        </div>
    )
}