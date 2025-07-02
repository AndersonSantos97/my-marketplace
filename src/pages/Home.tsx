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
import { useKeenSlider } from "keen-slider/react"
import Hero from "../components/Hero";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


export const Home = () => {
    const [artists, setArtists] = useState<Artist[]>([]);

    useEffect(() => {
        fetchArtists().then(setArtists).catch(console.error);

    }, []);

    const [mostsale, setMostSales] = useState<MostSale[]>([]);
    useEffect(() => {
        fetchMostSales().then(setMostSales).catch(console.error);
    }, []);

    function ArrowPlugin(slider: any) {
        let timeout: NodeJS.Timeout
        const clearNextTimeout = () => clearTimeout(timeout)
        const nextTimeout = () => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
            slider.next()
            }, 5000)
        }

        slider.on("created", () => {
            nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
    }

    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
        slides: {
        perView: 3,
        spacing: 24,
        },
        breakpoints: {
        "(max-width: 1024px)": {
            slides: { perView: 2, spacing: 16 },
        },
        "(max-width: 640px)": {
            slides: { perView: 1.2, spacing: 12 },
        },
        },
    },
    [ArrowPlugin]
    )
    return (
        <div >
            <div className="max-w-7xl mx-auto">
                <div className="relative">
                    <Hero 
                        image="/images/hero.jpg"
                        title="El Mejor Lugar Para Comprar"
                    />
                    <Navbar />
                </div>
            </div>

            <section className="px-4 pt-20 pb-20">
                <div className="container mx-auto">
                    <PageTitle section="" heading="Vendedores Destacados">
                    Seleccionamos los vendedores destacados del día.
                    </PageTitle>

                    <div className="relative py-4 px-2">
                        <div key={artists.length} ref={sliderRef} className="keen-slider min-h-[350px]">
                            {artists.map((artist) => (
                            <div
                                key={artist.id}
                                className="keen-slider__slide px-2 flex justify-center" // Espaciado lateral adicional
                            >
                                <div className="h-full">
                                    <SellerCard key={artist.id} seller={artist} />
                                </div>
                            </div>
                            ))}
                        </div>
                            <button
                                onClick={() => slider.current?.prev()}
                                className="absolute top-1/2 -translate-y-1/2 left-2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition z-20"
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
            </section>

            <section className="px-4 pt-20 pb-20"> 
                <div className="container mx-auto">
                    <PageTitle section="" heading="Articulos Que Estan Ardiendo">
                        Los articulos que todos estan buscando y se estan acabando...
                    </PageTitle>

                    <section className="relative py-4 px-2">
                        <div className="container mx-auto">
                            <div className="px-2 flex justify-center">
                                    {mostsale.map(mostsale => (
                                    <MostSaleCard key={mostsale.id} mostsales={mostsale} />
                                    ))}
                            </div>
                        </div>
                    </section>
                </div>
            </section>
            <Footer/>
        </div>
    )
}