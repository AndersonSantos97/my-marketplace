import { useNavigate } from "react-router-dom";
import type { Artist } from "../types/Artist";
import {
  Card,
  Avatar,
  CardBody,
  Typography
} from "@material-tailwind/react";


export const ArtistCard = ({ artist }: {artist: Artist}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/seller/${artist.id}`)
  }
  return(
    <Card onClick={handleClick} className="w-45 h-55 rounded-lg shadow-lg shadow-gray-500/10" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <CardBody className="px-6 text-center " placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <div className="flex items-center justify-center mb-4">
            <Avatar
                src={artist.avatar_url}
                alt="Tina Andrew" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
        </div>
        <Typography variant="h5" className="text-lg font-semibold text-gray-600 mb-1 capitalize" color="blue-gray" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {artist.name}
        </Typography>
        <Typography className="text-sm text-gray-400 capitalize" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {artist.bio}
        </Typography>
      </CardBody>
    </Card>
  )
}