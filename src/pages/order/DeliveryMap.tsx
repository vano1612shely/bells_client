import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import type { RelayPoint } from '@/modules/orders'

const blueIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  iconSize: [32, 32],
})

const redIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  iconSize: [32, 32],
})

function MapCenter({ point }: { point?: RelayPoint | null }) {
  const map = useMap()
  useEffect(() => {
    if (point?.lat && point.lon) {
      map.setView([point.lat, point.lon], 13)
    }
  }, [point, map])
  return null
}

interface DeliveryMapProps {
  points: Array<RelayPoint>
  selected: RelayPoint | null
  onSelect: (point: RelayPoint) => void
}

export const DeliveryMap = ({
  points,
  selected,
  onSelect,
}: DeliveryMapProps) => {
  const validPoints = points.filter((p) => p.lat && p.lon)

  const center =
    selected?.lat && selected.lon
      ? [selected.lat, selected.lon]
      : validPoints.length
        ? [validPoints[0].lat!, validPoints[0].lon!]
        : [48.8566, 2.3522] // Paris par défaut

  return (
    <MapContainer
      center={center as [number, number]}
      zoom={12}
      className="h-full w-full rounded-md"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {validPoints.map((p) => (
        <Marker
          key={p.Num}
          position={[p.lat!, p.lon!]}
          icon={selected?.Num === p.Num ? redIcon : blueIcon}
          eventHandlers={{ click: () => onSelect(p) }}
        >
          <Popup>
            <strong>{p.LgAdr1}</strong>
            <br />
            {p.CP} {p.Ville}
          </Popup>
        </Marker>
      ))}

      <MapCenter point={selected} />
    </MapContainer>
  )
}
