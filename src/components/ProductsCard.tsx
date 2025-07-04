import type { MostSale } from "../types/MostSales";
import { useCartStore } from '../store/cartStore'
import toast from 'react-hot-toast'
// import {
//   Card,
//   Avatar,
//   CardBody,
//   Typography
// } from "@material-tailwind/react";

export const MostSaleCard = ({ mostsales }: {mostsales: MostSale}) => {
  const addToCart = useCartStore(state => state.addToCart)
  console.log("Cantidad de estock de mostsales" + mostsales.stock)

  return(
    <div className="bg-gray-50 mx-4 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer overflow-hidden w-[250px] h-[360px] flex flex-col justify-between p-4">
      <img
        src={mostsales.image_url}
        alt={mostsales.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{mostsales.title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{mostsales.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-blue-600 font-bold text-lg">${mostsales.price.toFixed(2)}</span>
          {mostsales.stock === 0 ? (
            <span className="text-red-500 font-semibold">Agotado</span>
          ) : (
                <button
                  onClick={() => {
                      addToCart(mostsales)
                      toast.success(`${mostsales.title} agregado al carrito`)
                  }}
                  className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition"
                >
                  Agregar
                </button>

          )}
        </div>
      </div>
    </div>
  )

}

// (
//     <Card className="w-45 h-55 rounded-lg shadow-lg shadow-gray-500/10" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
//       <CardBody className="px-6 text-center" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
//         <div className="flex items-center justify-center mb-4">
//             <Avatar
//                 src={mostsales.image_url}
//                 alt="Tina Andrew" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
//         </div>
//         <Typography variant="h5" className="text-base font-semibold text-gray-600 mb-1" color="blue-gray" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
//           {mostsales.title}
//         </Typography>
//       </CardBody>
//     </Card>
// )